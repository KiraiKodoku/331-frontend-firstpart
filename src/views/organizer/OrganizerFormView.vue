<script setup lang="ts">
import type { Organizer } from '@/types'
import { ref } from 'vue'
import OrganizerService from '@/services/OrganizerService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const organizer = ref<Organizer>({
  id: null,
  organizationName: '',
  address: '',
})
const router = useRouter()
const store = useMessageStore()

function saveOrganizer() {
  OrganizerService.saveOrganizer(organizer.value)
    .then((response) => {
      store.updateMessage(
        'You have successfully added a new organizer: ' + response.data.organizationName,
      )
      setTimeout(() => {
        store.resetMessage()
      }, 3000)
      organizer.value = { id: null, organizationName: '', address: '' }
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}
</script>

<template>
  <div>
    <h1>Add an organizer</h1>
    <form @submit.prevent="saveOrganizer">
      <h3>Name of the organization</h3>
      <label class="block text-gray-500 font-bold">Organization Name</label>
      <input
        v-model="organizer.organizationName"
        type="text"
        placeholder="Organization Name"
        required
        class="h-13 w-1/4 px-2.5 text-xl border border-gray-400
               focus:border-emerald-500 focus:outline-none mb-6"
      />
      <h3>Where is the organization?</h3>
      <label class="block text-gray-500 font-bold">Address</label>
      <input
        v-model="organizer.address"
        type="text"
        placeholder="Address"
        required
        class="h-13 w-1/4 px-2.5 text-xl border border-gray-400
               focus:border-emerald-500 focus:outline-none mb-6"
      />
      <button
        class="flex w-fit mx-auto items-center justify-center h-13 px-10
               rounded-md font-semibold whitespace-nowrap border border-gray-400
               focus:border-emerald-500 transition-all duration-200 ease-linear
               hover:scale-105 hover:border-emerald-500 hover:shadow-lg active:scale-100
               focus:outline-none"
        type="submit"
      >
        Submit
      </button>
    </form>

    <pre>{{ organizer }}</pre>
  </div>
</template>