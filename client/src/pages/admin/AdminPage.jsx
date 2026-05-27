import React, { useEffect, useState } from 'react'
import { GiLoveSong } from 'react-icons/gi'
import { IoAlbumsOutline } from 'react-icons/io5'
import Header from './components/Header'
import DashbroadStats from './components/DashbroadStats'
import SongSTabContent from './components/SongSTabContent'
import AlbumsTabContent from './components/AlbumsTabContent'
import useStore from '../../store/useStore'

const AdminPage = () => {
  const { user } = useStore()
  const [activeTab, setActiveTab] = useState('songs')
  const {songs,albums,stats,fetchSongs,fetchAlbums,fetchStats} = useStore()
  useEffect(()=>{
    fetchSongs()
    fetchAlbums()
    fetchStats()
  },[fetchSongs,fetchAlbums,fetchStats])
  console.log(user)
  console.log("Songs", songs)
  console.log("albums", albums)
  console.log("stats", stats)
  if (user.role !== 'admin') return <div className='text-white'>Bạn không có quyền truy cập</div>



  return (
    <div className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8'>
      <Header />
      <DashbroadStats />

      {/* Tabs */}
      <div className='relative w-[220px] h-[30px] flex border border-zinc-600 text-sm font-medium mb-6 rounded-md'>
        {/* Indicator */}
        <div
          className={`absolute top-0 h-full w-1/2 bg-white transition-all duration-300 rounded-md`}
          style={{
            left: activeTab === 'songs' ? '0%' : '50%',
          }}
        />

        {/* Tabs */}
        <button
          onClick={() => setActiveTab('songs')}
          className={`flex-1 z-10 flex items-center justify-center gap-2 ${
            activeTab === 'songs' ? 'text-black' : 'text-zinc-400'
          }`}
        >
          <GiLoveSong />
          Songs
        </button>

        <button
          onClick={() => setActiveTab('albums')}
          className={`flex-1 z-10 flex items-center justify-center gap-2 ${
            activeTab === 'albums' ? 'text-black' : 'text-zinc-400'
          }`}
        >
          <IoAlbumsOutline />
          Albums
        </button>
      </div>

      {/* Tab content */}
      <div className='transition-all duration-300'>
        {activeTab === 'songs' && <SongSTabContent/>}
        {activeTab === 'albums' && <AlbumsTabContent/>}
      </div>
    </div>
  )
}

export default AdminPage
