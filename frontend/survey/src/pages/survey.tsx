import React, { useState, useEffect } from 'react';  
import { useRouter } from 'next/router';

import Swal from 'sweetalert2'; 
import LayoutTTB from '../../components/LayoutTTB';
import { useSatisfactionSurveys, useSatisfactionSurvey } from '@/hooks/use-satisfaction-surveys';
import { SatisfactionSurveyDTO } from '@/types/satisfaction-survey';

function Survey() {
  const router = useRouter();
  const { seq } = router.query;

  const { createSurvey, updateSurvey, loading } = useSatisfactionSurveys();
  const { survey, loading: fetchLoading } = useSatisfactionSurvey(seq as string);
  
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isExistingRecord, setIsExistingRecord] = useState(false);
 
  useEffect(() => { 
    if (survey) {
      setIsExistingRecord(true); 
      if (survey.rankSurvey) {
        setSelectedRating(parseInt(survey.rankSurvey));
      }
    }
  }, [survey]);

  const surveyData = {
    type: 'rank',
    title: 'จากการใช้งาน TTB Touch ท่านพึงพอใจระดับใด',
    settings: [
      {
        key: 'require',
        value: 'true',
      },
      {
        key: 'min',
        value: '1',
      },
      {
        key: 'max',
        value: '5',
      },
      {
        key: 'min_title',
        value: '1 คือไม่พอใจมาก',
      },
      {
        key: 'max_title',
        value: '5 คือพอใจมาก',
      },
      {
        key: 'text_alert_rating',
        value: 'กรุณาเลือกระดับความพึงพอใจ',
      },
    ],
  };

  const getSettingValue = (key: string) => {
    const setting = surveyData.settings.find((s) => s.key === key);
    return setting?.value;
  };
  
  const rawMin = getSettingValue('min');
  const min = rawMin ? parseInt(rawMin) : 1; 
  const rawMax = getSettingValue('max');
  const max = rawMax ? parseInt(rawMax) : 5;
  const minTitle = getSettingValue('min_title');
  const maxTitle = getSettingValue('max_title');
  const isRequired = getSettingValue('require') === 'true';
  const ratingOptions = Array.from(
    { length: max - min + 1 },
    (_, i) => min + i
  ); 

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleNextPage = async () => { 
    if (isRequired && selectedRating === null) {
      const txtAlert = getSettingValue('text_alert_rating');
      Swal.fire({
        title: 'แจ้งเตือน',
        text: `${txtAlert}`,
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      });
      return;
    }
 
    if (!seq) {
      Swal.fire({
        title: 'ข้อผิดพลาด',
        text: 'ไม่พบหมายเลขแบบสำรวจ',
        icon: 'error',
        confirmButtonText: 'ตกลง'
      });
      return;
    }

    try {
      const surveyDataToSave: SatisfactionSurveyDTO = {
        seqSurvey: seq as string,
        rankSurvey: selectedRating?.toString() || '',
        headAmend: survey?.headAmend || '',  
        adviceAmend: survey?.adviceAmend || ''  
      };

      if (isExistingRecord) { 
        await updateSurvey(seq as string, surveyDataToSave);
      } else { 
        await createSurvey(surveyDataToSave);
      } 
 
      router.push('/surveyradiofast?seq='+seq);
      
    } catch (error) {
      console.error('Error saving survey:', error);
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง',
        icon: 'error',
        confirmButtonText: 'ตกลง'
      });
    }
  };
 
  if (fetchLoading) {
    return (
      <LayoutTTB>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400 mx-auto"></div>
            <p className="mt-2 text-gray-600">กำลังโหลดข้อมูล...</p>
          </div>
        </div>
      </LayoutTTB>
    );
  }

  return (
    <LayoutTTB>
      <div className="flex justify-center">
        <span className="my-4 mx-2 font-bold font-kanit text-[#002e66]">
          {surveyData.title}
        </span>
      </div> 

      <div className="flex flex-row gap-6 mx-auto">
        {ratingOptions.map((rating) => (
          <div
            key={rating}
            className={`flex align-bottom justify-center cursor-pointer w-fit 
              ${
                selectedRating === rating
                  ? 'text-white bg-amber-400'
                  : 'border-stone-300 text-stone-500'
              } rounded-full border-2 px-4 py-2 font-bold hover:bg-amber-400 hover:text-white transition-colors`}
            onClick={() => {
              handleRatingClick(rating);
            }}
          >
            {rating}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <div className="flex justify-between sm:w-1/4 w-full text-sm">
          <label>{minTitle}</label>
          <label>{maxTitle}</label>
        </div>
      </div>

      <div className="flex justify-center mb-4 mt-auto mx-4">
        <button
          className="bg-amber-400 sm:w-1/4 w-full rounded-4xl py-2 text-white cursor-pointer
            hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors
          "
          onClick={(e) => {
            e.preventDefault();
            handleNextPage();
          }}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              กำลังบันทึก...
            </div>
          ) : (
            'ถัดไป'
          )}
        </button>
      </div>
    </LayoutTTB>
  );
}

export default Survey;