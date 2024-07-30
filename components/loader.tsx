import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <section className='h-full w-full flex-center'>
        <Image src={'/icons/loading-circle.svg'} alt='loader image' height={52} width={52}/>
    </section>
  )
}

export default Loader