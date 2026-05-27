import React from 'react'
import useStore from '../../../store/useStore'
import { CiCalendar } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
const SongsTable = () => {
    const { songs, isLoading, error,deleteSong } = useStore()

    if (isLoading) {
        return (
            <div className='flex justify-center items-center py-8'>
                <div className='text-zinc-400'>Loading songs...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className='flex justify-center items-center py-8'>
                <div className='text-red-400'>{error}</div>
            </div>
        )
    }

    return (
        <div className=''>
            {/* Table header */}
            <div className='grid grid-cols-[16px_3fr_2fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5 font-semibold'>
                <div>#</div>
                <div>Title</div>
                <div>Author</div>
                <div>Released Date</div>
                <div>Actions</div>
            </div>

            {/* Table rows */}
            <div className='px-6'>
                <div className='space-y-2 py-4'>
                    {songs?.map((song, index) => (
                        <div
                            key={song._id || index}
                            className='grid grid-cols-[16px_3fr_2fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-300'
                        >
                            <div className='flex justify-center items-center'>{index + 1}</div>
                            <div className='flex items-center gap-3'>
                                <img src={song.imageURL} alt={song.title} className='size-10 rounded' />
                                <div>
                                    <div>{song.title}</div>
                                </div>
                            </div>

                            <div className='text-sm '>{song.artist}</div>

                            <div className='flex items-center gap-2'>
                                <CiCalendar className='text-lg' />
                                {song.createdAt.split("T")[0]}
                            </div>

                            <div className='flex items-center ml-[6px]'>
                                <button
                                onClick={()=>deleteSong(song._id)}

                                 className=' p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10'
                                 >
                                    <AiOutlineDelete className='size-7'/>
                                    </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SongsTable
