import { DynamoDB } from 'aws-sdk';

export async function getUserCart(event, context) {
    const id = event.queryStringParameters.userId
    
    const documentCliant = new DynamoDB.DocumentClient({
        apiVersion: '2012-08-10',
        region: "ap-northeast-1"
    })
    
    const result = await documentCliant.get({
        TableName: 'users',
        Key: {
            'id': id
        },
    }).promise()
    
    return result.Item.userCarts
}
