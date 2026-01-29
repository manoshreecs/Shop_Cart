import React from 'react'
import bannerImg from '../assets/Bottombanner.png'

function BottomBanner() {
  return (
    <div className="w-full my-12 px-4 md:px-10">
      <div className="max-w-[1300px] mx-auto overflow-hidden rounded-2xl shadow-sm">
        <img 
          src={bannerImg} 
          alt="Bottom Banner" 
          className="w-full h-auto block object-cover" 
        />
      </div>
    </div>
  )
}

export default BottomBanner;