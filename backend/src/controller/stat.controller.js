import { Album } from "../models/album.model.js";
import { User } from "../models/user.model.js";
import { Song } from "../models/song.model.js";

export const getStats = async (req, res, next) => {
    try {
        const [totalSongs, totalAlbums, totalUsers, uniqueArtists] = await Promise.all([
            Song.countDocuments(),
            Album.countDocuments(),
            User.countDocuments(),

            Song.aggregate([                   // count distinct artists from songs
                { $group: { _id: "$artist" } },  // use the field, not the string
                { $count: "count" },
            ]),
            ]);

        res.status(200).json({
            totalAlbums,
            totalSongs,
            totalUsers,
            totalArtists: uniqueArtists[0]?.count || 0,
        })

    } catch (error) {
        next(error);
    } 
}