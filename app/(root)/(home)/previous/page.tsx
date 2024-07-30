import CallList from '@/components/CallList'
import React from 'react'

const PreviousPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
        UpcomingPage
        <CallList type='ended'/>
    </section>
  )
}

export default PreviousPage