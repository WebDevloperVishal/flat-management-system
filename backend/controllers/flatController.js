import { prismaClient } from "../routes/index.js";

export const createFlatController = async (req,res) =>{
    try {
        const userId = req.user.id;
        const {title, address, price, description, amenities} = req.body;

        if(!title || !address ||!price){
            return res.status(400).json({message:"Title,address and price are required"})
        }

        if(!req.files || req.files.length === 0){
             return res.status(400).json({message:"please upload at least one image"})
        }

        const baseUrl = `${req.protocol}://${req.get("host")}`;

        const images = req.files.map(f=>
            `${baseUrl}/uploads/${userId}/images/${f.filename}`
        )

        const flat = await prismaClient.flat.create({
            data:{
                user_id:userId,
                title,
                address,
                price:Number(price),
                description : description || "",
                images : images || [], //array of image urls
                amenities : amenities || [], //array of amenities ["Parking","Gym",many more]
                status:"pending"
            }
        })

        return res.status(201).json({
            message:"Flat Submitted Successfully",
            flat
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({message:"Something went wrong"})
    }
}

//Get all approved flats

export const getApprovedFlatsController = async(req,res)=>{
    try {
        const flats = await prismaClient.flat.findMany({
            where:{status:"approved"},
            orderBy:{created_at:"desc"},
            include:{
                owner:{ select: { id: true, name: true, email: true, address:true, phoneNo:true } }
            }
        })

        return res.status(200).json({message:"Fetch all approved flats",flats});
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }
}

//fetch loggedIn users flats

export const getUserFlatsController = async(req,res)=>{
  
        const userId = req.user.id;

        const flats = await prismaClient.flat.findMany({
            where:{user_id:userId},
            orderBy:{created_at:"desc"}
        })

        return res.status(200).json({message:"Fetch Flats Sucessfully",flats})
  
}

//mark flat as sold

export const markFlatSoldController= async(req,res)=>{
    try {
        const userId = req.user.id;
        const flatId = Number(req.params.id);
        const {sold_to_user_id} = req.body;

        const flat = await prismaClient.flat.findFirst({
            where:{id:flatId,user_id:userId}
        })

        if(!flat){
            return res.status(404).json({message:"Flat not found or you are not owner"})
        }

        if(flat.status === "sold"){
            return res.status(400).json({message:"Flat is already sold"})
        }

        const updatedFlat = await prismaClient.flat.update({
            where:{id:flatId},
            data:{
                status:"sold",
                sold_to_user_id:sold_to_user_id || null,
                sold_date : new Date()
            }
        })

        return res.status(200).json({
            message:"Flat marked as sold sucessfully",
            flat:updatedFlat
        })
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }
}