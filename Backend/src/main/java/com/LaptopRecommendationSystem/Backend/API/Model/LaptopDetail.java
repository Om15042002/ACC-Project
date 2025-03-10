package com.LaptopRecommendationSystem.Backend.API.Model;

import java.util.List;

//Represents all the properties of a laptop
public class LaptopDetail {

    public String model;
    public String brand;
    public String price;
    public String imageURL;

    //below properties are nested
    public Processor processor;
    public Memory memory;
    public Storage storage;
    public Display display;
    public Battery battery;
    public Graphics graphics;
    public Audio audio;
    public Connectivity connectivity;
    public BuildQuality buildQuality;
    public String operatingSystem;
    public SpecialFeatures specialFeatures;

    //contains brand, model , speed of cpu in GHz and cores
    public class Processor {
        public String brand;
        public String model;
        public double speedGHz;
        public int cores;
    }

    //contains size in GB and type of memory
    public static class Memory {
        public int sizeGB;
        public String type;
    }

    //contains type of storage HDD or SSD and capacity in GB
    public static class Storage {
        public String type;
        public int capacityGB;
    }

    //contains size in inches, resolution , refreshrate in Hz and whether the screen is touch screen or not
    public static class Display {
        public double sizeInches;
        public String resolution;
        public int refreshRateHz;
        public boolean isTouchscreen;
    }

    //contains capacity in Wh and estimated usage time of battery
    public static class Battery {
        public int capacityWh;
        public String estimatedUsageTime;
    }

    //contains type of graphics card dedicated or integrated, brand and model no.
    public static class Graphics {
        public String type;
        public String brand;
        public String model;
    }

    //contains brand, model , speed of cpu in GHz and cores
    public class Audio {
        public String speakerDescription;
        public boolean hasHeadphoneJack;
        public String microphoneQuality;
    }

    //contains available ports wifistandard and blutooth version of laptop
    public class Connectivity {
        public List<String> ports;
        public String wifiStandard;
        public String bluetoothVersion;
    }

    //contains weight in Kg, body material and durability rating
    public class BuildQuality {
        public double weightKg;
        public String material;
        public String durabilityRating;
    }

    //contains whether or not a laptop has backlit keyboard, fingerprint sensor, facial unlock and convertability
    public class SpecialFeatures {
        public boolean backlitKeyboard;
        public boolean fingerprintReader;
        public boolean facialRecognition;
        public boolean isConvertible;
    }

    public static boolean filterPrice(LaptopDetail laptop, String priceRange) {
        if (priceRange == null) return true;

        // Convert laptop price from "$1253" to numerical value
        double price = Double.parseDouble(laptop.price.replace("$", "").trim());

        return switch (priceRange) {
            case "500-1000" -> price >= 500 && price <= 1000;
            case "1000-1500" -> price >= 1000 && price <= 1500;
            case "1500-2000" -> price >= 1500 && price <= 2000;
            case "2000+" -> price >= 2000;
            default -> true;
        };
    }

    public static boolean filterPerformance(LaptopDetail laptop, String performance) {
        if (performance == null) return true;

        Processor processor = laptop.processor;
        Graphics graphics = laptop.graphics;

        return switch (performance) {
            case "high" -> // Gaming/Video Editing requirements
                    processor.cores >= 6 &&
                            processor.speedGHz >= 3.5 &&
                            "Dedicated".equalsIgnoreCase(graphics.type);

            case "medium" -> // Multitasking requirements
                    processor.cores >= 4 &&
                            processor.speedGHz >= 2.5 &&
                            laptop.memory.sizeGB >= 8;

            case "low" -> // Light usage
                    processor.cores >= 2 &&
                            processor.speedGHz >= 1.8;

            default -> true;
        };
    }

    public static boolean filterPortability(LaptopDetail laptop, String portability) {
        if (portability == null) return true;

        Battery battery = laptop.battery;
        double weight = laptop.buildQuality.weightKg;

        return switch (portability) {
            case "lightweight" -> weight < 1.5;
            case "battery" -> parseBatteryHours(battery.estimatedUsageTime) >= 8;
            case "both" -> weight < 1.5 && parseBatteryHours(battery.estimatedUsageTime) >= 8;
            default -> true;
        };
    }
    public static boolean filterBrand(LaptopDetail laptop, String brand) {
        return brand == null || laptop.brand.equalsIgnoreCase(brand);
    }

    public static boolean filterStorage(LaptopDetail laptop, Integer storage) {
        return storage == null || laptop.storage.capacityGB >= storage;
    }

    public static boolean filterRam(LaptopDetail laptop, Integer ram) {
        return ram == null || laptop.memory.sizeGB >= ram;
    }
    public static boolean filterScreenSize(LaptopDetail laptop, Double screen) {
        if (screen == null) return true;

        double size = laptop.display.sizeInches;
        return switch (screen.intValue()) {
            case 13 -> size <= 13;
            case 15 -> size > 13 && size <= 15;
            case 17 -> size >= 16;
            default -> true;
        };
    }

    // Helper method to parse battery hours from "Up to 15 hours"
    public static double parseBatteryHours(String batteryTime) {
        try {
            String[] parts = batteryTime.split(" ");
            return Double.parseDouble(parts[parts.length - 2]);
        } catch (Exception e) {
            return 0;
        }
    }

    public static double calculateScore(LaptopDetail laptop, String usage, String performance) {
        double score = 0;

        // Base score components
        score += laptop.processor.speedGHz * 2;
        score += laptop.processor.cores * 0.5;
        score += laptop.memory.sizeGB * 0.2;
        score += laptop.storage.capacityGB * 0.01;

        // Usage-based scoring
        if (usage != null) {
            switch (usage.toLowerCase()) {
                case "gaming":
                    score += "Dedicated".equalsIgnoreCase(laptop.graphics.type) ? 50 : 0;
                    score += laptop.display.refreshRateHz * 0.5;
                    break;
                case "design":
                    score += laptop.display.sizeInches * 2;
                    score += laptop.display.resolution.contains("3840") ? 30 : 0;
                    break;
                case "productivity":
                    score += laptop.memory.sizeGB * 0.5;
                    score += laptop.specialFeatures.backlitKeyboard ? 20 : 0;
                    break;
            }
        }

        // Performance needs
        if (performance != null && performance.equalsIgnoreCase("high")) {
            score += laptop.graphics.type.equalsIgnoreCase("Dedicated") ? 40 : 0;
            score += laptop.processor.cores * 2;
        }

        // Portability bonus
        if (laptop.buildQuality.weightKg < 1.5) score += 20;
        if (parseBatteryHours(laptop.battery.estimatedUsageTime) > 8) score += 15;

        return score;
    }

}
