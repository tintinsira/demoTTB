package com.example.surveybackenddemo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.surveybackenddemo.dto.SatisfactionSurveyDTO;
import com.example.surveybackenddemo.entity.SatisfactionSurvey;
import com.example.surveybackenddemo.repository.SatisfactionSurveyRepository;
import com.example.surveybackenddemo.service.SatisfactionSurveyService;

import java.util.Arrays;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SurveyServiceTest {
    
    @Mock
    private SatisfactionSurveyRepository surveyRepository;
    
    @InjectMocks
    private SatisfactionSurveyService surveyService;
    
    private SatisfactionSurvey survey;
    private SatisfactionSurveyDTO surveyDTO;
    
    @BeforeEach
    void setUp() {
        survey.setSeqSurvey("0001");
        survey.setSeqSurvey("0001");
        survey.setRankSurvey("5");
        survey.setHeadAmend("2");
        survey.setAdviceAmend(null);
        
        surveyDTO = new SatisfactionSurveyDTO();
        surveyDTO.setSeqSurvey(survey.getSeqSurvey());
        surveyDTO.setRankSurvey(survey.getRankSurvey());
        surveyDTO.setHeadAmend(survey.getHeadAmend());
        surveyDTO.setAdviceAmend(survey.getAdviceAmend());
    }
    
    @Test
    void getAllSurveys_ShouldReturnListOfSurveyDTOs() {
        // Given
        List<SatisfactionSurvey> surveys = Arrays.asList(survey);
        when(surveyRepository.findAll()).thenReturn(surveys);
        
        // When
        List<SatisfactionSurveyDTO> result = surveyService.getAllSatisfactionSurveyService();
        
        // Then
        assertEquals(1, result.size());
        assertEquals("Test Survey", result.get(0).getSeqSurvey());
        verify(surveyRepository, times(1)).findAll();
    }
    
    @Test
    void createSurvey_ShouldReturnCreatedSurveyDTO() {
        // Given
        when(surveyRepository.save(any(SatisfactionSurvey.class))).thenReturn(survey);
        
        // When
        SatisfactionSurveyDTO result = surveyService.createSatisfactionSurveyService(surveyDTO);
        
        // Then
        assertNotNull(result);
        assertEquals("Test Survey", result.getSeqSurvey());
        verify(surveyRepository, times(1)).save(any(SatisfactionSurvey.class));
    }
}
