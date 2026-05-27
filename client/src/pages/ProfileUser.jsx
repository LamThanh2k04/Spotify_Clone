import React, { useEffect, useState } from 'react'
import useStore from '../store/useStore.js'
import { ScrollArea } from '../ui/scroll-area'
import { FaPlay, FaRegClock } from "react-icons/fa";
import { usePlayerStore } from '../store/usePlayerStore.js'

const gradients = [
  'from-blue-500/80 via-zinc-900/80 to-zinc-900',
  'from-green-400/80 via-zinc-900/80 to-zinc-900',
  'from-orange-400/80 via-zinc-900/80 to-zinc-900',
  'from-[#5038a0]/80 via-zinc-900/80 to-zinc-900',
  'from-cyan-500/80 via-zinc-900/80 to-zinc-900',
]

const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const ProfileUser = () => {
  const { user } = useStore()
  const [bgGradient, setBgGradient] = useState(gradients[0])
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore()
    console.log(user)
  const handlePlaySong = (index) => {
    const songs = user.favoriteSongs || []
    if (!songs.length) return
    playAlbum(songs, index)
  }

  return (
    <div className="h-full relative isolate">
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-b ${bgGradient} backdrop-blur-md transition-all duration-700 ease-in-out pointer-events-none z-0`} />

      {/* Content */}
      <ScrollArea className="h-full relative z-10">
        <div className="min-h-screen p-4">
          {/* User Info */}
          <div className='flex p-6 gap-6 pb-8'>
            <img
              className='h-[200px] w-[200px] rounded-full shadow-xl object-cover'
              src={user.imageURL || "/default-avatar.png"}
              alt={user.username}
            />
            <div className='flex flex-col justify-start'>
              <p className='text-sm font-medium'>User Profile</p>
              <h1 className='text-9xl font-bold my-2'>{user.fullName}</h1>
              <div className='text-zinc-200'>
               
              </div>
              <div className='text-zinc-400 mt-1'>
                {user.favoriteSongs?.length || 0} Favorite songs
              </div>
            </div>
          </div>

          {/* Song Table */}
          <div className='via-zinc-900 backdrop-blur-sm'>
            <div className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5'>
              <div>#</div>
              <div>Title</div>
              <div>Added</div>
              <div><FaRegClock className='h-4 w-4' /></div>
            </div>

            <div className='px-6'>
              <div className='space-y-2 py-4'>
                {user.favoriteSongs?.map((song, index) => {
                  const isCurrentSong = currentSong?._id === song._id
                  return (
                    <div
                      key={song._id}
                      onClick={() => handlePlaySong(index)}
                      className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm 
                      text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer'
                    >
                      <div className='flex justify-center items-center'>
                        {isCurrentSong && isPlaying ? (
                          <div className='size-4 text-green-500'>♫</div>
                        ) : (
                          <>
                            <span className='group-hover:hidden'>{index + 1}</span>
                            <FaPlay className='h-4 w-4 hidden group-hover:block' />
                          </>
                        )}
                      </div>
                      <div className='flex items-center gap-3'>
                        <img src={song.imageURL} alt="" className='size-10 rounded' />
                        <div>
                          <div>{song.title}</div>
                          <div className='text-xs text-zinc-400'>{song.artist}</div>
                        </div>
                      </div>
                      <div>{song.createdAt?.split("T")[0]}</div>
                      <div>{formatDuration(song.duration)}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default ProfileUser
