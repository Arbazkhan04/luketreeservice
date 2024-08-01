const {DynamoDBClient} = require('@aws-sdk/client-dynamodb')
const {DynamoDBDocumentClient,ScanCommand,PutCommand,UpdateCommand} = require('@aws-sdk/lib-dynamodb');
const {v4:uuidv4} = require('uuid');

const REVIEW_TABLE = process.env.REVIEW_TABLE;
const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);


const createReview = async (req,res) => {
    const {firstName,lastName,review} = req.body;

    if(typeof firstName!='string' || typeof lastName!='string' || typeof review!='string'){
        res.status(400).json({error:'attributes must be string'})
        return;
    }

    const reviewId = uuidv4(); //genertae unique reviewId

    const params = {
        TableName:REVIEW_TABLE,
        Item:{reviewId,firstName,lastName,review},
    }

    try {
        const command = new PutCommand(params);
        await docClient.send(command);
        res.json({id:reviewId,message:'data saved successfully'})
    } catch (error) {
        res.status(500).json({error:error.message})
    }


}

module.exports = {
    createReview,
}