package com.LaptopRecommendationSystem.Backend.API.Model;

public class FilterDetails {

    public static class RecommendationRequest {
        private String brand;
        private String usage;
        private String priceRange;
        private String performanceLevel;
        private String portability;
        private Double screenSize;
        private Integer minStorage;
        private Integer minRam;

        // Getter methods
        public String getBrand() {
            return brand;
        }

        public String getUsage() {
            return usage;
        }

        public String getPriceRange() {
            return priceRange;
        }

        public String getPerformanceLevel() {
            return performanceLevel;
        }

        public String getPortability() {
            return portability;
        }

        public Double getScreenSize() {
            return screenSize;
        }

        public Integer getMinStorage() {
            return minStorage;
        }

        public Integer getMinRam() {
            return minRam;
        }

        // Setter methods (typically included for completeness)
        public void setBrand(String brand) {
            this.brand = brand;
        }

        public void setUsage(String usage) {
            this.usage = usage;
        }

        public void setPriceRange(String priceRange) {
            this.priceRange = priceRange;
        }

        public void setPerformanceLevel(String performanceLevel) {
            this.performanceLevel = performanceLevel;
        }

        public void setPortability(String portability) {
            this.portability = portability;
        }

        public void setScreenSize(Double screenSize) {
            this.screenSize = screenSize;
        }

        public void setMinStorage(Integer minStorage) {
            this.minStorage = minStorage;
        }

        public void setMinRam(Integer minRam) {
            this.minRam = minRam;
        }
    }
}
