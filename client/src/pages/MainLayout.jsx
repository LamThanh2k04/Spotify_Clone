import React from 'react'
import { Outlet } from 'react-router-dom'
import TopBar from '../components/TopBar'
import LeftSideBar from '../components/LeftSideBar'
import AudioPlayer from '../components/AudioPlayer'
import PlayBackControls from '../components/PlayBackControls'

const MainLayout = () => {
  return (
    <div className='bg-black min-h-screen text-white relative'>
      <TopBar />
      <div className='flex h-[550px]'> {/* Trừ chiều cao của TopBar nếu cần */}
        <AudioPlayer/>
       
          <LeftSideBar />
   
        <div className='flex-1 mx-3 border-none rounded-lg overflow-y-auto max-h-[550px]'>
          <Outlet />
        </div>
      </div>
        <PlayBackControls/>
    </div>
  )
}


export default MainLayout