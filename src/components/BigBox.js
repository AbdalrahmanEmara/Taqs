import React from 'react'

export default function BigBox({children}) {
  return (
    <div className="col-span-5 md:col-span-3  bg-[#0E1421] rounded-[30px] p-5 grid grid-cols-2">
      {children}
    </div>
  )
}
