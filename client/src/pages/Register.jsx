import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextInput from '../components/TextInput'
import Button from '../components/Button'


const Register = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const fileInputRef = useRef(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        e.preventDefault();
        setLoading(true);  // Thêm dòng này
        setError(null);

        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp');
            setLoading(false);
            return;
        }
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setError('Vui lòng điền đầy đủ thông tin');
            setLoading(false);
            return;
        }
        if (!gmailRegex.test(email)) {
            setError('Email không hợp lệ');
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('confirmPassword', confirmPassword);

            if (fileInputRef.current.files[0]) {
                formData.append('imageFile', fileInputRef.current.files[0]);
            }

            await axios.post('/api/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Đăng ký thành công');
            navigate('/login');
        } catch (error) {
            console.error('Đăng ký thất bại', error);
            setError(error.response?.data?.message || 'Lỗi đăng ký!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-[#121212] min-h-screen'>
            <div className='  flex flex-col justify-center ' >
                <div className='flex items-center justify-center mt-[25px] mb-[20px] '>
                    <svg className='w-[40px] h-[40px] ' viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M128 0C57.308 0 0 57.309 0 128c0 70.696 57.309 128 128 128 70.697 0 128-57.304 128-128C256 57.314 198.697.007 127.998.007l.001-.006Zm58.699 184.614c-2.293 3.76-7.215 4.952-10.975 2.644-30.053-18.357-67.885-22.515-112.44-12.335a7.981 7.981 0 0 1-9.552-6.007 7.968 7.968 0 0 1 6-9.553c48.76-11.14 90.583-6.344 124.323 14.276 3.76 2.308 4.952 7.215 2.644 10.975Zm15.667-34.853c-2.89 4.695-9.034 6.178-13.726 3.289-34.406-21.148-86.853-27.273-127.548-14.92-5.278 1.594-10.852-1.38-12.454-6.649-1.59-5.278 1.386-10.842 6.655-12.446 46.485-14.106 104.275-7.273 143.787 17.007 4.692 2.89 6.175 9.034 3.286 13.72v-.001Zm1.345-36.293C162.457 88.964 94.394 86.71 55.007 98.666c-6.325 1.918-13.014-1.653-14.93-7.978-1.917-6.328 1.65-13.012 7.98-14.935C93.27 62.027 168.434 64.68 215.929 92.876c5.702 3.376 7.566 10.724 4.188 16.405-3.362 5.69-10.73 7.565-16.4 4.187h-.006Z" fill='#fff' /></svg>
                </div>

                <div className='flex flex-col items-center justify-center min-w-[338px] text-white'>
                    <h1 className='ml max-w-[324px]  text-[40px] font-bold m-auto text-center leading-[55px]'>Đăng ký để bắt đầu nghe</h1>
                    <form onSubmit={handleRegister} className='flex flex-col mt-[20px]'>
                        <div className='flex flex-row'>
                            <div className='flex-1'>
                                <TextInput
                                    label="Nhập Họ"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Nhập Họ"
                                    required={true}
                                    className={'border border-[#898989] rounded p-[5px] mt-[10px] bg-[#121212] text-white'}
                                />
                            </div>
                            <div className='flex-1 ml-[10px]'>
                                <TextInput
                                    label="Nhập Tên"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Nhập Tên"
                                    required={true}
                                    className={'border border-[#898989] rounded p-[5px] mt-[10px] bg-[#121212] text-white'}
                                />
                            </div>

                        </div>
                        <TextInput
                            label="Nhập địa chỉ email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập địa chỉ email"
                            required={true}
                            className={'border border-[#898989] rounded p-[5px] mt-[10px] bg-[#121212] text-white'}
                        />
                        <TextInput
                            label ="Nhập mật khẩu"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu"
                            required={true}
                            className={'border border-[#898989] rounded p-[5px] mt-[10px] bg-[#121212] text-white'}
                        />
                       <TextInput
                        label={"Nhập lại mật khẩu"}
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Nhập lại mật khẩu"
                        className={'border border-[#898989] rounded p-[5px] mt-[10px] bg-[#121212] text-white'}
                       />
                       <TextInput
                        label={"Ảnh đại diện"}
                        type="file"
                        inputRef={fileInputRef}
                        required={false}
                        placeholder="Chọn ảnh đại diện"
                        accept="image/*"
                        className={'border border-[#898989] rounded p-[5px] mt-[10px] bg-[#121212] text-white'}
                       />
                        {/* <button type='submit' className='p-[5px] mt-[20px] border rounded-[9999px] border-none bg-[#1ed760] text-black font-bold hover:bg-[#3BE477] px-[8px] py-[10px]'>
                            {loading ? 'Đang tải...' : 'Đăng ký'}
                        </button> */}
                        <Button
                            label = {loading ? 'Đang tải...' : 'Đăng ký'}
                            type = "submit"
                            className='p-[5px] mt-[20px] border rounded-[9999px] border-none bg-[#1ed760] text-black font-bold hover:bg-[#3BE477] px-[8px] py-[10px]'
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register