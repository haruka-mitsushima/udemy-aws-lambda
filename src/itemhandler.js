import { DynamoDB } from 'aws-sdk'

export async function getItems(event, context) {
    const dynamodb = new DynamoDB({
        region: 'ap-northeast-1'
    })
    const result = await dynamodb.scan({
        TableName: "items"
    }).promise()
    
    return result.Items
}