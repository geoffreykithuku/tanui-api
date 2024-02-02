<!-- readme for the firebase functions api using firestore, cloud functions and express. testing via postman -->

## Introduction
This is a simple API that uses firebase functions, firestore and express to create a simple API. The API has the following endpoints:
- get /inventory - to get all the inventory
- get /inventory/:id - to get a single inventory item
- post /inventory - to add a new inventory item
- put /inventory/:id - to update an inventory item
- delete /inventory/:id - to delete an inventory item


## Prerequisites
- Node.js
- Firebase CLI
- Postman

## Getting Started
- Clone the repository
- cd into the functions directory
- Run `npm install` to install the dependencies
- Run `npm run serve` to start the local server
- Use postman to test the endpoints
- Follow the instructions generated on the terminal to use the local server

## Root path
- The root path is  `http://127.0.0.1:5001/tanui-api/us-central1/app`