package com.example.surveybackenddemo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "SATISFACTION_SURVEY")
public class SatisfactionSurvey {
   
	@Id
	private String seqSurvey;
	
	private String rankSurvey;
	
	private String headAmend;
	
    @Column(length = 100)
	private String adviceAmend;
	
	@Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
 // Constructors
    public SatisfactionSurvey() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

	public String getSeqSurvey() {
		return seqSurvey;
	}

	public void setSeqSurvey(String seqSurvey) {
		this.seqSurvey = seqSurvey;
	}

	public String getRankSurvey() {
		return rankSurvey;
	}

	public void setRankSurvey(String rankSurvey) {
		this.rankSurvey = rankSurvey;
	}

	public String getHeadAmend() {
		return headAmend;
	}

	public void setHeadAmend(String headAmend) {
		this.headAmend = headAmend;
	}

	public String getAdviceAmend() {
		return adviceAmend;
	}

	public void setAdviceAmend(String adviceAmend) {
		this.adviceAmend = adviceAmend;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}
	
	@PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}