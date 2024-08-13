import api from './api'

export const getAllReviews = async () => {
    const response = await api.get('/ReviewManagementRouter/getAllReviews');
    return response.data;
}

export const createReview = async (review) => {
    const response = await api.post('/ReviewManagementRouter/createReview', review);
    return response.data;
}

export const getReviewById = async (reviewId) => {
    const response = await api.get(`/ReviewManagementRouter/getReviewById/${reviewId}`);
    return response.data;
}

export const updateReviewById = async (reviewId,review) => {
    try {
        const response = await api.put(`/ReviewManagementRouter/updateReviewById/${reviewId}`, review);
        return response.data;
      } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        throw error; // Re-throw the error to handle it in the calling code
      }
}

export const unPublishReviewById = async (reviewId) => {
    const response = await api.put(`/ReviewManagementRouter/softDeleteReview/${reviewId}`);
    return response.data;
}

export const publishBackReviewById = async (reviewId) => {
    const response = await api.put(`/ReviewManagementRouter/publistBackReview/${reviewId}`);
    return response.data;
}

export const deleteReviewById = async (reviewId) => {
    const response = await api.delete(`/ReviewManagementRouter/deleteReview/${reviewId}`);
    return response.data;
}

export const updateReviewDateById = async (reviewId, updatedDate) => {
    const response = await api.put(`/ReviewManagementRouter/updateReviewCreatedDate/${reviewId}`, { updatedDate });
    return response.data;
}