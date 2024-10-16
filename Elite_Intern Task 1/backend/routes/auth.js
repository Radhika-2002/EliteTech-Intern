const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

//SIGN UP
router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        
        // Hash the password before saving it to the database
        const hashpassword = bcrypt.hashSync(password, 10); // Hash the password
        
        // Create the user object with the hashed password
        const user = new User({ email, username, password: hashpassword });
        
        // Save the user to the database
        await user.save();
        res.status(200).json({ message: "Sign up successful" });
    } catch (error) {
        res.status(400).json({ message: "User Already Exists" });
    }
});

//SIGN IN
router.post("/signin", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        
        if (!user) {
            return res.status(400).json({ message: "Pls sign up first" });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

        if (!isPasswordCorrect) {
            console.log("Provided password:", req.body.password); // Debug log
            return res.status(200).json({ message: "Password Is Not Correct" });
        }

        const { password, ...others } = user._doc;
        return res.status(200).json({ others });
    } catch (error) {
        return res.status(200).json({ message: "An error occurred during sign-in" });
    }
});


module.exports = router;