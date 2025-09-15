import Albums from "../models/albumModel.js";
import Songs from "../models/songModel.js";
export const createSong = async (req, res) => {
    try {
        const { title, artist, duration, albumId } = req.body;
        const imageURL = req.files?.imageFile?.[0]?.path || null;
        const audioURL = req.files?.audioFile?.[0]?.path || null;        

        const song = new Songs({
            title,
            artist,
            imageURL,
            audioURL,
            duration,
            albumId: albumId || null,  // Nếu không có albumId, gán là null
        });

        await song.save();

        if (albumId) {
            await Albums.findByIdAndUpdate(albumId, {
                $push: { songs: song._id }
            });
        }

        res.status(201).json({ message: "Song created successfully", song });
    } catch (error) {
        console.log('Error creating song:', error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const deleteSong = async (req, res) => {
    try {
        const { id } = req.params;
        const song = await Songs.findById(id);
        if (song.albumId) {
            await Albums.findByIdAndUpdate(song.albumId, {
                $pull: { songs: id }
            });
        }
        await Songs.findByIdAndDelete(id);
        res.status(200).json({ message: "Song deleted successfully" });
    } catch (error) {
        console.log('Error deleting song:', error);
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const createAlbum = async (req, res) => {
    try {
        const { title, artist, releaseYear } = req.body;
        const imageURL = req.file ? req.file.path : '';

        const newAlbum = new Albums({
            title,
            artist,
            imageURL,
            releaseYear,
           
        });
        await newAlbum.save();
        res.status(201).json({ message: "Album created successfully", newAlbum });
    } catch (error) {
        console.log('Error creating album:', error);
        res.status(500).json({ message: "Internal server error", error });
    }
}
export const deleteAlbum = async (req, res) => {
    try {
        const { id } = req.params;
        await Songs.deleteMany({ albumId: id });
        await Albums.findByIdAndDelete(id);
        res.status(200).json({ message: "Album deleted successfully" });
    } catch (error) {
        console.log('Error deleting album:', error);
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const checkAdmin = async (req, res) => {
    res.status(200).json({admin : true});
}