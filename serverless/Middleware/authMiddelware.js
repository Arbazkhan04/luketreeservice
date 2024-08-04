const jwt = require('jsonwebtoken');
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");

const USER_TABLE = process.env.USER_TABLE;
const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

const protect = async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const params = {
        TableName: USER_TABLE,
        Key: {
          userId: decoded.userId,
        },
        ProjectionExpression: 'userId, email', // Select fields excluding password
      };

      const { Item: user } = await docClient.send(new GetCommand(params));

      if (!user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      req.user = user; // Attach user to the request object
      next();
    } catch (error) {
      console.error('Error in protect middleware:', error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};

module.exports = { protect };
