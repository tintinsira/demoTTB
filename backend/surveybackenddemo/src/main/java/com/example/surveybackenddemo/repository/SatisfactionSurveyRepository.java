package com.example.surveybackenddemo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.surveybackenddemo.entity.SatisfactionSurvey;
import java.util.List;

public interface SatisfactionSurveyRepository extends JpaRepository<SatisfactionSurvey, String> {
}