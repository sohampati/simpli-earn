import os
import time
from datetime import datetime
from transcript_retrieval import get_video_transcript, save_transcript_as_txt
from langchain_testing import initialize_retrieval, get_chat_response
from langchain.memory import ConversationBufferMemory

# Define the uploads directory (same as Streamlit)
UPLOADS_DIR = "uploads"

# Persistent chat history storage
chat_history = []

def save_transcript_in_uploads(video_url, transcript_text):
    """Save transcript to the uploads folder with a timestamped filename."""
    today = datetime.now().strftime("%Y-%m-%d")
    upload_dir = os.path.join(UPLOADS_DIR, today)
    os.makedirs(upload_dir, exist_ok=True)  # Ensure today's folder exists

    timestamp = datetime.now().strftime("%H-%M-%S")
    transcript_filename = f"youtube_transcript_{timestamp}.txt"
    file_path = os.path.join(upload_dir, transcript_filename)

    save_transcript_as_txt(transcript_text, file_path)
    return file_path

def main():
    print("🎥 Enter a YouTube video URL:")
    video_url = input("> ").strip()

    if not video_url.startswith("https://www.youtube.com/watch?v="):
        print("❌ Invalid YouTube URL. Please enter a valid link.")
        return

    print("⏳ Fetching transcript...")

    # Fetch transcript
    transcript_text = get_video_transcript(video_url)
    if "Error:" in transcript_text:
        print("❌ Failed to fetch transcript. Try another video.")
        return

    # Save transcript in the uploads folder
    transcript_path = save_transcript_in_uploads(video_url, transcript_text)
    print(f"✅ Transcript saved as `{transcript_path}`.")

    # Initialize retriever and memory
    retriever, _ = initialize_retrieval(transcript_path)
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

    print("\n💬 Chatbot initialized! Start asking questions.")
    print("Type `exit` to quit.\n")

    # Chat loop
    while True:
        user_input = input("You: ").strip()
        if user_input.lower() == "exit":
            print("👋 Goodbye!")
            break
        
        # Get response from chatbot
        response = get_chat_response(user_input, retriever, memory)

        # Store chat history
        chat_history.append({"question": user_input, "answer": response})

        print(f"🤖 AI: {response}\n")

if __name__ == "__main__":
    main()
