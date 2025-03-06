class LaptopDetail {
    constructor() {
        this.model = "";
        this.brand = "";
        this.price = "";
        this.imageURL = "";
        // Nested properties
        this.processor = new Processor();
        this.memory = new Memory();
        this.storage = new Storage();
        this.display = new Display();
        this.battery = new Battery();
        this.graphics = new Graphics();
        this.audio = new Audio();
        this.connectivity = new Connectivity();
        this.buildQuality = new BuildQuality();
        this.operatingSystem = "";
        this.specialFeatures = new SpecialFeatures();
    }
}

// Processor Class
class Processor {
    constructor() {
        this.brand = "";
        this.model = "";
        this.speedGHz = 0.0;
        this.cores = 0;
    }
}

// Memory Class
class Memory {
    constructor() {
        this.sizeGB = 0;
        this.type = "";
    }
}

// Storage Class
class Storage {
    constructor() {
        this.type = "";
        this.capacityGB = 0;
    }
}

// Display Class
class Display {
    constructor() {
        this.sizeInches = 0.0;
        this.resolution = "";
        this.refreshRateHz = 0;
        this.isTouchscreen = false;
    }
}

// Battery Class
class Battery {
    constructor() {
        this.capacityWh = 0;
        this.estimatedUsageTime = "";
    }
}

// Graphics Class
class Graphics {
    constructor() {
        this.type = "";
        this.brand = "";
        this.model = "";
    }
}

// Audio Class
class Audio {
    constructor() {
        this.speakerDescription = "";
        this.hasHeadphoneJack = false;
        this.microphoneQuality = "";
    }
}

// Connectivity Class
class Connectivity {
    constructor() {
        this.ports = [];
        this.wifiStandard = "";
        this.bluetoothVersion = "";
    }
}

// Build Quality Class
class BuildQuality {
    constructor() {
        this.weightKg = 0.0;
        this.material = "";
        this.durabilityRating = "";
    }
}

// Special Features Class
class SpecialFeatures {
    constructor() {
        this.backlitKeyboard = false;
        this.fingerprintReader = false;
        this.facialRecognition = false;
        this.isConvertible = false;
    }
}

