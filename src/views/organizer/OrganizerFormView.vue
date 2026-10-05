<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import OrganizerService from '@/services/OrganizerService'
import BaseInput from '@/components/BaseInput.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import { useMessageStore } from '@/stores/message'

const name = ref('')
const images = ref<string[]>([])
const router = useRouter()
const store = useMessageStore()

// only one image is allowed for an organizer
watch(images, (list) => {
  if (list.length > 1) {
    images.value = [list[0]]
  }
})

function saveOrganizer() {
  OrganizerService.saveOrganizer({ name: name.value, image: images.value[0] })
    .then((response) => {
      router.push({ name: 'organizer-detail-view', params: { id: response.data.id } })
      store.updateMessage('You have added a new organizer: ' + response.data.name)
      setTimeout(() => store.resetMessage(), 3000)
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
      <BaseInput v-model="name" type="text" label="Organizer name" />
      <h3>The image of the organizer</h3>
      <ImageUpload v-model="images" :max="1" />
      <button
        class="flex w-fit mx-auto items-center justify-center h-13 px-10 rounded-md font-semibold whitespace-nowrap border border-gray-400 hover:border-emerald-500 hover:shadow-lg focus:outline-none"
        type="submit"
      >
        Submit
      </button>
    </form>
  </div>
</template>