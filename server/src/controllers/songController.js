import Songs from "../models/songModel.js";


export const getAllSongs = async (req, res) => {
    try {
        console.log("🤖 User gọi API:", req.user);
        const songs = await Songs.find().sort({ createdAt: -1 });
        res.status(200).json(songs);
    } catch (error) {
        console.error("Error fetching songs:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getFeaturedSongs = async (req, res) => {
   try {
    const songs = await Songs.aggregate([
        {
            $sample: {size: 6}
        },
        {
            $project: {
                _id : 1,
                title : 1,
                artist : 1,
                imageURL : 1,
                audioURL : 1,
            }
        },
    ])
    res.status(200).json(songs);
   } catch (error) {
    console.error("Error fetching featured songs:", error);
    res.status(500).json({ message: "Internal server error" });
   }
};

export const getMadeForYouSongs = async (req, res) => {
    try {
        const songs = await Songs.aggregate([
            {
                $sample: {size: 4}
            },
            {
                $project: {
                    _id : 1,
                    title : 1,
                    artist : 1,
                    imageURL : 1,
                    audioURL : 1,
                }
            },
        ])
        res.status(200).json(songs);
       } catch (error) {
        console.error("Error fetching featured songs:", error);
        res.status(500).json({ message: "Internal server error" });
       }
}

export const getTrendingSongs = async (req, res) => {
    try {
        const songs = await Songs.aggregate([
            {
                $sample: {size: 4}
            },
            {
                $project: {
                    _id : 1,
                    title : 1,
                    artist : 1,
                    imageURL : 1,
                    audioURL : 1,
                }
            },
        ])
        res.status(200).json(songs);
       } catch (error) {
        console.error("Error fetching featured songs:", error);
        res.status(500).json({ message: "Internal server error" });
       }
}


export const searchSongs = async (req, res) => {
    const { q } = req.query; // Chú ý đổi sang req.query
    try {
        const songs = await Songs.find({
            $or: [
                { title: { $regex: q, $options: "i" } },
                { artist: { $regex: q, $options: "i" } },
            ],
        }).limit(10);
        res.status(200).json(songs);
    } catch (error) {
        console.error("Error searching songs:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
