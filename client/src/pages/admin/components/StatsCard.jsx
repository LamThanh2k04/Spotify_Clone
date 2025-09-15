import React from 'react'

const StatsCard = ({label,icon:Icon,value,bgColor,iconColor}) => {
  return (
    <div className='bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/80 transition-colors rounded-xl'>
        <div className='p-6'>
        <div className='flex items-center gap-4'>
        
                <div className={`p-3 rounded-lg ${bgColor}`}>
                    <Icon className ={`size-6 ${iconColor}`}/>
                </div>
                <div className=''>
                    <p className='text-sm text-zinc-400'>{label}</p>
                    <p className='text-2xl font-bold'>{value}</p>
                </div>
            
        </div>
        </div>
    </div>
  )
}

export default StatsCard