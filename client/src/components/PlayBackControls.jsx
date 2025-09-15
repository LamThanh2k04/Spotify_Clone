import React, { useEffect, useRef, useState } from 'react';
import { CiLaptop, CiVolumeHigh } from "react-icons/ci";
import { LuListMusic, LuMicVocal, LuRepeat2 } from "react-icons/lu";
import { FaPlay, FaPause } from "react-icons/fa";
import { TiArrowShuffle } from "react-icons/ti";
import { IoIosSkipBackward, IoIosSkipForward } from "react-icons/io";
import { usePlayerStore } from '../store/usePlayerStore';
import useStore from '../store/useStore';
import { Link } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const PlaybackControls = () => {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious } = usePlayerStore();
  const { user, favoriteSongs, addFavoriteSong, removeFavoriteSong } = useStore();
  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = document.querySelector("audio");

    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      usePlayerStore.setState({ isPlaying: false });
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

  const handleSeek = (e) => {
    const value = e.target.value;
    setCurrentTime(value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  };

  const handleVolumeChange = (e) => {
    const value = e.target.value;
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
  };

  const handleFavoriteClick = (songId) => {
    if (favoriteSongs.includes(songId)) {
      removeFavoriteSong(songId);
    } else {
      addFavoriteSong(songId);
    }
  };



  return (
    <footer className={`h-20 ${user ? ("bg-black px-4") : ("h-[66px] mt-[2px] bg-gradient-to-r from-[#af2896] to-[#509bf5]")}`}>
      {!user ? (
        <div className='flex justify-between items-center p-2 '>
          <div className='text-white select-none'>
            <p className='font-bold'>Xem trước Spotify</p>
            <p>Đăng kí để nghe không giới hạn các bài hát và podcast với quảng cáo không thường xuyên. Không cần thẻ tín dụng</p>
          </div>
          <Link to='/register' className='p-3 bg-white rounded-full text-black font-bold hover: transform transition duration-200 hover:scale-[1.04]'>
            <button>
              Đăng kí miễn phí
            </button>
          </Link>
        </div>
      ) : (<div className="flex justify-between items-center h-full max-w-[1800px] mx-auto">

        {/* Song Info */}
        <div className="flex items-center gap-4 min-w-[180px] w-[30%]">
          {currentSong && (
            <>
              <img
                src={currentSong.imageURL}
                alt={currentSong.title}
                className="w-14 h-14 object-cover rounded-md"
              />
              <div className="min-w-0">
                <div className="font-medium truncate hover:underline cursor-pointer">
                  {currentSong.title}
                </div>
                <div className="text-sm text-zinc-400 truncate hover:underline cursor-pointer">
                  {currentSong.artist}
                </div>
              </div>
              <button onClick={() => handleFavoriteClick(currentSong._id)} className='ml-3 hover:transform transition duration-200 hover:scale-[1.04]'>
                {favoriteSongs.includes(currentSong._id) ? (
                  <FaHeart className='text-red-500' />
                ) : (
                  <FaRegHeart className='text-white' />
                )}
              </button>


            </>
          )}
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-[45%]">
          <div className="flex items-center gap-4">
            <button className="text-zinc-400 hover:text-white">
              <TiArrowShuffle size={20} />
            </button>

            <button onClick={playPrevious} disabled={!currentSong} className="text-zinc-400 hover:text-white">
              <IoIosSkipBackward size={20} />
            </button>

            <button
              onClick={togglePlay}
              disabled={!currentSong}
              className="bg-white hover:bg-white/80 text-black rounded-full h-8 w-8 flex items-center justify-center"
            >
              {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
            </button>

            <button onClick={playNext} disabled={!currentSong} className="text-zinc-400 hover:text-white">
              <IoIosSkipForward size={20} />
            </button>

            <button className="text-zinc-400 hover:text-white">
              <LuRepeat2 size={20} />
            </button>
          </div>

          <div className="flex items-center gap-2 w-full">
            <div className="text-xs text-zinc-400">{formatTime(currentTime)}</div>
            <input
              type="range"
              value={currentTime}
              min={0}
              max={duration || 100}
              step={1}
              className="w-full cursor-pointer accent-white hover:accent-green-500 "
              onChange={handleSeek}
            />
            <div className="text-xs text-zinc-400">{formatTime(duration)}</div>
          </div>
        </div>

        {/* Volume and Other Controls */}
        <div className="flex items-center gap-4 min-w-[180px] w-[30%] justify-end">
          <button className="text-zinc-400 hover:text-white">
            <LuMicVocal size={20} />
          </button>
          <button className="text-zinc-400 hover:text-white">
            <LuListMusic size={20} />
          </button>
          <button className="text-zinc-400 hover:text-white">
            <CiLaptop size={20} />
          </button>

          <div className="flex items-center gap-2">
            <button className="text-zinc-400 hover:text-white">
              <CiVolumeHigh size={20} />
            </button>
            <input
              type="range"
              value={volume}
              min={0}
              max={100}
              step={1}
              className="w-24 cursor-pointer accent-white hover:accent-green-500 "
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>)}
    </footer>
  );
};

export default PlaybackControls;
