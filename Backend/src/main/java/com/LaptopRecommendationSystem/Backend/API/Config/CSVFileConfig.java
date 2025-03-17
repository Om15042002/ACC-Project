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
import java.util.Arrays;
import java.util.List;


@Configuration
public class CSVFileConfig {

    private static final List<LaptopDetail> lstLaptop = ReadCSVFile();

    //reading csv file
    public static List<LaptopDetail> ReadCSVFile() {
        List<LaptopDetail> laptops = new ArrayList<>();

        String filePath = StringConstants.FILEPATH;
        try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
            List<String[]> rows = reader.readAll();

            // Skip header if exists
            boolean hasHeader = true;
            int startRow = hasHeader ? 1 : 0;

            for (int i = startRow; i < rows.size(); i++) {
                String[] data = rows.get(i);
                LaptopDetail laptop = new LaptopDetail();
//                laptop.id = data[0];

                laptop.model = data[1];
                laptop.brand = data[2];

                laptop.price = data[3];
                laptop.imageURL = data[4];

                laptop.processor = laptop.new Processor();

                laptop.processor.brand = data[5];
                laptop.processor.model = data[6];
                laptop.processor.speedGHz = Double.parseDouble(data[7]);
                laptop.processor.cores = Integer.parseInt(data[8]);

                laptop.memory = new LaptopDetail.Memory();

                laptop.memory.sizeGB = Integer.parseInt(data[9]);

                laptop.memory.type = data[10];

                laptop.storage = new LaptopDetail.Storage();

                laptop.storage.capacityGB = Integer.parseInt(data[12]);
                laptop.storage.type = data[11];

                laptop.display = new LaptopDetail.Display();
                laptop.display.sizeInches = Double.parseDouble(data[13]);
                laptop.display.resolution = data[14];
                laptop.display.refreshRateHz = Integer.parseInt(data[15]);
                laptop.display.isTouchscreen = Boolean.parseBoolean(data[16]);

                laptop.battery = new LaptopDetail.Battery();
                laptop.battery.capacityWh = Integer.parseInt(data[17]);
                laptop.battery.estimatedUsageTime = data[18];

                laptop.graphics = new LaptopDetail.Graphics();
                laptop.graphics.type = data[19];
                laptop.graphics.brand = data[20];
                laptop.graphics.model = data[21];


// Audio
                laptop.audio = laptop.new Audio();
                laptop.audio.speakerDescription = data[22];
                laptop.audio.hasHeadphoneJack = Boolean.parseBoolean(data[23]);
                laptop.audio.microphoneQuality = data[24];

// Connectivity
                laptop.connectivity = laptop.new Connectivity();
                laptop.connectivity.ports = Arrays.asList(data[25].split(",")); // Assuming ports are semicolon-separated
                laptop.connectivity.wifiStandard = data[26];
                laptop.connectivity.bluetoothVersion = data[27];

// BuildQuality
                laptop.buildQuality = laptop.new BuildQuality();
                laptop.buildQuality.weightKg = Double.parseDouble(data[28]);
                laptop.buildQuality.material = data[29];
                laptop.buildQuality.durabilityRating = data[30];

// Operating System
                laptop.operatingSystem = data[31];

// Special Features
                laptop.specialFeatures = laptop.new SpecialFeatures();
                laptop.specialFeatures.backlitKeyboard = Boolean.parseBoolean(data[32]);
                laptop.specialFeatures.fingerprintReader = Boolean.parseBoolean(data[33]);
                laptop.specialFeatures.facialRecognition = Boolean.parseBoolean(data[34]);
                laptop.specialFeatures.isConvertible = Boolean.parseBoolean(data[35]);




                if (laptop != null) {
                    laptops.add(laptop);
                }
            }
        } catch (IOException | CsvException e) {
            e.printStackTrace();
        }

        return laptops;
    }

    @Bean
    public List<LaptopDetail> FileRecords() {
        return lstLaptop;
    }
}