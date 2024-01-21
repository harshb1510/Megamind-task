"use client";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
      email: "",
      password: "",
     
  })
  const [loading, setLoading] = React.useState(false);


  const onLogin = async () => {
      try {
          setLoading(true);
          const response = await axios.post("/api/login", user);
          router.push("profile")         
      } catch (error) {
          console.log("Login failed", error.message);
      } finally{
      setLoading(false);
      } 
  }

 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-b from-blue-500 to-blue-800 min-[320px]:text-xl gap-3 text-white">
    <h1 className="text-4xl mb-10">{loading ? "Processing" : "Login"}</h1>
    <hr />
    
    <label htmlFor="email" className="min-[320px]:text-3xl ">Email</label>
    <input 
    className="p-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder="Email"
        />
    <label htmlFor="password" className="min-[320px]:text-3xl ">Password</label>
    <input 
    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder="Password"
        />
        <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here</button>
        <Link href="/phoneLogin">Login via mobile</Link>
        Or
        <Link href="/signup">Visit Signup page</Link>
      </div>
  )

}