import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getAllEnquiriesController, getSellerEnquiriesController, getUserEnquiriesController, sendEnquiryController } from "../controllers/enquiryController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const enquiryRouter = express.Router();

//User
enquiryRouter.post('/sendEnquiry',authMiddleware,sendEnquiryController)
enquiryRouter.get('/getEnquiry',authMiddleware,getUserEnquiriesController)
enquiryRouter.get("/flats/received", authMiddleware, getSellerEnquiriesController);

//Admin
enquiryRouter.get('/getAllEnquiry',adminMiddleware,getAllEnquiriesController)

export default enquiryRouter;