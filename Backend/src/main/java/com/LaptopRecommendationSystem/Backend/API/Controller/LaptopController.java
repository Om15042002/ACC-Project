package com.LaptopRecommendationSystem.Backend.API.Controller;


import com.LaptopRecommendationSystem.Backend.API.Config.CSVFileConfig;
import com.LaptopRecommendationSystem.Backend.API.Config.JSONFileConfig;
import com.LaptopRecommendationSystem.Backend.API.Model.*;
import com.LaptopRecommendationSystem.Backend.API.ResourceFiles.StringConstants;
import com.LaptopRecommendationSystem.Backend.API.Services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.LaptopRecommendationSystem.Backend.API.Model.LaptopDetail.*;
import static com.LaptopRecommendationSystem.Backend.API.Services.SearchFrequency.tracker;
import static com.LaptopRecommendationSystem.Backend.API.Services.WordCompletion.wordTree;


@RestController
public class LaptopController {

    private final List<LaptopDetail> laptops;
    private final CrawlService crawlService;
    private final SearchTrieService searchService;

    @Autowired
    public LaptopController(CrawlService crawlService, SearchTrieService searchService) {
        this.laptops = JSONFileConfig.readJsonFile();
        this.crawlService = crawlService;
        this.searchService = searchService;

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
        if (tracker == null) {
            tracker = new SearchFrequency();
            tracker.createTreeFromTXT(StringConstants.SEARCHCONSTANTSPATH);
        }
        try {
            FileWriter writer = new FileWriter(StringConstants.SEARCHCONSTANTSPATH, true);
            writer.write(searchTerm + "\n"); // Writing a single word
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
                                matchesProperty(laptop.processor.brand, searchTerm) ||
                                matchesProperty(laptop.processor.model, searchTerm) ||
                                matchesProperty(String.valueOf(laptop.processor.speedGHz), searchTerm) ||
                                matchesProperty(String.valueOf(laptop.processor.cores), searchTerm) ||
                                matchesProperty(String.valueOf(laptop.memory.sizeGB), searchTerm) ||
                                matchesProperty(laptop.memory.type, searchTerm) ||
                                matchesProperty(laptop.storage.type, searchTerm) ||
                                matchesProperty(String.valueOf(laptop.storage.capacityGB), searchTerm) ||
                                matchesProperty(String.valueOf(laptop.display.sizeInches), searchTerm) ||
                                matchesProperty(String.valueOf(laptop.display.resolution), searchTerm) ||
                                matchesProperty(String.valueOf(laptop.display.refreshRateHz), searchTerm) ||
                                matchesProperty(String.valueOf(laptop.battery.capacityWh), searchTerm) ||
                                matchesProperty(String.valueOf(laptop.battery.estimatedUsageTime), searchTerm)
                                ||
                                matchesProperty(laptop.graphics.type, searchTerm)
                                ||
                                matchesProperty(laptop.graphics.brand, searchTerm)
                                ||
                                matchesProperty(laptop.graphics.model, searchTerm)
                                ||
                                matchesProperty(laptop.audio.speakerDescription, searchTerm)
                                ||
                                matchesProperty(laptop.audio.microphoneQuality, searchTerm)
                                ||
                                matchesProperty(laptop.connectivity.wifiStandard, searchTerm)
                                ||
                                matchesProperty(laptop.connectivity.bluetoothVersion, searchTerm)
                                ||
                                matchesProperty(String.valueOf(laptop.buildQuality.weightKg), searchTerm)
                                ||
                                matchesProperty(laptop.buildQuality.material, searchTerm)
                                ||
                                matchesProperty(laptop.buildQuality.durabilityRating, searchTerm)
                                ||
                                matchesProperty(laptop.operatingSystem, searchTerm)

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
    public List<Map.Entry<String, Integer>> getSearchFrequencyofTopNWords() throws IOException {
        if (tracker == null) {
            tracker = new SearchFrequency();
            tracker.createTreeFromTXT(StringConstants.SEARCHCONSTANTSPATH);
        }

        return tracker.getTopSearches(10);
    }


    @GetMapping("/laptops/searchFrequency/{word}")
    public Integer getSearchFrequencyofWord(@PathVariable String word) throws IOException {
        String searchTerm = word.trim().toLowerCase();

        return tracker.getSearchCount(searchTerm);
    }

    @PostMapping("/laptops/recommendations")
    public ResponseEntity<List<LaptopDetail>> getRecommendations(
            @RequestBody FilterDetails.RecommendationRequest request) {

        System.out.println(request.getBrand());


        List<LaptopDetail> filtered = laptops.stream()
                .filter(l -> filterBrand(l, request.getBrand()))
                .filter(l -> filterPrice(l, request.getPriceRange()))
                .filter(l -> filterPerformance(l, request.getPerformanceLevel()))
                .filter(l -> filterPortability(l, request.getPortability()))
                .filter(l -> filterScreenSize(l, request.getScreenSize()))
                .filter(l -> filterStorage(l, request.getMinStorage()))
                .filter(l -> filterRam(l, request.getMinRam()))
                .sorted(Comparator.comparingDouble(l ->
                        calculateScore(l, request.getUsage(), request.getPerformanceLevel())))
                .collect(Collectors.toList());

        return ResponseEntity.ok(filtered);
    }

    @GetMapping("/laptop/crawl")
    public CrawlResponse crawlWebsite(@RequestParam String company) {
        String folderPath;

        switch (company.toLowerCase()) {
            case "dell":
                folderPath = "C:\\Users\\Admin\\Desktop\\ACC Project\\Backend\\src\\main\\java\\com\\LaptopRecommendationSystem\\Backend\\API\\ResourceFiles\\HTMLTXTFILES\\DELL";
                break;
            case "apple":
                folderPath = "C:\\Users\\Admin\\Desktop\\ACC Project\\Backend\\src\\main\\java\\com\\LaptopRecommendationSystem\\Backend\\API\\ResourceFiles\\HTMLTXTFILES\\APPLE";
                break;
            case "asus":
                folderPath = "C:\\Users\\Admin\\Desktop\\ACC Project\\Backend\\src\\main\\java\\com\\LaptopRecommendationSystem\\Backend\\API\\ResourceFiles\\HTMLTXTFILES\\ASUS";
                break;
            case "lenovo":
                folderPath = "C:\\Users\\Admin\\Desktop\\ACC Project\\Backend\\src\\main\\java\\com\\LaptopRecommendationSystem\\Backend\\API\\ResourceFiles\\HTMLTXTFILES\\LENOVO";
                break;
            case "hp":
                folderPath = "C:\\Users\\Admin\\Desktop\\ACC Project\\Backend\\src\\main\\java\\com\\LaptopRecommendationSystem\\Backend\\API\\ResourceFiles\\HTMLTXTFILES\\HP";
                break;
            default:
                folderPath = "C:\\Users\\Admin\\Desktop\\TempTxt\\Default";
        }

        return crawlService.processCompanyFiles(folderPath, company);
    }

    @GetMapping("/laptops/frequentCount")
    public ResponseEntity<FrequentCountResponse> searchDocuments(
            @RequestParam String query
    ) {
        List<TrieSearchResult> trieSeachresults = searchService.search(query);
        List<String> brands = trieSeachresults.stream()
                .map(item -> {
                    // Split the path by '/' and take the first segment
                    int firstSlashIndex = item.getUrl().indexOf('/');
                    if (firstSlashIndex == -1) return item.getUrl();  // Handle case without slash
                    return item.getUrl().substring(0, firstSlashIndex);
                })
                .distinct()  // Get unique brand names
                .collect(Collectors.toList());

        List<CrawlResponse> lstCrwalResponse = new ArrayList<>();
//        for (String brand : brands) {
//            lstCrwalResponse.add(crawlWebsite(brand));
//        }

        FrequentCountResponse objResponse = new FrequentCountResponse();
        objResponse.setBrand(brands);
        objResponse.setLstTrieSearchResult(trieSeachresults);

        return ResponseEntity.ok(objResponse);

    }
}