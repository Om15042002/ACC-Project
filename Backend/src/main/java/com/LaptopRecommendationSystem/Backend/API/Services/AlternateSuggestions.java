package com.LaptopRecommendationSystem.Backend.API.Services;// Filename: AlternateSuggestions.java

import com.LaptopRecommendationSystem.Backend.API.ResourceFiles.StringConstants;
import com.LaptopRecommendationSystem.Backend.API.Services.EditDistanceAlgo;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.Set;

public class AlternateSuggestions {

    public static Set<String> vocab =null;
    public static CuckooHashing hashTable = null;
    //    Created a method for getting alternate suggestions.
    public static List<String[]> getSuggestions(String word, Set<String> vocabulary) {
        List<String[]> suggestions = new ArrayList<>();

//            creating and storing alternate suggestions into a list according to their edit distance.
        for (String vocabWord : vocabulary) {
            int distance = EditDistanceAlgo.compute(word, vocabWord);
            suggestions.add(new String[]{vocabWord, String.valueOf(distance)});
        }
        return suggestions;
    }

    public static List<String> SpellCheckAndGiveSuggestion(String word) {

        // Created a set of vocabulary from the CSV file.
        if(vocab==null && hashTable==null){
            vocab = SpellChecking.loadVocabulary(StringConstants.FILEPATH);

            // Creating an instance of CuckooHashing class
            hashTable = new CuckooHashing();
            for (String w : vocab) {
                hashTable.insert(w);
            }

        }

        List<String> result= new ArrayList<>();
//        Checking if the word is spelled correctly or not
        if (hashTable.lookup(word)) {
            return result;
        } else {

            // if the word is misspelled then finding alternate suggestions for that word and creating a list of alternate suggestions for sorting them according to their sequence.
            List<String[]> suggestions = AlternateSuggestions.getSuggestions(word, vocab);
            suggestions = MergeSort.mergeSort(suggestions);

            // printing top 5 suggestions according to their edit distance and sorting them by merge sort.
            for (int i = 0; i < Math.min(5, suggestions.size()); i++) {
                result.add(suggestions.get(i)[0]) ;
            }
        }
        return  result;

    }


}


