
//buyer sends enquiry

import { prismaClient } from "../routes/index.js";

export const sendEnquiryController = async(req,res) =>{
    try {
        const buyer_id = req.user.id;
        const {flat_id,message} = req.body;

        if(!flat_id || !message){
            return res.status(400).json({message:"Flat ID and message are required"});
        }

        //find flat
        const flat = await prismaClient.flat.findUnique({
            where:{id:flat_id}
        })

        if(!flat){
            return res.status(404).json({message:"Flat not found"});
        }

        const enquiry = await prismaClient.enquiry.create({
            data:{
                flat_id,
                buyer_id,
                seller_id : flat.user_id,
                message,
                status:"sent"
            }
        })

        return res.status(201).json({
            message:"Enquiry Created Sucessfully",
            enquiry
        })
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }
}

//Get all enquiries related to loggedIn User

export const getUserEnquiriesController = async(req,res)=>{
    try {
        const user_id = req.user.id;

        const enquiries = await prismaClient.enquiry.findMany({
            where:{
                buyer_id:user_id
            },
            orderBy:{created_at:"desc"},
            include:{
                flat:true,
                buyer:{select:{id:true,name:true,email:true, address:true, phoneNo:true}},
                seller:{select:{id:true,name:true,email:true, address:true, phoneNo:true}}
            }
        })

        return res.status(200).json({message:"Enquiries Fetch Successfully",enquiries})
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }
}

//Admin - Get all enquiries

export const getAllEnquiriesController = async(req,res)=>{
    try {
        const enquiries = await prismaClient.enquiry.findMany({
            orderBy:{created_at:"desc"},
            include:{
                flat:true,
                buyer:{select:{id:true,name:true,email:true, address:true, phoneNo:true}},
                seller:{select:{id:true,name:true,email:true, address:true, phoneNo:true}}
            }
        })

        return res.status(200).json({message:"All Enquiries Fetch Successfully",enquiries})

    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }
}

export const getSellerEnquiriesController = async (req, res) => {
  try {
    const userId = req.user.id;

    const enquiries = await prismaClient.enquiry.findMany({
      where: { seller_id: userId,
        status:'sent',
        flat:{status:{not:'sold'}}
       },
      orderBy: { created_at: "desc" },
      include: {
        flat: true,
        buyer:  { select: { id: true, name: true, email: true, address:true, phoneNo:true } },
        seller: { select: { id: true, name: true, email: true, address:true, phoneNo:true } }
      }
    });

    return res.status(200).json({ enquiries });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


