import { AxiosHttpClient } from './AxiosHttpClient';
import type { HttpClientInterface } from './HttpClientInterface';

class ApiProvider {
    private static instance: HttpClientInterface;

    public static getInstance(): HttpClientInterface {
        if (!ApiProvider.instance) {
            // In a real app, baseURL might come from environment variables
            // For now, pointing to the local json-server
            const baseURL = 'http://localhost:3001';
            ApiProvider.instance = new AxiosHttpClient(baseURL);
        }
        return ApiProvider.instance;
    }
}

export const api = ApiProvider.getInstance();
