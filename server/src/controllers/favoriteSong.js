import Songs from "../models/songModel.js";
import Users from "../models/userModel.js";



export const addFavoriteSong = async (req, res) => {
    const {songId} = req.params;
    const userId = req.user.id;
    
    const user = await Users.findById(userId);

    if(user.favoriteSongs.includes(songId)){
        return res.status(400).json({message: "Song already in favorite list"});
    }
    user.favoriteSongs.push(songId);
    await user.save();

    res.status(200).json({message: "Song added to favorite list"});
}

export const removeFavoriteSong = async (req, res) => {
    const { songId } = req.params;
    const userId = req.user.id;
    
  
    const user = await Users.findById(userId);

    if (!user.favoriteSongs.includes(songId)) {
        return res.status(400).json({ message: "Song not in favorite list" });
    }

    user.favoriteSongs.pull(songId); 
    await user.save();

    res.status(200).json({ message: "Song removed from favorite list" });
};

