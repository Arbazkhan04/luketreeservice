import api from './api';

export const getAboutData = async () => {
    const response = await api.get('/AboutManagementRouter/getAboutData')
    return response.data;
}

export const updateAboutData = async (reviewId,data) => {
    const response = await api.put(`AboutManagementRouter/updateAboutData/${reviewId}`,data);
    return response.data;
}