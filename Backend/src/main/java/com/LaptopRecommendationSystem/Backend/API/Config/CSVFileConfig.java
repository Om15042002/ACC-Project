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
                laptop.model = data[0];
                laptop.brand = data[1];
                laptop.price = data[2];
                laptop.imageURL = data[3];

                laptop.processor = laptop.new Processor();

                laptop.processor.brand = data[4];
                laptop.processor.model = data[5];
                laptop.processor.speedGHz = Double.parseDouble(data[6]);
                laptop.processor.cores = Integer.parseInt(data[7]);

                laptop.memory = new LaptopDetail.Memory();

                laptop.memory.sizeGB = Integer.parseInt(data[8]);

                laptop.memory.type = data[9];

                laptop.storage = new LaptopDetail.Storage();

                laptop.storage.capacityGB = Integer.parseInt(data[11]);
                laptop.storage.type = data[10];

                laptop.display = new LaptopDetail.Display();
                laptop.display.sizeInches = Double.parseDouble(data[12]);
                laptop.display.resolution = data[13];
                laptop.display.refreshRateHz = Integer.parseInt(data[14]);
                laptop.display.isTouchscreen = Boolean.parseBoolean(data[15]);

                laptop.battery = new LaptopDetail.Battery();
                laptop.battery.capacityWh = Integer.parseInt(data[16]);
                laptop.battery.estimatedUsageTime = data[17];

                laptop.graphics = new LaptopDetail.Graphics();
                laptop.graphics.type = data[18];
                laptop.graphics.brand = data[19];
                laptop.graphics.model = data[20];


// Audio
                laptop.audio = laptop.new Audio();
                laptop.audio.speakerDescription = data[21];
                laptop.audio.hasHeadphoneJack = Boolean.parseBoolean(data[22]);
                laptop.audio.microphoneQuality = data[23];

// Connectivity
                laptop.connectivity = laptop.new Connectivity();
                laptop.connectivity.ports = Arrays.asList(data[24].split(",")); // Assuming ports are semicolon-separated
                laptop.connectivity.wifiStandard = data[25];
                laptop.connectivity.bluetoothVersion = data[26];

// BuildQuality
                laptop.buildQuality = laptop.new BuildQuality();
                laptop.buildQuality.weightKg = Double.parseDouble(data[27]);
                laptop.buildQuality.material = data[28];
                laptop.buildQuality.durabilityRating = data[29];

// Operating System
                laptop.operatingSystem = data[30];

// Special Features
                laptop.specialFeatures = laptop.new SpecialFeatures();
                laptop.specialFeatures.backlitKeyboard = Boolean.parseBoolean(data[31]);
                laptop.specialFeatures.fingerprintReader = Boolean.parseBoolean(data[32]);
                laptop.specialFeatures.facialRecognition = Boolean.parseBoolean(data[33]);
                laptop.specialFeatures.isConvertible = Boolean.parseBoolean(data[34]);




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