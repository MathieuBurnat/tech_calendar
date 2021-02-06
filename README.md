# Tech' calendar - Version Alpha 0.3
## Description

Hey ! Welcome to the tech calendar. Also called tech diary ;3
This website is used to creates and shows calendar.

So, you will have abilities to create trimesters that contain weeks. You will be able to set these weeks specials. 
For example, you could create a vacance tag and apply it for weeks that you want.  

It'll also be possible to add modules into your weeks.
Modules, like tags, are totally configurable. The difference is that the tags will change the aspect of the week. While modules will be displayed as separated data next to the week. It's a speciality created for studients that whant shows their school themes. 

## Technical description
This project is using [vue client 3](https://v3.vuejs.org/) with [mongodb](https://www.mongodb.com/) as nosql database. 

We also use the api client [mongoose](https://mongoosejs.com/) to link mongo with our vue pages.

It's possible to obtain the project's progress via [trello](https://trello.com/b/3His3uPP/mytechcalendar). *(The trello's languagge is actually french because we are swiss' devs (^u ^).*

This project uses [the packet manager of node Js](https://www.npmjs.com/get-npm).

>Before we start, let's take few minutes to install our dev environement. 
# Requirements

First, you need to install [mong db server](https://www.mongodb.com/try/download/community). I also recommand to install [mongo shell](https://www.mongodb.com/try/download/shell) because it gives you loads of easy commands to connect / update / delete data from the db. If you need to search for a command you can look at this page : [mongo cheat sheet](https://gist.github.com/bradtraversy/f407d642bdc3b31681bc7e56d95485b6)

Note : With Windows, you could start the mongo-db as service.
```
net start MongoDB
```

This project uses [nodemon](https://www.npmjs.com/package/nodemon) that automatically restarts the application when a db's file is changed.

Let's install it !
```
npm install -g nodemon
```
### Execute api's db

```
nodemon
```


> With Windows, i recommand to close the terminal to reload it. (This action will avoid loading bugs...).

Now, we have a dev-environement that's ready to install and run our application ! :D

# Install the project

Clone the branch that you want to use.

Now go into the project and install the packages with :
```
npm install
```
or 

```
npm i
```

Finally, open two terminals in the project's path :

**Run Vue 3**
```
npm run serve
```
**Run Nodemon**
```
nodemon
```

Open the http adresse that Vue 3 gives you and... **have fun** !
