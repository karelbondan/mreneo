'use client'
import { login } from '@/utils/api/akun'
import { dataLoginInit } from '@/utils/declarations'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Login() {
  const [loginData, setloginData] = useState(dataLoginInit);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams()
  const err = searchParams.get("err")

  useEffect(() => {
    console.log(err)
    if (err) {
      seterror(err)
    }
  }, [err])


  async function submit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    seterror("");
    setloading(true);
    const res = await login(loginData)
    if (!res) {
      router.push("/")
    }
    setloading(false);
    seterror(res)
  }

  return (
    <div className='h-full bg-gray-300 flex flex-col'>
      <div className='h-full flex items-center justify-center'>
        <div className='bg-white rounded-lg px-5 py-7 flex flex-col w-5/6 gap-4 overflow-y-scroll'>
          <span className='text-2xl font-semibold text-center'>Mreneo Management Platform</span>
          <span />
          <form id='login' className='flex flex-col'>
            <span>Username</span>
            <input
              type='text'
              placeholder='Masukkan username'
              value={loginData.username}
              disabled={loading}
              onChange={(e) => setloginData({ ...loginData, username: e.currentTarget.value.trim() })}
              className='border border-black/50 rounded-lg p-3 disabled:opacity-50'
            />
            <hr className='h-2' />
            <span>Password</span>
            <input
              type='password'
              placeholder='Masukkan password'
              value={loginData.password}
              disabled={loading}
              className='border border-black/50 rounded-lg p-3 disabled:opacity-50'
              onChange={(e) => setloginData({ ...loginData, password: e.currentTarget.value.trim() })}
            />
            <hr className='h-4' />
          </form>
          <button
            type='submit'
            form='login'
            className='flex justify-center bg-green-600 text-white rounded-lg py-3 active:scale-90 transition-all disabled:pointer-events-none'
            disabled={loading}
            onClick={e => submit(e)}>
            {loading ?
              <div className='size-5 border-[4px] border-white border-t-transparent animate-spin rounded-full p-2' /> : "Submit"}
          </button>
          {error && <span className='text-red-500 text-sm text-center'>{error}</span>}
          <p className='text-sm text-center'><strong>Anda tersesat? </strong>
            <Link href={"/"} className='hover:underline animate-pulse transition-all'>
              Kembali ke halaman awal
            </Link>
          </p>
        </div>
      </div>
      <div className='text-sm p-5 text-center'>
        <span className='font-semibold'>MreneO - Spesialis ayam geprek</span>
        <p>Foodcourt Java Mall Lt. 3, Kota Semarang, Jateng</p>
      </div>
    </div>
  )
}
