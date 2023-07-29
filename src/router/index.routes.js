import { Router } from "express";
import indexCtrl from "../controllers/index.controller.js";

const router = Router();
const {renderMain, renderReal} = indexCtrl

router.get('/', renderMain);
router.get('/main', renderReal);


export default router