<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import PersonForm from '../components/PersonForm.vue'
import { PersonService } from '../api/PersonService'
import type { CreatePersonDTO } from '../models/PersonDTOs'

const router = useRouter()
const queryClient = useQueryClient()
const errorMsg = ref('')

const { mutate, isPending } = useMutation({
  mutationFn: (data: CreatePersonDTO) => PersonService.create(data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['persons'] })
    router.push('/persons') // Redirect to list (US-004)
  },
  onError: (error: any) => {
    console.error(error)
     // Extract error message from generic error or specific mock error
    errorMsg.value = error.message || 'Failed to create person'
  }
})

function handleSubmit(data: CreatePersonDTO) {
  errorMsg.value = ''
  mutate(data)
}
</script>

<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Create New Person</h1>

    <UAlert
      v-if="errorMsg"
      icon="i-heroicons-exclamation-triangle"
      color="error"
      variant="soft"
      title="Error"
      :description="errorMsg"
      class="mb-6"
    />

    <UCard>
      <PersonForm :loading="isPending" @submit="handleSubmit" />
    </UCard>
  </div>
</template>
