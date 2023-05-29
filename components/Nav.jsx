'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
    const { data: session } = useSession();
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [providers, setProviders] = useState(null); 

    useEffect(() => {
        (async () => {
          const res = await getProviders();
          setProviders(res);
        })();
      }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
     <Link href='/' className='flex-center gap-2'>
        <Image src='/assets/images/logo.svg' alt='logo' width={30} height={30} className='object-contain'/>
        <p>Prompty</p>
     </Link>


     {/* DESKTOP */}
     <div className="sm:flex hidden">
      {session?.user ? (<>
     <div className="flex gap-3 md:gap-5">
      <Link href='/' className='black_btn'>Create Post</Link>
      <button type='button' className='outline_btn' onClick={signOut}>Sign Out</button>
      <Link href='/'><Image src={session?.user.image} width={37} height={37} className=' rounded-full' alt='profile'/></Link>
     </div>
      </>) :(<>{providers && Object.values(providers).map((provider)=>(<button type='button' key={provider.name} onClick={() => {signIn(provider.id);}} className='black_btn'>Sign in</button>))}</>)}
     </div>
     {/* MOBILE */}
     <div className='sm:hidden flex relative'>
        {session?.user?(<>
        <div>
             <Image src={'/assets/images/profile1.jpg'} width={37} height={37} className='bg-purple-600 rounded-full' alt='profile' onClick={()=>setToggleDropdown(!toggleDropdown)}/>
             {toggleDropdown && (
                <div className='dropdown'>
                    <Link href='/' className='dropdown_link' onClick={() => setToggleDropdown(false)}>My Profile</Link>
                    <Link href='/' className='dropdown_link' onClick={() => setToggleDropdown(false)}>Create Prompt</Link>
                    <button type='button' href='/' className='black_btn w-full mt-4' onClick={() => {setToggleDropdown(false);signOut();}}>Sign Out</button>
                </div>
             )}
        </div>
        </>):(<>{providers && Object.values(providers).map((provider)=>(<button key={provider.name} type='button' className='black_btn' onClick={() => {signIn(provider.id);}}>Sign in</button>))}</>)}
     </div>
    </nav>
  )
}

export default Nav