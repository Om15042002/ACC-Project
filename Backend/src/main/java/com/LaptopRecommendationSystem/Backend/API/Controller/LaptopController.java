package com.LaptopRecommendationSystem.Backend.API.Controller;



import com.LaptopRecommendationSystem.Backend.API.Config.CSVFileConfig;
import com.LaptopRecommendationSystem.Backend.API.Model.LaptopDetail;
import com.LaptopRecommendationSystem.Backend.API.Services.WordCompletion;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

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
    public List<LaptopDetail> getWithPathVariable(@PathVariable String searchString) {

        String searchTerm = searchString.trim().toLowerCase();
        System.out.println(searchTerm);
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


}