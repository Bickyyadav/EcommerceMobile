import React from 'react'
import { useApi } from '../lib/api'
import { useQuery } from '@tanstack/react-query';
import { Product } from '../types';

const useProducts = () => {
    const api = useApi();
    const result = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            try {
                const { data } = await api.get<Product[]>("/products");
                return data;
            } catch (error) {
                console.error("API Fetch Error:", error);
                throw error;
            }
        },
    });
    return result;

}

export default useProducts
