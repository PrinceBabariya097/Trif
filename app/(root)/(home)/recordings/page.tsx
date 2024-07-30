import CallList from '@/components/CallList'
import React from 'react'

const RecordingsPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
        RecordingsPage
        <CallList type='recording'/>
    </section>
  )
}

export default RecordingsPage