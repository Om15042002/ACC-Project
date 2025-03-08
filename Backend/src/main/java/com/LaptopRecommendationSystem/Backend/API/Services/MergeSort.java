package com.LaptopRecommendationSystem.Backend.API.Services;

import java.util.ArrayList;
import java.util.List;
public class MergeSort {

    //    Merge sort implementation for sorting the suggestions according to their edit distance algorithm.
    public static List<String[]> mergeSort(List<String[]> list) {
        if (list.size() <= 1) return list;

        int mid = list.size() / 2;
        List<String[]> left = mergeSort(list.subList(0, mid));
        List<String[]> right = mergeSort(list.subList(mid, list.size()));

        return merge(left, right);
    }

    //        merging the string lists.
    private static List<String[]> merge(List<String[]> left, List<String[]> right) {
        List<String[]> sorted = new ArrayList<>();
        int i = 0, j = 0;


        while (i < left.size() && j < right.size()) {
            if (Integer.parseInt(left.get(i)[1]) <= Integer.parseInt(right.get(j)[1])) {
                sorted.add(left.get(i++));
            } else {
                sorted.add(right.get(j++));
            }
        }
        sorted.addAll(left.subList(i, left.size()));
        sorted.addAll(right.subList(j, right.size()));
        return sorted;
    }


}
