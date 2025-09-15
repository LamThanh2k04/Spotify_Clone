import React, { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import anh1 from '../../public/albums/1.jpg';
import { FaPause } from "react-icons/fa";
import { usePlayerStore } from '../store/usePlayerStore';
import Modal from 'react-modal';
import useStore from '../store/useStore';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { IoCloseSharp } from "react-icons/io5";

Modal.setAppElement('#root'); // Chỉ cần set 1 lần
const Card = ({ index, imageURL, title, artist, song }) => {
  const { user } = useStore()
  const [isOpen, setIsOpen] = useState(false)
  const { isPlaying, currentSong, setCurrentSong, togglePlay } = usePlayerStore()
  const isCurrentSong = currentSong?._id === song._id
  console.log(song)
  const handlePlay = () => {
    if (!user) {
      setIsOpen(true);
      return;
    }
    if (isCurrentSong) {
      togglePlay()
    } else {
      setCurrentSong(song)
    }
  }
  return (
    <div key={index} className="w-44 rounded-lg p-3 hover:bg-[#2a2a2a] transition-colors duration-300 group cursor-pointer">
      {/* Wrapper ảnh + overlay */}
      <div className="relative rounded-md overflow-hidden">
        <img src={imageURL} alt={title} className="rounded-md object-cover" />

        {/* Overlay mờ */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300"></div>

        {/* Nút play trượt lên khi hover card */}
        <button className={`
  absolute bottom-2 right-2 w-10 h-10 bg-green-500 text-black rounded-full 
  flex items-center justify-center 
  transition-all duration-300 ease-out 
  ${isCurrentSong ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 group-hover:translate-y-0 group-hover:opacity-100"}
`}
          onClick={handlePlay}
        >
          {
            isCurrentSong && isPlaying ? (
              <FaPause className="w-4 h-4" />
            ) : (
              <FaPlay className="w-4 h-4" />
            )
          }
        </button>
      </div>

      {/* Thông tin bài hát */}
      <div className="mt-3">
        <p className="text-white text-sm font-semibold leading-tight line-clamp-2">{title}</p>
        <p className="text-gray-400 text-xs mt-1 font-bold">{artist}</p>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Ảnh bài hát"
        className="min-w-[810px] min-h-[460px] bg-[#181818] max-w-md mx-auto mt-32 p-14 rounded-xl shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-start z-50"
      >
        <div className='flex gap-11 justify-center">'>
          <img src={imageURL} alt={title} className="size-80 object-cover rounded-xl" />
          <div className='flex flex-col gap-4 ">'>
            <h2 className="text-white text-4xl font-bold text-center">Bắt đầu nghe bằng tài khoản Spotify Free</h2>
            <Link to={'/register'} className=' mx-auto w-[200px] p-3 text-center bg-[#1ED760] rounded-full text-black font-bold hover: transform transition duration-200 hover:scale-[1.04] ">'>
              <button>
                Đăng kí miễn phí
              </button>
            </Link>
            <Link className='mx-auto w-[200px] p-3 text-center border  rounded-full text-white font-bold hover: transform transition duration-200 hover:scale-[1.04]'>
              <button>
                Tải xuống miễn phí
              </button>
            </Link>
            <p className='text-center text-[#BEBDBD] font-bold'>Bạn đã có tài khoản? <Link to={'/login'} className='text-white underline hover:text-[#1ED760] cursor-pointer'>Đăng nhập</Link></p>
          </div>
        </div>
        <div className='flex'>
          <button
            onClick={() => setIsOpen(false)}
            className="mx-auto mt-7 px-4 py-2  text-[#BEBDBD] font-semibold hover:text-white hover: transform transition duration-200 hover:scale-[1.04]"
          >
            Đóng
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Card;
