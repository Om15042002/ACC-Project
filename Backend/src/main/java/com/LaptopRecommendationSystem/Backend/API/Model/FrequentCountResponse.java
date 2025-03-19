package com.LaptopRecommendationSystem.Backend.API.Model;

import java.util.List;

public class FrequentCountResponse {
    private List<TrieSearchResult> lstTrieSearchResult;
    private List<String> brand;

    // Getter for TrieSearchResult list
    public List<TrieSearchResult> getLstTrieSearchResult() {
        return lstTrieSearchResult;
    }

    // Setter for TrieSearchResult list
    public void setLstTrieSearchResult(List<TrieSearchResult> lstTrieSearchResult) {
        this.lstTrieSearchResult = lstTrieSearchResult;
    }

    // Getter for CrawlResponse list
    public List<String> getBrand() {
        return brand;
    }

    // Setter for CrawlResponse list
    public void setBrand(List<String> brand) {
        this.brand = brand;
    }
}