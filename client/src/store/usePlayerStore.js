import { create } from "zustand";


export const usePlayerStore = create((set,get)=>({
    currentSong : null,
    isPlaying : false,
    queue : [],
    currentIndex : -1,

    initalizeQueue : (songs) => {
        set({
           queue : songs,
           currentSong : get().currentSong || songs[0],
            currentIndex : get().currentIndex === -1 ? 0 : get().currentIndex,
        })
    },

    playAlbum : (songs,startIndex = 0) => {
        if(songs.length === 0 ) return;

        const song = songs[startIndex]
        set({
            queue : songs,
            currentSong : song,
            currentIndex : startIndex,
            isPlaying : true

        })
    },

    setCurrentSong : (song) =>{
        if(!song) return;
        const songIndex = get().queue.findIndex((s)=> s._id === song._id);
        set({
            currentSong : song,
            isPlaying : true,
            currentIndex : songIndex !== -1 ? songIndex : get().currentIndex
        })
    },

    togglePlay : () => {
        set({
            isPlaying : !get().isPlaying
        })
    },

    playNext : () => {
        const {currentIndex,queue} = get();
        const nextIndex = currentIndex + 1

        if(nextIndex < queue.length) {
            set({
                currentSong : queue[nextIndex],
                currentIndex : nextIndex,
                isPlaying : true,
            })
        } 
        else
         {
            set({
                isPlaying : false
            })
        }
    },

    playPrevious : () => {
        const { currentIndex, queue } = get();
		const prevIndex = currentIndex - 1;

        if(prevIndex >=0) {
            set({
                currentSong : queue[prevIndex],
                currentIndex : prevIndex,
                isPlaying : true
            })
        } else {
            set({
                isPlaying : false
            })
        }
    }

})) 