package com.LaptopRecommendationSystem.Backend.API.Services;

//pkgsare imported

import com.LaptopRecommendationSystem.Backend.API.ResourceFiles.StringConstants;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

//main class
public class SearchFrequency {
    // TreeMap to store search query and its frequency.
// TreeMap is a self-balancing tree (Red-Black Tree) in Java.
    private TreeMap<String, Integer> srchTre;
    // Log of queries in order of appearance.
    private List<String> srchLg;

    public static SearchFrequency tracker ;

    public SearchFrequency() {
        srchTre = new TreeMap<>();
        srchLg = new ArrayList<>();
    }

    // Method to load intialsearch queries from a CSV file.
// Assumes each line contains one search query word.
    public void loadSearchQueries(String csvFilePath) {
        try (BufferedReader br = new BufferedReader(new FileReader(csvFilePath))) {
            String lne;
            while ((lne = br.readLine()) != null) {
// trim and process only if the line is not empty
                String query = lne.trim();
                if (!query.isEmpty()) {
// update frequency from file (if word appears multiple times, frequency increases)
                    updateSearchFrequency(query);
                }
            }
        } catch (IOException e) {
            System.err.println("Error reading CSV file: " + e.getMessage());
        }
    }
    public  void createTreeFromTXT(String filePath) throws IOException {
        // Read all lines from the file
        List<String> lines = Files.readAllLines(Paths.get(filePath));

        for(String line: lines){
            tracker.handleUserQuery(line);
        }
        // Process lines to extract words (filter out empty lines and trim whitespace)

    }
    // Method to update the search frequency when a query is searched
    public void updateSearchFrequency(String qury) {
// Log the query
        srchLg.add(qury);
// Update frequency in the tree
        srchTre.put(qury, srchTre.getOrDefault(qury, 0) + 1);
    }

    // Method to handle user search queries (simulated here)
    public void handleUserQuery(String qury) {
//        System.out.println("User searched: " + qury);
        updateSearchFrequency(qury);
    }

    // Method to display the top N searches
    public List<Map.Entry<String, Integer>> getTopSearches(int tpN) {
// Create a list of Map entries sorted by frequency (in descending order)
        List<Map.Entry<String, Integer>> sortedEntries = new ArrayList<>(srchTre.entrySet());
        sortedEntries.sort((e1, e2) -> e2.getValue().compareTo(e1.getValue()));
        int count = 0;
        List<Map.Entry<String, Integer>> result = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : sortedEntries) {
//            System.out.println(entry.getKey() + " : " + entry.getValue());
            result.add(entry);
            count++;
            if (count >= tpN) break;
        }
        return result;
    }

    // Optional: Method to display the entire search log
    public void displaySearchLog() {
        System.out.println("Search Query Log:");
        for (String query : srchLg) {
            System.out.println(query);
        }
    }
    public int getSearchCount(String word) {
        if (word == null || word.trim().isEmpty()) {
            return 0;
        }
        return srchTre.getOrDefault(word.toLowerCase().trim(), 0);
    }
    public static void main(String[] args) {
// Updated CSV file location
        String csvFilePath = StringConstants.FILEPATH;
        SearchFrequency tracker = new SearchFrequency();
// Load initial queries from CSV file
        tracker.loadSearchQueries(csvFilePath);
// Simulate user searches
        tracker.handleUserQuery("HP");
        tracker.handleUserQuery("Apple");
        tracker.handleUserQuery("Dell");
        tracker.handleUserQuery("HP");
        tracker.handleUserQuery("Asus");
        tracker.handleUserQuery("HP");
        tracker.handleUserQuery("Dell");
        tracker.handleUserQuery("Apple");
        tracker.handleUserQuery("Acer");
        tracker.handleUserQuery("Asus");
        tracker.handleUserQuery("Lenovo");
// Display the top 3 searches
//        tracker.displayTopSearches(3);
// Optionally, display the full search log
// tracker.displaySearchLog();
    }
}