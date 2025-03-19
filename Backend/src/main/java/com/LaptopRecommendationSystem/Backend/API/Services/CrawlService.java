package com.LaptopRecommendationSystem.Backend.API.Services;


import com.LaptopRecommendationSystem.Backend.API.Model.CrawlResponse;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class CrawlService {


    public CrawlResponse processCompanyFiles(String folderPath, String company) {
        Map<String, Set<String>> extractedData = new HashMap<>() {{
            put("phones", new HashSet<>());
            put("emails", new HashSet<>());
            put("urls", new HashSet<>());
        }};

        List<String> fileNames = new ArrayList<>();

        try {
            Path folder = Paths.get("C:\\Users\\Admin\\Desktop\\ACC Project\\Backend\\src\\main\\java\\com\\LaptopRecommendationSystem\\Backend\\API\\ResourceFiles\\HTML Files\\" + company);

            // Get all file names in the directory
            try (DirectoryStream<Path> stream = Files.newDirectoryStream(folder)) {
                for (Path entry : stream) {
                    if (Files.isRegularFile(entry)) {
                        fileNames.add(entry.getFileName().toString());
                    }
                }
            }

            // Process text files for data extraction
            List<Path> textFiles = getTextFiles(Paths.get(folderPath));
            Pattern phonePattern = Pattern.compile(
                    "(?:\\+\\d{1,3}[- ]?)?(?:\\(\\d{3}\\)|\\d{3})[- .]?\\d{3}[- .]?\\d{4}");

            Pattern emailPattern = Pattern.compile(
                    "[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}",
                    Pattern.CASE_INSENSITIVE);

            Pattern urlPattern = Pattern.compile(
                    "(?:https?://|www\\.)[\\w-]+(?:\\.[\\w-]+)*(?:/[\\w#-./?=&%~]*)?",
                    Pattern.CASE_INSENSITIVE);

            for (Path file : textFiles) {
                String content = Files.readString(file, StandardCharsets.UTF_8);
                extractData(content, phonePattern, extractedData.get("phones"));
                extractData(content, emailPattern, extractedData.get("emails"));
                extractData(content, urlPattern, extractedData.get("urls"));
            }

        } catch (IOException e) {
            System.err.println("Error processing files: " + e.getMessage());
        }

        return buildResponse(company, extractedData, fileNames);
    }

    private void extractData(String content, Pattern pattern, Set<String> collector) {
        Matcher matcher = pattern.matcher(content);
        while (matcher.find()) {
            collector.add(matcher.group().trim());
        }
    }

    private CrawlResponse buildResponse(String company, Map<String, Set<String>> data, List<String> fileNames) {
        List<CrawlResponse.ValidationEntity> entities = new ArrayList<>();

        data.get("phones").forEach(phone ->
                entities.add(createValidationEntity("phone", phone))
        );

        data.get("emails").forEach(email ->
                entities.add(createValidationEntity("email", email))
        );

        data.get("urls").forEach(url ->
                entities.add(createValidationEntity("url", url))
        );

        return new CrawlResponse(
                "https://" + company.toLowerCase() + ".com",  // Using actual folder path instead of generated URL
                fileNames,   // List of all file names in the directory
                entities
        );

    }

    private CrawlResponse.ValidationEntity createValidationEntity(String type, String value) {
        boolean isValid = false;
        switch (type) {
            case "phone":
                isValid = isValidPhone(value);
                break;
            case "email":
                isValid = isValidEmail(value);
                break;
            case "url":
                isValid = isValidUrl(value);
                break;
        }
        return new CrawlResponse.ValidationEntity(type, value, isValid);
    }

    private List<Path> getTextFiles(Path folder) throws IOException {
        List<Path> textFiles = new ArrayList<>();
        Files.newDirectoryStream(folder, "*.txt").forEach(textFiles::add);
        return textFiles;
    }

    private boolean isValidEmail(String email) {
        return Pattern.matches("^[A-Za-z0-9+_.-]+@(.+)$", email);
    }

    private boolean isValidPhone(String phone) {
        return Pattern.matches("^\\+?\\d{1,3}[-.\\s]?\\(?\\d{1,3}\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}$", phone);
    }

    private boolean isValidUrl(String url) {
        return Pattern.matches("^(http|https)://[a-zA-Z0-9-.]+\\.[a-zA-Z]{2,}(/\\S*)?$", url);
    }
}