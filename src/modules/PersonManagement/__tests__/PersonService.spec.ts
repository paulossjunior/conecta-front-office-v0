import { describe, it, expect, vi, beforeEach } from 'vitest'
import { PersonService } from '../api/PersonService'
import { api } from '@/api/ApiProvider'
import type { Person } from '../models/PersonDTOs'

// Mock api
vi.mock('@/api/ApiProvider', () => ({
    api: {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
    }
}))

describe('PersonService', () => {
    const mockPerson: Person = {
        id: '1',
        name: 'John Doe',
        address: '123 Main St',
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01'
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('getAll', () => {
        it('should fetch all persons', async () => {
            vi.mocked(api.get).mockResolvedValue([mockPerson])

            const result = await PersonService.getAll()

            expect(api.get).toHaveBeenCalledWith('/persons')
            expect(result).toEqual([mockPerson])
        })
    })

    describe('getById', () => {
        it('should fetch a person by ID', async () => {
            vi.mocked(api.get).mockResolvedValue(mockPerson)

            const result = await PersonService.getById('1')

            expect(api.get).toHaveBeenCalledWith('/persons/1')
            expect(result).toEqual(mockPerson)
        })
    })

    describe('create', () => {
        it('should create a person successfully when no duplicate exists', async () => {
            // Mock validation: No duplicates found
            vi.mocked(api.get).mockResolvedValue([])
            vi.mocked(api.post).mockResolvedValue(mockPerson)

            const dto = { name: 'John Doe', address: '123 Main St' }
            const result = await PersonService.create(dto)

            // Verification of duplicate check
            expect(api.get).toHaveBeenCalled() // It calls getAll internally
            // Verification of create
            expect(api.post).toHaveBeenCalledWith('/persons', expect.objectContaining({
                name: 'John Doe',
                address: '123 Main St'
            }))
            expect(result).toEqual(mockPerson)
        })

        it('should throw error when person with same name and address exists', async () => {
            // Mock validation: Duplicate found
            vi.mocked(api.get).mockResolvedValue([mockPerson])

            const dto = { name: 'John Doe', address: '123 Main St' }

            await expect(PersonService.create(dto)).rejects.toThrow('Conflict: A person with this Name and Address already exists.')

            expect(api.post).not.toHaveBeenCalled()
        })
    })

    describe('update', () => {
        it('should update a person successfully when no duplicate exists', async () => {
            // Mock validation: No duplicates found
            vi.mocked(api.get).mockResolvedValue([])
            vi.mocked(api.put).mockResolvedValue(mockPerson)

            const dto = { name: 'Jane Doe', address: '456 Elm St' }
            const result = await PersonService.update('1', dto)

            // Verification of duplicate check
            expect(api.get).toHaveBeenCalled()
            // Verification of update
            expect(api.put).toHaveBeenCalledWith('/persons/1', expect.objectContaining({
                name: 'Jane Doe',
                address: '456 Elm St'
            }))
            expect(result).toEqual(mockPerson)
        })

        it('should allow update if the duplicate found is the person itself', async () => {
            // Mock validation: One duplicate found (itself)
            vi.mocked(api.get).mockResolvedValue([mockPerson])
            vi.mocked(api.put).mockResolvedValue(mockPerson)

            const dto = { name: 'John Doe', address: '123 Main St' }
            const result = await PersonService.update('1', dto)

            // Verification of update
            expect(api.put).toHaveBeenCalledWith('/persons/1', expect.anything())
        })

        it('should throw error when updating to a name+address that belongs to another person', async () => {
            // Mock validation: Duplicate found (another person)
            const anotherPerson = { ...mockPerson, id: '2' }
            vi.mocked(api.get).mockResolvedValue([anotherPerson])

            const dto = { name: 'John Doe', address: '123 Main St' }

            await expect(PersonService.update('1', dto)).rejects.toThrow('Conflict: A person with this Name and Address already exists.')

            expect(api.put).not.toHaveBeenCalled()
        })
    })

    describe('delete', () => {
        it('should delete a person by ID', async () => {
            vi.mocked(api.delete).mockResolvedValue(undefined)

            await PersonService.delete('1')

            expect(api.delete).toHaveBeenCalledWith('/persons/1')
        })
    })
})
