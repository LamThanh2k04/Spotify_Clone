import Modal from 'react-modal';
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { FaPlus } from "react-icons/fa";
import { MdOutlineCloudUpload } from "react-icons/md";

import useStore from '../../../store/useStore';
import axios from 'axios';

Modal.setAppElement('#root'); // chỉ cần set 1 lần

const AddSongModal = () => {
  const { albums, fetchSongs, fetchStats } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newSong, setNewSong] = useState({
    title: '',
    artist: '',
    duration: '',
    albumId: '',
  });
  const [audioFileName, setAudioFileName] = useState('');  // Lưu tên file nhạc
  const [imagePreview, setImagePreview] = useState(null);  // Lưu hình ảnh xem trước

  const imageRef = useRef(null);
  const audioRef = useRef(null);

  const handleChange = (e) => {
    setNewSong({ ...newSong, [e.target.name]: e.target.value });
  };

  const handleAddSong = async () => {
    if (!newSong.title || !newSong.artist || !newSong.duration) {
        toast.error('Please fill in all fields!');
        return;
    }

    if (!imageRef.current.files[0]) {
        toast.error('Please select a cover image!');
        return;
    }

    if (!audioRef.current.files[0]) {
        toast.error('Please select a music file!');
        return;
    }

    const formData = new FormData();
    formData.append('title', newSong.title);
    formData.append('artist', newSong.artist);
    formData.append('duration', newSong.duration);
    formData.append('albumId', newSong.albumId || ''); // Nếu không chọn album, gán là rỗng
    formData.append('imageFile', imageRef.current.files[0]);
    formData.append('audioFile', audioRef.current.files[0]);

    setIsLoading(true);
    try {
        const token = localStorage.getItem('token');
        await axios.post('/api/admin/songs', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        toast.success('Song added successfully!');
        setIsOpen(false);
        setNewSong({ title: '', artist: '', duration: '', albumId: '' });
        setImagePreview(null);
        setAudioFileName('');
        await fetchSongs();
        await fetchStats();
    } catch (error) {
        toast.error('Error adding song!');
        console.error('Error adding song:', error);
    } finally {
        setIsLoading(false);
    }
};

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="flex items-center gap-2 p-2 bg-[#1ED760] text-zinc-900 font-bold rounded">
        <FaPlus size={20} /> Add Song
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="absolute top-[-70px] bg-zinc-900 rounded-xl p-6 max-w-md w-full mx-auto mt-20 shadow-xl border border-zinc-700 focus:outline-none"
        overlayClassName="fixed inset-0 bg-black/50 flex items-start justify-center z-50"
      >
        <h2 className='text-lg font-semibold text-white '>Add New Song</h2>
        <p className='text-zinc-600 mb-4'>Add a new song to your collection</p>

        <div className="space-y-4">
          <div className='flex flex-col gap-2'>
            <label htmlFor='title' className='text-zinc-100'>Song Title</label>
            <input
            id='title'
              type="text"
              name="title"
              value={newSong.title}
              onChange={handleChange}
              placeholder="Tên bài hát"
              className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded text-white"
            />
          </div>
         <div className='flex flex-col gap-2'>
            <label htmlFor='artist' className='text-zinc-100'>Artist</label>
            <input
            id='artist'
            type="text"
            name="artist"
            value={newSong.artist}
            onChange={handleChange}
            placeholder="Artist"
            className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded text-white"
          />
         </div>
         <div className='flex flex-col gap-2'>
            <label htmlFor='duration' className='text-zinc-100'>Duration</label>
            <input
            id='duration'
          	type='number'
							min='0'
            name="duration"
            value={newSong.duration}
            onChange={handleChange}
            placeholder="Duration (Example: 3:45)"
            className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded text-white"
          />
         </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='albumId' className='text-zinc-100'>Album</label>
          <select
            name="albumId"
            value={newSong.albumId}
            onChange={handleChange}
            className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded text-white"
          >
            <option value="">Select album</option>
            {albums.map((album) => (
              <option key={album._id} value={album._id}>
                {album.title}
              </option>
            ))}
          </select>
          </div>

          {/* Upload area */}
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => imageRef.current?.click()}
              className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer text-zinc-400 hover:bg-zinc-800 relative"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Ảnh bìa" className="w-32 h-32 object-cover" />
              ) : (
                <>
                  <MdOutlineCloudUpload size={24} />
                  <span>Cover Photo</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                ref={imageRef}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setImagePreview(reader.result); // Set preview ảnh
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>

            <div
              onClick={() => audioRef.current?.click()}
              className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer text-zinc-400 hover:bg-zinc-800 relative"
            >
              {audioFileName ? (
                <span className="text-sm text-white">{audioFileName}</span>
              ) : (
                <>
                  <MdOutlineCloudUpload size={24} />
                  <span>Music File</span>
                </>
              )}
              <input
                type="file"
                accept="audio/*"
                ref={audioRef}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setAudioFileName(file.name); // Lưu tên file nhạc
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleAddSong}
            disabled={isLoading}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-black rounded"
          >
            {isLoading ? "Loading..." : "Add"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AddSongModal;
