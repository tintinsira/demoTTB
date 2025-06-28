package com.example.surveybackenddemo.service;

import com.example.surveybackenddemo.dto.SatisfactionSurveyDTO;
import com.example.surveybackenddemo.entity.SatisfactionSurvey;
import com.example.surveybackenddemo.repository.SatisfactionSurveyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SatisfactionSurveyService {
    
    @Autowired
    private SatisfactionSurveyRepository satisfactionSurveyRepository;
    
    public List<SatisfactionSurveyDTO> getAllSatisfactionSurveyService() {
        return satisfactionSurveyRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Optional<SatisfactionSurveyDTO> getSatisfactionSurveyServiceById(String id) {
        return satisfactionSurveyRepository.findById(id)
                .map(this::convertToDTO);
    }
    
    public SatisfactionSurveyDTO createSatisfactionSurveyService(SatisfactionSurveyDTO satisfactionSurveyDTO) {
    	SatisfactionSurvey survey = convertToEntity(satisfactionSurveyDTO);
    	SatisfactionSurvey savedSurvey = satisfactionSurveyRepository.save(survey);
        return convertToDTO(savedSurvey);
    }
    
    public Optional<SatisfactionSurveyDTO> updateSatisfactionSurveyService(String id, SatisfactionSurveyDTO surveyDTO) {
        return satisfactionSurveyRepository.findById(id)
                .map(existingSurvey -> {
                    existingSurvey.setSeqSurvey(surveyDTO.getSeqSurvey());
                    existingSurvey.setRankSurvey(surveyDTO.getRankSurvey());
                    existingSurvey.setHeadAmend(surveyDTO.getHeadAmend());
                    existingSurvey.setAdviceAmend(surveyDTO.getAdviceAmend());
                    SatisfactionSurvey updatedSurvey = 
                    		satisfactionSurveyRepository.save(existingSurvey);
                    return convertToDTO(updatedSurvey);
                });
    }
    
    public boolean deleteSatisfactionSurveyService(String id) {
        if (satisfactionSurveyRepository.existsById(id)) {
            satisfactionSurveyRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    private SatisfactionSurveyDTO convertToDTO(SatisfactionSurvey survey) {
    	SatisfactionSurveyDTO dto = new SatisfactionSurveyDTO();
    	dto.setSeqSurvey(survey.getSeqSurvey());
    	dto.setRankSurvey(survey.getRankSurvey());
    	dto.setHeadAmend(survey.getHeadAmend());
    	dto.setAdviceAmend(survey.getAdviceAmend());
        return dto;
    }
    
    private SatisfactionSurvey convertToEntity(SatisfactionSurveyDTO dto) {
    	SatisfactionSurvey satisfactionSurvey = new SatisfactionSurvey();
    	satisfactionSurvey.setSeqSurvey(dto.getSeqSurvey());
    	satisfactionSurvey.setRankSurvey(dto.getRankSurvey());
    	satisfactionSurvey.setHeadAmend(dto.getHeadAmend());
    	satisfactionSurvey.setAdviceAmend(dto.getAdviceAmend());
        return satisfactionSurvey;
    }
}
