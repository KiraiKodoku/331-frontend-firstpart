<script setup lang="ts">
import { toRefs } from 'vue'
import { type Event } from '@/types'

const props = defineProps<{
  event: Event
}>()
const { event } = toRefs(props)
</script>
<template>
  <p>{{ event.title }} on {{ event.location }}</p>
  <p>{{ event.description }}</p>
</template>
