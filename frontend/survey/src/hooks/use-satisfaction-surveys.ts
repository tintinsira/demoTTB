import { useState, useEffect } from 'react';
import { satisfactionSurveyService } from '@/services/satisfaction-survey.service';
import { SatisfactionSurveyDTO } from '@/types/satisfaction-survey';

export const useSatisfactionSurveys = () => {
  const [surveys, setSurveys] = useState<SatisfactionSurveyDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSurveys = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await satisfactionSurveyService.getAllSatisfactionSurveys();
      setSurveys(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch surveys');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  const createSurvey = async (surveyData: SatisfactionSurveyDTO) => {
    setLoading(true);
    setError(null);
    try {
      const newSurvey =
        await satisfactionSurveyService.createSatisfactionSurvey(surveyData);
      setSurveys((prev) => [...prev, newSurvey]);
      return newSurvey;
    } catch (err: any) {
      setError(err.message || 'Failed to create survey');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateSurvey = async (
    seqSurvey: string,
    surveyData: SatisfactionSurveyDTO
  ) => {
    setLoading(true);
    setError(null);
    try {
      const updatedSurvey =
        await satisfactionSurveyService.updateSatisfactionSurvey(
          seqSurvey,
          surveyData
        );
      setSurveys((prev) =>
        prev.map((survey) =>
          survey.seqSurvey === seqSurvey ? updatedSurvey : survey
        )
      );
      return updatedSurvey;
    } catch (err: any) {
      setError(err.message || 'Failed to update survey');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteSurvey = async (seqSurvey: string) => {
    setLoading(true);
    setError(null);
    try {
      await satisfactionSurveyService.deleteSatisfactionSurvey(seqSurvey);
      setSurveys((prev) =>
        prev.filter((survey) => survey.seqSurvey !== seqSurvey)
      );
    } catch (err: any) {
      setError(err.message || 'Failed to delete survey');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  

  return {
    surveys,
    loading,
    error,
    refetch: fetchSurveys,
    createSurvey,
    updateSurvey,
    deleteSurvey,
  };
};
export const useSatisfactionSurvey = (seqSurvey: string | null) => {
  const [survey, setSurvey] = useState<SatisfactionSurveyDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSurvey = async (surveySeq: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await satisfactionSurveyService.getSatisfactionSurveyById(
        surveySeq
      );
      setSurvey(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch survey');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (seqSurvey) {
      fetchSurvey(seqSurvey);
    }
  }, [seqSurvey]);

  return {
    survey,
    loading,
    error,
    refetch: () => seqSurvey && fetchSurvey(seqSurvey),
  };
};