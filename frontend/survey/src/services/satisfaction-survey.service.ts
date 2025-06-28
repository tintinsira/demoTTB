import { SatisfactionSurveyDTO } from '@/types/satisfaction-survey';
import axios from 'axios'; 
 
const API_ENDPOINT = `/api/satisfactionSurveyService`;


// สร้าง axios instance
const apiClient = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// เพิ่ม response interceptor สำหรับ error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const satisfactionSurveyService = {
  // GET /api/satisfactionSurveyService
  getAllSatisfactionSurveys: async (): Promise<SatisfactionSurveyDTO[]> => {
    const response = await apiClient.get('/');
    return response.data;
  },

  // GET /api/satisfactionSurveyService/{id} - ใช้ seqSurvey เป็น id
  getSatisfactionSurveyById: async (
    seqSurvey: string
  ): Promise<SatisfactionSurveyDTO> => {
    const response = await apiClient.get(`/${seqSurvey}`);
    return response.data;
  },

  // POST /api/satisfactionSurveyService
  createSatisfactionSurvey: async (
    data: SatisfactionSurveyDTO
  ): Promise<SatisfactionSurveyDTO> => {
    const response = await apiClient.post('/', data);
    return response.data;
  },

  // PUT /api/satisfactionSurveyService/{id} - ใช้ seqSurvey เป็น id
  updateSatisfactionSurvey: async (
    seqSurvey: string,
    data: SatisfactionSurveyDTO
  ): Promise<SatisfactionSurveyDTO> => {
    const response = await apiClient.put(`/${seqSurvey}`, data);
    return response.data;
  },

  // DELETE /api/satisfactionSurveyService/{id} - ใช้ seqSurvey เป็น id
  deleteSatisfactionSurvey: async (seqSurvey: string): Promise<void> => {
    await apiClient.delete(`/${seqSurvey}`);
  },
};
