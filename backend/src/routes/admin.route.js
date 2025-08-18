// Routers are for different page 

import { Router } from "express";
import { createSong, deleteSong, createAlbum, deleteAlbum, checkAdmin} from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";


const router = Router()

// One place to implement for all, cleaner code
router.use(protectRoute, requireAdmin)

// Create functon in admin route, then write function in controller

router.get("/check", checkAdmin)

// Router.post for creating/submitting new data to server
router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);

router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);

export default router