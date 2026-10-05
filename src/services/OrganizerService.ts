import axios from 'axios'
import type { Organizer } from '@/types'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  saveOrganizer(organizer: { name: string; image?: string }) {
    return apiClient.post('/organizers', organizer)
  },
  getOrganizer(id: number) {
    return apiClient.get('/organizers/' + id)
  }
}