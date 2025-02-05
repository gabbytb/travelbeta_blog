const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { randomUUID } = require("crypto");







// Signup Route
exports.createAccount = async (req, res) => {

    let randNum = await Math.floor(randomUUID % 23401);
    let id = await Math.floor(randNum % 998);

    const { username, password } = req.body;

    try {

        const user = new User({ 
            _id: randNum % id,
            email: username, 
            password 
        });
        const newUser = await user.save();

        const parsedNewUser = {
            id: newUser._id,
            username: newUser.email,
        };
        console.log("New User: ", parsedNewUser);

        const responseData = { 
            success: true, 
            data: parsedNewUser, 
            message: "User created!" 
        };
        res.status(201).json(responseData);

    } catch (error) {
        const errorResponse = { 
            success: false, 
            message: "Error creating user", 
            error 
        };
        res.status(400).json(errorResponse);
    };
};






// Login Route
exports.signIn = async (req, res) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: "User not found!" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials!" });

        const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ token });

    } catch (error) {
        res.status(400).json({ message: "Error logging in", error });
    };
};
