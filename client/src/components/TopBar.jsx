import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GoHomeFill } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { MdDownloading } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { use, useEffect, useState } from 'react';
import useStore from '../store/useStore';


const TopBar = () => {
    const { user, fetchUser, logout } = useStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (query.trim() !== '') {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        } else {
            navigate('/')
        }
    }, [query])

    useEffect(() => {
        fetchUser();
    }, [location.pathname]);

    const handleLogout = () => {
        logout();
        navigate('/');
        setShowMenu(false);
    };


    return (
        <div className='flex items-center justify-between' >
            <div className='flex'>
                <div className='m-[20px]'>
                    <Link to='/'>
                        <svg className='w-[38px] h-[38px]' viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                            <path d="M128 0C57.308 0 0 57.309 0 128c0 70.696 57.309 128 128 128 70.697 0 128-57.304 128-128C256 57.314 198.697.007 127.998.007l.001-.006Zm58.699 184.614c-2.293 3.76-7.215 4.952-10.975 2.644-30.053-18.357-67.885-22.515-112.44-12.335a7.981 7.981 0 0 1-9.552-6.007 7.968 7.968 0 0 1 6-9.553c48.76-11.14 90.583-6.344 124.323 14.276 3.76 2.308 4.952 7.215 2.644 10.975Zm15.667-34.853c-2.89 4.695-9.034 6.178-13.726 3.289-34.406-21.148-86.853-27.273-127.548-14.92-5.278 1.594-10.852-1.38-12.454-6.649-1.59-5.278 1.386-10.842 6.655-12.446 46.485-14.106 104.275-7.273 143.787 17.007 4.692 2.89 6.175 9.034 3.286 13.72v-.001Zm1.345-36.293C162.457 88.964 94.394 86.71 55.007 98.666c-6.325 1.918-13.014-1.653-14.93-7.978-1.917-6.328 1.65-13.012 7.98-14.935C93.27 62.027 168.434 64.68 215.929 92.876c5.702 3.376 7.566 10.724 4.188 16.405-3.362 5.69-10.73 7.565-16.4 4.187h-.006Z" fill='#fff' />
                        </svg>
                    </Link>
                </div>

                <div className='flex justify-center items-center'>
                    <Link to={'/'}>
                        <div className='bg-[#282828] rounded-[50%] flex justify-center items-center p-[8px] ml-[10px] mr-[12px]'>
                            <GoHomeFill className='h-[32px] w-[32px]' />
                        </div>
                    </Link>
                    <div className='p-[9px] bg-[#2A2A2A] flex items-center rounded-[500px] w-[450px] border-[3px] border-transparent hover:border-white transition-colors duration-200'>
                        <IoIosSearch className='h-[30px] w-[30px] mr-[8px]' />
                        <input className='bg-[#2A2A2A] flex-1 outline-none text-white' type="text" placeholder='Bạn mún phát nội dung nào' value={query}
                            onChange={(e) => setQuery(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className='flex items-center'>
                {
                    !user ? (
                        <>
                            <ul className='mr-[10px] flex'>
                                <li className='text-[#656565] font-bold cursor-pointer hover:text-white transform transition duration-200 hover:scale-[1.04]'>Premium</li>
                                <li className='text-[#656565] font-bold cursor-pointer hover:text-white transform transition duration-200 hover:scale-[1.04] mx-[10px]'>Hỗ trợ</li>
                                <li className='text-[#656565] font-bold cursor-pointer hover:text-white transform transition duration-200 hover:scale-[1.04]'>Tải xuống</li>
                                <li className='border-r pr-[25px]'></li>
                            </ul>

                            <ul className='mx-[10px] flex items-center justify-center'>
                                <li className='flex items-center justify-center text-[#656565] font-bold cursor-pointer hover:text-white transform transition duration-200 hover:scale-[1.04]'>
                                    <MdDownloading className='mr-[5px]' /> Cài đặt ứng dụng
                                </li>
                                <li className='text-[#656565] font-bold ml-[35px] mr-[10px] cursor-pointer hover:text-white transform transition duration-200 hover:scale-[1.04] '>
                                    <Link to='/register'>Đăng kí</Link>
                                </li>
                                <li className='flex items-center justify-center text-black bg-white px-[30px] py-[10px] rounded-[9999px] text-center font-bold hover:bg-[#F0F0F0] transform transition duration-200 hover:scale-[1.04]'>
                                    <Link to='/login'>Đăng nhập</Link>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <>
                            <ul className='mx-[100px] flex items-center justify-center'>
                                <li className='flex items-center justify-center text-black bg-white px-[20px] py-[5px] mr-[15px] rounded-[9999px] text-center font-bold hover:bg-[#F0F0F0] transform transition duration-200 hover:scale-[1.04]'>
                                    Khám phá Premium
                                </li>
                                <li className='flex items-center justify-center text-[#656565] font-bold cursor-pointer hover:text-white transform transition duration-200 hover:scale-[1.04]'>
                                    <MdDownloading className='mr-[5px]' /> Cài đặt ứng dụng
                                </li>
                                <li className=' flex items-center justify-center text-[#656565] font-bold ml-[15px] mr-[10px] cursor-pointer hover:text-white transform transition duration-200 hover:scale-[1.04] '>
                                    <FaRegBell className='h-[18px] w-[18px] mr-[10px]' />
                                </li>
                                <li
                                    className='relative'
                                    onMouseEnter={() => setShowMenu(true)}
                                    onMouseLeave={() => setShowMenu(false)}
                                >
                                    <div
                                        className='px-[10px] py-[10px] flex items-center justify-center bg-[#1E1E1E] rounded-full hover:text-white transition duration-200 hover:scale-[1.04] cursor-pointer'
                                    >
                                        <img
                                            src={user.imageURL}
                                            alt="Avatar"
                                            className='w-[32px] h-[32px] rounded-full'
                                        />
                                    </div>

                                    {/* Hover: hiện menu đầy đủ */}
                                    <div
                                        className={`absolute top-[55px] right-0 bg-[#2a2a2a] text-white rounded-md shadow-lg w-[200px] z-50 transition-all duration-300 ease-in-out transform ${showMenu ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none -translate-y-2'
                                            }`}
                                    >
                                        <div className='absolute top-[-10px] h-[10px] w-[200px] bg-transparent'>

                                        </div>
                                        <ul>
                                            {user.role === 'admin' ? (
                                                <>
                                                    <li className='px-4 py-2 hover:bg-[#3a3a3a] cursor-pointer'
                                                        onClick={() => {
                                                            navigate(`/profile/${user._id}`);
                                                            setShowMenu(false);
                                                        }}>
                                                        Tài khoản
                                                    </li>
                                                    <li
                                                        className='px-4 py-2 hover:bg-[#3a3a3a] cursor-pointer'
                                                        onClick={() => {
                                                            navigate('/admin');
                                                            setShowMenu(false);
                                                        }}
                                                    >
                                                        Vào trang admin
                                                    </li>
                                                    <li
                                                        className='px-4 py-2 hover:bg-[#3a3a3a] cursor-pointer rounded-[8px]'
                                                        onClick={handleLogout}
                                                    >
                                                        Đăng xuất
                                                    </li>
                                                </>
                                            ) : (
                                                <>

                                                    <li className='px-4 py-2 hover:bg-[#3a3a3a] cursor-pointer'
                                                        onClick={() => {
                                                            navigate(`/profile/${user._id}`);
                                                            setShowMenu(false);
                                                        }}>
                                                        Tài khoản
                                                    </li>
                                                    <li
                                                        className='px-4 py-2 hover:bg-[#3a3a3a] cursor-pointer rounded-[8px]'
                                                        onClick={handleLogout}
                                                    >
                                                        Đăng xuất
                                                    </li>
                                                </>
                                            )}
                                        </ul>
                                    </div>

                                </li>

                            </ul>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default TopBar;
