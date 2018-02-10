'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
    TableName: 'recipeTable'
}

module.exports.read = (event, context, callback) => {
    dynamoDb.scan(params, (err, result) => {
        if(err) {
            console.error(err);
            callback(new Error('couldnt get the recipes'));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Items)
        };
        callback(null, response);
    })
}