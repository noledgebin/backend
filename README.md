
# Backend


## Installation

Use [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install the packages

```bash
  npm i
```

    
## 2.Usage

First of all , download [MongoDB](https://www.mongodb.com/try/download/community) in your System
then run the server.js file
```bash
node start
```


## Demo

To use the backend without any frontend, we'll use [Postman](https://www.postman.com/downloads/) Application 

- For storing pastes _(no expiry time)_  in the db\
    Enter the URL http://localhost:3000/api/store and make sure its in post request \
    Since we are passing a json data , check out the `Body` and then check the `Raw` and then select `JSON`
    ![GIF here](https://imgur.com/DOJKRMT)

- For storing pastes _(with expiry time)_
    ![gif here]()
    For deleting a document automatically after reaching its expiry time , Mongodb has 
    TTL (Time to live) functionality .\
    For more info on [TTL](https://docs.mongodb.com/manual/tutorial/expire-data/)

    **Note** : It is not necessary that Mongodb would instantly delete the document on reaching the expiry time.
    It would take few seconds more (+ expiry time) for the document to be non-existent in the collection.
    For more 
    [info](https://stackoverflow.com/questions/18727743/mongodb-ttl-not-removing-documents)
- To retereve the paste from the database
    Enter the URL http://localhost:3000/api/:pasteID and make sure its in get request \
    So the mongodb would find the paste if it exists in the collection otherwise it'd return 
    `Paste Not Found`
