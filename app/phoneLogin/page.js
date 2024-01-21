"use client";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const router = useRouter();
  const [phone, setphone] = React.useState("")
  const [otp, setOtp]= React.useState("")


  const handleSendOtp = async () => {
    try{
        const response = await axios.post('/api/phoneLogin',phone);
        console.log(response.data)
        alert("OTP Sent");
    }catch(err){
        console.log(err)
    }
  }

  const handleVerify = async () => {
    try{
        const response = await axios.post('/api/verifyOtp',{otp,phone});
        window.location.href="/profile"
        
      }catch(err){
        console.log(err)
        alert("OTP not matched or expired");
    }
  }

 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-b from-blue-500 to-blue-800 min-[320px]:text-xl gap-3 text-white">
    <hr />
    
    <label htmlFor="email" className="min-[320px]:text-3xl ">Phone</label>
    <input 
    className="p-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="phone"
        type="number"
        value={phone}
        onChange={(e) => setphone(e.target.value)}
        placeholder="Enter your number"
        />
        <button
        onClick={handleSendOtp}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Send OTP</button>
        <input 
    className="p-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="otp"
        type="otp"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter your OTP"
        />
        <button onClick={handleVerify}>Verify OTP</button>
        <Link href="/login">Back To Login</Link>
      </div>
  )

}