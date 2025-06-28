import React, { useState, useEffect } from 'react';  
import { useRouter } from 'next/router';

import Swal from 'sweetalert2'; 
import LayoutTTB from '../../components/LayoutTTB';

import { MdArrowBackIosNew } from 'react-icons/md';
import { useSatisfactionSurvey, useSatisfactionSurveys } from '@/hooks/use-satisfaction-surveys';
import { SatisfactionSurveyDTO } from '@/types/satisfaction-survey';

function SurveyRadioFast() {
  
  const router = useRouter();
  const { seq } = router.query;

  const { updateSurvey, loading } = useSatisfactionSurveys();
  const { survey, loading: fetchLoading } = useSatisfactionSurvey(seq as string);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
    
  const [isExistingRecord, setIsExistingRecord] = useState(false);
   
  useEffect(() => { 
    if (survey) {
      setIsExistingRecord(true); 
      if (survey.rankSurvey) {
        setSelectedChoice(survey.headAmend);
      }
    }
  }, [survey]);

  const surveyData = {
    type: 'radio',
    title: 'หัวข้อไหนของ TTB Touch ที่ท่านคิดว่าควรปรับปรุงมากที่สุด',
    choices: [
      {
        title: 'ความเร็วในการเปิด',
        value: '1',
      },
      {
        title: 'การค้นหาเมนูที่ใช้บ่อย',
        value: '2',
      },
      {
        title: 'การถอนเงินโดยไม่ใช้บัตร',
        value: '3',
      },
    ],
    settings: [
      {
        key: 'require',
        value: 'true',
      },
      {
        key: 'text_alert_choices',
        value: 'กรุณาเลือกหัวข้อที่ควรปรับปรุง',
      },
    ],
  };

  const getSettingValue = (key: string) => {
    const setting = surveyData.settings.find((s) => s.key === key);
    return setting?.value;
  };

  const choicesList = surveyData.choices; 
  const minTitle = getSettingValue('min_title');
  const maxTitle = getSettingValue('max_title');
  const isRequired = getSettingValue('require') === 'true'; 

  const handleChoiceClick = (choice: string) => {
    setSelectedChoice(choice);
  }; 

  const handleNextPage = async () => {  
    if (isRequired) {
      if (selectedChoice === null) {
        const txtAlert = getSettingValue('text_alert_choices');
        Swal.fire({
          title: 'แจ้งเตือน',
          text: `${txtAlert}`,
          icon: 'warning',
          confirmButtonText: 'ตกลง',
        });
        return;
      }
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
        rankSurvey: survey?.rankSurvey || '',
        headAmend: selectedChoice || '',
        adviceAmend: survey?.adviceAmend || '',
      };

      if (isExistingRecord) { 
        await updateSurvey(seq as string, surveyDataToSave);
      } 
  
      router.push('/advice?seq=' + seq);
      
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
          {surveyData.title}
        </span>
      </div>
      <div className="flex flex-col gap-6 sm:w-1/4 sm:mx-auto">
        {choicesList.map((choice) => (
          <>
            <label
              htmlFor={choice.value}
              key={choice.value}
              className={`flex align-bottom justify-start cursor-pointer
                    ${
                      selectedChoice === choice.value
                        ? 'text-white bg-amber-400'
                        : 'border-stone-300 text-stone-500'
                    } rounded-xl w-full border-2 px-4 py-2 font-bold hover:bg-amber-400 hover:text-white`}
              onClick={() => {
                handleChoiceClick(choice.value);
              }}
            >
              <input
                type={surveyData.type}
                className="peer sr-only"
                id={choice.value}
                name="choices"
                value={selectedChoice ?? ''}
                checked={selectedChoice === choice.value}
              />
              <div
                className={`
                  w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200 ease-in-out
                  ${
                    selectedChoice === choice.value
                      ? 'border-white bg-white'
                      : 'border-stone-400 bg-white group-hover:border-amber-400 group-hover:bg-amber-50'
                  }
                `}
              >
                <div
                  className={`
                    w-2.5 h-2.5 rounded-full transition-all duration-200 ease-in-out
                    ${
                      selectedChoice === choice.value
                        ? 'bg-amber-500'
                        : 'bg-transparent group-hover:bg-amber-400'
                    }
                  `}
                ></div>
              </div>
              {choice.title}
            </label>
          </>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <div className="flex justify-between w-1/4 text-sm">
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

export default SurveyRadioFast;