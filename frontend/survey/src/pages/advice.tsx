import React, { useState, useEffect } from 'react';  
import { useRouter } from 'next/router';

import Swal from 'sweetalert2'; 
import LayoutTTB from '../../components/LayoutTTB';
import { MdArrowBackIosNew } from 'react-icons/md';
import { useSatisfactionSurvey, useSatisfactionSurveys } from '@/hooks/use-satisfaction-surveys';
import { SatisfactionSurveyDTO } from '@/types/satisfaction-survey';


function Advice() {
  const router = useRouter();
  const { seq } = router.query;

  const { updateSurvey, loading } = useSatisfactionSurveys();
  const { survey, loading: fetchLoading } = useSatisfactionSurvey(seq as string); 

  const [adviceText, setAdviceText] = useState<string | ''>('');
  const [isExistingRecord, setIsExistingRecord] = useState(false);

  useEffect(() => { 
    if (survey) {
      setIsExistingRecord(true); 
      if (survey.adviceAmend) {
        setAdviceText(survey.adviceAmend);
      }
    }
  }, [survey]);

  const adviceData = {
    type: 'text',
    title: 'คำแนะนำอื่นๆ',
    settings: [
      {
        key: 'max_length',
        value: '100',
      },
      {
        key: 'require',
        value: 'false',
      }, 
    ],
  };


  const getSettingValue = (key: string) => {
    const setting = adviceData.settings.find((s) => s.key === key);
    return setting?.value;
  };

   
  const isRequired = getSettingValue('require') === 'true'; 
  const maxLength = getSettingValue('max_length'); 
 

  const handleNextPage = async  () => {
    if (isRequired) {
      if (adviceText === '') {
        const txtAlert = getSettingValue('text_alert_advice');
        Swal.fire({
          title: 'แจ้งเตือน',
          text: `${txtAlert}`,
          icon: 'warning',
          confirmButtonText: 'ตกลง',
        });
        return;
      }
    }

    try {
      const surveyDataToSave: SatisfactionSurveyDTO = {
        seqSurvey: seq as string,
        rankSurvey: survey?.rankSurvey || '',
        headAmend: survey?.headAmend || '',
        adviceAmend: adviceText  || '',
      };

      if (isExistingRecord) {
        await updateSurvey(seq as string, surveyDataToSave);
      }

      router.push('/thanksadvice');
    } catch (error) {
      console.error('Error saving survey:', error);
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง',
        icon: 'error',
        confirmButtonText: 'ตกลง',
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
      <div className="my-2">
        <button
          className="cursor-pointer "
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
        >
          <MdArrowBackIosNew size={20} />
        </button>
      </div>
      <div className="flex justify-center">
        <span className="my-4 mx-2 font-bold font-kanit  text-[#002e66]">
          {adviceData.title}
        </span>
      </div>
      <div className="flex sm:mx-auto">
        <textarea
          value={adviceText ?? ''}
          maxLength={Number(maxLength) ?? 100}
          className="rounded-md border border-stone-300 bg-white sm:w-96 sm:h-24 w-full h-24
             focus:outline-none focus:ring-2 focus:ring-amber-300 px-2 py-3
             resize-none"
          placeholder="พิมพ์คำแนะนำของคุณที่นี่..."
          onChange={(e) => {
            e.preventDefault();
            setAdviceText(e.target.value);
          }}
        />
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

export default Advice;