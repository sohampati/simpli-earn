# README for the RAG Subteam

This is the code I (Neil) have so far and was demoed at the subteam meeting on Feb 26, 2025.

This file will detail the instructions to run my code on your end.

## Pre-run steps

This is for Windows, but Mac should be similar if not the same?

1. Clone this repository
2. Run pip install -r requirements.txt in your RAG folder directory of this repository
3. Make a .env file (it should literally be titled ".env") and add the API key (which is in the Drive, you can actually download that env [here](https://drive.google.com/drive/folders/1PewkV3oMKkaI7gKmTIMVl4BkM2Ne8tSq) - must be signed in to SimpliEarn Google account though. That file should have the API key)
   - Please check the billing (how much money we have left) [here](https://platform.openai.com/settings/organization/billing/overview) - this shouldn't drain that fast but you never know, try not to abuse it. Again you must be signed into the OpenAI billing platform with the SimpliEarn Google account.

## How to actually run and use the project

1. Type "streamlit run main.py" in your terminal
   - If you get any pip errors or package not found errors please let me know, the packages I put should be the same across MacOS and Windows but I'm not 100% sure, as I did face problems with someone when working on a recent project with them
2. The UI is very intuitive to use. Just upload a transcript file - you can do this by copying a transcript from Seeking Alpha into a blank txt and uploading that
3. Experiment and try to break it, any changes to the prompt or any major code changes should ideally be discussed before directly committing
