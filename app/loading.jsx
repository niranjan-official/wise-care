import React from 'react'
import { VscLoading } from 'react-icons/vsc'

const Loading = () => {
  return (
    <div className="w-full mt-10 flex justify-center">
        <VscLoading size={30} className="animate-spin text-black" />
    </div>
  )
}

export default Loading