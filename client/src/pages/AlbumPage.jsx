import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useStore from '../store/useStore.js'
import { ScrollArea } from '../ui/scroll-area'
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { usePlayerStore } from '../store/usePlayerStore.js';

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

const AlbumPage = () => {
  const { albumId } = useParams()
  const { currentAlbum, fetchAlbumsId, isLoading } = useStore()
  console.log(isLoading)
  const [bgGradient, setBgGradient] = useState(gradients[0])
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore()

  const handlePlayAlbum = () => {
    if (!currentAlbum) {
      return
    }

    const isCurrentAlbumplaying = currentAlbum?.songs?.some(song => song._id === currentSong?._id)
    if (isCurrentAlbumplaying) {
      togglePlay()
    } else {
      playAlbum(currentAlbum?.songs,0)
    }
  }
  const handlePlaySong = (index) => {
    if (!currentAlbum) {
      return
    }
    playAlbum(currentAlbum?.songs, index)
  }
  useEffect(() => {
    if (albumId) {
      fetchAlbumsId(albumId)
      const randomGradient = gradients[Math.floor(Math.random() * gradients.length)]
      setBgGradient(randomGradient)
    }
  }, [fetchAlbumsId, albumId])

  console.log(currentAlbum)
  console.log(albumId)
  return (
    <div className="h-full relative isolate" >
      {/* backgound  */}
      <div className={`absolute inset-0 bg-gradient-to-b ${bgGradient} backdrop-blur-md transition-all duration-700 ease-in-out pointer-events-none z-0`} />

      {/* content scrollable */}
      <ScrollArea className="h-full relative z-10">
        <div className="min-h-screen p-4">
          {/*  */}
          <div className='flex p-6 gap-6 pb-8'>
            <img
              className='h-[240px] w-[240px] shadow-xl rounded hover:transition duration-200 hover:scale-[1.04] cursor-pointer'
              src={currentAlbum?.imageURL}
              alt={currentAlbum?.artist} />
            <div className='flex flex-col justify-end '>
              <p className='text-sm font-medium'>Album</p>
              <h1 className='text-7xl font-bold my-[16px]'>{currentAlbum?.title}</h1>
              <div className='flex items-center gap-2 text-zinc-50'>
                <span>{currentAlbum?.artist}</span>
                <span>• {currentAlbum?.songs.length}</span>
                <span>• {currentAlbum?.releaseYear && new Date(currentAlbum?.releaseYear).getFullYear()} </span>
              </div>
            </div>
          </div>
          {/* Button */}
          <div className='px-6 pb-4 flex items-center gap-6'>
            <button onClick={handlePlayAlbum}
              className='group flex items-center justify-center w-14 h-14 rounded-full bg-green-500 
      hover:bg-green-400 transform hover:scale-[1.04] transition-transform duration-100'
            >

              {isPlaying && currentAlbum?.songs?.some(song => song._id === currentSong?._id) ? (
                <FaPause className='h-5 w-5 text-black' />
              ) : (
                <FaPlay className='h-5 w-5 text-black' />
              )}

            </button>
          </div>

          {/* Table  */}
          <div className='via-zinc-900 backdrop-blur-sm '>
            {/* Table Header */}
            <div className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm 
            text-zinc-400 border-b border-white/5'>
              <div>#</div>
              <div>Title</div>
              <div>Released Date</div>
              <div>
                <FaRegClock className='h-4 w-4' />
              </div>
            </div>
            {/* Song List */}
            <div className='px-6'>
              <div className='space-y-2 py-4'>
                {currentAlbum?.songs?.map((song, index) => {
                  const isCurrentSong = currentSong?._id === song._id
                  return (
                    <div
                      key={song._id}
                      onClick={()=>handlePlaySong(index)}
                      className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm 
                      text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer'
                    >
                      <div className='flex justify-center items-center'>
                        {isCurrentSong && isPlaying ? (
                          <div className='size-4 text-green-500'>
                            ♫
                          </div>
                        ) : (<span className='group-hover:hidden'>{index + 1}</span>)
                        }
                      {
                        !isCurrentSong &&   <FaPlay className='h-4 w-4 hidden group-hover:block' />
                      }
                      </div>
                      <div className='flex items-center gap-3'>
                        <img src={song.imageURL} alt="" className='size-10' />
                        <div>
                          <div>{song.title}</div>
                          <div>{song.artist}</div>
                        </div>
                      </div>
                      <div>{song.createdAt.split("T")[0]}</div>
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

export default AlbumPage
