import express from "express"
import authRouter from "./authRoutes.js";
import { PrismaClient } from "@prisma/client";
import flatRouter from "./flatRoutes.js";
import enquiryRouter from "./enquiryRoutes.js";
import adminRouter from "./adminRoutes.js";

const rootRouter = express.Router();

rootRouter.use('/auth',authRouter)
rootRouter.use('/flat',flatRouter)
rootRouter.use('/enquiry',enquiryRouter)
rootRouter.use('/admin',adminRouter)

export const prismaClient = new PrismaClient({
    log:['query']
})

export default rootRouter;