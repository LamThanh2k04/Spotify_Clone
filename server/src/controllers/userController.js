import mongoose from "mongoose";
import Users from "../models/userModel.js";
export const getUser = async (req, res) => {
  console.log("🔥 GET USER controller running");
  console.log("👤 req.user:", req.user); // <- log ra để chắc chắn nhận được từ middleware

  try {
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      console.log("❌ ID không hợp lệ");
      return res.status(400).json({ message: "ID không hợp lệ" });
    }

    const user = await Users.findById(req.user.id).populate('favoriteSongs');
    if (!user) {
      console.log("❌ Không tìm thấy user trong DB");
      return res.status(404).json({ message: "Không tìm thấy user" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("❌ Error in getUser:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
