import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_AUCTION_URL,
  withCredentials: false,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
})

export default {
  getItems(perPage: number, page: number) {
    return apiClient.get('/auctionItems?_limit=' + perPage + '&_page=' + page)
  },
  searchItems(keyword: string, perPage: number, page: number) {
    const k = encodeURIComponent(keyword)
    return apiClient.get(
      '/auctionItems?description=' + k + '&type=' + k + '&_limit=' + perPage + '&_page=' + page,
    )
  },
}