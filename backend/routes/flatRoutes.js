import express from "express"
import { createFlatController, getApprovedFlatsController, getUserFlatsController, markFlatSoldController } from "../controllers/flatController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import multer from "multer"
import path from "path"
import fs from "fs"
import { file } from "zod";


const flatRouter = express.Router();

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        const userId = req.user.id;

        const dir = path.join("uploads",String(userId),"images");
        fs.mkdirSync(dir,{recursive:true});
        cb(null,dir);
    }
    ,
    filename:(req,file,cb)=>{
        const ext = path.extname(file.originalname || "");
        const name = `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`;
        cb(null,name)
    }
})

const upload = multer({storage,limits:{fileSize:5*1024*1024}});

flatRouter.post('/createFlat',authMiddleware,upload.array("images",5),createFlatController)
flatRouter.get('/getApprove',getApprovedFlatsController)
flatRouter.get('/getFlats',authMiddleware,getUserFlatsController)
flatRouter.put('/:id/sold',authMiddleware,markFlatSoldController)

export default flatRouter;