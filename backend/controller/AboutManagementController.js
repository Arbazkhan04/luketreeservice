const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand, PutCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require('uuid');

const ABOUT_TABLE = process.env.ABOUT_TABLE;
const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

const getAboutData = async (req, res) => {
  const params = {
    TableName: ABOUT_TABLE,
  };

  try {
    const command = new ScanCommand(params);
    const { Items } = await docClient.send(command);
    if (Items) {
      res.json({
        data: Items,
        message: 'Data found succesffuly'
      });
    } else {
      res.status(404).json({ error: 'No items found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Could not retrieve about",
      Message: error.message
    });
  }
};

const createAboutData = async (req, res) => {
  const { priceStartAt,about,phone } = req.body;

  if (typeof about !== "string" || typeof priceStartAt !== 'string' || typeof phone !=='string') {
    res.status(400).json({ error: '"attributes" must be a string' });
    return;
  }

  const aboutId = uuidv4();  // Generate a unique aboutId

  const params = {
    TableName: ABOUT_TABLE,
    Item: { aboutId,priceStartAt,about,phone },
  };

  try {
    const command = new PutCommand(params);
    await docClient.send(command);
    res.json({ data:params.Item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create about" });
  }
};


const updateAboutData = async (req, res) => {
  const aboutId = req.params.aboutId;

  const { priceStartAt,about,phone } = req.body;

  if (typeof about !== "string" || typeof priceStartAt !== 'string' || typeof phone !=='string') {
    res.status(400).json({ error: '"attributes" must be a string' });
    return;
  }

  const params = {
    TableName: ABOUT_TABLE,
    Key: { aboutId },
    UpdateExpression: "set priceStartAt = :priceStartAt, about = :about, phone = :phone",
    ExpressionAttributeValues: {
      ":priceStartAt":priceStartAt,
      ":about": about,
      ":phone": phone,
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const command = new UpdateCommand(params);
    const { Attributes } = await docClient.send(command);
    if (Attributes) {
      res.json({
        data: Attributes,
        message: 'Data updated successfully'
      });
    } else {
      res.status(404).json({ error: 'No item found to update' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Could not update about data",
      Message: error.message
    });
  }
};

module.exports = {
  getAboutData,
  createAboutData,
  updateAboutData,
};
