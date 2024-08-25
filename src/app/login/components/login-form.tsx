'use client'

import { IconEye } from '@/components/icons/eye'
import { IconEyeSlash } from '@/components/icons/eye-slash'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
// import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod";
import React from "react"

import UserData from "@/app/data/userData.json"
import Swal from 'sweetalert2'

const formSchema = z.object({
  email: z.string().email({
    message: "Email is required.",
  }),
  password: z
    .string()
    .min(2, { message: "Password is required." })
    .max(50)
});

export const LoginForm = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: any) {
    try {
      const isValidUser = UserData.find((user) => user.email == values?.email && user.password == values?.password)

      if(isValidUser) {
        localStorage.setItem('userId', isValidUser.id.toString())
        localStorage.setItem('role', isValidUser.role)

        router.push('/');
      } else {
        Swal.fire('Login Failed!')
      }
    } catch (error: any) {
      Swal.fire('Login Failed!')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 w-full sm:w-[400px]">
        <div className="grid w-full items-center gap-1.5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="w-full">
                  <label className="text-sm text-[#9FA0BC]">Email</label>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="w-full">
                  <label className="text-sm text-[#9FA0BC]">Password</label>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Password"
                        {...field}
                        type={`${showPassword ? "text" : "password"}`}
                      />
                      {!showPassword && (
                        <IconEye
                          classname="absolute top-3 right-4 cursor-pointer hover:scale-105 "
                          onclick={() => setShowPassword(!showPassword)}
                        />
                      )}
                      {showPassword && (
                        <IconEyeSlash
                          classname="absolute top-3 right-4 cursor-pointer hover:scale-105 "
                          onclick={() => setShowPassword(!showPassword)}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        
        <div className="w-full">
          <Button className="w-full" size="lg" variant={'default'}>
            Login
          </Button>
        </div>
      </form>
    </Form>
  )
}