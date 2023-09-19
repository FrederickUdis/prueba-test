import express from "express";
import {requestValidator} from "../middlewares/requestMiddleware"
import {requestController} from "../controller/requestController"
import {toggleController} from "../controller/toggleController"
import {healthController} from "../controller/healthController";

const router = express.Router();

router.get('/toggle', toggleController)
router.get("/health", healthController);
router.get("/health/:service", healthController);
router.post('/insert', requestValidator, requestController)

export default router;
 