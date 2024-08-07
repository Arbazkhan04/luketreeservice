const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');
const { v4: uuidv4 } = require('uuid');

const REVIEW_TABLE = process.env.REVIEW_TABLE;
const S3_BUCKET = process.env.S3_BUCKET;

const s3 = new S3Client();
const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

const storage = multer.memoryStorage();
const upload = multer({ storage });

const createReview = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            console.error('Multer error:', err);
            return res.status(500).json({ error: err.message });
        }

        try {
            const { firstName, lastName, city, neighbourhoodName, ratting, status, socialMediaLink, review } = req.body;

            if (
                typeof firstName !== 'string' ||
                typeof lastName !== 'string' ||
                typeof city !== 'string' ||
                typeof neighbourhoodName !== 'string' ||
                typeof ratting !== 'string' ||
                typeof status !== 'string' ||
                typeof review !== 'string'
            ) {
                console.error('Validation error:', req.body);
                return res.status(400).json({ error: 'attributes must be string' });
            }

            const reviewId = uuidv4();
            const timestamp = new Date().toISOString();
            const imageName = `${reviewId}.jpg`;
            const imageUrl = `https://${S3_BUCKET}.s3.amazonaws.com/${imageName}`;

            // Upload image to S3
            await s3.send(new PutObjectCommand({
                Bucket: S3_BUCKET,
                Key: imageName,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
            }));

            // Save review to DynamoDB
            const params = {
                TableName: REVIEW_TABLE,
                Item: {
                    reviewId,
                    firstName,
                    lastName,
                    city,
                    neighbourhoodName,
                    socialMediaLink: socialMediaLink || '<empty>',
                    review,
                    ratting,
                    status,
                    imageUrl,
                    createdAt: timestamp,
                    updatedAt: timestamp,
                },
            };

            const command = new PutCommand(params);
            await docClient.send(command);
            res.json({ id: reviewId, message: 'data saved successfully', imageUrl });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
        }
    });
};

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
