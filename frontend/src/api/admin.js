import axios from "axios";
import { getConfig } from "./axiosConfig.js";

const API = "http://localhost:5000/api"

export const getPendingFlats = ()=>
    axios.get(`${API}/admin/flats/pending`,getConfig())


export const approveFlat = (flatId)=>
    axios.put(`${API}/admin/flats/${flatId}/approve`,{},getConfig())

export const rejectFlat = (flatId)=>
    axios.put(`${API}/admin/flats/${flatId}/reject`,{},getConfig())

export const getApprovedFlatsAdmin = ()=>
    axios.get(`${API}/flat/getApprove`,getConfig())

export const getSoldFlats = ()=>
    axios.get(`${API}/admin/flats/sold`,getConfig())

export const getAllEnquiries = ()=>
    axios.get(`${API}/enquiry/getAllEnquiry`,getConfig())
