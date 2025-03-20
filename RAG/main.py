import streamlit as st
from langchain_testing import initialize_retrieval, get_chat_response, summarize_document
from langchain.memory import ConversationBufferMemory
import os
from datetime import datetime
import time

# User & AI icons
user_icon = "https://cdn-icons-png.flaticon.com/512/1154/1154448.png"
ai_icon = "https://cdn-icons-png.flaticon.com/512/4712/4712038.png"

# App title
st.title('📊 SimpliEarn RAG Earnings Call Chatbot')

st.subheader("Upload a .txt file of a transcript to ask questions about it!")

def save_uploaded_file(uploaded_file):
    """Saves the uploaded file with timestamp in a date-based directory."""
    # Create directory for today's uploads
    today = datetime.now().strftime("%Y-%m-%d")
    upload_dir = os.path.join("uploads", today)
    os.makedirs(upload_dir, exist_ok=True)

    # Generate a filename with timestamp
    timestamp = datetime.now().strftime("%H-%M-%S")
    original_name = os.path.splitext(uploaded_file.name)[0]
    extension = os.path.splitext(uploaded_file.name)[1]

    new_filename = f"{original_name}_{timestamp}{extension}"
    file_path = os.path.join(upload_dir, new_filename)

    # Save file
    with open(file_path, "wb") as f:
        f.write(uploaded_file.getbuffer())

    return file_path, new_filename, upload_dir

# File Upload
uploaded_file = st.file_uploader("📂 Choose a .txt file", type=["txt"])

# Detect file reupload and reset state
if uploaded_file is not None:
    if (
        "uploaded_file_name" not in st.session_state
        or st.session_state.uploaded_file_name != uploaded_file.name
    ):
        # Save file to directory
        file_path, new_filename, upload_dir = save_uploaded_file(uploaded_file)

        # Clear session state for new file
        st.session_state.clear()

        # Store metadata in session state
        st.session_state.uploaded_file_name = uploaded_file.name
        st.session_state.uploaded_file_path = file_path
        st.session_state.uploaded_directory = upload_dir

        st.success(f"📂 File uploaded as `{new_filename}` in `{upload_dir}`")
        loading_message = st.empty()
        loading_message.info("⏳ Generating document summary...")

        summary_placeholder = st.empty()  # Placeholder for live stream summary
        summary_placeholder.subheader("📄 Document Summary:")

        summary_text = ""
        for chunk in summarize_document(file_path):
            summary_text += chunk
            summary_placeholder.markdown(f"```\n{summary_text}\n```")
            time.sleep(0.05)  # Small delay for smooth streaming

        summary_placeholder.empty()
        # Store the summary in session state
        st.session_state.summary = summary_text
        loading_message.empty()
        st.success("✅ Document summary completed! Start chatting below.")
        
        # 🟡 Step 3: Initialize retriever and memory
        retriever, _ = initialize_retrieval(file_path)
        st.session_state.retriever = retriever
        st.session_state.memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
        st.session_state.chat_history = []

# Show stored summary if it exists (prevents regeneration on reruns)
if "summary" in st.session_state:
    st.subheader("📄 Document Summary:")
    st.write(st.session_state.summary)

# Ensure chat history is in session state
if "chat_history" not in st.session_state:
    st.session_state.chat_history = []

st.write("### 💬 Chat History:")
for entry in st.session_state.chat_history:
    st.markdown(
        f'''<img src="{user_icon}" width="24"/> <strong>You:</strong> {entry['question']}''',
        unsafe_allow_html=True
    )
    st.markdown(
        f'''<img src="{ai_icon}" width="24"/> <strong>AI:</strong> {entry['answer']}''',
        unsafe_allow_html=True
    )
    st.write("---")

user_input = st.chat_input("💬 Ask a question about the document...")

if user_input and "retriever" in st.session_state and "memory" in st.session_state:
    response = get_chat_response(user_input, st.session_state.retriever, st.session_state.memory)
    
    # Store chat history
    st.session_state.chat_history.append({"question": user_input, "answer": response})

    # Display current user/AI interaction immediately
    st.markdown(
        f'''<img src="{user_icon}" width="24"/> <strong>You:</strong> {user_input}''',
        unsafe_allow_html=True
    )
    st.markdown(
        f'''<img src="{ai_icon}" width="24"/> <strong>AI:</strong> {response}''',
        unsafe_allow_html=True
    )
    st.write("---")
    