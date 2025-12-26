import React, { useEffect, useState } from 'react'
import { getSellerSoldEnquiries, markFlatSold } from '../../api/user';
import EnquiriesReceived from '../../components/EnquiriesReceived';

const EnquiriesForMyFlat = () => {
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    const [flatId, setFlatId] = useState(null);
  
    const loadingAllUserFlatsEnquiries = async () => {
      setErr(null);
      setLoading(true);
      try {
        const { data } = await getSellerSoldEnquiries();
        setResponse(data.enquiries);
      } catch (err) {
        setErr("Error to fetch enquiries", err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(()=>{
      loadingAllUserFlatsEnquiries();
    },[])

    const onSold = async (enq) =>{
      const buyerId = enq.buyer_id;
      const flatId = enq.flat_id;

      const ok = window.confirm(
        `Sell flat #${flatId} to ${enq.buyer.name} ${enq.buyer.email}`
      )

      if(!ok) return;

      try {
        setFlatId(enq.id)
        await markFlatSold(flatId,buyerId);
        setResponse((list)=> list.filter((x)=> x.id !== enq.id))
        alert("Marked as Sold")
      } catch (err) {
        alert("Failed to mark as fold",err)
      }finally{
        setFlatId(null)
      }
    }

    if(loading) return <p>loading enquiries...</p>
    if(err) return <p className='text-red-600'>{err}</p>
   
  return (
    <>
      <div>
         <div>
             <h2 className='text-xl font-bold px-3 py-1'>My Enquiries for My Flats</h2>
             <EnquiriesReceived
             items={response}
             onSold={onSold}
             flatId={flatId}
             />
         </div>

      </div>
    </>
  )
}

export default EnquiriesForMyFlat
