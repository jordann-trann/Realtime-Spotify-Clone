import { Router } from "express";
import { getAlbumByID, getAllAlbums } from "../controller/album.controller.js";

const router = Router()

router.get('/', getAllAlbums);
router.get("/:albumId", getAlbumByID)

export default router;