<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AuctionService from '@/services/AuctionService'
import BaseInput from '@/components/BaseInput.vue'

interface Bid { id: number; amount: number; datetime: string }
interface AuctionItem {
  id: number
  description: string
  type: string
  bids: Bid[]
  successfulBid: Bid | null
}

const items = ref<AuctionItem[]>([])
const keyword = ref('')

function load() {
  const call = keyword.value === ''
    ? AuctionService.getItems(10, 1)
    : AuctionService.searchItems(keyword.value, 10, 1)
  call.then((response) => { items.value = response.data })
}
onMounted(load)
</script>

<template>
  <h1>Auction Items</h1>
  <main class="flex flex-col items-center">
    <div class="w-64">
      <BaseInput v-model="keyword" type="text" label="Search description or type..." @input="load" />
    </div>
    <div v-for="item in items" :key="item.id" class="border border-gray-400 w-1/2 p-4 mb-4">
      <h2>{{ item.description }}</h2>
      <span>Type: {{ item.type }}</span>
      <p>Bids: {{ item.bids.length }}</p>
      <p v-if="item.successfulBid">Sold for {{ item.successfulBid.amount }}</p>
      <p v-else>Not sold yet</p>
    </div>
  </main>
</template>