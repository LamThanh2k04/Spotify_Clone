import React from 'react'
import { IoLibrary } from "react-icons/io5";
import { LuListMusic } from "react-icons/lu";
import { HiOutlinePlayCircle } from "react-icons/hi2";
import { LuUsers } from "react-icons/lu";
import useStore from '../../../store/useStore';
import StatsCard from './StatsCard';
const DashbroadStats = () => {
  const { stats } = useStore()
  console.log(stats)
  const statsData = [
    {
      icon: LuListMusic,
      label: 'Total Songs',
      value: stats?.totalSongs.toString() || 0,
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      icon: IoLibrary,
      label: 'Total Albums',
      value: stats?.totalAlbums.toString() || 0,
      bgColor: "bg-violet-500/10",
      iconColor: "text-violet-500",
    },
    {
      icon: LuUsers,
      label: 'Total Artists',
      value: stats?.totalArtist?.toString() || 0,
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-500",
    },
    {
      icon: HiOutlinePlayCircle,
      label: 'Total Users',
      value: stats?.totalUsers.toLocaleString('vi-VN') || 0,
      bgColor: "bg-sky-500/10",
			iconColor: "text-sky-500",
    }
  ]
  return (
<div className='grid grid-cols-4 gap-4 my-8'>

      {
        statsData.map((stat)=>(
          <StatsCard
            key={stat.label}
            icon = {stat.icon}
            label = {stat.label}
            value = {stat.value}
            bgColor = {stat.bgColor}
            iconColor = {stat.iconColor}
          />
        ))
      }
    </div>
  )
}

export default DashbroadStats