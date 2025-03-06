package com.LaptopRecommendationSystem.Backend.API.Services;

import com.LaptopRecommendationSystem.Backend.API.ResourceFiles.StringConstants;

import java.io.*;

// Node class for the AVL tree
class WordNode {
    String word; // The word being stored
    int frequency; // How many times this word appears
    WordNode left, right; // Left and right child nodes
    int height; // Height of this node in the AVL tree

    WordNode(String word) {
        this.word = word;
        this.frequency = 1; // New words start with a frequency of 1
        this.height = 1; // New node has height 1
    }
}


// Main class for word completion system
public class WordCompletion {
    public static WordSuggestionTree wordTree = null;

    public static void GenerateWordCompletionTree() throws IOException {
        BufferedReader fileReader = new BufferedReader(new FileReader(StringConstants.FILEPATH));
        String line = fileReader.readLine();
        wordTree = new WordSuggestionTree();
        // Read words from file and insert them into the AVL tree
        while ((line = fileReader.readLine()) != null) {
            for (String word : line.toLowerCase().trim().split("[,\\s]+")) {
//                word.replaceAll("[^a-z]", "");
                System.out.println(word); // Remove non-alphabet );
                wordTree.insert(word); // Remove non-alphabet characters

            }
        }
        fileReader.close();
    }
}