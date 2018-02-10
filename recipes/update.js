'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
    const data = JSON.parse(event.body);
    const timestamp = new Date().getTime();
    const params = {
        TableName: 'recipeTable',
        Item: {
            id: event.pathParameters.id,
            name: data.name,
            steps: data.steps,
            createdAt: timestamp
        }
    }

    dynamoDb.put(params, (err, result) => {
        if(err) {
            console.error(err);
            callback(new Error('couldnt update the recipe.'));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify({ message: "Recipe has been modified" })
        }

        callback(null, response);
    })
}