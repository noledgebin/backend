
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
    ![Sending Paste](https://user-images.githubusercontent.com/88343134/148198319-89873fa1-f217-4fe5-9b87-6ef3217ae875.gif)

***
- For storing pastes _(with expiry time)_
    
    For deleting a document automatically after reaching its expiry time , Mongodb has 
    TTL (Time to live) functionality .\
    For more info on [TTL](https://docs.mongodb.com/manual/tutorial/expire-data/)
    ![PasteWithExpiryDate](https://user-images.githubusercontent.com/88343134/148198554-1e18e511-65e7-49c2-abb1-467d1fde996c.gif)

    **Note** : It is not necessary that Mongodb would instantly delete the document on reaching the expiry time.
    It would take few seconds more (+ expiry time) for the document to be non-existent in the collection.
    For more 
    [info](https://stackoverflow.com/questions/18727743/mongodb-ttl-not-removing-documents)
    ***
- To retereve the paste from the database
    Enter the URL http://localhost:3000/api/:pasteID and make sure its in get request \
    So the mongodb would find the paste if it exists in the collection otherwise it'd return 
    `Paste Not Found`
    ![GettingPaste](https://user-images.githubusercontent.com/88343134/148198699-c6a69de0-e2ee-47bb-97e5-4f1dbe4a82ee.gif)\
    **A few moments later**\
    ![PasteExpired](https://user-images.githubusercontent.com/88343134/148198719-a78e05c5-1f1d-4f67-b279-c2022a88b933.gif)


