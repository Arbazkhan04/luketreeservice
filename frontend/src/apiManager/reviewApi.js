import api from './api'

export const getAllReviews = async () => {
    const response = await api.get('/ReviewManagementRouter/getAllReviews');
    return response.data;
}

export const createReview = async (review) => {
    const response = await api.post('/ReviewManagementRouter/createReview', review);
    return response.data;
}