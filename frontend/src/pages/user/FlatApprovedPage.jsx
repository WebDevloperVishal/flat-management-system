import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createEnquiry, getApprovedFlats } from '../../api/user';
import MarketFlatList from '../../components/MarketFlatList';

const FlatApprovedPage = () => {
    const [flats, setFlats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
  
    const loadingAllApprovedFlats = async () => {
      setErr(null);
      setLoading(true);
      try {
        const { data } = await getApprovedFlats();
        setFlats(data.flats);
        console.log(data.flats)
      } catch (err) {
        setErr("Error fetching all  Approved flats", err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(()=>{
      loadingAllApprovedFlats();
    },[])

    const handleEnquiry = async(flat)=>{
      const flatId = flat.id;
      const message = window.prompt("Enter your enquiry message:");
      if(!message?.trim()) return;
      try {
        await createEnquiry(flatId,message.trim());
        alert("Enquiry Sent Successfully")
      } catch (err) {
        console.error(err)
        alert("failed to send enquiry")
      }
    }

    if(loading) return <p>loading approved flats...</p>
    if(err) return <p className='text-red-600'>{err}</p>
   
  return (
    <>
      <div>
         <div className='flex items-center justify-between mb-3'>
             <h2 className='text-xl px-3 py-1'>Available Flats</h2>
             <Link className='border px-3 py-1 rounded' to="/user-dash/myflats/add">+ Add Flat</Link>
         </div>

         <MarketFlatList flats={flats} onEnquiry={handleEnquiry}/>
      </div>
    </>
  )
}

export default FlatApprovedPage
