package com.LaptopRecommendationSystem.Backend.API.Services;

public class CuckooHashing {

    private static final int SIZE = 1000;
    //        first hash table
    private String[] table1 = new String[SIZE];
    //        second hash table
    private String[] table2 = new String[SIZE];

    //        first hash function
    private int hash1(String key) {
        return Math.abs(key.hashCode()) % SIZE;
    }

    //        second hash function
    private int hash2(String key) {
        return (Math.abs(key.hashCode()) / SIZE) % SIZE;
    }

    //        method for inserting words in table.
    public void insert(String word) {
        int pos1 = hash1(word);
        if (table1[pos1] == null) {
            table1[pos1] = word;
            return;
        }

        String displacedWord = table1[pos1];
        table1[pos1] = word;

        int pos2 = hash2(displacedWord);
        if (table2[pos2] == null) {
            table2[pos2] = displacedWord;
        } else {
            System.out.println("Rehash required!");
        }
    }


    //        method for lookup in Cuckoo hash table.
    public boolean lookup(String word) {
        return word.equals(table1[hash1(word)]) || word.equals(table2[hash2(word)]);
    }
}
