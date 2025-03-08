package com.LaptopRecommendationSystem.Backend.API.Config;


import com.LaptopRecommendationSystem.Backend.API.Model.LaptopDetail;
import com.LaptopRecommendationSystem.Backend.API.ResourceFiles.StringConstants;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;




@Configuration
public class CSVFileConfig {

    private static final List<LaptopDetail> lstLaptop = ReadCSVFile();

    //reading csv file
    public static List<LaptopDetail> ReadCSVFile() {
        List<LaptopDetail> laptops = new ArrayList<>();

        String filePath= StringConstants.FILEPATH;
        try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
            List<String[]> rows = reader.readAll();

            // Skip header if exists
            boolean hasHeader = true;
            int startRow = hasHeader ? 1 : 0;

            for (int i = startRow; i < rows.size(); i++) {
                String[] data = rows.get(i);
                LaptopDetail laptop = new LaptopDetail();
                laptop.model = data[0];
                laptop.brand = data[1];
                laptop.price = data[2];

                laptop.processor = laptop.new Processor();

                laptop.processor.brand = data[4];
                laptop.processor.model="";
                laptop.processor.speedGHz=0;
                laptop.processor.cores=0;
                laptop.imageURL = data[3];

                laptop.memory=null;
                laptop.specialFeatures=null;
                laptop.storage=null;
                laptop.display=null;
                laptop.battery=null;
                laptop.graphics=null;
                laptop.audio=null;
                laptop.connectivity=null;
                laptop.buildQuality=null;

                laptop.operatingSystem="";

                if (laptop != null) {
                    laptops.add(laptop);
                }
            }
        } catch (IOException  | CsvException e) {
            e.printStackTrace();
        }

        return laptops;
    }

    @Bean
    public List<LaptopDetail> FileRecords() {
        return lstLaptop;
    }
}