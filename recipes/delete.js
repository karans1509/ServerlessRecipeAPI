'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (event, context, callback) => {

    const params = {
        TableName: 'recipeTable',
        Key: {
            id: event.pathParameters.id
        }
    }
   dynamoDb.delete(params, (err) => {
       if(err) {
           console.error(err);
           callback(new Error('couldnt remove the recipe'));
           return;
       }

       const response = {
           statusCode: 200,
           body: JSON.stringify({ message: "Recipe removed" })
       };

       callback(null, response);
   })
}