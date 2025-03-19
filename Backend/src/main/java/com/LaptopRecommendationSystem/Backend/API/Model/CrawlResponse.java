package com.LaptopRecommendationSystem.Backend.API.Model;

import java.util.List;

public class CrawlResponse {
    private String baseUrl;
    private List<String> crawledUrls;
    private List<ValidationEntity> validationEntities;

    // Constructors
    public CrawlResponse() {
    }

    public CrawlResponse(String baseUrl, List<String> crawledUrls, List<ValidationEntity> validationEntities) {
        this.baseUrl = baseUrl;
        this.crawledUrls = crawledUrls;
        this.validationEntities = validationEntities;
    }

    // Getters and Setters
    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public List<String> getCrawledUrls() {
        return crawledUrls;
    }

    public void setCrawledUrls(List<String> crawledUrls) {
        this.crawledUrls = crawledUrls;
    }

    public List<ValidationEntity> getValidationEntities() {
        return validationEntities;
    }

    public void setValidationEntities(List<ValidationEntity> validationEntities) {
        this.validationEntities = validationEntities;
    }

    // Nested class for validation entities
    public static class ValidationEntity {
        private String key;  // "email", "phone", or "url"
        private String value;
        private boolean isValid;

        public ValidationEntity() {
        }

        public ValidationEntity(String key, String value, boolean isValid) {
            this.key = key;
            this.value = value;
            this.isValid = isValid;
        }

        // Getters and Setters
        public String getKey() {
            return key;
        }

        public void setKey(String key) {
            this.key = key;
        }

        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }

        public boolean isValid() {
            return isValid;
        }

        public void setValid(boolean valid) {
            isValid = valid;
        }
    }
}