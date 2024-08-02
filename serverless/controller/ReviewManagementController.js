const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { DynamoDBDocumentClient, ScanCommand, PutCommand, UpdateCommand,DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { v4: uuidv4 } = require('uuid');

const REVIEW_TABLE = process.env.REVIEW_TABLE;
const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);


const createReview = async (req, res) => {
    const { firstName, lastName, city, neighbourhoodName, ratting, status, socialMediaLink, review } = req.body;

    if (typeof firstName != 'string' || typeof lastName != 'string' || typeof review != 'string' || typeof city != 'string' || typeof neighbourhoodName != 'string' || typeof ratting != 'string' || typeof status != 'string') {
        res.status(400).json({ error: 'attributes must be string' })
        return;
    }

    const reviewId = uuidv4(); //genertae unique reviewId
    const timestamp = new Date().toISOString(); // Get the current timestamp

    const params = {
        TableName: REVIEW_TABLE,
        Item: {
            reviewId,
            firstName,
            lastName,
            city,
            neighbourhoodName,
            socialMediaLink:socialMediaLink || '<empty>',  
            review,
            ratting,
            status,
            createdAt: timestamp,
            updatedAt: timestamp
        },

    }

    try {
        const command = new PutCommand(params);
        await docClient.send(command);
        res.json({ id: reviewId, message: 'data saved successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getAllReviews = async (req, res) => {
    try {
        const params = {
            TableName: REVIEW_TABLE,
        };

        const command = new ScanCommand(params);
        const response = await docClient.send(command);

        res.json(response.Items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteReview = async (req, res) => {
    const { reviewId } = req.params;

    if (typeof reviewId !== 'string') {
        res.status(400).json({ error: 'reviewId must be a string' });
        return;
    }

    const params = {
        TableName: REVIEW_TABLE,
        Key: {
            reviewId
        }
    };

    try {
        const command = new DeleteCommand(params);
        await docClient.send(command);
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateReviewById = async (req, res) => {
    const { reviewId } = req.params;
    const { firstName, lastName, city, neighbourhoodName, ratting, socialMediaLink, review } = req.body;

    if (typeof reviewId !== 'string') {
        res.status(400).json({ error: 'reviewId must be a string' });
        return;
    }

    if (typeof firstName !== 'string' || typeof lastName !== 'string' || typeof review !== 'string' || typeof city !== 'string' || typeof neighbourhoodName !== 'string' || typeof ratting !== 'string') {
        res.status(400).json({ error: 'attributes must be string' });
        return;
    }

    const timestamp = new Date().toISOString(); // Get the current timestamp

    const params = {
        TableName: REVIEW_TABLE,
        Key: {
            reviewId: reviewId
        },
        UpdateExpression: 'SET firstName = :firstName, lastName = :lastName, city = :city, neighbourhoodName = :neighbourhoodName, ratting = :ratting, socialMediaLink = :socialMediaLink, review = :review, updatedAt = :updatedAt',
        ExpressionAttributeValues: {
            ':firstName': firstName,
            ':lastName': lastName,
            ':city': city,
            ':neighbourhoodName': neighbourhoodName,
            ':ratting': ratting,
            ':socialMediaLink': socialMediaLink || '<empty>',
            ':review': review,
            ':updatedAt': timestamp
        },
        ReturnValues: 'ALL_NEW'
    };

    try {
        const command = new UpdateCommand(params);
        const response = await docClient.send(command);
        res.json(response.Attributes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const softDeleteReview = async (req, res) => {
    const { reviewId } = req.params;

    if (typeof reviewId !== 'string') {
        res.status(400).json({ error: 'reviewId must be a string' });
        return;
    }

    const params = {
        TableName: REVIEW_TABLE,
        Key: {
            reviewId
        },
        UpdateExpression: 'SET #status = :status',
        ExpressionAttributeNames: {
            '#status': 'status'
        },
        ExpressionAttributeValues: {
            ':status': 0,
        },
        ReturnValues: 'ALL_NEW'
    };

    try {
        const command = new UpdateCommand(params);
        const response = await docClient.send(command);
        res.json(response.Attributes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



module.exports = {
    createReview,
    getAllReviews,
    deleteReview,
    updateReviewById,
    softDeleteReview
}
