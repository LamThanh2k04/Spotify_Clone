import React, { useEffect, useRef } from 'react'
import { usePlayerStore } from '../store/usePlayerStore'

const AudioPlayer = () => {
    const audioRef = useRef(null)
    const preSongRef = useRef(null)

    const { currentSong, isPlaying, playNext } = usePlayerStore()

    // handle play/pause
    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying])

    // handle song end
    useEffect(() => {
        const audio = audioRef.current;

        const handleEnded = () => {
            playNext();
        };

        audio?.addEventListener("ended", handleEnded);

        return () => audio?.removeEventListener("ended", handleEnded);
    }, [playNext]);

    // handle song changes 
    useEffect(() => {
        if (!audioRef.current || !currentSong) {
            return
        }
        const audio = audioRef.current

        const isSongChange = preSongRef.current !== currentSong?.audioURL
        if (isSongChange) {
            audio.src = currentSong?.audioURL
            audio.currentTime = 0
            preSongRef.current = currentSong?.audioURL
            if (isPlaying) {
                audio.play()
            }
        }
    },[currentSong, isPlaying])

    return (
        <audio ref={audioRef} />
    )
}

export default AudioPlayer