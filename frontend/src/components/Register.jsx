import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phoneNo,setPhoneNo] = useState("");
    const [address,setAddress] = useState("");
    const [pincode,setPincode] = useState("");

    const [response,setResponse] = useState(null);

    const handleRegister = async(e)=>{
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/api/auth/register',{
                name,email,password,pincode,address,phoneNo
            },{
                headers:{
                    "Content-Type":"application/json"
                }
            })

            const data = res.data;

            if(data.message === "User Registered Successfully"){
                setResponse(data.message)
                console.log(data.message)
                navigate('/login');
            }else if(data.message === "User already exists"){
                setResponse(data.message)
            }
        } catch (error) {
            console.error("Registration Failed",error)
        }
    }
  return (
    <>
      <div className='register'>
        <div className='flex flex-col justify-center items-center h-dvh'>
            <div className='border-2 rounded-2xl p-4'>
                <form onSubmit={handleRegister}>
                    <h1 className='font-bold text-4xl mb-3'>Register Page</h1>
                    <div className='flex flex-col'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' placeholder='Enter your name' id='name' name='name' value={name} onChange={(e)=>setName(e.target.value)}
                        className='border p-2 border-gray-400 rounded'/>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' placeholder='Enter your email' id='email' name='email' 
                        value={email} onChange={(e)=>setEmail(e.target.value)}className='border p-2 border-gray-400 rounded'/>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' placeholder='Enter your password' id='password'
                        value={password} onChange={(e)=>setPassword(e.target.value)} name='password' className='border border-gray-400 p-2 rounded'/>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='phoneNo'>phoneNo</label>
                        <input type='text' placeholder='Enter your phoneNo' id='phoneNo' 
                        value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)}name='phoneNo' className='border border-gray-400 p-2 rounded'/>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='address'>Address</label>
                        <textarea type='text' placeholder='Enter your address' id='address' name='address' 
                        value={address} onChange={(e)=>setAddress(e.target.value)}className='border border-gray-400 p-2 rounded'/>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='pincode'>Pincode</label>
                        <input type='text' placeholder='Enter your pincode' id='pincode' 
                        value={pincode} onChange={(e)=>setPincode(e.target.value)}name='pincode' className='border border-gray-400 p-2 rounded'/>
                    </div>

                    <button className='mt-3 border-2  w-full rounded-2xl' type='submit'>Submit</button>
                </form>

                <div className='mt-2'>
                    <p>Already Registered ? <Link to="/login">Go to Login</Link></p>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Register
