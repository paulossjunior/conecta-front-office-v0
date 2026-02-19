<script setup lang="ts">
import type { Person } from '../models/PersonDTOs'

const props = defineProps<{
  persons: Person[]
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'delete', id: string): void
  (e: 'edit', id: string): void
}>()

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'address', label: 'Address' },
  { key: 'actions', label: 'Actions' }
]

const items = (row: Person) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => emit('edit', row.id)
  }, {
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => emit('delete', row.id)
  }]
]
</script>

<template>
  <UTable :rows="persons" :columns="columns as any" :loading="!!loading">
    <template #actions-data="{ row }">
      <UDropdown :items="items(row as unknown as Person)">
        <UButton color="primary" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
  </UTable>
</template>
