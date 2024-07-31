const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");

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
      res.json(Items);
    } else {
      res.status(404).json({ error: 'No items found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retrieve about" });
  }
};

const createAboutData = async (req, res) => {
  const { userId, name } = req.body;
  if (typeof userId !== "string") {
    res.status(400).json({ error: '"userId" must be a string' });
    return;
  } else if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
    return;
  }

  const params = {
    TableName: ABOUT_TABLE,
    Item: { userId, name },
  };

  try {
    const command = new PutCommand(params);
    await docClient.send(command);
    res.json({ userId, name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create user" });
  }
};

module.exports = {
  getAboutData,
  createAboutData,
};
