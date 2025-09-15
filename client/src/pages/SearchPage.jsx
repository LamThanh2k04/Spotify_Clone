import axios from 'axios'
import React, { use, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Card from '../components/Card'
import useStore from '../store/useStore'

const SearchPage = () => {
    const location = useLocation()
    const query = new URLSearchParams(location.search).get('q')
    const {resultsSongs,fetchResultsSongs} = useStore()
    useEffect(() => {
        fetchResultsSongs(query)
    }, [query,fetchResultsSongs])
    return (
        <div className='text-white p-4  bg-gradient-to-b from-white/10 to-black '>
            <h2 className='text-2xl mb-4 font-bold'>Kết quả cho: "{query}"</h2>
           <div className='flex flex-wrap'>
           {resultsSongs.map((song,index) =>(
             <Card
             index={index}
             title={song.title}
             artist={song.artist}
             imageURL={song.imageURL}
             song={song}
           />
           ))}
           </div>
        </div>
    )
}

export default SearchPage