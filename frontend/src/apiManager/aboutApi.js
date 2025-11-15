import api from './api';

export const getAboutData = async () => {
    const response = await api.get('/AboutManagementRouter/getAboutData')
    return response.data;
}

export const updateAboutData = async (reviewId,data) => {
    const response = await api.put(`AboutManagementRouter/updateAboutData/${reviewId}`,data);
    return response.data;
}

export const getLandingImages = async () => {
  const response = await api.get('/LandingImageManagementRouter/getLandingImages');
  return response.data;
};

export const updateLandingImage = async (formData) => {
  const response = await api.post('/LandingImageManagementRouter/updateLandingImage', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};
