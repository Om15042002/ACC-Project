package com.LaptopRecommendationSystem.Backend.API.Services;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SpellChecking {


    //        method for loading the vocabulary and spellchecking for the word strings.
    public static Set<String> loadVocabulary(String filePath) {
        Set<String> vocabulary = new HashSet<>();
        Pattern pattern = Pattern.compile("\\b[a-zA-Z]+\\b"); // Extract words

        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                Matcher matcher = pattern.matcher(line.toLowerCase());
                while (matcher.find()) {
                    vocabulary.add(matcher.group());
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return vocabulary;
    }
}
