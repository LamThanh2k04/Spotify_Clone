import React from 'react'
import { LuListMusic } from "react-icons/lu";
import AddAlbumDialog from './AddAlbumDialog';
import AlbumsTable from './AlbumsTable';
const AlbumsTabContent = () => {
  return (
    <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl overflow-hidden"> 
    {/* header */}
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <LuListMusic className="size-5 text-violet-500" />
            Albums Library
          </h2>
          <p className="text-sm text-zinc-400">Manage your album collection</p>
        </div>
        <AddAlbumDialog />
      </div>
    </div>
    <div className="p-6">
      <AlbumsTable />
    </div>
  </div>
  )
}

export default AlbumsTabContent