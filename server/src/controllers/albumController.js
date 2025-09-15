import Albums from "../models/albumModel.js";


export const getAllAlbums = async (req, res) => {
    try {
        const albums = await Albums.find();
        res.status(200).json(albums);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}

export const getAlbumById = async (req, res) => {
    const { albumId} = req.params;
    try {
        const album = await Albums.findById(albumId).populate('songs');
        if (!album) {
            return res.status(404).json({ message: "Album not found" });
        }
        res.status(200).json(album);
    } catch (error) {
        
    }
}