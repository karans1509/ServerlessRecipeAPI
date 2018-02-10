
'use strict';
const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.create = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);
    const params = {
        TableName: 'recipeTable',
        Item: {
            id: uuid.v1(),
            name: data.name,
            steps: data.steps,
            createdAt: timestamp
        }
    }

    dynamoDb.put(params, (err, result) => {
        if(err) {
            console.error(err);
            callback(new Error("couldnt create recipe"));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify({ message: "Recipe has been added." }),
        }
        callback(null, response);
    })
}