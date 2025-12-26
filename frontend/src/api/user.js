import axios from "axios";
import { getConfig } from "./axiosConfig.js";

const API = "http://localhost:5000/api"
//flats
export const createFlat = (flatData)=>{
    axios.post(`${API}/flat/createFlat`,flatData,getConfig())
}

export const getMyFlats = ()=>
    axios.get(`${API}/flat/getFlats`,getConfig())

export const getApprovedFlats = ()=>
    axios.get(`${API}/flat/getApprove`,getConfig())

export const createEnquiry = (flatId,message)=>
    axios.post(`${API}/enquiry/sendEnquiry`,{flat_id : flatId, message},getConfig())

export const getMyEnquiries = ()=>
    axios.get(`${API}/enquiry/getEnquiry`,getConfig())

export const getSellerSoldEnquiries = ()=>
    axios.get(`${API}/enquiry/flats/received`,getConfig())

export const markFlatSold = (flatId,buyerUserId)=>
    axios.put(`${API}/flat/${flatId}/sold`,{sold_to_user_id : Number(buyerUserId)},getConfig())

