# A bot for tracking all sorts of leagues in games

## Setup
To setup is rather simple:
1. Install Node.js
2. Download the repo
3. Run `npm install` in the folder
4. Copy `config.yml.example` and fill it out with the right details
5. Rename `config.yml.example` to `config.yml`
6. Run `npm start` and boom its online!

## IMPORTANT!
## Commands will not register globaly imediatly! They can take upto an hour due to discord CDN! More info bellow

This bot uses discord / commands which means it has to register them with discord, if you are doing this globaly they are cached and can take upto an hour to update across all users.
If you are really in a hurry and need them now set `JustGuildCommands` to true and also set the guild id for your server, this will register them imediatly just for that server, this does mean when your global commands register you will have duplicates.
