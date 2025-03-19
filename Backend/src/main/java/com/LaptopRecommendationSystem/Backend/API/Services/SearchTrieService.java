package com.LaptopRecommendationSystem.Backend.API.Services;

import com.LaptopRecommendationSystem.Backend.API.Model.TrieSearchResult;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;

class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    Map<String, Integer> documentFrequencies = new HashMap<>();
}

@Service
public class SearchTrieService {
    private final TrieNode root = new TrieNode();
    private final AtomicBoolean isInitialized = new AtomicBoolean(false);
    private final List<Path> folders = Arrays.asList(
            Paths.get("C:\\Users\\Admin\\Desktop\\ACC Project\\Backend\\src\\main\\java\\com\\LaptopRecommendationSystem\\Backend\\API\\ResourceFiles\\HTMLTXTFILES\\APPLE"),
            Paths.get("C:\\Users\\Admin\\Desktop\\ACC Project\\Backend\\src\\main\\java\\com\\LaptopRecommendationSystem\\Backend\\API\\ResourceFiles\\HTMLTXTFILES\\ASUS"),
            Paths.get("C:\\Users\\Admin\\Desktop\\ACC Project\\Backend\\src\\main\\java\\com\\LaptopRecommendationSystem\\Backend\\API\\ResourceFiles\\HTMLTXTFILES\\HP"),
            Paths.get("C:\\Users\\Admin\\Desktop\\ACC Project\\Backend\\src\\main\\java\\com\\LaptopRecommendationSystem\\Backend\\API\\ResourceFiles\\HTMLTXTFILES\\LENOVO")
//            Paths.get("C:\\Users\\Admin\\Desktop\\TempTxt\\")
    );

    private synchronized void initializeIfNeeded() {
        if (!isInitialized.get()) {
            buildTrieIndex();
            isInitialized.set(true);
        }
    }

    private void buildTrieIndex() {
        for (Path folder : folders) {
            try (DirectoryStream<Path> stream = Files.newDirectoryStream(folder, "*.txt")) {
                for (Path file : stream) {
                    String content = new String(Files.readAllBytes(file));
                    String fileName = folder.getFileName() + "/" + file.getFileName();
                    insertIntoTrie(content, fileName);
                }
            } catch (IOException e) {
                throw new RuntimeException("Error reading files in folder: " + folder, e);
            }
        }
    }

    private void insertIntoTrie(String content, String fileName) {
        String[] words = content.toLowerCase()
                .replaceAll("[^a-zA-Z0-9\\s]", "")
                .split("\\s+");

        for (String word : words) {
            TrieNode current = root;
            for (char c : word.toCharArray()) {
                current = current.children.computeIfAbsent(c, k -> new TrieNode());
            }
            current.documentFrequencies.merge(fileName, 1, Integer::sum);
        }
    }

    public List<TrieSearchResult> search(String query) {
        // Initialize trie on first search request
        if (!isInitialized.get()) {
            initializeIfNeeded();
        }

        String[] terms = query.toLowerCase().split("\\s+");
        Map<String, Integer> results = new HashMap<>();

        for (String term : terms) {
            TrieNode node = searchTrie(term);
            if (node != null) {
                node.documentFrequencies.forEach((file, count) -> {
                    results.merge(file, count, Integer::sum);
                });
            }
        }

        return results.entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                .map(entry -> new TrieSearchResult(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    private TrieNode searchTrie(String word) {
        TrieNode current = root;
        for (char c : word.toCharArray()) {
            current = current.children.get(c);
            if (current == null) break;
        }
        return current;
    }
}