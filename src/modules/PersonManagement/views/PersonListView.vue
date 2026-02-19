<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import PersonList from '../components/PersonList.vue'
import { PersonService } from '../api/PersonService'

const router = useRouter()
const queryClient = useQueryClient()
const errorMsg = ref('')

// Fetch Persons
const { data: persons, isLoading, isError, error } = useQuery({
  queryKey: ['persons'],
  queryFn: () => PersonService.getAll()
})

// Delete Mutation
const { mutate: deletePerson } = useMutation({
  mutationFn: (id: string) => PersonService.delete(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['persons'] })
  },
  onError: (err: any) => {
    errorMsg.value = err.message || 'Failed to delete person'
  }
})

function handleDelete(id: string) {
  if (confirm('Are you sure you want to delete this person?')) {
    deletePerson(id)
  }
}

function handleEdit(id: string) {
  router.push(`/persons/${id}/edit`)
}
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Persons List</h1>
      <UButton to="/persons/new" color="primary" icon="i-heroicons-plus">
        New Person
      </UButton>
    </div>

    <UAlert
      v-if="isError"
      icon="i-heroicons-exclamation-triangle"
      color="error"
      variant="soft"
      title="Error"
      :description="String(error)"
      class="mb-6"
    />

    <UAlert
      v-if="errorMsg"
      icon="i-heroicons-exclamation-triangle"
      color="error"
      variant="soft"
      title="Action Error"
      :description="errorMsg"
      class="mb-6"
    />

    <UCard>
      <PersonList 
        :persons="persons || []" 
        :loading="isLoading" 
        @delete="handleDelete" 
        @edit="handleEdit" 
      />
    </UCard>
  </div>
</template>
