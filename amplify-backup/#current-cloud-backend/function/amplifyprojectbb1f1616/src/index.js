/* Amplify Params - DO NOT EDIT
    ENV
    REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    console.log(`Event Received",(event);
        return {
               statusCode: 200,
            body: JSON.stringify('Hello from Lambda!'),
        }

    // Parse the event for any specific action or parameters (e.g., from an API Gateway request)
    const { httpMethod, body } = event;
    const data = JSON.parse(body);

    let response;

    try {
        switch (httpMethod) {
            case 'POST': // Create
                response = await createItem(data);
                break;
            case 'GET': // Read
                response = await getItem(data.id);
                break;
            case 'PUT': // Update
                response = await updateItem(data);
                break;
            case 'DELETE': // Delete
                response = await deleteItem(data.id);
                break;
            default:
                response = { statusCode: 405, body: 'Method Not Allowed' };
        }
    } catch (error) {
        console.error(error);
        response = { statusCode: 500, body: JSON.stringify(error) };
    }

    // Return the response, with optional CORS headers if needed
    return {
        statusCode: response.statusCode || 200,
        headers: {
            "Access-Control-Allow-Origin": "*", // Enable CORS if needed
            "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify(response.body),
    };
};

// CRUD operation helper functions

const createItem = async (itemData) => {
    const params = {
        TableName: 'YourTableName', // Replace with your DynamoDB table name
        Item: itemData,
    };
    await dynamoDb.put(params).promise();
    return { statusCode: 201, body: 'Item created successfully' };
};

const getItem = async (id) => {
    const params = {
        TableName: 'YourTableName', // Replace with your DynamoDB table name
        Key: { id },
    };
    const result = await dynamoDb.get(params).promise();
    return { statusCode: 200, body: result.Item };
};

const updateItem = async (itemData) => {
    const params = {
        TableName: 'YourTableName', // Replace with your DynamoDB table name
        Key: { id: itemData.id },
        UpdateExpression: 'set #attrName = :attrValue', // Replace with actual attribute names and values
        ExpressionAttributeNames: { '#attrName': 'exampleAttribute' },
        ExpressionAttributeValues: { ':attrValue': itemData.exampleAttribute },
        ReturnValues: 'UPDATED_NEW',
    };
    const result = await dynamoDb.update(params).promise();
    return { statusCode: 200, body: result.Attributes };
};

const deleteItem = async (id) => {
    const params = {
        TableName: 'amplifyproject4e25a995-ItemsTable-dev', // Replace with your DynamoDB table name
        Key: { id },
    };
    await dynamoDb.delete(params).promise();
    return {statusCode: 200, body: 'Item deleted successfully' };
