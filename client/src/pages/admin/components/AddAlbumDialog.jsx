import React from 'react'
import useStore from '../../../store/useStore'
import { FaPlus } from "react-icons/fa";
import { MdOutlineCloudUpload } from "react-icons/md";
import toast from 'react-hot-toast';
import axios from 'axios';
import Modal from 'react-modal';
import { useState } from 'react';
import { useRef } from 'react';
Modal.setAppElement('#root'); // chỉ cần set 1 lần
const AddAlbumDialog = () => {
  const {fetchAlbums, fetchStats } = useStore()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [newAlbum, setNewAlbum] = useState({
    title: '',
    artist: '',
    releaseYear: new Date().getFullYear(),
  })

  const [imagePreview, setImagePreview] = useState(null);  // Lưu hình ảnh xem trước
  const imageRef = useRef(null);

  const handleChange = (e) => {
    setNewAlbum({ ...newAlbum, [e.target.name]: e.target.value });
  }

  const handleAddAlbum = async () => {

    if (!imageRef.current || !imageRef.current.files || imageRef.current.files.length === 0) {
      toast.error('Please select a cover image!');
      return;
    }
    

    const formData = new FormData();
    formData.append('title', newAlbum.title);
    formData.append('artist', newAlbum.artist);
    formData.append('releaseYear', newAlbum.releaseYear);
    formData.append('imageFile', imageRef.current.files[0]);

    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/admin/albums', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Album added successfully!');
      setIsOpen(false);
      setNewAlbum({
        title: '',
        artist: '',
        releaseYear: new Date().getFullYear(),
      });
      setImagePreview(null); // Reset hình ảnh xem trước
      await fetchAlbums(); // Fetch lại danh sách album sau khi thêm mới
      await fetchStats(); // Fetch lại thống kê sau khi thêm mới
    } catch (error) {
      toast.error('Error adding album!');
      console.error('Error adding album:', error);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className='flex items-center gap-2 p-2 bg-[#8B5CF6] text-zinc-900 font-bold rounded'
      >
        <FaPlus size={20} />  Add Album
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="bg-zinc-900 rounded-xl p-6 max-w-md w-full mx-auto mt-20 shadow-xl border border-zinc-700 focus:outline-none"
        overlayClassName="fixed inset-0 bg-black/50 flex items-start justify-center z-50"
      >
        <h2 className='text-lg font-semibold text-white '>Add New Album</h2>
        <p className='text-zinc-600 mb-4'>Add a new album to your collection</p>
        <div
        onClick={() => imageRef.current?.click()}
        className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer text-zinc-400 hover:bg-zinc-800 relative"
      >
        {imagePreview ? (
          <img src={imagePreview} alt="Ảnh bìa" className="w-32 h-32 object-cover" />
        ) : (
          <>
            <MdOutlineCloudUpload size={24} />
            <span>Cover photo</span>
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
      <div className="space-y-4 mt-4">
          <div className='flex flex-col gap-2'>
            <label htmlFor="title" className='text-zinc-100'>Album Title</label>
          <input
          id='title'
            type="text"
            name="title"
            value={newAlbum.title}
            onChange={handleChange}
            placeholder="Album Title"
            className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded text-white"
          />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="artist" className='text-zinc-100'>Artist</label>
            <input
            id='artist'
            type="text"
            name="artist"
            value={newAlbum.artist}
            onChange={handleChange}
            placeholder="Artist"
            className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded text-white"
          />
          </div>
         <div className='flex flex-col gap-2'>
            <label htmlFor="releaseYear" className='text-zinc-100'>Release Year</label>
          <input
          id='releaseYear'
            type="number"
            name="releaseYear"
            value={newAlbum.releaseYear}
            onChange={handleChange}
            placeholder="Release Year"
            className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded text-white"
          />
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
            onClick={handleAddAlbum}
            disabled={isLoading}
            className="px-4 py-2 bg-[#8B5CF6] hover:bg-[#8B5CF6]/80 text-black rounded"
          >
            {isLoading ? "Loading..." : "Add album"}
          </button>
        </div>
      </Modal>
      
    </div>
  )
}

export default AddAlbumDialog