import { Router } from "express";
import indexCtrl from "../dao/DataBaseManager/index.controller.js";

const router = Router();
const {renderMain, renderReal} = indexCtrl

router.get('/', renderMain);
router.get('/renderReal', renderReal);


export default router