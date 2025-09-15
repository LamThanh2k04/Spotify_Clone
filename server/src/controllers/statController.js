import Albums from "../models/albumModel.js";
import Songs from "../models/songModel.js";
import Users from "../models/userModel.js";


export const getAllStats = async (req, res) => {
    try {
        const [totalSongs, totalAlbums, totalUsers,] = await Promise.all([
            Songs.countDocuments(),
            Albums.countDocuments(),
            Users.countDocuments(),
        ]);
    
        const artistResult = await Songs.aggregate([
            {
              $unionWith: {
                coll: 'albums',
                pipeline: []
              }
            },
            {
              $group: {
                _id: '$artist',
              }
            },
            {
              $count: 'count'
            }
          ]);
          
          res.status(200).json({
            totalSongs,
            totalAlbums,
            totalUsers,
            totalArtist: artistResult[0]?.count || 0,
          })
          
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}