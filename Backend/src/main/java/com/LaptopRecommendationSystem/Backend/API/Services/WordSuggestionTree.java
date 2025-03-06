package com.LaptopRecommendationSystem.Backend.API.Services;

import java.util.*;

// AVL Tree implementation for storing words efficiently
public class WordSuggestionTree {
    private WordNode root;

    // Get the height of a node (null nodes have height 0)
    private int getHeight(WordNode node) {
        return (node == null) ? 0 : node.height;
    }

    // Calculate the balance factor of a node
    private int getBalanceFactor(WordNode node) {
        return (node == null) ? 0 : getHeight(node.left) - getHeight(node.right);
    }

    // Perform a right rotation to balance the tree
    private WordNode rotateRight(WordNode unbalancedNode) {
        WordNode newRoot = unbalancedNode.left;
        WordNode tempSubtree = newRoot.right;

        // Perform rotation
        newRoot.right = unbalancedNode;
        unbalancedNode.left = tempSubtree;

        // Update heights
        unbalancedNode.height = Math.max(getHeight(unbalancedNode.left), getHeight(unbalancedNode.right)) + 1;
        newRoot.height = Math.max(getHeight(newRoot.left), getHeight(newRoot.right)) + 1;

        return newRoot;
    }

    // Perform a left rotation to balance the tree
    private WordNode rotateLeft(WordNode unbalancedNode) {
        WordNode newRoot = unbalancedNode.right;
        WordNode tempSubtree = newRoot.left;

        // Perform rotation
        newRoot.left = unbalancedNode;
        unbalancedNode.right = tempSubtree;

        // Update heights
        unbalancedNode.height = Math.max(getHeight(unbalancedNode.left), getHeight(unbalancedNode.right)) + 1;
        newRoot.height = Math.max(getHeight(newRoot.left), getHeight(newRoot.right)) + 1;

        return newRoot;
    }

    // Insert a word into the AVL tree
    public void insert(String word) {
        root = insertIntoTree(root, word);
    }

    private WordNode insertIntoTree(WordNode node, String word) {
        if (node == null) return new WordNode(word); // Create new node if null

        if (word.compareTo(node.word) < 0) {
            node.left = insertIntoTree(node.left, word); // Insert in left subtree
        } else if (word.compareTo(node.word) > 0) {
            node.right = insertIntoTree(node.right, word); // Insert in right subtree
        } else {
            node.frequency++; // If word exists, increase its frequency
            return node;
        }

        // Update height after insertion
        node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));

        // Balance the tree if needed
        int balance = getBalanceFactor(node);

        // Left-Left case (Right rotation needed)
        if (balance > 1 && word.compareTo(node.left.word) < 0)
            return rotateRight(node);

        // Right-Right case (Left rotation needed)
        if (balance < -1 && word.compareTo(node.right.word) > 0)
            return rotateLeft(node);

        // Left-Right case (Left rotation on left child, then right rotation on node)
        if (balance > 1 && word.compareTo(node.left.word) > 0) {
            node.left = rotateLeft(node.left);
            return rotateRight(node);
        }

        // Right-Left case (Right rotation on right child, then left rotation on node)
        if (balance < -1 && word.compareTo(node.right.word) < 0) {
            node.right = rotateRight(node.right);
            return rotateLeft(node);
        }

        return node;
    }

    // Get top 5 words that start with a given prefix
    public List<String> getWordsWithPrefix(String prefix) {
        List<WordNode> matchingWords = new ArrayList<>();
        findMatchingWords(root, prefix, matchingWords);

        // Use a min-heap (priority queue) to keep the top 5 frequent words
        PriorityQueue<WordNode> topWords = new PriorityQueue<>(Comparator.comparingInt(n -> n.frequency));
        for (WordNode wordNode : matchingWords) {
            topWords.add(wordNode);
            if (topWords.size() > 20) topWords.poll(); // Keep only the top 5
        }

        // Extract the words in descending order
        List<String> sortedResults = new ArrayList<>();
        while (!topWords.isEmpty()) sortedResults.add(topWords.poll().word);
        Collections.reverse(sortedResults);
        return sortedResults;
    }

    // Helper function to collect words that match the given prefix
    private void findMatchingWords(WordNode node, String prefix, List<WordNode> result) {
        if (node == null) return;

        if (node.word.startsWith(prefix)) result.add(node); // If word matches prefix, add it

        // Continue searching in both subtrees
        findMatchingWords(node.left, prefix, result);
        findMatchingWords(node.right, prefix, result);
    }
}
