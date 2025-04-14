# Simpli-Earn

## Git Practices
* Make a new branch for any feature addition formatted "initials/subteam/feature"
* Do not commit directly to main (even for small changes) so we can make sure the main branch remains error free. You should instead make a new branch off main, add the feature you are working on, and then open a pull request (and send it on Slack) so someone can review it
    * Sidenote: when you do this, you should git fetch & merge main into your local branch to make sure there aren't a lot of merge conflicts later on

Feel free to message Parth on Slack or text if you have any questions!

## General Info

As of April 3, 2025:

Additional frontend improvements to fix the footer and summary generation were made, but you can now enter a YouTube link on the main page and see the summary generation and use SimpliChat as normal.

The video embed is also dynamic now. The Sentiment Analysis graph currently has dummy data, but clicking on the graph points does bring the video to those actual times.

Stock Chart functionality is still a work in progress.

To run the frontend, you need to have `npm` (installing this should be easy through a quick Google search) and should run `npm install -i` in the `frontend` folder.

To run the API, instructions are located in the `RAG_README.md` file in the `RAG` folder.

For other subteams, please clone this repository/make a branch and make a new folder for your subteam's code to avoid merge conflicts.

(This can be changed as per further instructions)

## This file was last updated on April 3, 2025
