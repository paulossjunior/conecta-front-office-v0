export interface Person {
    id: string;
    name: string;
    address: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreatePersonDTO {
    name: string;
    address: string;
}

export interface UpdatePersonDTO {
    name?: string;
    address?: string;
}
