'use client'

import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "./components/login-form";
import UserData from "@/app/data/userData.json"
import { useRouter } from 'next/navigation'
import React from "react"

export default function Login() {
  const router = useRouter()
  
  React.useEffect(() => {
    const user = localStorage.getItem('userId')
    if(user) router.push('/');

    const isValidUser = UserData.find((user) => user.id == Number(user))
    if(!isValidUser) router.push('/login');
  }, [router])

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
        <h1 className="font-semibold text-2xl">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
