import { create } from 'zustand'
import axios from 'axios'
import toast from 'react-hot-toast';

const localUser = localStorage.getItem('user');
const useStore = create((set,get) => ({
    user: localUser ? JSON.parse(localUser) : null,
    albums: [],
    songs: [],
    error: null,
    isLoading: false,
    currentAlbum: null,
    madeForYourSongs: [],
    featuredSongs: [],
    trendingSongs: [],
    resultsSongs: [],
    stats: {
        totalSongs: 0,
        totalAlbums: 0,
        totalUsers: 0,
        totalArtists: 0
    },
    favoriteSongs: [],

    fetchUser: async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get('/api/test-user', {
                headers: { Authorization: `Bearer ${token}` },
            });
            set({ user: res.data });

            // Lưu user vào localStorage
            localStorage.setItem('user', JSON.stringify(res.data));
            await get().fetchFavoriteSongs();
        } catch (error) {
            console.log('Error fetch User', error);
            localStorage.removeItem('user'); // nếu fail thì xoá user
        }
    },
    fetchAlbums: async () => {
        set({ isLoading: true });
        try {
            const res = await axios.get('/api/albums');
            set({ albums: res.data, isLoading: false })
        } catch (error) {
            console.error('Lỗi fetch albums:', error);
            set({ isLoading: false });
        }
    },

    fetchAlbumsId: async (albumId) => {
        set({ isLoading: true, currentAlbum: null }); // reset lại album trước khi fetch
        try {
            const res = await axios.get(`/api/albums/${albumId}`);
            set({ currentAlbum: res.data, isLoading: false });
        } catch (error) {
            console.error('Error fetch albumsId:', error);
            set({ isLoading: false, currentAlbum: null }); // giữ currentAlbum là null nếu fetch fail
        }
    },

    fetchFeaturedSongs: async () => {
        set({ isLoading: true, featuredSongs: [] });
        try {
            const res = await axios.get('/api/songs/featured')
            set({ featuredSongs: res.data, isLoading: false })
        } catch (error) {
            console.error('Error fetch featuredSongs :', error);
            set({ isLoading: false, featuredSongs: [] });
        }
    },
    fetchMadeForYourSongs: async () => {
        set({ isLoading: true, madeForYourSongs: [] });
        try {
            const res = await axios.get('/api/songs/made-for-you')
            set({ madeForYourSongs: res.data, isLoading: false })
        } catch (error) {
            console.error('Error fetch madeForYourSongs :', error);
            set({ isLoading: false, madeForYourSongs: [] });
        }
    },
    fetchTrendingSongs: async () => {
        set({ isLoading: true, trendingSongs: [] });
        try {
            const res = await axios.get('/api/songs/trending')
            set({ trendingSongs: res.data, isLoading: false })
        } catch (error) {
            console.error('Error fetch trendingSongs :', error);
            set({ isLoading: false, trendingSongs: [] });
        }
    },

    fetchSongs: async () => {
        set({ isLoading: true, songs: [] })
        try {
            const token = localStorage.getItem('token'); // Thêm dòng này
            console.log("🪪 Token từ localStorage:", token);
            const res = await axios.get("/api/songs", {
                headers: {
                    Authorization: `Bearer ${token}` // Thêm dòng này
                }
            })
            set({ songs: res.data, isLoading: false })
        } catch (error) {
            console.error('Error fetch songs :', error);
            set({ isLoading: false, songs: [] });
        }
    },


    fetchStats: async () => {
        set({
            isLoading: true, stats: {
                totalSongs: 0,
                totalAlbums: 0,
                totalUsers: 0,
                totalArtists: 0
            }
        })
        try {
            const token = localStorage.getItem('token')
            const res = await axios.get('/api/stats', {
                headers: {
                    Authorization: `Bearer ${token}` // Thêm dòng này
                }
            })
            set({ stats: res.data, isLoading: false })
        } catch (error) {
            console.error('Error fetch stats :', error);
            set({
                isLoading: false, stats: {
                    totalSongs: 0,
                    totalAlbums: 0,
                    totalUsers: 0,
                    totalArtists: 0
                }
            });
        }
    },
    deleteSong: async (id) => {
        set({ isLoading: true, error: null })
        try {
            const token = localStorage.getItem('token')
            await axios.delete(`/api/admin/songs/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Thêm dòng này
                }
            });
            set((state) => ({
                songs: state.songs.filter((song) => song._id !== id), 
            }))
            await get().fetchStats();
            toast.success('Song deleted successfully')
        } catch (error) {
            toast.error('Error deleted song')
        } finally {
            set({isLoading : false})
        }
    },
    deleteAlbum: async (id) => {
        set({ isLoading: true, error: null })
        try {
            const token = localStorage.getItem('token')
            await axios.delete(`/api/admin/albums/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}` // Thêm dòng này
                }
            })
            set((state)=>({
                albums : state.albums.filter((album)=> album._id !== id ),
                songs : state.songs.map((song)=>
                song.albumdId === state.albums.find((a)=>a._id ===id)?.title ? {...song,album : null} : song
                ),
            }));
            toast.success("Album deleted successfully")
        } catch (error) {
            toast.error("Failed to delete album: " + error.message);
        } finally {
			set({ isLoading: false });
		}
    },
    fetchResultsSongs : async (query) => {
        if (!query) return
        try {
            const res = await axios.get(`/api/songs/search?q=${query}`)
            set({ resultsSongs: res.data })
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    },
    addFavoriteSong: async (songId) => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.post(`/api/favorite-songs/${songId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Add to favorite songs successfully');
            set((state) => ({
                favoriteSongs: [...state.favoriteSongs, songId],
            }));
        } catch (error) {
            console.error('Error', error);
            toast.error(error.response?.data?.message || 'Error');
        }
    },
    
    removeFavoriteSong: async (songId) => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.delete(`/api/favorite-songs/${songId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Remove from favorite songs successfully');
            set((state) => ({
                favoriteSongs: state.favoriteSongs.filter(id => id !== songId),
            }));
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.response?.data?.message || 'Error');
        }
    },
    
    
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null });
    },
}))

export default useStore;