
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand, PutCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const generateToken = require('../utlis/generateToken')

const USER_TABLE = process.env.USER_TABLE;
const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);


// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // check if user exist in dyanmodb Table
    const params = {
        TableName: USER_TABLE,
        FilterExpression: 'email = :email',
        ExpressionAttributeValues: {
            ':email': email,
        },
    };
    try {
        const data = await docClient.send(new ScanCommand(params));
        if (data.Items.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const user = data.Items[0];
        //check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (user && isMatch) {
            generateToken(res, user.userId);
            res.status(200).json({ message: 'User authenticated successfully' });
        }
        else {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const registerUser = async (req, res) => {
   
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if a user already exists
    const params = {
        TableName: USER_TABLE,
    };

    try {
        const data = await docClient.send(new ScanCommand(params));
        if (data.Items.length > 0) {
            return res.status(400).json({ message: 'A user already exists. Registration is limited to one user.' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = {
            userId: uuidv4(),
            email,
            password: hashedPassword,
        };

        const putParams = {
            TableName: USER_TABLE,
            Item: user,
        };


        await docClient.send(new PutCommand(putParams));
        //generate token
        generateToken(res, user.userId);
        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        res.status(500).json({ error: `could not regiester user `, message: error.message });
    }
};

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });

};

module.exports = {
    authUser,
    registerUser,
    logoutUser
}