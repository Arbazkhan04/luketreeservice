const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient,GetCommand, ScanCommand,DeleteCommand ,PutCommand,UpdateCommand } = require('@aws-sdk/lib-dynamodb');
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

            return res.status(500).json({ error: err.message });
        }

        try {
            const { firstName, lastName, city, neighbourhoodName, ratting, status, socialMediaLink, review,indexsOfEmoji,totalNumberOfEmoji,isNextDoorReview} = req.body;

            if (
                typeof firstName !== 'string' ||
                typeof lastName !== 'string' ||
                typeof city !== 'string' ||
                typeof neighbourhoodName !== 'string' ||
                typeof ratting !== 'string' ||
                typeof status !== 'string' ||
                typeof review !== 'string' ||
                typeof indexsOfEmoji!=='string' || 
                typeof totalNumberOfEmoji!=='string' ||
                 typeof isNextDoorReview!=='string'
            ) {
                console.error('Validation error:', req.body);
                return res.status(400).json({ error: 'attributes must be string' });
            }

            const reviewId = uuidv4();
            // unix time in milliseconds
            const timestamp = new Date().getTime();

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
                    indexsOfEmoji:indexsOfEmoji || '<empty>',
                    totalNumberOfEmoji:totalNumberOfEmoji || '<empty>',
                    isNextDoorReview:isNextDoorReview || '0',
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

const getReviewById = async (req,res) => {
    const { reviewId } = req.params;

    if (typeof reviewId !== 'string') {
        res.status(400).json({ error: 'reviewId must be a string' });
        return;
    }

    const params = {
        TableName : REVIEW_TABLE,
        Key: {
            reviewId
        }
    };

    try {
        const command = new GetCommand(params);
        const response = await docClient.send(command);
        if (!response.Item) {
            res.status(404).json({ message: 'Review not found' });
            return;
        }
        res.json(response.Item);
    } catch (error) {
        res.status(500).json({messge:error.message});
    }
}

const updateReviewById = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const { reviewId } = req.params;
        const { firstName, lastName, city, neighbourhoodName, ratting, status, socialMediaLink, review, indexsOfEmoji, totalNumberOfEmoji, isNextDoorReview } = req.body;

        // Validate fields
        if (
            typeof reviewId !== 'string' ||
            typeof firstName !== 'string' ||
            typeof lastName !== 'string' ||
            typeof city !== 'string' ||
            typeof neighbourhoodName !== 'string' ||
            typeof ratting !== 'string' ||
            typeof status !== 'string' ||
            typeof review !== 'string' ||
            typeof indexsOfEmoji !== 'string' ||
            typeof totalNumberOfEmoji !== 'string' ||
            typeof isNextDoorReview !== 'string'
        ) {
            return res.status(400).json({ error: 'All attributes must be strings' });
        }

        let imageUrl;

        // Handle image upload if present
        if (req.file) {
            const imageName = `${reviewId}-${Date.now()}.jpg`;
            const uploadParams = {
                Bucket: S3_BUCKET,
                Key: imageName,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
            };

            try {
                await s3.send(new PutObjectCommand(uploadParams));
                imageUrl = `https://${S3_BUCKET}.s3.amazonaws.com/${imageName}`;
            } catch (error) {
                return res.status(500).json({ error: `Error uploading image: ${error.message}` });
            }
        }

        // Prepare DynamoDB update parameters
        let updateExpression = `
            SET firstName = :firstName,
                lastName = :lastName,
                city = :city,
                neighbourhoodName = :neighbourhoodName,
                ratting = :ratting,
                socialMediaLink = :socialMediaLink,
                review = :review,
                indexsOfEmoji = :indexsOfEmoji,
                totalNumberOfEmoji = :totalNumberOfEmoji,
                isNextDoorReview = :isNextDoorReview
        `;

        const expressionAttributeValues = {
            ':firstName': firstName,
            ':lastName': lastName,
            ':city': city,
            ':neighbourhoodName': neighbourhoodName,
            ':ratting': ratting,
            ':socialMediaLink': socialMediaLink || '<empty>',
            ':review': review,
            ':indexsOfEmoji': indexsOfEmoji,
            ':totalNumberOfEmoji': totalNumberOfEmoji,
            ':isNextDoorReview': isNextDoorReview,
        };

        if (imageUrl) {
            updateExpression += ', imageUrl = :imageUrl';
            expressionAttributeValues[':imageUrl'] = imageUrl;
        }

        // Update review in DynamoDB
        const params = {
            TableName: REVIEW_TABLE,
            Key: { reviewId },
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'ALL_NEW',
        };

        try {
            const command = new UpdateCommand(params);
            const response = await docClient.send(command);
            res.json(response.Attributes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
};



const publistBackReview = async (req,res) => {
    const {reviewId} = req.params;

    if(typeof reviewId !== 'string'){
        res.status(400).json({error:'reviewId must be a string'});
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
            ':status': "1",
        },
        ReturnValues: 'ALL_NEW'
    };

    try {
        const command = new UpdateCommand(params);
        const response = await docClient.send(command);
        res.json(response.Attributes);
    }
    catch(error){
        res.status(500).json({error:error.message});
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
            ':status': "0",
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

const updateReviewCreatedDate = async (req,res) => {
    const {reviewId} = req.params;

    if(typeof reviewId !== 'string'){
        res.status(500).json({error:`reviewId must be string`});
        return;
    }

    const {updatedDate} = req.body;

     if (typeof updatedDate !== 'number' || updatedDate <= 0) {
        res.status(500).json({ error: 'updatedDate must be a positive number representing a valid timestamp' });
        return;
    }

    const params = {
        TableName: REVIEW_TABLE,
        Key: {
            reviewId,
        },
        UpdateExpression: 'set updatedAt = :updatedDate',
        ExpressionAttributeValues: {
            ':updatedDate': updatedDate,
        },
        ReturnValues: 'UPDATED_NEW',
    };

    try {
        const command = new UpdateCommand(params);
        const response = await docClient.send(command);
        res.json(response.Attributes);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}


module.exports = {
    createReview,
    getAllReviews,
    deleteReview,
    updateReviewById,
    softDeleteReview,
    getReviewById,
    publistBackReview,
    updateReviewCreatedDate
}
