# <b>Discord Commando AI</b>
Welcome to Discord Commando AI repository!

We will go through on how this bot is built for and how to use it.

-----
> ## <b>What's in store?</b>
> - <b>Built-in Commando</b><br>
This bot has the package Commando installed, which is an add-on package to build commands.
You can get the package [here](https://github.com/discordjs/Commando).
> - <b>Among Us Command</b><br>
Since 2020, many played [Among Us](https://innersloth.com/gameAmongUs.php) and has been enjoying it a lot. This Commando command can help to make it easier to play Among Us with friends by creating a corresponding voice channel and deletes the channel when they are no longer used.
> - <b>Thanks Leaderboard and Thanks Command</b><br>
Sometimes, we need to thank people for helping us in some ways such as coding, educating or tutoring. These Commando commands sets a leaderboard of thanks and will display how many thanks a user has.
> - <b>Built-in Features</b><br>
There are about 7 features created to help develop this bot. These features can be useful to turn your server into an automated one.
> - <b>Suggestions</b><br>
In order to have a stable server for everyone, this Commando command helps to let you set a channel for suggestions and accept or deny suggestions from members.
> - <b>And so much more!</b><br>
You can look at the code to see more what this package can do for your bot. This README.file will be soon updated for more information.

----
## <b>How to set up your own bot using this package?</b>
You can set this up through the [config.json](./sources/config.json) file. I have already provided the examples to help you set your bot.

><b>Note:</b> When you open it, it should look like this:
>``` json
>{
>    "name": "<your_bot_name>",
>    "token": "<your_bot_token>",
>    "prefix": "^",
>    "clientId": "<bot_id>",
>    "ownerId": "<your_id>",
>    "mongoPath": "mongodb://<username>:<password>@<mongodb_server_ip>:27017/<database_name>",
>    "database": "<your_mongo_database>",
>    "language": "en"
>}
>```

Once you are done, make sure you are in the same directory as [package.json](./package.json), and type this:
```
npm start
```
If you do not want to both install the module and run the package, use this command:
```
npm run script
```
Once you are done, your bot is up and ready! Test it out on your server!

> You can help give feedbacks to me so that I can improve this package.
