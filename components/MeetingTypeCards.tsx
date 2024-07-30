import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

interface meetingListTypes {
    icon: string,
    title: string,
    discription: string,
    handelClick: () => void,
    className: string
}

const MeetingTypeCards = ({icon, title, discription, handelClick, className} : meetingListTypes) => {
  return (
        <div className={cn(`flex flex-col justify-between w-[260px] h-[260px] rounded-xl px-[10px] py-5 cursor-pointer`, className)} onClick={handelClick}>
            <div className='bg-white/40 w-[56px] h-[56px] rounded-[10px] flex-center'>
                <Image src={icon} height={32} width={32} alt='plus icon'/>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='font-bold text-2xl'>{title}</p>
              <p>{discription}</p>
            </div>
        </div>
  )
}

export default MeetingTypeCards