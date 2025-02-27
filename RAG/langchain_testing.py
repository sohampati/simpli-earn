import os
import hashlib
from dotenv import load_dotenv
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.schema import Document
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts import ChatPromptTemplate
import time

# Load environment variables
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY not found in .env file")

# Initialize OpenAI embeddings
embeddings = OpenAIEmbeddings(model="text-embedding-ada-002", openai_api_key=OPENAI_API_KEY)

def generate_content_hash(file_content: str) -> str:
    """Generates a unique SHA-256 hash from the file content."""
    return hashlib.sha256(file_content.encode('utf-8')).hexdigest()

def initialize_retrieval(file_path):
    """Creates a unique FAISS index based on file content hash."""
    
    with open(file_path, "r", encoding="utf-8") as f:
        transcript_text = f.read()

    # Generate hash from content
    content_hash = generate_content_hash(transcript_text)
    faiss_index_path = f"faiss_indices/faiss_index_{content_hash}"

    # Check if FAISS index already exists
    if os.path.exists(faiss_index_path):
        print(f"Loading FAISS index for content hash {content_hash} from disk...")
        vectorstore = FAISS.load_local(faiss_index_path, embeddings, allow_dangerous_deserialization=True)
    else:
        print(f"Creating new FAISS index for content hash {content_hash}...")
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
        chunks = text_splitter.split_text(transcript_text)
        documents = [Document(page_content=chunk) for chunk in chunks]
        vectorstore = FAISS.from_documents(documents, embeddings)
        vectorstore.save_local(faiss_index_path)

    retriever = vectorstore.as_retriever()
    return retriever, content_hash  # Return hash for display/reference

def summarize_document(file_path):
    """Streams a summary of the document using ChatOpenAI."""
    with open(file_path, "r", encoding="utf-8") as f:
        transcript_text = f.read()

    # Prompt template for summarization
    summary_prompt = PromptTemplate(
        input_variables=["document"],
        template="Summarize the following document in a concise and informative manner:\n\n{document}"
    )

    # Initialize the LLM for streaming
    llm = ChatOpenAI(model_name="gpt-4o", openai_api_key=OPENAI_API_KEY, streaming=True)

    # Create a chain for summarization
    chain = LLMChain(llm=llm, prompt=summary_prompt)

    # Stream the summary output
    for chunk in chain.stream({"document": transcript_text[:3000]}):  # Limit text for summarization
        time.sleep(0.05)
        yield chunk["text"]

def get_chat_response(user_input, retriever, memory):
    """Generates responses using conversational retrieval with memory."""
    
    prompt_template = ChatPromptTemplate.from_template(
        """
        You are an assistant providing insights from the uploaded document.
        Use the provided context and chat history to answer the user's questions.
        If the question is irrelevant to the document, politely state so.

        Context: {context}
        Chat History: {chat_history}
        User: {question}
        Assistant:
        """
    )

    qa_chain = ConversationalRetrievalChain.from_llm(
        llm=ChatOpenAI(model_name="gpt-4o", openai_api_key=OPENAI_API_KEY),
        retriever=retriever,
        memory=memory,
        combine_docs_chain_kwargs={"prompt": prompt_template}
    )

    response = qa_chain.invoke({"question": user_input})
    return response["answer"]
