package com.LaptopRecommendationSystem.Backend.API.Model;

import java.util.List;

//Represents all the properties of a laptop
public class LaptopDetail {

    public String model;
    public String brand;
    public double price;
    public String imageURL;

    //below properties are nested
    public  Processor processor;
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
    public  class Memory {
        public int sizeGB;
        public String type;
    }

    //contains type of storage HDD or SSD and capacity in GB
    public  class Storage {
        public String type;
        public int capacityGB;
    }

    //contains size in inches, resolution , refreshrate in Hz and whether the screen is touch screen or not
    public  class Display {
        public double sizeInches;
        public String resolution;
        public int refreshRateHz;
        public boolean isTouchscreen;
    }

    //contains capacity in Wh and estimated usage time of battery
    public  class Battery {
        public int capacityWh;
        public String estimatedUsageTime;
    }

    //contains type of graphics card dedicated or integrated, brand and model no.
    public  class Graphics {
        public String type;
        public String brand;
        public String model;
    }

    //contains brand, model , speed of cpu in GHz and cores
    public  class Audio {
        public String speakerDescription;
        public boolean hasHeadphoneJack;
        public String microphoneQuality;
    }

    //contains available ports wifistandard and blutooth version of laptop
    public  class Connectivity {
        public List<String> ports;
        public String wifiStandard;
        public String bluetoothVersion;
    }

    //contains weight in Kg, body material and durability rating
    public  class BuildQuality {
        public double weightKg;
        public String material;
        public String durabilityRating;
    }

    //contains whether or not a laptop has backlit keyboard, fingerprint sensor, facial unlock and convertability
    public  class SpecialFeatures {
        public boolean backlitKeyboard;
        public boolean fingerprintReader;
        public boolean facialRecognition;
        public boolean isConvertible;
    }

}
