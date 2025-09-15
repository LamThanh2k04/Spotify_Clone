import Users from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    try {
        console.log(req.body);
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const imageURL = req.file ? req.file.path : "";
        console.log(req.file );

        const newUser = new Users({
            fullName: `${firstName} ${lastName}`,
            email,
            password: hashedPassword,
            imageURL,
        });

        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRETTT,
            { expiresIn: '1h' }
        );

        res.status(201).json({ token, user: newUser });
    } catch (error) {
        console.error("Error in register:", error);
        res.status(500).json({ message: "Server error" });
    }
};



export const login = async (req, res) => {
    try {
        const {email,password} = req.body;
        console.log(req.body);
    const user = await Users.findOne({email});
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id, role : user.role }, process.env.JWT_SECRETTT, { expiresIn: "1h" });
    res.status(200).json({ token,user});
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: "Server error" });
        
    }
};
    