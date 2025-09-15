import React from 'react'
import { GiLoveSong } from 'react-icons/gi'
import SongsTable from './SongsTable'
import AddSongDialog from './AddSongDialog'
const SongSTabContent = () => {
  return (
    // khung
    <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl overflow-hidden"> 
    {/* header */}
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <GiLoveSong className="size-5 text-emerald-500" />
            Songs Library
          </h2>
          <p className="text-sm text-zinc-400">Manage your music tracks</p>
        </div>
        <AddSongDialog />
      </div>
    </div>
    <div className="p-6">
      <SongsTable />
    </div>
  </div>
  )
}

export default SongSTabContent