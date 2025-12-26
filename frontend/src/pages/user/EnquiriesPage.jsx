import React, { useEffect, useState } from 'react'
import { getMyEnquiries } from '../../api/user';
import EnquiriesUser from '../../components/EnquiriesUser';

const EnquiriesPage = () => {
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
  
    const loadingAllUserEnquiries = async () => {
      setErr(null);
      setLoading(true);
      try {
        const { data } = await getMyEnquiries();
        setResponse(data.enquiries);
      } catch (err) {
        setErr("Error to fetch enquiries", err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(()=>{
      loadingAllUserEnquiries();
    },[])

    if(loading) return <p>loading enquiries...</p>
    if(err) return <p className='text-red-600'>{err}</p>
   
  return (
    <>
      <div>
         <div>
             <h2 className='text-xl px-3 py-1'>My Enquiries</h2>
             <EnquiriesUser items ={response}/>
         </div>

      </div>
    </>
  )
}

export default EnquiriesPage
