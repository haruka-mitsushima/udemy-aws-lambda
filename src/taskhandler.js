import { DynamoDB } from 'aws-sdk'
import crypto from 'crypto'

export async function updateTaskById(event, context) {
    const id = event.queryStringParameters.itemId
    const requestBody = JSON.parse(event.body)
    const dynamodb = new DynamoDB({
        region: 'ap-northeast-1'
    })
    
    const result = await dynamodb.updateItem({
        TableName: 'tasks',
        Key: {
            'id': {S: id}
        },
        ExpressionAttributeNames: {
           "#AT": "title"
          }, 
        ExpressionAttributeValues: {
            ":t": {
                S: requestBody.title
            }
        }, 
        UpdateExpression: "SET #AT = :t",
        ReturnValues: 'ALL_NEW'
    }).promise()
    
    return result
}

export async function deleteTaskById(event, context) {
    const id = event.queryStringParameters.itemId
    
    const dynamodb = new DynamoDB({
        region: 'ap-northeast-1'
    })
    
    const result = await dynamodb.deleteItem({
        TableName: 'tasks',
        Key: {
            'id': {S: id}
        },
    }).promise()
    
    return { message: `id: ${id} id deleted`}
}

export async function getTaskById(event, context) {
    const id = event.queryStringParameters.itemId
    const dynamodb = new DynamoDB({
        region: 'ap-northeast-1'
    })
    
    const result = await dynamodb.getItem({
        TableName: 'tasks',
        Key: {
            'id': {S: id}
        },
    }).promise()
    
    return result.Item
}

export async function list(event, context) {
    const dynamodb = new DynamoDB({
        region: 'ap-northeast-1'
    })
    
    const result = await dynamodb.scan({
        TableName: 'tasks'
    }).promise()
    
    const tasks = result.Items.map((item)=>{
        return {
            id: item.id.S,
            title: item.title.S
        }
    })
    
    return { tasks: tasks }
}

export async function post(event, context) {
    const requestBody = JSON.parse(event.body)
    
    const item ={
        id: { S: crypto.randomUUID() },
        title: { S: requestBody.title }
    }
    
    const dynamodb = new DynamoDB({
        region: 'ap-northeast-1'
    })
    
    await dynamodb.putItem({
        TableName: 'tasks',
        Item: item
    }).promise()
    
    return item
}