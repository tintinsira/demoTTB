package com.example.surveybackenddemo.dto;

import jakarta.validation.constraints.NotBlank;

public class SatisfactionSurveyDTO {
   
	@NotBlank(message = "seqSurvey is required")
	private String seqSurvey;
	
	private String rankSurvey;
	
	private String headAmend;
	
	private String adviceAmend;

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

}