# Discord Voice Channel Content Moderator Bot

Inspiration: 
Utilizing Discord voice channels over quarantine to connect with other friends and acquaintances over quarantine, we were often exposed to toxic and heated language that ruined the mood of the call. To automate this moderation, we created a voice moderation bot that plays shrill audio to stop any toxic language from escalating. 

Project Overview:
This bot monitors voice activity on a Discord voice channel and when the bot recognizes certain preset words being said, it triggers a command to play a shrill audio file. 

How we Built it:
Uses the discord.js API that makes an audio stream of talking members in the voice channel. This audio stream is then sent to the Google speech to text API, which checks for certain keywords (typically vulgar language). If the text matches up with any of the keywords, the audio file is triggered. 

Challenges we Ran Into:
We had trouble to configure the audio into an acceptable format for the Google API to read. Additionally, we had trouble finding and learning the discord.js documentation, which once we understood, allowed us to progress through the project at a much faster pace. Another challenge we ran into was utilizing GitHub to make push and pull requests. For example, some members of our team were unable to make push requests, while some lost all their code. 

Accomplishments that we are Proud of:
This was our first time coding a big project, and we were proud of the fact that we were able to learn a new skill utilizing the discord API as well as working with the Google text to speech API. We were proud to be able to create something of our own that answered a specific problem that we faced ourselves. 

What we Learned:
We became more familiar with Github, JavaScript, and the use of multiple APIs.

Future:
For the future of our project, we want to be able to give the user of the bot (the person who calls the bot into the channel), an ability to either continue to search for certain keywords or input a list of words that the moderation bot is guarding against being said. 
