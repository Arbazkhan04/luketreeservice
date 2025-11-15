const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, UpdateCommand, ScanCommand  } = require('@aws-sdk/lib-dynamodb');
const { v4: uuidv4 } = require('uuid');

const LANDING_IMAGES_TABLE = process.env.LANDING_IMAGES_TABLE;
const S3_BUCKET = process.env.S3_BUCKET;

const s3 = new S3Client();
const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST - Upload a single landing image (auto-generate imageId)
const createLandingImage = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) return res.status(500).json({ error: err.message });

    try {
      const { index } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: 'Image file is required' });
      }

      const indexValue = Number(index);
      if (isNaN(indexValue) || indexValue < 0 || indexValue > 3) {
        return res.status(400).json({ error: 'index must be 0, 1, 2, or 3' });
      }

      const imageId = uuidv4();
      const imageName = `${imageId}-${indexValue}-${uuidv4()}.jpg`;
      const imageUrl = `https://${S3_BUCKET}.s3.amazonaws.com/${imageName}`;

      await s3.send(new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: imageName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      }));

      const timestamp = Date.now();
      const params = {
        TableName: LANDING_IMAGES_TABLE,
        Item: {
          imageId,
          index: indexValue,
          imageUrl,
          createdAt: timestamp,
          updatedAt: timestamp,
        },
      };

      await docClient.send(new PutCommand(params));

      res.json({
        message: 'Landing image uploaded successfully',
        imageId,
        index: indexValue,
        imageUrl,
      });

    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: error.message });
    }
  });
};


// GET - Fetch all landing images
const getLandingImages = async (req, res) => {
  try {
    const params = { TableName: LANDING_IMAGES_TABLE };
    const data = await docClient.send(new ScanCommand(params));

    // Sort images by index (0,1,2) for consistency
    const sortedImages = data.Items?.sort((a, b) => (a.index ?? 0) - (b.index ?? 0)) || [];

    res.json({
      message: 'Landing images retrieved successfully',
      count: sortedImages.length,
      items: sortedImages,
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST - Update an existing image (based on imageId only)
const updateLandingImage = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) return res.status(500).json({ error: err.message });

    try {
      const { imageId } = req.body;

      if (!req.file) return res.status(400).json({ error: 'Image file is required' });
      if (!imageId || typeof imageId !== 'string' || !imageId.trim()) {
        return res.status(400).json({ error: 'imageId is required and must be a string' });
      }

      const imageName = `${imageId}-${uuidv4()}.jpg`;
      const imageUrl = `https://${S3_BUCKET}.s3.amazonaws.com/${imageName}`;

      // Upload to S3
      await s3.send(new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: imageName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      }));

      // Update DynamoDB record
      const params = {
        TableName: LANDING_IMAGES_TABLE,
        Key: { imageId },
        UpdateExpression: 'SET imageUrl = :imageUrl, updatedAt = :updatedAt',
        ExpressionAttributeValues: {
          ':imageUrl': imageUrl,
          ':updatedAt': Date.now(),
        },
        ReturnValues: 'ALL_NEW',
      };

      const result = await docClient.send(new UpdateCommand(params));

      res.json({
        message: 'Landing image updated successfully',
        updatedItem: result.Attributes,
      });
    } catch (error) {
      console.error('Error updating image:', error);
      res.status(500).json({ error: error.message });
    }
  });
};


module.exports = {
  createLandingImage,
  updateLandingImage,
  getLandingImages
};
