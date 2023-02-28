import { S3 } from 'aws-sdk'

export async function getImage (event, context) {
    const s3 = new S3({
        region: 'ap-northeast-1'
    })
    const params = {
        Bucket: 'aws-lambda-images-418581597558',
        Key: 'fortutorial.jpg',
    };
    const data = s3.getObject(params).promise()
    // s3.getObject(params, function(err, data) {
    //   if (err) console.log(err, err.stack); // an error occurred
    //   else     console.log(data);           // successful response
    // });
    // const data = await s3.getObject(params).promise();
    return data.body
}