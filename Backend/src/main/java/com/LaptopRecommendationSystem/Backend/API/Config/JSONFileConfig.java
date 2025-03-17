package com.LaptopRecommendationSystem.Backend.API.Config;

import com.LaptopRecommendationSystem.Backend.API.Model.LaptopDetail;
import com.LaptopRecommendationSystem.Backend.API.ResourceFiles.StringConstants;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class JSONFileConfig {

    private static final List<LaptopDetail> lstLaptop = readJsonFile();

    public List<LaptopDetail> FileRecords() {
        return lstLaptop;
    }
    public static List<LaptopDetail> readJsonFile() {
        List<LaptopDetail> laptops = new ArrayList<>();
        String filePath = StringConstants.JSONFILEPATH; // JSON file path
        ObjectMapper mapper = new ObjectMapper();

        try {
            // Read the root node from the JSON file. Assume the file contains an array of laptop objects.
            JsonNode rootNode = mapper.readTree(new File(filePath));
            if (rootNode.isArray()) {
                for (JsonNode node : rootNode) {
                    LaptopDetail laptop = new LaptopDetail();
                    laptop.id = node.get("Id").asText();

                    // Basic Information
                    laptop.model = node.get("Model").asText();
                    laptop.brand = node.get("Brand").asText();
                    // If price is numeric, you might want to store it accordingly.
                    // Here we convert to string to align with your CSV version.
                    laptop.price = node.get("Price").asText();
                    laptop.imageURL = node.get("ImageURL").asText();

                    // Processor Information
                    laptop.processor = laptop.new Processor();
                    laptop.processor.brand = node.get("ProcessorBrand").asText();
                    laptop.processor.model = node.get("ProcessorModel").asText();
                    laptop.processor.speedGHz = node.get("ProcessorSpeedGHz").asDouble();
                    laptop.processor.cores = node.get("ProcessorCores").asInt();

                    // Memory Information
                    laptop.memory = new LaptopDetail.Memory();
                    laptop.memory.sizeGB = node.get("MemorySizeGB").asInt();
                    laptop.memory.type = node.get("MemoryType").asText();

                    // Storage Information
                    laptop.storage = new LaptopDetail.Storage();
                    laptop.storage.type = node.get("StorageType").asText();
                    laptop.storage.capacityGB = node.get("StorageCapacityGB").asInt();

                    // Display Information
                    laptop.display = new LaptopDetail.Display();
                    laptop.display.sizeInches = node.get("DisplaySizeInches").asDouble();
                    laptop.display.resolution = node.get("DisplayResolution").asText();
                    laptop.display.refreshRateHz = node.get("DisplayRefreshRateHz").asInt();
                    laptop.display.isTouchscreen = node.get("DisplayIsTouchscreen").asBoolean();

                    // Battery Information
                    laptop.battery = new LaptopDetail.Battery();
                    laptop.battery.capacityWh = node.get("BatteryCapacityWh").asInt();
                    laptop.battery.estimatedUsageTime = node.get("BatteryEstimatedUsageTime").asText();

                    // Graphics Information
                    laptop.graphics = new LaptopDetail.Graphics();
                    laptop.graphics.type = node.get("GraphicsType").asText();
                    laptop.graphics.brand = node.get("GraphicsBrand").asText();
                    laptop.graphics.model = node.get("GraphicsModel").asText();

                    // Audio Information
                    laptop.audio = laptop.new Audio();
                    laptop.audio.speakerDescription = node.get("AudioSpeakerDescription").asText();
                    laptop.audio.hasHeadphoneJack = node.get("AudioHasHeadphoneJack").asBoolean();
                    laptop.audio.microphoneQuality = node.get("AudioMicrophoneQuality").asText();

                    // Connectivity Information
                    laptop.connectivity = laptop.new Connectivity();
                    String ports = node.get("ConnectivityPorts").asText();
                    laptop.connectivity.ports = Arrays.asList(ports.split(",\\s*"));
                    laptop.connectivity.wifiStandard = node.get("ConnectivityWifiStandard").asText();
                    // If Bluetooth version is numeric, you may convert it; here we treat it as text.
                    laptop.connectivity.bluetoothVersion = node.get("ConnectivityBluetoothVersion").asText();

                    // Build Quality Information
                    laptop.buildQuality = laptop.new BuildQuality();
                    laptop.buildQuality.weightKg = node.get("BuildQualityWeightKg").asDouble();
                    laptop.buildQuality.material = node.get("BuildQualityMaterial").asText();
                    laptop.buildQuality.durabilityRating = node.get("BuildQualityDurabilityRating").asText();

                    // Operating System
                    laptop.operatingSystem = node.get("OperatingSystem").asText();

                    // Special Features
                    laptop.specialFeatures = laptop.new SpecialFeatures();
                    laptop.specialFeatures.backlitKeyboard = node.get("SpecialFeaturesBacklitKeyboard").asBoolean();
                    laptop.specialFeatures.fingerprintReader = node.get("SpecialFeaturesFingerprintReader").asBoolean();
                    laptop.specialFeatures.facialRecognition = node.get("SpecialFeaturesFacialRecognition").asBoolean();
                    laptop.specialFeatures.isConvertible = node.get("SpecialFeaturesIsConvertible").asBoolean();

                    laptops.add(laptop);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return laptops;
    }
}
