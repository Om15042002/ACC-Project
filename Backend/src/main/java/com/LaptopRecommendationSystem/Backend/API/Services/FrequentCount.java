package com.LaptopRecommendationSystem.Backend.API.Services;

import java.util.*;

public class FrequentCount {

    public static List<Map.Entry<String, Integer>> SortByOccurance(Map<String, Integer> wordWithFrequency) {

        // PriorityQueue (max heap) to sort words based on frequency
        PriorityQueue<Map.Entry<String, Integer>> heap =
                new PriorityQueue<>((entry1, entry2) -> entry2.getValue().compareTo(entry1.getValue()));

        heap.addAll(wordWithFrequency.entrySet());  // Populate the heap

        List<Map.Entry<String, Integer>> finalSortedLst = new ArrayList<>();
        while (!heap.isEmpty()) {
            finalSortedLst.add(heap.poll());  // Extract elements in sorted order
        }

        return finalSortedLst;
    }

    // Counts occurrences of each word in the given list.
    public static Map<String, Integer> CountWordFrequencies(List<String> words) {
        Map<String, Integer> wordCounts = new HashMap<>();

        for (String word : words) {
            if (word != null || word != "") {
                int counter = wordCounts.getOrDefault(word, 0);
                wordCounts.put(word, counter + 1);
            }
        }

        return wordCounts;
    }

}
