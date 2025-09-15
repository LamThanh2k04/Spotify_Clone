import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Google from '../assets/google.svg'
import Facebook from '../assets/facebook.svg'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import axios from 'axios'
import useStore from '../store/useStore'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { fetchUser } = useStore()
  const handleLogin = async (e) => { 
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!email || !password) {
      setError('Vui lòng điền đầy đủ thông tin')
      setLoading(false)
      return
    }
        try {
         const res= await axios.post('/api/login', { email, password })
         localStorage.setItem('token', res.data.token);
         await fetchUser();
          alert('Đăng nhập thành công')
          navigate('/')
        } catch (error) {
          console.log('Đăng nhập thất bại', error)
          setError('Đăng nhập thất bại')
        } finally {
          setLoading(false)
        }
  }
  return (
    <div className='bg-gradient-to-b from-white/10 to-black min-h-screen flex justify-center items-center'>
      <div className='min-w-[710px] max-h-[800px] bg-[#000000] text-white rounded-[10px]'>
        <div className='flex items-center justify-center mt-[20px] mb-[15px] '>
          <svg className='w-[40px] h-[40px] ' viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M128 0C57.308 0 0 57.309 0 128c0 70.696 57.309 128 128 128 70.697 0 128-57.304 128-128C256 57.314 198.697.007 127.998.007l.001-.006Zm58.699 184.614c-2.293 3.76-7.215 4.952-10.975 2.644-30.053-18.357-67.885-22.515-112.44-12.335a7.981 7.981 0 0 1-9.552-6.007 7.968 7.968 0 0 1 6-9.553c48.76-11.14 90.583-6.344 124.323 14.276 3.76 2.308 4.952 7.215 2.644 10.975Zm15.667-34.853c-2.89 4.695-9.034 6.178-13.726 3.289-34.406-21.148-86.853-27.273-127.548-14.92-5.278 1.594-10.852-1.38-12.454-6.649-1.59-5.278 1.386-10.842 6.655-12.446 46.485-14.106 104.275-7.273 143.787 17.007 4.692 2.89 6.175 9.034 3.286 13.72v-.001Zm1.345-36.293C162.457 88.964 94.394 86.71 55.007 98.666c-6.325 1.918-13.014-1.653-14.93-7.978-1.917-6.328 1.65-13.012 7.98-14.935C93.27 62.027 168.434 64.68 215.929 92.876c5.702 3.376 7.566 10.724 4.188 16.405-3.362 5.69-10.73 7.565-16.4 4.187h-.006Z" fill='#fff' /></svg>
        </div>
        <h1 className='text-[32px] mb-[32px] text-center font-bold'>Đăng nhập vào Spotify</h1>
            <div className='flex flex-col items-center justify-center'>
                <Link className='h-[40px] min-w-[350px] px-[31px] py-[25px] mb-[8px] flex flex-row items-center justify-center border  rounded-[9999px] border-[#868686] hover:border-white '>
                <img src={Google} alt="" className='h-[24px] w-[24px]'/>
                <span className='text-[16px] font-bold ml-[40px]'>
                  Đăng nhập bằng Google
                  </span>
                </Link>
                <Link className='h-[40px] min-w-[350px] px-[31px] py-[25px] mb-[8px] flex flex-row items-center justify-center border  rounded-[9999px] border-[#868686] hover:border-white '>
                <img src={Facebook} alt="" className='h-[24px] w-[24px]'/>
                <span className='text-[16px] font-bold ml-[25px]'>
                  Đăng nhập bằng Facebook
                  </span>
                </Link>
            </div>
            <hr className='border-[#292929] w-[500px] mx-auto my-[30px]'></hr>
            <form onSubmit={handleLogin}  className='flex flex-col w-[350px] mx-auto'>
                <TextInput 
                  label ="Nhập địa chỉ email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập địa chỉ email"
                  className={"border border-[#898989] rounded p-[5px] mt-[10px] bg-black text-white"}
                />
                  <TextInput 
                  label ="Nhập mật khẩu"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  className={"border border-[#898989] rounded p-[5px] mt-[10px] bg-black text-white "}
                />
                <Button
                label = {loading ? 'Đang tải...' : 'Đăng nhập'}
                type = 'submit'
                className='p-[5px] mt-[20px] border rounded-[9999px] border-none bg-[#1ed760] text-black font-bold hover:bg-[#3BE477] px-[8px] py-[10px]'
                />
            </form>
            <Link className='flex items-center justify-center my-[20px] hover:text-[#1ed760]'>Quên mật khẩu của bạn?</Link>
            <span className='flex items-center justify-center'>Bạn chưa có tài khoản? <Link to='/register' className='ml-[5px] hover:text-[#1ed760]'>Đăng kí Spotify</Link> </span>
      </div>
    </div>
  )
}

export default Login


