
import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { config } from "dotenv";

config();

const seedDatabase = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		// Clear existing data
		await Album.deleteMany({});
		await Song.deleteMany({});

		// First, create all songs
		const createdSongs = await Song.insertMany([
			// wave to earth — 01 flaws and all
			{
				title: "love.",
				artist: "wave to earth",
				imageUrl: "/cover-images/01flawsandall.jpg",
				audioUrl: "/songs/love.mp3",
				duration: 210,
				plays: Math.floor(Math.random() * 5000),
			},
			{
				title: "homesick",
				artist: "wave to earth",
				imageUrl: "/cover-images/01flawsandall.jpg",
				audioUrl: "/songs/homesick.mp3",
				duration: 208,
				plays: Math.floor(Math.random() * 5000),
			},
			{
				title: "bad",
				artist: "wave to earth",
				imageUrl: "/cover-images/01flawsandall.jpg",
				audioUrl: "/songs/bad.mp3",
				duration: 205,
				plays: Math.floor(Math.random() * 5000),
			},
			{
				title: "peach eyes",
				artist: "wave to earth",
				imageUrl: "/cover-images/01flawsandall.jpg",
				audioUrl: "/songs/peacheyes.mp3",
				duration: 215,
				plays: Math.floor(Math.random() * 5000),
			},

			// Frank Ocean — blonde
			{
				title: "Nikes",
				artist: "Frank Ocean",
				imageUrl: "/cover-images/blonde.jpg",
				audioUrl: "/songs/nikes.mp3",
				duration: 317,
				plays: Math.floor(Math.random() * 5000),
			},
			{
				title: "Pink + White",
				artist: "Frank Ocean",
				imageUrl: "/cover-images/blonde.jpg",
				audioUrl: "/songs/pinkwhite.mp3",
				duration: 184,
				plays: Math.floor(Math.random() * 5000),
			},
			{
				title: "Self Control",
				artist: "Frank Ocean",
				imageUrl: "/cover-images/blonde.jpg",
				audioUrl: "/songs/selfcontrol.mp3",
				duration: 254,
				plays: Math.floor(Math.random() * 5000),
			},

			// NewJeans
			{
				title: "Hype Boy",
				artist: "NewJeans",
				imageUrl: "/cover-images/Newjeans.jpg",
				audioUrl: "/songs/hypeboy.mp3",
				duration: 178,
				plays: Math.floor(Math.random() * 5000),
			},
			{
				title: "OMG",
				artist: "NewJeans",
				imageUrl: "/cover-images/OMG.jpg",
				audioUrl: "/songs/omg.mp3",
				duration: 212,
				plays: Math.floor(Math.random() * 5000),
			},
			{
				title: "Ditto",
				artist: "NewJeans",
				imageUrl: "/cover-images/Ditto.jpg", // keep if you actually have this file
				audioUrl: "/songs/ditto.mp3",
				duration: 188,
				plays: Math.floor(Math.random() * 5000),
			},
			{
				title: "Attention",
				artist: "NewJeans",
				imageUrl: "/cover-images/Newjeans.jpg",
				audioUrl: "/songs/attention.mp3",
				duration: 188,
				plays: Math.floor(Math.random() * 5000),
			},

			// beabadoobee — beaches (single)
			{
				title: "Beaches",
				artist: "beabadoobee",
				imageUrl: "/cover-images/beaches.jpg",
				audioUrl: "/songs/beaches.mp3",
				duration: 200,
				plays: Math.floor(Math.random() * 5000),
			},
			]);

		// Create albums with references to song IDs
		const albums = [
			{
				title: "01 flaws and all",
				artist: "wave to earth",
				imageUrl: "/albums/01flawsandall.jpg",
				releaseYear: 2023,
				songs: createdSongs.slice(0, 4).map(song => song._id),
			},
			{
				title: "blonde",
				artist: "Frank Ocean",
				imageUrl: "/albums/blonde.jpg",
				releaseYear: 2016,
				songs: createdSongs.slice(4, 7).map(song => song._id),
			},
			{
				title: "NewJeans",
				artist: "NewJeans",
				imageUrl: "/albums/Newjeans.jpg",
				releaseYear: 2023,
				songs: createdSongs.slice(7, 11).map(song => song._id),
			},
			{
				title: "This Is How Tomorrow Moves",
				artist: "beabadoobee",
				imageUrl: "/albums/beaches.jpg",
				releaseYear: 2023,
				songs: createdSongs.slice(11, 12).map(song => song._id),
			},
			];
		// Insert all albums
		const createdAlbums = await Album.insertMany(albums);

		// Update songs with their album references
		for (let i = 0; i < createdAlbums.length; i++) {
			const album = createdAlbums[i];
			const albumSongs = albums[i].songs;

			await Song.updateMany({ _id: { $in: albumSongs } }, { albumId: album._id });
		}

		console.log("Database seeded successfully!");
	} catch (error) {
		console.error("Error seeding database:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedDatabase();
