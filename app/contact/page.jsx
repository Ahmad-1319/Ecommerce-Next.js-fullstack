import React from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function Contact() {
  return (
    <>
    <h1 className='text-center text-5xl  mt-10  '>Contact</h1>
    <div className='flex w-full justify-center items-center my-5 '>
        
    <div className='min-w-[50%]  sm:min-w-[32%]'>
        <form  className='flex flex-col gap-3'>
        <label htmlFor="name">Name</label>
     <Input type='text' placeholder='Name' id='Name'/>
     <label htmlFor="email">Email</label>
     <Input type='email' placeholder='Email' id='Email'/>
     <label htmlFor="phone">Phone Number</label>
     <Input type='text' placeholder='Phone' id='phone'/>
     <label htmlFor="textarea">Message</label>
     <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  
                />
       <Button type='submit' className='w-1/3 cursor-pointer my-2'>Submit</Button>        
     </form>
    </div>
    </div>
    </>
  )
}
