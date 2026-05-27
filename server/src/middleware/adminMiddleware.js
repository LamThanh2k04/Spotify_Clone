
export const isAdmin = (req, res, next) => {
    console.log("🔐 isAdmin Middleware - req.user:", req.user);
    console.log("User role:", req.user.role);
    if(req.user.role !== 'admin') {
        return res.status(403).json({ message: "Forbidden" });
    }
    console.log("✅ Là admin, tiếp tục");
    next();
}