import React, { useEffect } from 'react'
import useStore from '../store/useStore'
import { RiPlayListFill } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import PlaylistSkeleton from '../components/PlaylistSkeleton';
import { Link } from 'react-router-dom';
const LeftSideBar = () => {
  const { user, albums, fetchAlbums, isLoading } = useStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums])
  return (
    <div className={`${user ?  "bg-[#121212] min-w-[350px] max-h-[560px] rounded-lg px-[15px] py-[20px]" : "bg-[#121212] max-w-[340px] max-h-[560px] rounded-lg px-[15px] py-[20px]"}`}>
      {
        !user ? (
          <div className='select-none'>
            <div className='flex items-center justify-between'>
              <span className='font-bold'>Thư viện</span>
              <button className=' group px-2 py-2 hover:bg-[#1E1E1E] rounded-full '>
                <MdAdd className=' size-6 text-zinc-400 group-hover:text-white ' />
              </button>
            </div>

            <div className='flex flex-col my-5 bg-[#1F1F1F] px-[16px] py-[12px] rounded-lg gap-1'>
              <span className='font-bold'>Tạo danh sách phát đầu tiên của bạn</span>
              <span className='text-sm'>Rất dễ chúng tôi sẽ giúp bạn</span>
              <button className='mt-4 px-4 py-2 flex items-center justify-center bg-white max-w-[160px] text-black font-bold rounded-full hover:scale-[1.04] transition-transform duration-200'>
                <span className='text-[11px]'>
                  Tạo danh sách phát mới
                </span>
              </button>
            </div>

            <div className='flex flex-col my-5 bg-[#1F1F1F] px-[16px] py-[12px] rounded-lg gap-1'>
              <span className='font-bold'>Hãy cùng tìm và theo dõi một số podcast</span>
              <span className='text-sm'>Chúng tôi sẽ cập nhật cho bạn thông tin về các tập mới </span>
              <button className='mt-4 px-4 py-2 flex items-center justify-center bg-white max-w-[160px] text-black font-bold rounded-full hover:scale-[1.04] transition-transform duration-200'>
                <span className='text-[11px]'>
                  Duyệt xem podcast
                </span>
              </button>
            </div>

            <div className='flex flex-col gap-3'>
              <div className='flex items-center text-[12px] gap-4 text-[#7F7F7F]'>
                <span>Pháp lý</span>
                <span>Trung tâm an toàn và quyền riêng tư</span>
              </div>
              <div className='flex items-center text-[12px] gap-4 text-[#7F7F7F]'>
                <span>Chính sách quyền riêng tư</span>
                <span>Cookie</span>
                <span>Giới thiệu quảng cáo</span>
              </div>
              <div className='flex items-center text-[12px] gap-4 text-[#7F7F7F]'>
                <span>Hỗ trợ tiếp cận</span>
              </div>
              <div className='flex items-center text-[12px] gap-4 text-[#7F7F7F]'>
                <span>Cookie</span>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex flex-col '>
            <div className='flex items-center text-left mb-[15px] ml-[8px] '>
              <RiPlayListFill className='h-[20px] w-[20px]' /> <span className='ml-[10px] font-bold text-[15px]'>PlayLists</span>
            </div>
            <div className="">
              {/* overflow-y-scroll h-80 rounded-md scrollbar-hide scrollbar-visible */}
              <ul>
                {
                  isLoading ? (
                    <PlaylistSkeleton />
                  ) : (
                    albums.map((album) => (
                      <Link to={`/albums/${album._id}`} key={album._id}
                        className='p-2 flex items-center hover:bg-zinc-800 rounded-md gap-3  cursor-pointer '
                      >
                        <img src={album.imageURL} alt={album.artist} className='size-12 rounded-md object-cover flex-shrink-0' />
                        <div className='flex-1 min-w-0'>
                          <p className='font-medium '>{album.title}</p>
                          <p className='text-sm text-zinc-400 '>Album • {album.artist}</p>
                        </div>
                      </Link>
                    ))
                  )
                }
              </ul>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default LeftSideBar