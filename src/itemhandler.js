import { DynamoDB } from 'aws-sdk'

export async function getItems(event, context) {
    const documentClient = new DynamoDB.DocumentClient({
        apiVersion: '2012-08-10',
        region: 'ap-northeast-1'
    })
    const result = await documentClient.scan({
        TableName: "items"
    }).promise()
    
    return result.Items
}