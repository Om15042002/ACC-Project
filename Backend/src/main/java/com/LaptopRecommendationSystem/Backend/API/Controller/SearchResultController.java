package com.LaptopRecommendationSystem.Backend.API.Controller;

import com.LaptopRecommendationSystem.Backend.API.Model.TestModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SearchResultController {

    @GetMapping("/filter")
    public TestModel getFilteredData(@RequestParam(required = false) Integer id) {
        TestModel user = new TestModel();
        user.name = "om";
        user.age = 23;
        return user;
    }
}