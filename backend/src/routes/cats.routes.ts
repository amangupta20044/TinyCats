import express from "express";
import { createCatController, getAllCatsController, getSingleCatController, recommendCatsController, searchCatController } from "../controller/cat.controller.js";

const router = express.Router();

router.post('/create',createCatController)
router.get('/search/all',searchCatController)
router.get('/',getAllCatsController)
router.get('/:id',getSingleCatController)
router.post('/recommend',recommendCatsController);

export default router;