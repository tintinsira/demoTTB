package com.example.surveybackenddemo.controller;


import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.surveybackenddemo.dto.SatisfactionSurveyDTO;
import com.example.surveybackenddemo.service.SatisfactionSurveyService;

import java.util.List;

@RestController
@RequestMapping("/api/satisfactionSurveyService")
public class SatisfactionSurveyController {
    
    @Autowired
    private SatisfactionSurveyService satisfactionSurveyService;
    
    @GetMapping
    public ResponseEntity<List<SatisfactionSurveyDTO>> getAllSatisfactionSurveys() {
        List<SatisfactionSurveyDTO> SatisfactionSurveys = satisfactionSurveyService.getAllSatisfactionSurveyService();
        return ResponseEntity.ok(SatisfactionSurveys);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<SatisfactionSurveyDTO> getSatisfactionSurveyById(@PathVariable String id) {
        return satisfactionSurveyService.getSatisfactionSurveyServiceById(id)
                .map(SatisfactionSurvey -> ResponseEntity.ok(SatisfactionSurvey))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<SatisfactionSurveyDTO> createSatisfactionSurvey(@Valid @RequestBody SatisfactionSurveyDTO SatisfactionSurveyDTO) {
        SatisfactionSurveyDTO createdSatisfactionSurvey = satisfactionSurveyService.createSatisfactionSurveyService(SatisfactionSurveyDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSatisfactionSurvey);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<SatisfactionSurveyDTO> updateSatisfactionSurvey(@PathVariable String id, 
                                                  @Valid @RequestBody SatisfactionSurveyDTO SatisfactionSurveyDTO) {
        return satisfactionSurveyService.updateSatisfactionSurveyService(id, SatisfactionSurveyDTO)
                .map(SatisfactionSurvey -> ResponseEntity.ok(SatisfactionSurvey))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSatisfactionSurvey(@PathVariable String id) {
        if (satisfactionSurveyService.deleteSatisfactionSurveyService(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
}
