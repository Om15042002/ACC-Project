function toggleFilterPanel() {
  const panel = document.getElementById("filterPanel");
  const overlay = document.getElementById("overlay");
  panel.classList.toggle("active");
  overlay.style.display = panel.classList.contains("active") ? "block" : "none";
}

// function fetchLaptops(event) {
//   // Add filter functionality here
//   console.log("Applying filters...");
//   const brandValue = document.querySelector("brand").value;
//   const ramValue = document.querySelector("ram").value;
//   const storageValue = document.querySelector("storage").value;
//   console.log("hello");

//   if (
//     !brandValue.trim() &&
//     !ramValue.trim() &&
//     !storageValue.trim() &&
//     event.type != "DOMContentLoaded"
//   ) {
//     showNotification("Please select atleast One Filter!");
//   } else {
//     toggleFilterPanel();
//   }
// }
// let laptops = [
//   {
//     name: "Dell XPS 13",
//     brand: "Dell",
//     ram: "16GB",
//     storage: "512GB",
//     img: "data:image/webp;base64,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",
//   },
//   {
//     name: "HP Spectre x360",
//     brand: "HP",
//     ram: "16GB",
//     storage: "1TB",
//     img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT1X1jMWbgeCOqEp02vrgycRNG4A1L1Zeo03FZeogyDTT1KVezqnfflNTg8XTur_691RAxqsrv89UFDmwiz1vi5w76aWv4mAV4bK-SLsIYjCFaFw5hr93188QRropC8unD70yaCWXYoWA&usqp=CAc",
//   },
//   {
//     name: "Lenovo ThinkPad X1",
//     brand: "Lenovo",
//     ram: "8GB",
//     storage: "256GB",
//     img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbqGO2yq5FBJB0lyKN-Zgf6dA-FIH56TP7QS4DLjwLD0YpTq_hOrYF7Z8Q2rlLBD7L-UfhKlibMUWXubAVAaCp-doB-clZTwT4-eXutZYWT8-GXWEEcrUJ0HIjtBdS3AGkxZGlsA&usqp=CAc",
//   },
//   {
//     name: "MacBook Air M2",
//     brand: "Apple",
//     ram: "16GB",
//     storage: "512GB",
//     img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSw4VvNtYGArx0AACGoHwcsHEWqiBplSOTJRu6nnBhZmqXGMedGan2SYDZ9O7vCVYhQtdCsE-OeBJGmz38T6BoMz53KjdMc2rcEPBFFn8-W9LQYxLDtmaxZF2cHEqeCuNDZnTh0BBZy&usqp=CAc",
//   },
//   {
//     name: "Lenovo ThinkPad X1",
//     brand: "Lenovo",
//     ram: "8GB",
//     storage: "256GB",
//     img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbqGO2yq5FBJB0lyKN-Zgf6dA-FIH56TP7QS4DLjwLD0YpTq_hOrYF7Z8Q2rlLBD7L-UfhKlibMUWXubAVAaCp-doB-clZTwT4-eXutZYWT8-GXWEEcrUJ0HIjtBdS3AGkxZGlsA&usqp=CAc",
//   },
//   {
//     name: "MacBook Air M2",
//     brand: "Apple",
//     ram: "16GB",
//     storage: "512GB",
//     img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSw4VvNtYGArx0AACGoHwcsHEWqiBplSOTJRu6nnBhZmqXGMedGan2SYDZ9O7vCVYhQtdCsE-OeBJGmz38T6BoMz53KjdMc2rcEPBFFn8-W9LQYxLDtmaxZF2cHEqeCuNDZnTh0BBZy&usqp=CAc",
//   },
//   {
//     name: "Lenovo ThinkPad X1",
//     brand: "Lenovo",
//     ram: "8GB",
//     storage: "256GB",
//     img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbqGO2yq5FBJB0lyKN-Zgf6dA-FIH56TP7QS4DLjwLD0YpTq_hOrYF7Z8Q2rlLBD7L-UfhKlibMUWXubAVAaCp-doB-clZTwT4-eXutZYWT8-GXWEEcrUJ0HIjtBdS3AGkxZGlsA&usqp=CAc",
//   },
//   {
//     name: "MacBook Air M2",
//     brand: "Apple",
//     ram: "16GB",
//     storage: "512GB",
//     img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSw4VvNtYGArx0AACGoHwcsHEWqiBplSOTJRu6nnBhZmqXGMedGan2SYDZ9O7vCVYhQtdCsE-OeBJGmz38T6BoMz53KjdMc2rcEPBFFn8-W9LQYxLDtmaxZF2cHEqeCuNDZnTh0BBZy&usqp=CAc",
//   },
//   {
//     name: "Lenovo ThinkPad X1",
//     brand: "Lenovo",
//     ram: "8GB",
//     storage: "256GB",
//     img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbqGO2yq5FBJB0lyKN-Zgf6dA-FIH56TP7QS4DLjwLD0YpTq_hOrYF7Z8Q2rlLBD7L-UfhKlibMUWXubAVAaCp-doB-clZTwT4-eXutZYWT8-GXWEEcrUJ0HIjtBdS3AGkxZGlsA&usqp=CAc",
//   },
//   {
//     name: "MacBook Air M2",
//     brand: "Apple",
//     ram: "16GB",
//     storage: "512GB",
//     img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSw4VvNtYGArx0AACGoHwcsHEWqiBplSOTJRu6nnBhZmqXGMedGan2SYDZ9O7vCVYhQtdCsE-OeBJGmz38T6BoMz53KjdMc2rcEPBFFn8-W9LQYxLDtmaxZF2cHEqeCuNDZnTh0BBZy&usqp=CAc",
//   },
//   {
//     name: "Lenovo ThinkPad X1",
//     brand: "Lenovo",
//     ram: "8GB",
//     storage: "256GB",
//     img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbqGO2yq5FBJB0lyKN-Zgf6dA-FIH56TP7QS4DLjwLD0YpTq_hOrYF7Z8Q2rlLBD7L-UfhKlibMUWXubAVAaCp-doB-clZTwT4-eXutZYWT8-GXWEEcrUJ0HIjtBdS3AGkxZGlsA&usqp=CAc",
//   },
//   {
//     name: "MacBook Air M2",
//     brand: "Apple",
//     ram: "16GB",
//     storage: "512GB",
//     img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSw4VvNtYGArx0AACGoHwcsHEWqiBplSOTJRu6nnBhZmqXGMedGan2SYDZ9O7vCVYhQtdCsE-OeBJGmz38T6BoMz53KjdMc2rcEPBFFn8-W9LQYxLDtmaxZF2cHEqeCuNDZnTh0BBZy&usqp=CAc",
//   },
//   {
//     name: "Dell XPS 13",
//     brand: "Dell",
//     ram: "16GB",
//     storage: "512GB",
//     img: "data:image/webp;base64,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",
//   },
//   {
//     name: "HP Spectre x360",
//     brand: "HP",
//     ram: "16GB",
//     storage: "1TB",
//     img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT1X1jMWbgeCOqEp02vrgycRNG4A1L1Zeo03FZeogyDTT1KVezqnfflNTg8XTur_691RAxqsrv89UFDmwiz1vi5w76aWv4mAV4bK-SLsIYjCFaFw5hr93188QRropC8unD70yaCWXYoWA&usqp=CAc",
//   },
//   {
//     name: "Lenovo ThinkPad X1",
//     brand: "Lenovo",
//     ram: "8GB",
//     storage: "256GB",
//     img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbqGO2yq5FBJB0lyKN-Zgf6dA-FIH56TP7QS4DLjwLD0YpTq_hOrYF7Z8Q2rlLBD7L-UfhKlibMUWXubAVAaCp-doB-clZTwT4-eXutZYWT8-GXWEEcrUJ0HIjtBdS3AGkxZGlsA&usqp=CAc",
//   },
//   {
//     name: "MacBook Air M2",
//     brand: "Apple",
//     ram: "16GB",
//     storage: "512GB",
//     img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSw4VvNtYGArx0AACGoHwcsHEWqiBplSOTJRu6nnBhZmqXGMedGan2SYDZ9O7vCVYhQtdCsE-OeBJGmz38T6BoMz53KjdMc2rcEPBFFn8-W9LQYxLDtmaxZF2cHEqeCuNDZnTh0BBZy&usqp=CAc",
//   },
//   {
//     name: "Lenovo ThinkPad X1",
//     brand: "Lenovo",
//     ram: "8GB",
//     storage: "256GB",
//     img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbqGO2yq5FBJB0lyKN-Zgf6dA-FIH56TP7QS4DLjwLD0YpTq_hOrYF7Z8Q2rlLBD7L-UfhKlibMUWXubAVAaCp-doB-clZTwT4-eXutZYWT8-GXWEEcrUJ0HIjtBdS3AGkxZGlsA&usqp=CAc",
//   },
//   {
//     name: "MacBook Air M2",
//     brand: "Apple",
//     ram: "16GB",
//     storage: "512GB",
//     img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSw4VvNtYGArx0AACGoHwcsHEWqiBplSOTJRu6nnBhZmqXGMedGan2SYDZ9O7vCVYhQtdCsE-OeBJGmz38T6BoMz53KjdMc2rcEPBFFn8-W9LQYxLDtmaxZF2cHEqeCuNDZnTh0BBZy&usqp=CAc",
//   },
//   {
//     name: "Lenovo ThinkPad X1",
//     brand: "Lenovo",
//     ram: "8GB",
//     storage: "256GB",
//     img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbqGO2yq5FBJB0lyKN-Zgf6dA-FIH56TP7QS4DLjwLD0YpTq_hOrYF7Z8Q2rlLBD7L-UfhKlibMUWXubAVAaCp-doB-clZTwT4-eXutZYWT8-GXWEEcrUJ0HIjtBdS3AGkxZGlsA&usqp=CAc",
//   },
//   {
//     name: "MacBook Air M2",
//     brand: "Apple",
//     ram: "16GB",
//     storage: "512GB",
//     img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSw4VvNtYGArx0AACGoHwcsHEWqiBplSOTJRu6nnBhZmqXGMedGan2SYDZ9O7vCVYhQtdCsE-OeBJGmz38T6BoMz53KjdMc2rcEPBFFn8-W9LQYxLDtmaxZF2cHEqeCuNDZnTh0BBZy&usqp=CAc",
//   },
//   {
//     name: "Lenovo ThinkPad X1",
//     brand: "Lenovo",
//     ram: "8GB",
//     storage: "256GB",
//     img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbqGO2yq5FBJB0lyKN-Zgf6dA-FIH56TP7QS4DLjwLD0YpTq_hOrYF7Z8Q2rlLBD7L-UfhKlibMUWXubAVAaCp-doB-clZTwT4-eXutZYWT8-GXWEEcrUJ0HIjtBdS3AGkxZGlsA&usqp=CAc",
//   },
//   {
//     name: "MacBook Air M2",
//     brand: "Apple",
//     ram: "16GB",
//     storage: "512GB",
//     img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSw4VvNtYGArx0AACGoHwcsHEWqiBplSOTJRu6nnBhZmqXGMedGan2SYDZ9O7vCVYhQtdCsE-OeBJGmz38T6BoMz53KjdMc2rcEPBFFn8-W9LQYxLDtmaxZF2cHEqeCuNDZnTh0BBZy&usqp=CAc",
//   },
//   {
//     name: "Lenovo ThinkPad X1",
//     brand: "Lenovo",
//     ram: "8GB",
//     storage: "256GB",
//     img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbqGO2yq5FBJB0lyKN-Zgf6dA-FIH56TP7QS4DLjwLD0YpTq_hOrYF7Z8Q2rlLBD7L-UfhKlibMUWXubAVAaCp-doB-clZTwT4-eXutZYWT8-GXWEEcrUJ0HIjtBdS3AGkxZGlsA&usqp=CAc",
//   },
//   {
//     name: "MacBook Air M2",
//     brand: "Apple",
//     ram: "16GB",
//     storage: "512GB",
//     img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSw4VvNtYGArx0AACGoHwcsHEWqiBplSOTJRu6nnBhZmqXGMedGan2SYDZ9O7vCVYhQtdCsE-OeBJGmz38T6BoMz53KjdMc2rcEPBFFn8-W9LQYxLDtmaxZF2cHEqeCuNDZnTh0BBZy&usqp=CAc",
//   },
//   {
//     name: "Dell XPS 13",
//     brand: "Dell",
//     ram: "16GB",
//     storage: "512GB",
//     img: "data:image/webp;base64,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",
//   },
//   {
//     name: "HP Spectre x360",
//     brand: "HP",
//     ram: "16GB",
//     storage: "1TB",
//     img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT1X1jMWbgeCOqEp02vrgycRNG4A1L1Zeo03FZeogyDTT1KVezqnfflNTg8XTur_691RAxqsrv89UFDmwiz1vi5w76aWv4mAV4bK-SLsIYjCFaFw5hr93188QRropC8unD70yaCWXYoWA&usqp=CAc",
//   },
//   {
//     name: "Lenovo ThinkPad X1",
//     brand: "Lenovo",
//     ram: "8GB",
//     storage: "256GB",
//     img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbqGO2yq5FBJB0lyKN-Zgf6dA-FIH56TP7QS4DLjwLD0YpTq_hOrYF7Z8Q2rlLBD7L-UfhKlibMUWXubAVAaCp-doB-clZTwT4-eXutZYWT8-GXWEEcrUJ0HIjtBdS3AGkxZGlsA&usqp=CAc",
//   },
//   {
//     name: "MacBook Air M2",
//     brand: "Apple",
//     ram: "16GB",
//     storage: "512GB",
//     img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSw4VvNtYGArx0AACGoHwcsHEWqiBplSOTJRu6nnBhZmqXGMedGan2SYDZ9O7vCVYhQtdCsE-OeBJGmz38T6BoMz53KjdMc2rcEPBFFn8-W9LQYxLDtmaxZF2cHEqeCuNDZnTh0BBZy&usqp=CAc",
//   },
//   {
//     name: "Lenovo ThinkPad X1",
//     brand: "Lenovo",
//     ram: "8GB",
//     storage: "256GB",
//     img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbqGO2yq5FBJB0lyKN-Zgf6dA-FIH56TP7QS4DLjwLD0YpTq_hOrYF7Z8Q2rlLBD7L-UfhKlibMUWXubAVAaCp-doB-clZTwT4-eXutZYWT8-GXWEEcrUJ0HIjtBdS3AGkxZGlsA&usqp=CAc",
//   },
//   {
//     name: "MacBook Air M2",
//     brand: "Apple",
//     ram: "16GB",
//     storage: "512GB",
//     img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSw4VvNtYGArx0AACGoHwcsHEWqiBplSOTJRu6nnBhZmqXGMedGan2SYDZ9O7vCVYhQtdCsE-OeBJGmz38T6BoMz53KjdMc2rcEPBFFn8-W9LQYxLDtmaxZF2cHEqeCuNDZnTh0BBZy&usqp=CAc",
//   },
//   {
//     name: "Lenovo ThinkPad X1",
//     brand: "Lenovo",
//     ram: "8GB",
//     storage: "256GB",
//     img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbqGO2yq5FBJB0lyKN-Zgf6dA-FIH56TP7QS4DLjwLD0YpTq_hOrYF7Z8Q2rlLBD7L-UfhKlibMUWXubAVAaCp-doB-clZTwT4-eXutZYWT8-GXWEEcrUJ0HIjtBdS3AGkxZGlsA&usqp=CAc",
//   },
//   {
//     name: "MacBook Air M2",
//     brand: "Apple",
//     ram: "16GB",
//     storage: "512GB",
//     img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSw4VvNtYGArx0AACGoHwcsHEWqiBplSOTJRu6nnBhZmqXGMedGan2SYDZ9O7vCVYhQtdCsE-OeBJGmz38T6BoMz53KjdMc2rcEPBFFn8-W9LQYxLDtmaxZF2cHEqeCuNDZnTh0BBZy&usqp=CAc",
//   },
//   {
//     name: "Lenovo ThinkPad X1",
//     brand: "Lenovo",
//     ram: "8GB",
//     storage: "256GB",
//     img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbqGO2yq5FBJB0lyKN-Zgf6dA-FIH56TP7QS4DLjwLD0YpTq_hOrYF7Z8Q2rlLBD7L-UfhKlibMUWXubAVAaCp-doB-clZTwT4-eXutZYWT8-GXWEEcrUJ0HIjtBdS3AGkxZGlsA&usqp=CAc",
//   },
//   {
//     name: "MacBook Air M2",
//     brand: "Apple",
//     ram: "16GB",
//     storage: "512GB",
//     img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSw4VvNtYGArx0AACGoHwcsHEWqiBplSOTJRu6nnBhZmqXGMedGan2SYDZ9O7vCVYhQtdCsE-OeBJGmz38T6BoMz53KjdMc2rcEPBFFn8-W9LQYxLDtmaxZF2cHEqeCuNDZnTh0BBZy&usqp=CAc",
//   },
//   {
//     name: "Lenovo ThinkPad X1",
//     brand: "Lenovo",
//     ram: "8GB",
//     storage: "256GB",
//     img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbqGO2yq5FBJB0lyKN-Zgf6dA-FIH56TP7QS4DLjwLD0YpTq_hOrYF7Z8Q2rlLBD7L-UfhKlibMUWXubAVAaCp-doB-clZTwT4-eXutZYWT8-GXWEEcrUJ0HIjtBdS3AGkxZGlsA&usqp=CAc",
//   },
//   {
//     name: "MacBook Air M2",
//     brand: "Apple",
//     ram: "16GB",
//     storage: "512GB",
//     img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSw4VvNtYGArx0AACGoHwcsHEWqiBplSOTJRu6nnBhZmqXGMedGan2SYDZ9O7vCVYhQtdCsE-OeBJGmz38T6BoMz53KjdMc2rcEPBFFn8-W9LQYxLDtmaxZF2cHEqeCuNDZnTh0BBZy&usqp=CAc",
//   },
//   {
//     name: "Dell XPS 13",
//     brand: "Dell",
//     ram: "16GB",
//     storage: "512GB",
//     img: "data:image/webp;base64,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",
//   },
//   {
//     name: "HP Spectre x360",
//     brand: "HP",
//     ram: "16GB",
//     storage: "1TB",
//     img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT1X1jMWbgeCOqEp02vrgycRNG4A1L1Zeo03FZeogyDTT1KVezqnfflNTg8XTur_691RAxqsrv89UFDmwiz1vi5w76aWv4mAV4bK-SLsIYjCFaFw5hr93188QRropC8unD70yaCWXYoWA&usqp=CAc",
//   },
//   {
//     name: "Lenovo ThinkPad X1",
//     brand: "Lenovo",
//     ram: "8GB",
//     storage: "256GB",
//     img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbqGO2yq5FBJB0lyKN-Zgf6dA-FIH56TP7QS4DLjwLD0YpTq_hOrYF7Z8Q2rlLBD7L-UfhKlibMUWXubAVAaCp-doB-clZTwT4-eXutZYWT8-GXWEEcrUJ0HIjtBdS3AGkxZGlsA&usqp=CAc",
//   },
//   {
//     name: "MacBook Air M2",
//     brand: "Apple",
//     ram: "16GB",
//     storage: "512GB",
//     img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSw4VvNtYGArx0AACGoHwcsHEWqiBplSOTJRu6nnBhZmqXGMedGan2SYDZ9O7vCVYhQtdCsE-OeBJGmz38T6BoMz53KjdMc2rcEPBFFn8-W9LQYxLDtmaxZF2cHEqeCuNDZnTh0BBZy&usqp=CAc",
//   },
//   {
//     name: "Lenovo ThinkPad X1",
//     brand: "Lenovo",
//     ram: "8GB",
//     storage: "256GB",
//     img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbqGO2yq5FBJB0lyKN-Zgf6dA-FIH56TP7QS4DLjwLD0YpTq_hOrYF7Z8Q2rlLBD7L-UfhKlibMUWXubAVAaCp-doB-clZTwT4-eXutZYWT8-GXWEEcrUJ0HIjtBdS3AGkxZGlsA&usqp=CAc",
//   },
//   {
//     name: "MacBook Air M2",
//     brand: "Apple",
//     ram: "16GB",
//     storage: "512GB",
//     img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSw4VvNtYGArx0AACGoHwcsHEWqiBplSOTJRu6nnBhZmqXGMedGan2SYDZ9O7vCVYhQtdCsE-OeBJGmz38T6BoMz53KjdMc2rcEPBFFn8-W9LQYxLDtmaxZF2cHEqeCuNDZnTh0BBZy&usqp=CAc",
//   },
//   {
//     name: "Lenovo ThinkPad X1",
//     brand: "Lenovo",
//     ram: "8GB",
//     storage: "256GB",
//     img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbqGO2yq5FBJB0lyKN-Zgf6dA-FIH56TP7QS4DLjwLD0YpTq_hOrYF7Z8Q2rlLBD7L-UfhKlibMUWXubAVAaCp-doB-clZTwT4-eXutZYWT8-GXWEEcrUJ0HIjtBdS3AGkxZGlsA&usqp=CAc",
//   },
//   {
//     name: "MacBook Air M2",
//     brand: "Apple",
//     ram: "16GB",
//     storage: "512GB",
//     img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSw4VvNtYGArx0AACGoHwcsHEWqiBplSOTJRu6nnBhZmqXGMedGan2SYDZ9O7vCVYhQtdCsE-OeBJGmz38T6BoMz53KjdMc2rcEPBFFn8-W9LQYxLDtmaxZF2cHEqeCuNDZnTh0BBZy&usqp=CAc",
//   },
//   {
//     name: "Lenovo ThinkPad X1",
//     brand: "Lenovo",
//     ram: "8GB",
//     storage: "256GB",
//     img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbqGO2yq5FBJB0lyKN-Zgf6dA-FIH56TP7QS4DLjwLD0YpTq_hOrYF7Z8Q2rlLBD7L-UfhKlibMUWXubAVAaCp-doB-clZTwT4-eXutZYWT8-GXWEEcrUJ0HIjtBdS3AGkxZGlsA&usqp=CAc",
//   },
//   {
//     name: "MacBook Air M2",
//     brand: "Apple",
//     ram: "16GB",
//     storage: "512GB",
//     img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSw4VvNtYGArx0AACGoHwcsHEWqiBplSOTJRu6nnBhZmqXGMedGan2SYDZ9O7vCVYhQtdCsE-OeBJGmz38T6BoMz53KjdMc2rcEPBFFn8-W9LQYxLDtmaxZF2cHEqeCuNDZnTh0BBZy&usqp=CAc",
//   },
//   {
//     name: "Lenovo ThinkPad X1",
//     brand: "Lenovo",
//     ram: "8GB",
//     storage: "256GB",
//     img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbqGO2yq5FBJB0lyKN-Zgf6dA-FIH56TP7QS4DLjwLD0YpTq_hOrYF7Z8Q2rlLBD7L-UfhKlibMUWXubAVAaCp-doB-clZTwT4-eXutZYWT8-GXWEEcrUJ0HIjtBdS3AGkxZGlsA&usqp=CAc",
//   },
//   {
//     name: "MacBook Air M2",
//     brand: "Apple",
//     ram: "16GB",
//     storage: "512GB",
//     img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSw4VvNtYGArx0AACGoHwcsHEWqiBplSOTJRu6nnBhZmqXGMedGan2SYDZ9O7vCVYhQtdCsE-OeBJGmz38T6BoMz53KjdMc2rcEPBFFn8-W9LQYxLDtmaxZF2cHEqeCuNDZnTh0BBZy&usqp=CAc",
//   },
//   {
//     name: "Dell XPS 13",
//     brand: "Dell",
//     ram: "16GB",
//     storage: "512GB",
//     img: "data:image/webp;base64,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",
//   },
//   {
//     name: "HP Spectre x360",
//     brand: "HP",
//     ram: "16GB",
//     storage: "1TB",
//     img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT1X1jMWbgeCOqEp02vrgycRNG4A1L1Zeo03FZeogyDTT1KVezqnfflNTg8XTur_691RAxqsrv89UFDmwiz1vi5w76aWv4mAV4bK-SLsIYjCFaFw5hr93188QRropC8unD70yaCWXYoWA&usqp=CAc",
//   },
//   {
//     name: "Lenovo ThinkPad X1",
//     brand: "Lenovo",
//     ram: "8GB",
//     storage: "256GB",
//     img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbqGO2yq5FBJB0lyKN-Zgf6dA-FIH56TP7QS4DLjwLD0YpTq_hOrYF7Z8Q2rlLBD7L-UfhKlibMUWXubAVAaCp-doB-clZTwT4-eXutZYWT8-GXWEEcrUJ0HIjtBdS3AGkxZGlsA&usqp=CAc",
//   },
//   {
//     name: "MacBook Air M2",
//     brand: "Apple",
//     ram: "16GB",
//     storage: "512GB",
//     img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSw4VvNtYGArx0AACGoHwcsHEWqiBplSOTJRu6nnBhZmqXGMedGan2SYDZ9O7vCVYhQtdCsE-OeBJGmz38T6BoMz53KjdMc2rcEPBFFn8-W9LQYxLDtmaxZF2cHEqeCuNDZnTh0BBZy&usqp=CAc",
//   },
//   {
//     name: "Lenovo ThinkPad X1",
//     brand: "Lenovo",
//     ram: "8GB",
//     storage: "256GB",
//     img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbqGO2yq5FBJB0lyKN-Zgf6dA-FIH56TP7QS4DLjwLD0YpTq_hOrYF7Z8Q2rlLBD7L-UfhKlibMUWXubAVAaCp-doB-clZTwT4-eXutZYWT8-GXWEEcrUJ0HIjtBdS3AGkxZGlsA&usqp=CAc",
//   },
//   {
//     name: "MacBook Air M2",
//     brand: "Apple",
//     ram: "16GB",
//     storage: "512GB",
//     img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSw4VvNtYGArx0AACGoHwcsHEWqiBplSOTJRu6nnBhZmqXGMedGan2SYDZ9O7vCVYhQtdCsE-OeBJGmz38T6BoMz53KjdMc2rcEPBFFn8-W9LQYxLDtmaxZF2cHEqeCuNDZnTh0BBZy&usqp=CAc",
//   },
//   {
//     name: "Lenovo ThinkPad X1",
//     brand: "Lenovo",
//     ram: "8GB",
//     storage: "256GB",
//     img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbqGO2yq5FBJB0lyKN-Zgf6dA-FIH56TP7QS4DLjwLD0YpTq_hOrYF7Z8Q2rlLBD7L-UfhKlibMUWXubAVAaCp-doB-clZTwT4-eXutZYWT8-GXWEEcrUJ0HIjtBdS3AGkxZGlsA&usqp=CAc",
//   },
//   {
//     name: "MacBook Air M2",
//     brand: "Apple",
//     ram: "16GB",
//     storage: "512GB",
//     img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSw4VvNtYGArx0AACGoHwcsHEWqiBplSOTJRu6nnBhZmqXGMedGan2SYDZ9O7vCVYhQtdCsE-OeBJGmz38T6BoMz53KjdMc2rcEPBFFn8-W9LQYxLDtmaxZF2cHEqeCuNDZnTh0BBZy&usqp=CAc",
//   },
//   {
//     name: "Lenovo ThinkPad X1",
//     brand: "Lenovo",
//     ram: "8GB",
//     storage: "256GB",
//     img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbqGO2yq5FBJB0lyKN-Zgf6dA-FIH56TP7QS4DLjwLD0YpTq_hOrYF7Z8Q2rlLBD7L-UfhKlibMUWXubAVAaCp-doB-clZTwT4-eXutZYWT8-GXWEEcrUJ0HIjtBdS3AGkxZGlsA&usqp=CAc",
//   },
//   {
//     name: "MacBook Air M2",
//     brand: "Apple",
//     ram: "16GB",
//     storage: "512GB",
//     img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSw4VvNtYGArx0AACGoHwcsHEWqiBplSOTJRu6nnBhZmqXGMedGan2SYDZ9O7vCVYhQtdCsE-OeBJGmz38T6BoMz53KjdMc2rcEPBFFn8-W9LQYxLDtmaxZF2cHEqeCuNDZnTh0BBZy&usqp=CAc",
//   },
//   {
//     name: "Lenovo ThinkPad X1",
//     brand: "Lenovo",
//     ram: "8GB",
//     storage: "256GB",
//     img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTbqGO2yq5FBJB0lyKN-Zgf6dA-FIH56TP7QS4DLjwLD0YpTq_hOrYF7Z8Q2rlLBD7L-UfhKlibMUWXubAVAaCp-doB-clZTwT4-eXutZYWT8-GXWEEcrUJ0HIjtBdS3AGkxZGlsA&usqp=CAc",
//   },
//   {
//     name: "MacBook Air M2",
//     brand: "Apple",
//     ram: "16GB",
//     storage: "512GB",
//     img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSw4VvNtYGArx0AACGoHwcsHEWqiBplSOTJRu6nnBhZmqXGMedGan2SYDZ9O7vCVYhQtdCsE-OeBJGmz38T6BoMz53KjdMc2rcEPBFFn8-W9LQYxLDtmaxZF2cHEqeCuNDZnTh0BBZy&usqp=CAc",
//   },
// ];
let laptops = [];
let currentPage = 1;
const laptopsPerPage = 15;

async function fetchLaptops(event) {
  const brandFilter = document.getElementById("brand").value;
  const ramFilter = document.getElementById("ram").value;
  const storageFilter = document.getElementById("storage").value;

  if (
    !brandFilter.trim() &&
    !ramFilter.trim() &&
    !storageFilter.trim() &&
    event &&
    event.type != "DOMContentLoaded"
  ) {
    showNotification("Please select atleast One Filter!");
  }
  // let apiUrl = `http://localhost:8080/api/laptops?`;
  if (brandFilter) apiUrl += `brand=${brandFilter}&`;
  if (ramFilter) apiUrl += `ram=${ramFilter}&`;
  if (storageFilter) apiUrl += `storage=${storageFilter}&`;

  try {
    laptops=[];
    const data = await fetchData("/laptops"); // Replace with your API URL
    console.log(data);

    if (data) {
      laptops = data;
      console.log(laptops);
    }
    // if (!response.ok) throw new Error("Failed to fetch laptops");

    // laptops = await response.json();
    currentPage = 1; // Reset to first page after filtering
    displayLaptops();
  } catch (error) {
    console.error("Error fetching laptops:", error);
  }
}


function setupPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(laptops.length / laptopsPerPage);
  console.log(totalPages);  
  
  // Previous Button
  pagination.innerHTML += `<button onclick="goToPage(${currentPage - 1})" ${
    currentPage === 1 ? "disabled" : ""
  }>‹</button>`;

  // Page Numbers (1, 2, ..., Last)
  if (totalPages > 0) {
    pagination.innerHTML += `<button class="${
      currentPage === 1 ? "active" : ""
    }" onclick="goToPage(1)">1</button>`;

    if (currentPage > 3) {
      pagination.innerHTML += `<span>...</span>`;
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pagination.innerHTML += `<button class="${
        currentPage === i ? "active" : ""
      }" onclick="goToPage(${i})">${i}</button>`;
    }

    if (currentPage < totalPages - 2) {
      pagination.innerHTML += `<span>...</span>`;
    }

    if (totalPages > 1) {
      pagination.innerHTML += `<button class="${
        currentPage === totalPages ? "active" : ""
      }" onclick="goToPage(${totalPages})">${totalPages}</button>`;
    }
    // Next Button
    pagination.innerHTML += `<button onclick="goToPage(${currentPage + 1})" ${
      currentPage === totalPages ? "disabled" : ""
    }>›</button>`;
  } else {
    pagination.innerHTML = ""; // Ensure pagination is hidden
  }
}

function goToPage(page) {
  const totalPages = Math.ceil(laptops.length / laptopsPerPage);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  displayLaptops();
}

// let dummySearchData = [
//   { term: "All", count: 1200 },
//   { term: "Music", count: 950 },
//   { term: "Mixes", count: 850 },
//   { term: "Indian pop", count: 780 },
//   { term: "Disha Vakani", count: 700 },
//   { term: "Shreya Ghoshal", count: 650 },
//   { term: "Arijit Singh", count: 600 },
//   { term: "Movie musicals", count: 550 },
//   { term: "Live News", count: 500 },
//   { term: "Albums", count: 480 },
// ];

async function loadSearchFrequencyData() {
  try {
    const data = await fetchData("/laptops/searchFrequency"); // Replace with your API URL
    console.log(data);

    if (data) {
      dummySearchData = data;
    }
    // Transform array of objects into word-frequency pairs
    const frequencyPairs = data.map((item) => {
      // Get first key-value pair from each object
      const [word, frequency] = Object.entries(item)[0];
      return { term: word, count: frequency };
    });

    return frequencyPairs;
  } catch (error) {
    console.error("Error loading search frequency data:", error);
    return [];
  }
}

// Render function
function renderKeywords(data) {
  const container = document.querySelector(".keywords-scroll");
  console.log(data);

  container.innerHTML = data
    .map(
      (item) => `
    <div class="keyword-tab" data-term="${item.term}">
      ${item.term}
      <span class="keyword-count">${item.count}</span>
    </div>
  `
    )
    .join("");

  // Add click handlers to new tabs
  addTabClickListeners();
}

function addTabClickListeners() {
  document.querySelectorAll(".keyword-tab").forEach((tab) => {
    tab.addEventListener("click", async function () {
      // Remove active class from all tabs
      document
        .querySelectorAll(".keyword-tab")
        .forEach((t) => t.classList.remove("active"));

      // Add active class to clicked tab
      this.classList.add("active");

      // Get the search term
      const searchTerm = this.dataset.term;

      // Set search input value
      searchInput.value = searchTerm;

      laptops= [];
      // Perform the search
      const data = await fetchData("/laptops/" + searchTerm); // Replace with your API URL
      console.log(data);

      if (data) {
        laptops = data;
        console.log(laptops);
      }
      currentPage = 1; // Reset to first page after filtering
      displayLaptops();
      let d = await loadSearchFrequencyData();
      // console.log(data);

      renderKeywords(d);
    });
  });
}
// Horizontal scroll with mouse wheel
const keywordsContainer = document.querySelector(".keywords-container");
keywordsContainer.addEventListener("wheel", (e) => {
  e.preventDefault();
  keywordsContainer.scrollLeft += e.deltaY;
});

document.addEventListener("DOMContentLoaded", async function (event) {
  fetchLaptops(event);
  let data = await loadSearchFrequencyData();
  console.log(data);

  renderKeywords(data);
});

function showLaptopDetails(laptop) {
  const modal = document.getElementById("laptopModal");

  document.getElementById("modalImage").src = laptop.imageURL;
  document.getElementById("modalName").textContent = laptop.model;
  document.getElementById("modalBrand").textContent = laptop.brand;
  document.getElementById("modalPrice").textContent = laptop.price;
  document.getElementById("modalProcessor").textContent =
    laptop.processor.brand;
  modal.style.display = "flex";
  modal.style.backdropFilter = "blur(3px)";
}

// Close modal functionality
document.querySelector(".close-modal").addEventListener("click", () => {
  document.getElementById("laptopModal").style.display = "none";
});

window.onclick = function (event) {
  const modal = document.getElementById("laptopModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Modify the displayLaptops function to add click handlers
function displayLaptops() {
  const laptopList = document.getElementById("laptopList");
  laptopList.innerHTML = "";

  const pagination = document.getElementById("pagination");

  const start = (currentPage - 1) * laptopsPerPage;
  const end = start + laptopsPerPage;
  const paginatedLaptops = laptops.slice(start, end);

  showSearchCount(paginatedLaptops.length);

  setupPagination();


  if (paginatedLaptops.length === 0) {
    laptopList.innerHTML = `
    <div class="no-results">
      <img src="C:\\Users\\Admin\\Desktop\\ACC Project\\FrontEnd\\Resources\\Images\\Result Not Found.jpg" alt="No laptops found">
      <p>No laptops matching your search criteria</p>
    </div>
  `;
    return;
  }

  paginatedLaptops.forEach((laptop) => {
    const card = document.createElement("div");
    card.className = "laptop-card";
    card.innerHTML = `
    <img src="${laptop.imageURL}" alt="img">
    <h3>${laptop.model}</h3>
    <p>Brand: ${laptop.brand}</p>
    <p>Price: ${laptop.price}</p>
    <p>Processor: ${laptop.processor.brand}</p>
`;
    card.addEventListener("click", () => showLaptopDetails(laptop));
    laptopList.appendChild(card);
  });
  

}

// document
//   .querySelector(".search-input")
//   .addEventListener("keypress", async (e) => {
//     if (e.key === "Enter") {

//     }
//   });

const searchInput = document.querySelector(".search-input");
const dropdown = document.querySelector(".suggestions-dropdown");
let currentSuggestions = [];
let selectedIndex = -1;

// Debounce function to limit API calls
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

const fetchSuggestions = async (query) => {
  try {
    const data = await fetchData("/laptops/autocomplete/" + query); // Replace with your API URL
    console.log(data);

    if (data) {
      currentSuggestions = data;
      console.log(laptops);
    }

    renderSuggestions(currentSuggestions);
  } catch (error) {
    dropdown.innerHTML = `<div class="error-message">Failed to load suggestions</div>`;
    dropdown.style.display = "block";
  }
};

const renderSuggestions = (suggestions) => {
  if (suggestions.length === 0) {
    dropdown.style.display = "none";
    return;
  }
  console.log(suggestions);

  dropdown.innerHTML = suggestions
    .map(
      (suggestion, index) => `
      <div class="suggestion-item ${index === selectedIndex ? "selected" : ""}" 
           data-index="${index}">
        ${suggestion}
      </div>
    `
    )
    .join("");

  dropdown.style.display = "block";
  selectedIndex = -1; // Reset selection when new suggestions load
};

const handleInput = debounce((e) => {
  const query = e.target.value.trim();
  if (query.length > 0) {
    fetchSuggestions(query);
  } else {
    dropdown.style.display = "none";
  }
}, 300);

// Event Listeners
searchInput.addEventListener("input", handleInput);

searchInput.addEventListener("keydown", async (e) => {
  if (["ArrowDown", "ArrowUp", "Enter"].includes(e.key)) {
    e.preventDefault();

    if (
      e.key === "ArrowDown" &&
      selectedIndex < currentSuggestions.length - 1
    ) {
      selectedIndex++;
    } else if (e.key === "ArrowUp" && selectedIndex > 0) {
      selectedIndex--;
    } else if ((e.key === "Enter" && selectedIndex >= 0) || e.key === "Enter") {
      searchInput.value =
        e.key === "Enter" && selectedIndex >= 0
          ? currentSuggestions[selectedIndex]
          : searchInput.value;
      dropdown.style.display = "none";

      const searchValue = document.querySelector(".search-input").value;
      if (!searchValue.trim()) {
        showNotification("Please enter a search query!");
        e.preventDefault();
      } else {
        laptops= [];
        const data = await fetchData("/laptops/" + searchValue); // Replace with your API URL
        console.log(data);

        if (data) {
          laptops = data;
          console.log(laptops);
        }
        currentPage = 1; // Reset to first page after filtering
        displayLaptops();
        let d = await loadSearchFrequencyData();
        renderKeywords(d);

        await handleSubmit();
      }
      return;
    }

    const items = dropdown.querySelectorAll(".suggestion-item");
    items.forEach((item, index) => {
      item.classList.toggle("selected", index === selectedIndex);
    });
  }
});

dropdown.addEventListener("click", (e) => {
  const item = e.target.closest(".suggestion-item");
  if (item) {
    searchInput.value = currentSuggestions[parseInt(item.dataset.index)];
    dropdown.style.display = "none";
  }
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-container")) {
    dropdown.style.display = "none";
  }
});

// Hover handling
dropdown.addEventListener("mouseover", (e) => {
  const item = e.target.closest(".suggestion-item");
  if (item) {
    selectedIndex = parseInt(item.dataset.index);
    dropdown.querySelectorAll(".suggestion-item").forEach((el, index) => {
      el.classList.toggle("selected", index === selectedIndex);
    });
  }
});

const suggestionBox = document.getElementById("suggestionBox");
const suggestionText = document.getElementById("suggestionText");

async function fetchSpellCheck(query) {
  try {
    // Replace with your actual API endpoint
    const response = await fetchData(query); // Replace with your API URL
    console.log(response);

    // const suggestions = response.json();
    return response;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
}

async function handleSubmit() {
  const query = searchInput.value.trim();

  // Perform main search here
  console.log("Searching for:", query);

  // Fetch suggestions
  const suggestions = await fetchSpellCheck("/laptops/spellcheck/" + query); // Replace with your API URL
  console.log(suggestions);
  // Update suggestion UI
  if (suggestions.length > 0) {
    suggestionText.textContent = suggestions[0];
    suggestionBox.classList.add("show");
  } else {
    suggestionBox.classList.remove("show");
  }
}

// Event listeners
// searchForm.addEventListener("submit", handleSubmit);

// // Handle suggestion clicks
// suggestionText.addEventListener("click", () => {
//   searchInput.value = suggestionText.textContent;
//   searchForm.dispatchEvent(new Event("submit"));
// });

async function showSearchCount(length) {
  const query = searchInput.value.trim();
  if (query != null && query != "") {
    const searchMeta = document.getElementById("searchMeta");
    // Fetch and display search count
    const count = await fetchData(`/laptops/searchFrequency/${query}`);
    console.log(count);

    document.getElementById("searchCount").textContent = count;
    searchMeta.style.display = "flex";
  } else {
    searchMeta.style.display = "none";
  }
  // Show/hide search meta
}
