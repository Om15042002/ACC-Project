package com.LaptopRecommendationSystem.Backend.API.Controller;


import com.LaptopRecommendationSystem.Backend.API.Config.CSVFileConfig;
import com.LaptopRecommendationSystem.Backend.API.Model.LaptopDetail;
import com.LaptopRecommendationSystem.Backend.API.ResourceFiles.StringConstants;
import com.LaptopRecommendationSystem.Backend.API.Services.AlternateSuggestions;
import com.LaptopRecommendationSystem.Backend.API.Services.SearchFrequency;
import com.LaptopRecommendationSystem.Backend.API.Services.WordCompletion;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.LaptopRecommendationSystem.Backend.API.Services.SearchFrequency.tracker;
import static com.LaptopRecommendationSystem.Backend.API.Services.WordCompletion.wordTree;


@RestController
public class LaptopController {

    private final List<LaptopDetail> laptops;

    public LaptopController() {
        this.laptops = new CSVFileConfig().FileRecords();
    }

    @GetMapping("/laptops")
    public List<LaptopDetail> getAllLaptops() {
        return laptops;
    }


    // Endpoint: GET /api/data/{inputString}
    @GetMapping("/laptops/{searchString}")
    public List<LaptopDetail> getWithPathVariable(@PathVariable String searchString) throws IOException {

        String searchTerm = searchString.trim().toLowerCase();
        System.out.println(searchTerm);

//        tracker.loadSearchQueries(StringConstants.FILEPATH);
        // Simulate user searches
        if(tracker == null){
            tracker= new SearchFrequency();
            tracker.createTreeFromTXT(StringConstants.SEARCHCONSTANTSPATH);
        }
        try {
            FileWriter writer = new FileWriter(StringConstants.SEARCHCONSTANTSPATH,true);
            writer.write(searchTerm+"\n"); // Writing a single word
            writer.close();
            System.out.println("Successfully written to the file.");
        } catch (IOException e) {
            e.printStackTrace();
        }
        tracker.handleUserQuery(searchTerm);

        return laptops.stream()
                .filter(laptop ->
                        // Check ALL properties of LaptopDetail (customize as needed)
                        matchesProperty(laptop.brand, searchTerm) ||
                                matchesProperty(laptop.model, searchTerm) ||
                                matchesProperty(String.valueOf(laptop.price), searchTerm) ||
                                matchesProperty(laptop.processor.brand, searchTerm)
                )
                .collect(Collectors.toList());
    }

    @GetMapping("/laptops/autocomplete/{prefix}")
    public List<String> getCompletions(@PathVariable String prefix) {
        String lowerPrefix = prefix.trim().toLowerCase();
        List<String> suggestions = null;
        try {
            WordCompletion wordCompletion = new WordCompletion();
            if (wordTree == null) {
                WordCompletion.GenerateWordCompletionTree();
            }
            suggestions = wordTree.getWordsWithPrefix(lowerPrefix);
        } catch (Exception e) {
            System.out.println("Error occured while creating wordtree");
        }
        System.out.println(suggestions);
        return suggestions;
    }

    // Helper method for case-insensitive partial matching
    private boolean matchesProperty(String propertyValue, String searchTerm) {
        return propertyValue != null &&
                propertyValue.toLowerCase().contains(searchTerm.toLowerCase());
    }

    @GetMapping("/laptops/spellcheck/{word}")
    public List<String> getSpellChekedWord(@PathVariable String word) {
        String searchTerm = word.trim().toLowerCase();
        return AlternateSuggestions.SpellCheckAndGiveSuggestion(searchTerm);
    }

    @GetMapping("/laptops/searchFrequency")
    public List<Map.Entry<String,Integer>> getSearchFrequencyofTopNWords() throws IOException {
        if(tracker == null){
            tracker= new SearchFrequency();
            tracker.createTreeFromTXT(StringConstants.SEARCHCONSTANTSPATH);
        }

        return tracker.getTopSearches(10);
    }
    @GetMapping("/laptops/searchFrequency/{word}")
    public Integer getSearchFrequencyofWord(@PathVariable String word) throws IOException {
        String searchTerm = word.trim().toLowerCase();

        return tracker.getSearchCount(searchTerm);
    }


}