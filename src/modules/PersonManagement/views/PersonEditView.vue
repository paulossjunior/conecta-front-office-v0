<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import PersonForm from '@/modules/PersonManagement/components/PersonForm.vue'
import { PersonService } from '@/modules/PersonManagement/api/PersonService'
import type { UpdatePersonDTO } from '@/modules/PersonManagement/models/PersonDTOs'

const route = useRoute()
const router = useRouter()
const queryClient = useQueryClient()
const personId = computed(() => route.params.id as string)
const errorMsg = ref('')

// Fetch Person
const { data: person, isLoading, isError, error } = useQuery({
  queryKey: ['persons', personId],
  queryFn: () => PersonService.getById(personId.value),
  enabled: !!personId.value
})

// Update Mutation
const { mutate, isPending: isSaving } = useMutation({
  mutationFn: (data: UpdatePersonDTO) => PersonService.update(personId.value, data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['persons'] })
    router.push('/persons')
  },
  onError: (err: any) => {
    errorMsg.value = err.message || 'Failed to update person'
  }
})

function handleSubmit(data: UpdatePersonDTO) {
  errorMsg.value = ''
  mutate(data)
}
</script>

<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Edit Person</h1>

    <UAlert
      v-if="isError"
      icon="i-heroicons-exclamation-triangle"
      color="error"
      variant="soft"
      title="Error Loading Person"
      :description="String(error)"
      class="mb-6"
    />

    <UAlert
      v-if="errorMsg"
      icon="i-heroicons-exclamation-triangle"
      color="error"
      variant="soft"
      title="Error"
      :description="errorMsg"
      class="mb-6"
    />

    <UCard v-if="!isLoading && person">
      <PersonForm 
        :initial-data="person" 
        :loading="isSaving" 
        @submit="handleSubmit" 
      />
    </UCard>
    
    <div v-else-if="isLoading" class="flex justify-center py-8">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin text-2xl" />
    </div>
  </div>
</template>
