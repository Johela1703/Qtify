import axios from 'axios'

const api = axios.create({
  baseURL: 'https://qtify-backend.labs.crio.do'
})

export async function fetchTopAlbums() {
  const { data } = await api.get('/albums/top')
  return data
}

export async function fetchNewAlbums() {
  const { data } = await api.get('/albums/new')
  return data
}

export async function fetchSongs() {
  const { data } = await api.get('/songs')
  return data
}

export async function fetchGenres() {
  const { data } = await api.get('/genres')
  return data.data
}
