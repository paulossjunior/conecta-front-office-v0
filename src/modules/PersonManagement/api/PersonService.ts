import { api } from '@/api/ApiProvider';
import type { Person, CreatePersonDTO, UpdatePersonDTO } from '../models/PersonDTOs';

const RESOURCE = '/persons';

export const PersonService = {
    async getAll(): Promise<Person[]> {
        return api.get<Person[]>(RESOURCE);
    },

    async getById(id: string): Promise<Person> {
        return api.get<Person>(`${RESOURCE}/${id}`);
    },

    async create(data: CreatePersonDTO): Promise<Person> {
        // Business Rule: Check for duplicates before creating (Client-side simulation of backend rule)
        // Since json-server doesn't support complex unique constraints, we check manually.
        const allPersons = await this.getAll();
        const duplicate = allPersons.find(p => p.name === data.name && p.address === data.address);

        if (duplicate) {
            throw new Error('Conflict: A person with this Name and Address already exists.');
        }

        return api.post<Person>(RESOURCE, {
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
    },

    async update(id: string, data: UpdatePersonDTO): Promise<Person> {
        // Business Rule: Check for duplicates before updating
        if (data.name && data.address) {
            const allPersons = await this.getAll();
            const duplicate = allPersons.find(p => p.name === data.name && p.address === data.address && p.id !== id);
            if (duplicate) {
                throw new Error('Conflict: A person with this Name and Address already exists.');
            }
        }

        return api.put<Person>(`${RESOURCE}/${id}`, {
            ...data,
            updatedAt: new Date().toISOString()
        });
    },

    async delete(id: string): Promise<void> {
        return api.delete<void>(`${RESOURCE}/${id}`);
    }
};
