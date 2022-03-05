# tracking-hours-bot

This is CLI app that you can include in your Mac to track your DCSL GS hours.

## How this works?

You have to clone the repository in any folder you want, and once you download it you have to create a `.env` file. In this file you have to complete this info:

```
USER_EMAIL=<YOUR_EMAIL>
USER_PASSWORD=<YOUR_PWD>
TRACKING_APP=<TRACKING_APP_URL>
```

Once you have this you need to install the dependencies:

```
npm install
```

## Available commands

Everytime we run a command we will receive an screenshot with the final result of the tracking hours.
We have these commands available:

### today

This command will update that day with a few parameters

- Project name
- Message
- Hours (Default. 8)

```
node index.js today "Project title" "Project description" 8
```

### week

This command will update monday with the info you register and copy that day to the rest of the week

- Project name
- Message
- Hours (Default. 8)

```
node index.js week "Project title" "Project description" 8
```

## Improve execution

In order to improve the execution you can create an alias in your terminal profiles (bashrc or zshrc). That will allow you to run the command in any folder.

```
track-hours today "Project title" "Project description"
```

```
track-hours week "Project title" "Project description" 8
```

You can run these commands to create an alias that will create that `track-hours` command.

```
pwd # to obtain the project path
echo '\nalias track-hours="node <COPY & PASTE previous command result>/index.js"' >> ~/.zshrc
```

*Note:* Depends on the bash profile you use you will have to use `zshrc` or another one.

Right now, this is the first version of the package. So improving execution and more commands will be done in future releases.