# api_chatbot.py
from fastapi import FastAPI
from pydantic import BaseModel
from transcript_retrieval import get_video_transcript, save_transcript_as_txt
from langchain_testing import initialize_retrieval, get_chat_response
from langchain.memory import ConversationBufferMemory
import os
from datetime import datetime
from langchain.chains import ConversationalRetrievalChain
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate


from fastapi.middleware.cors import CORSMiddleware

last_used_id = None  # NEW: track last dashboard id


app = FastAPI()

# Add this block to enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for dev; tighten in prod
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Persistent objects
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
retriever = None
qa_chain = None  # ✅ NEW

# Static transcripts for library
STATIC_TRANSCRIPTS = {
    "1": "transcripts/apple_seeking_alpha.txt",
    "2": "transcripts/cvs_seeking_alpha.txt",
    "3": "transcripts/alphabet_seeking_alpha.txt",
    "4": "transcripts/shell_seeking_alpha.txt",
    "5": "transcripts/tesla_seeking_alpha.txt",
    "6": "transcripts/walmart_seeking_alpha.txt"
}

UPLOADS_DIR = "uploads"
chat_history = []

class ChatRequest(BaseModel):
    message: str
    id: str = None  # Optional dashboard id (e.g. 2 for Tesla)
    video_url: str = None  # Optional for dynamic YouTube support

def save_transcript_in_uploads(video_url, transcript_text):
    """Save transcript to the uploads folder with a timestamped filename."""
    today = datetime.now().strftime("%Y-%m-%d")
    upload_dir = os.path.join(UPLOADS_DIR, today)
    os.makedirs(upload_dir, exist_ok=True)
    timestamp = datetime.now().strftime("%H-%M-%S")
    transcript_filename = f"youtube_transcript_{timestamp}.txt"
    file_path = os.path.join(upload_dir, transcript_filename)
    save_transcript_as_txt(transcript_text, file_path)
    return file_path

@app.post("/chat")
def chat_endpoint(req: ChatRequest):
    global retriever, qa_chain, memory, last_used_id

    # Reset memory and chain if ID has changed
    if req.id and req.id != last_used_id:
        memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
        retriever = None
        qa_chain = None
        last_used_id = req.id

    # If retriever not set, initialize it from static ID or video URL
    if req.video_url and not retriever:
        transcript = get_video_transcript(req.video_url)
        if "Error:" in transcript:
            return {"response": transcript}
        transcript_path = save_transcript_in_uploads(req.video_url, transcript)
        retriever, _ = initialize_retrieval(transcript_path)

    elif req.id and not retriever:
        if req.id in STATIC_TRANSCRIPTS:
            transcript_path = STATIC_TRANSCRIPTS[req.id]
            retriever, _ = initialize_retrieval(transcript_path)
        else:
            return {"response": "❌ Unknown dashboard ID or missing transcript."}

    if not retriever:
        return {"response": "❌ No transcript loaded. Provide video_url or valid id."}

    # ✅ Build the qa_chain only once
    if qa_chain is None:
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
            llm=ChatOpenAI(model_name="gpt-4o", openai_api_key=os.getenv("OPENAI_API_KEY")),
            retriever=retriever,
            memory=memory,
            combine_docs_chain_kwargs={"prompt": prompt_template}
        )

    # ✅ Call the persistent chain (with built-in memory)
    response = qa_chain.invoke({"question": req.message})
    chat_history.append({"question": req.message, "answer": response["answer"]})
    return {"response": response["answer"]}