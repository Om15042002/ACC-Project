package com.LaptopRecommendationSystem.Backend.API.Model;


// SearchResult.java

import java.util.ArrayList;
import java.util.List;

public class TrieSearchResult {
    private String url;
    private int count;

    // constructor, getters & setters
    public TrieSearchResult(String url, int count) {
        this.url = url;
        this.count = count;
    }

    // Add public getters
    public String getUrl() {
        return url;
    }

    public int getCount() {
        return count;
    }


}