
import jwt from "jsonwebtoken";

export const verifyToken =  (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.log("🚫 Không có token");
        return res.status(401).json({ message: 'No token provided!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRETTT);
        console.log(process.env.JWT_SECRETTT)
        req.user = decoded;
        console.log("✅ Token decode thành công:", req.user); // <- thêm dòng này
        next();
    } catch (error) {
        console.log("❌ Token decode lỗi:", error.message);
        return res.status(401).json({ message: 'Unauthorized!' });
    }
}

