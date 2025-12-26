

//Get all pending flats

import { prismaClient } from "../routes/index.js"

export const getPendingFlatsController = async(req,res) =>{
    try {
        const flats = await prismaClient.flat.findMany({
            where:{status:"pending"},
            orderBy:{created_at:"desc"},
            include:{owner:{select:{id:true, name:true, email:true, address:true, phoneNo:true}}}
        })
        return res.status(200).json({message:"Sucessfully fetch all pending flats",flats})
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }
}

// Approve Flat
export const approveFlatController = async(req,res) =>{
    try {
        const flatId = Number(req.params.id)
        const flat = await prismaClient.flat.update({
            where:{id:flatId},
            data:{status:"approved"}
        })
        return res.status(200).json({message:"Flat Approved Sucessfully",flat})
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }
}

// Reject Flat

export const rejectFlatController = async(req,res) =>{
    try {
        const flatId = Number(req.params.id)
        const flat = await prismaClient.flat.update({
            where:{id:flatId},
            data:{status:"rejected"}
        })
        return res.status(200).json({message:"Flat Rejected Sucessfully",flat})
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }
}

//Get all sold flats

export const getSoldFlatsController = async(req,res)=>{
    try {
        const flat = await prismaClient.flat.findMany({
            where:{status:"sold"},
            orderBy:{sold_date:"desc"},
            include:{
                owner:{select:{id:true, name:true, email:true, address:true, phoneNo:true}},
                soldTo:{select:{id:true, name:true, email:true, address:true, phoneNo:true}}
            }
        })

        return res.status(200).json({message:"Sucessfully Fetched Sold Flats",flat})
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }
}