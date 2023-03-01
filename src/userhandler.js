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

export async function addCart(event, context) {
    const id = event.queryStringParameters.userId
    const  documentClient = new DynamoDB.DocumentClient({
        apiVersion: '2012-08-10',
        region: 'ap-northeast-1'
    })
    // const dynamodb = new DynamoDB({
    //     region: 'ap-northeast-1'
    // })
    
    const user = await documentClient.get({
        TableName: 'users',
        Key: {
            'id': id
        },
    }).promise()
    
    const currentCart = user.Item.userCarts
    
    const newItem = {
      "id": "10", //currentCart.Item.userCarts.slice(-1)[0].id + 1,
      "itemName": "フルーツジッパー",
      "rentalPeriod": 2,
      "price": 250,
      "itemImage": "/images/fes-image/fes-image5.jpg",
      "itemId": "5"
    }
    
    currentCart.push(newItem)
    
    const result = await documentClient.update({
        TableName: 'users',
        Key: {
            'id': id
        },
        ExpressionAttributeNames: {
           "#AT": "userCarts"
          }, 
        ExpressionAttributeValues: {
            ":t": currentCart
        }, 
        UpdateExpression: "SET #AT = :t",
        ReturnValues: 'ALL_NEW'
    }).promise()
    
    return result
}
