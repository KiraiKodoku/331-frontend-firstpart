<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import OrganizerService from '@/services/OrganizerService'
import EventService from '@/services/EventService'
import type { Organizer } from '@/types'

const props = defineProps<{ id: string }>()
const router = useRouter()
const organizer = ref<Organizer | null>(null)
const imageUrl = ref('')

onMounted(() => {
  OrganizerService.getOrganizer(Number(props.id))
    .then((response) => {
      organizer.value = response.data
      if (response.data.image) {
        EventService.getEventImages([response.data.image]).then((urls) => {
          imageUrl.value = urls[0]
        })
      }
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
})
</script>

<template>
  <div v-if="organizer">
    <h1>{{ organizer.name }}</h1>
    <p>Organizer id: {{ organizer.id }}</p>
    <img v-if="imageUrl" :src="imageUrl" alt="organizer image" class="mx-auto w-48 rounded border-2 border-gray-200" />
  </div>
</template>