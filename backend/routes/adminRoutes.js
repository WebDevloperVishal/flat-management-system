import express from "express"
import { approveFlatController, getPendingFlatsController, getSoldFlatsController, rejectFlatController } from "../controllers/adminController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const adminRouter = express.Router();

adminRouter.get('/flats/pending',adminMiddleware,getPendingFlatsController)
adminRouter.put('/flats/:id/approve',adminMiddleware,approveFlatController)
adminRouter.put('/flats/:id/reject',adminMiddleware,rejectFlatController)
adminRouter.get('/flats/sold',adminMiddleware,getSoldFlatsController)

export default adminRouter;