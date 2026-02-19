<script setup lang="ts">
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import type { CreatePersonDTO } from '../models/PersonDTOs'

const props = defineProps<{
  initialData?: CreatePersonDTO
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', data: CreatePersonDTO): void
}>()

const schema = toTypedSchema(
  z.object({
    name: z.string().min(1, 'Name is required'),
    address: z.string().min(1, 'Address is required')
  })
)

const { handleSubmit, errors, defineField } = useForm<CreatePersonDTO>({
  validationSchema: schema,
  initialValues: props.initialData,
})

const [name, nameAttrs] = defineField('name')
const [address, addressAttrs] = defineField('address')

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-4">
    <UFormGroup label="Name" name="name" :error="errors.name">
      <UInput v-model="name" v-bind="nameAttrs" placeholder="John Doe" />
    </UFormGroup>

    <UFormGroup label="Address" name="address" :error="errors.address">
      <UInput v-model="address" v-bind="addressAttrs" placeholder="123 Main St" />
    </UFormGroup>

    <div class="flex justify-end">
      <UButton type="submit" :loading="loading" color="primary">
        Save
      </UButton>
    </div>
  </form>
</template>
