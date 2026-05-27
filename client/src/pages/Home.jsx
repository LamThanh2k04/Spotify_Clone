import React, { useEffect } from 'react'
import useStore from '../store/useStore'
import Card from '../components/Card'
import { Link } from 'react-router-dom'
import { ScrollArea } from '../ui/scroll-area'
import { usePlayerStore } from '../store/usePlayerStore'


const Home = () => {
  const {
    user,
    fetchFeaturedSongs,
    fetchMadeForYourSongs,
    fetchTrendingSongs,
    featuredSongs,
    madeForYourSongs,
    trendingSongs,
  } = useStore()

  const { initalizeQueue } = usePlayerStore();

  useEffect(() => {
    fetchFeaturedSongs()
    fetchMadeForYourSongs()
    fetchTrendingSongs()
  }, [fetchFeaturedSongs, fetchMadeForYourSongs, fetchTrendingSongs])

  useEffect(() => {
		if (madeForYourSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0) {
			const allSongs = [...featuredSongs, ...madeForYourSongs, ...trendingSongs];
			initalizeQueue(allSongs);
		}
	}, [initalizeQueue, madeForYourSongs, trendingSongs, featuredSongs]);

  return (
    <div className='h-full relative isolate'>
      <div className='absolute inset-0 bg-gradient-to-b from-white/10 to-black backdrop-blur-md transition-all duration-700 ease-in-out pointer-events-none z-0' />

      <ScrollArea className='h-full relative z-10'>
      {
        !user ?  (
          <div className='min-h-screen px-6 text-white'>

          <div >
            <div className='py-5'>
              <div className='flex items-center justify-between flex-wrap overflow-hidden'>
                <h2 className='text-3xl font-bold truncate max-w-[70%]'>Những bài hát nổi bật</h2>
                <div className='font-bold text-[#B3B3B3] whitespace-nowrap'>
                  <Link to='/featured'>Hiện tất cả</Link>
                </div>
              </div>


            </div>
            <div className='flex gap-2'>
              {
                featuredSongs?.map((song, index) => {
                  return (
                    <Card
                      index={index}
                      title={song.title}
                      artist={song.artist}
                      imageURL={song.imageURL}
                      song={song}
                    />
                  )
                })
              }
            </div>
          </div>
          <div >
            <div className='py-5'>
              <div className='flex items-center justify-between'>
                <h2 className='text-3xl font-bold'>Những bài hát dành cho bạn</h2>
                <div className='font-bold text-[#B3B3B3]'>
                  <Link>Hiện tất cả</Link>
                </div>
              </div>
            </div>
            <div className='flex gap-2'>
              {
                madeForYourSongs?.map((song, index) => {
                  return (
                    <Card
                      index={index}
                      title={song.title}
                      artist={song.artist}
                      imageURL={song.imageURL}
                      song={song}
                    />
                  )
                })
              }
            </div>
          </div>
          <div >
            <div className='py-5'>
              <div className='flex items-center justify-between'>
                <h2 className='text-3xl font-bold'>Những bài hát thịnh thành</h2>
                <div className='font-bold text-[#B3B3B3]'>
                  <Link>Hiện tất cả</Link>
                </div>
              </div>
            </div>
            <div className='flex gap-2'>
              {
                trendingSongs?.map((song, index) => {
                  return (
                    <Card
                      index={index}
                      title={song.title}
                      artist={song.artist}
                      imageURL={song.imageURL}
                      song={song}
                    />
                  )
                })
              }
            </div>
          </div>
        </div>
        ) : (
          <div className='min-h-screen px-6 text-white'>

          <div >
            <div className='py-5'>
              <div className='flex items-center justify-between flex-wrap overflow-hidden'>
                <h2 className='text-3xl font-bold truncate max-w-[70%]'>Những bài hát nổi bật</h2>
                <div className='font-bold text-[#B3B3B3] whitespace-nowrap'>
                  <Link to='/featured'>Hiện tất cả</Link>
                </div>
              </div>


            </div>
            <div className='flex gap-2'>
              {
                featuredSongs?.map((song, index) => {
                  return (
                    <Card
                      index={index}
                      title={song.title}
                      artist={song.artist}
                      imageURL={song.imageURL}
                      song={song}
                    />
                  )
                })
              }
            </div>
          </div>
          <div >
            <div className='py-5'>
              <div className='flex items-center justify-between'>
                <h2 className='text-3xl font-bold'>Những bài hát dành cho bạn</h2>
                <div className='font-bold text-[#B3B3B3]'>
                  <Link>Hiện tất cả</Link>
                </div>
              </div>
            </div>
            <div className='flex gap-2'>
              {
                madeForYourSongs?.map((song, index) => {
                  return (
                    <Card
                      index={index}
                      title={song.title}
                      artist={song.artist}
                      imageURL={song.imageURL}
                      song={song}
                    />
                  )
                })
              }
            </div>
          </div>
          <div >
            <div className='py-5'>
              <div className='flex items-center justify-between'>
                <h2 className='text-3xl font-bold'>Những bài hát thịnh thành</h2>
                <div className='font-bold text-[#B3B3B3]'>
                  <Link>Hiện tất cả</Link>
                </div>
              </div>
            </div>
            <div className='flex gap-2'>
              {
                trendingSongs?.map((song, index) => {
                  return (
                    <Card
                      index={index}
                      title={song.title}
                      artist={song.artist}
                      imageURL={song.imageURL}
                      song={song}
                    />
                  )
                })
              }
            </div>
          </div>
        </div>
        )
      }
      </ScrollArea>
    </div>
  )
}

export default Home
