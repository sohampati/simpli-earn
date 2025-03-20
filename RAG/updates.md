# Version Updates for RAG Code

For any questions, please reach out on Slack/other preferred mode of communication

## Last Updated: March 20, 2025 (Neil)

- Added code to take in YouTube URL and generate transcript/summary using it
- Uses the YouTube transcription standard API (not that bad actually)
- Tried few runs on Coinbase/Alphabet transcripts and seems to work decently
- Need to reload if you want to try it on a new video, but this is just a Streamlit problem and should work fine on backend
- The user would have to start a new conversation anyway

## Feb 27, 2025 (Neil)

- Added main README and RAG README for installation instructions.
- Added requirements.txt (not sure if anything changes on MacOS in terms of libraries that need to be installed)
- Created this file! All updates should go in this file.
- Will try to store convo history in a JSON so it can be stored in some sort of database, where the user can look at it again.
