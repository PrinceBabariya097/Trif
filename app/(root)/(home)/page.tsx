import MeetingTypeList from '@/components/MeetingTypeList'
import React from 'react'

const Home = () => {
  const newDate = new Date()
  const date = newDate.toLocaleString('en-US',{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
  const time = newDate.toLocaleString('en-US',{hour: '2-digit', minute:'2-digit', hour12: true})

  return (
    <section className="flex size-full flex-col gap-5 text-white">
        <div className='w-full h-[303px] bg-hero bg-cover rounded-xl flex flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
          <div className='glassmorphism'>
            <p>Upcoming Meeting at: 12:30 PM</p>
          </div>
          <div>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>{time}</h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>{date}</p>
          </div>
        </div>

        <MeetingTypeList/>
    </section>
  )
}

export default Home