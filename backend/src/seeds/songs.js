import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { config } from "dotenv";

config();

// List of songs with titles, artist, imageUrl, etc

const songs = [
  {
    title: "love.",
    artist: "wave to earth",
    imageUrl: "/cover-images/01flawsandall.jpg",
    audioUrl: "/songs/love.mp3",
    duration: 210,
  },
  {
    title: "homesick",
    artist: "wave to earth",
    imageUrl: "/cover-images/01flawsandall.jpg",
    audioUrl: "/songs/homesick.mp3",
    duration: 208,
  },
  {
    title: "bad",
    artist: "wave to earth",
    imageUrl: "/cover-images/01flawsandall.jpg",
    audioUrl: "/songs/bad.mp3",
    duration: 205,
  },
  {
    title: "peach eyes",
    artist: "wave to earth",
    imageUrl: "/cover-images/01flawsandall.jpg",
    audioUrl: "/songs/peacheyes.mp3",
    duration: 215,
  },

  // — Frank Ocean — album: blonde
  {
    title: "Nikes",
    artist: "Frank Ocean",
    imageUrl: "/cover-images/blonde.jpg",
    audioUrl: "/songs/nikes.mp3",
    duration: 317,
  },
  {
    title: "Pink + White",
    artist: "Frank Ocean",
    imageUrl: "/cover-images/blonde.jpg",
    audioUrl: "/songs/pinkwhite.mp3",
    duration: 184,
  },
  {
    title: "Self Control",
    artist: "Frank Ocean",
    imageUrl: "/cover-images/blonde.jpg",
    audioUrl: "/songs/selfcontrol.mp3",
    duration: 254,
  },

  // — NewJeans — covers: Newjeans (general), OMG (single)
  {
    title: "Hype Boy",
    artist: "NewJeans",
    imageUrl: "/cover-images/Newjeans.jpg",
    audioUrl: "/songs/hypeboy.mp3",
    duration: 178,
  },
  {
    title: "OMG",
    artist: "NewJeans",
    imageUrl: "/cover-images/OMG.jpg",
    audioUrl: "/songs/omg.mp3",
    duration: 212,
  },
  {
    title: "Ditto",
    artist: "NewJeans",
    imageUrl: "/cover-images/Ditto.jpg",
    audioUrl: "/songs/ditto.mp3",
    duration: 188,
  },
  {
    title: "Attention",
    artist: "NewJeans",
    imageUrl: "/cover-images/Newjeans.jpg",
    audioUrl: "/songs/attention.mp3",
    duration: 188,
  },

  // — Beaches (single)
  {
    title: "Beaches",
    artist: "beabadoobee",
    imageUrl: "/cover-images/beaches.jpg",
    audioUrl: "/songs/beaches.mp3",
    duration: 200,
  },
];

const seedSongs = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		// Clear existing songs
		await Song.deleteMany({});

		// Insert new songs
		await Song.insertMany(songs);

		console.log("Songs seeded successfully!");
	} catch (error) {
		console.error("Error seeding songs:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedSongs();