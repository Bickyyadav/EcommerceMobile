
import axiosInstance from "./axios";

export const productApi = {
    getAll: async () => {
        const { data } = await axiosInstance.get('/products');
        return data;
    },
    create: async (formData) => {
        await axiosInstance.post('/admin/products', formData);
    },
    update: async (id, formData) => {
        await axiosInstance.put(`/admin/products/${id}`, formData);
    },
    delete: async (id) => {
        await axiosInstance.delete(`/admin/products/${id}`);
    }
}


export const orderApi = {
    getAll: async () => {
        const { data } = await axiosInstance.get("/admin/orders");
        return data;
    },
    updateStatus: async ({ orderId, status }) => {
        const { data } = await axiosInstance.patch(`/admin/orders/${orderId}/status`, { status });
        return data;
    },
}

export const statsApi = {
    getDashboard: async () => {
        const { data } = await axiosInstance.get("/admin/stats");
        return data;
    },
};


export const customerApi = {
    getAll: async () => {
        const { data } = await axiosInstance.get("/admin/customers");
        return data;
    },
};