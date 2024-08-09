import api from './api'

export const getAllReviews = async () => {
    const response = await api.get('/ReviewManagementRouter/getAllReviews');
    return response.data;
}