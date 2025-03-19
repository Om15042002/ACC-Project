function toggleFilterPanel() {
  const panel = document.getElementById("filterPanel");
  const overlay = document.getElementById("overlay");
  panel.classList.toggle("active");
  overlay.style.display = panel.classList.contains("active") ? "block" : "none";
}
let laptops = [];
let currentPage = 1;
const laptopsPerPage = 15;

async function fetchLaptops(event) {
  event.preventDefault();

  console.log(event.target);

  // Check if recommendation request
  const isRecommendation =
    event.type != "DOMContentLoaded" && event.target.closest(".recommend-btn");

  if (isRecommendation) {
    // Recommendation request payload
    const recommendationData = {
      brand: document.getElementById("brand").value || null,
      usage: document.getElementById("usage").value || null,
      priceRange: document.getElementById("price").value || null,
      performanceLevel: document.getElementById("performance").value || null,
      portability: document.getElementById("portability").value || null,
      screenSize: parseFloat(document.getElementById("screen").value) || null,
      minStorage: parseInt(document.getElementById("storage").value) || null,
      minRam: parseInt(document.getElementById("ram").value) || null,
    };
    const allEmpty = Object.values(recommendationData).every(
      (val) => val === null
    );
    // if (allEmpty) {
    //   showNotification("Please select at least one recommendation filter!");
    //   return;
    // }

    try {
      const response = await postData(
        "/laptops/recommendations",
        recommendationData
      );

      laptops = response;
      console.log(response);

      currentPage = 1;
      displayLaptops();
    } catch (error) {
      console.error("Recommendation error:", error);
      showNotification("Failed to get recommendations");
    }
    return;
  }

  try {
    laptops = [];
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

      laptops = [];
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
  const features = [];

  if (laptop.specialFeatures.facialRecognition)
    features.push("Facial Recognition");
  if (laptop.specialFeatures.isConvertible) features.push("Convertible Design");
  if (laptop.specialFeatures.backlitKeyboard) features.push("Backlit Keyboard");

  document.getElementById("modalImage").src = laptop.imageURL;
  document.getElementById("modalName").textContent = laptop.model;
  document.getElementById("modalBrand").textContent = laptop.brand;
  document.getElementById("modalPrice").textContent = laptop.price;
  document.getElementById("modalOS").textContent = laptop.operatingSystem;

  document.getElementById(
    "modalProcessor"
  ).textContent = `${laptop.processor.brand} ${laptop.processor.model} (${laptop.processor.speedGHz}GHz)`;

  document.getElementById(
    "modalRAM"
  ).textContent = `${laptop.memory.sizeGB}GB ${laptop.memory.type}`;

  document.getElementById(
    "modalStorage"
  ).textContent = `${laptop.storage.capacityGB}GB ${laptop.storage.type}`;

  document.getElementById(
    "modalGraphics"
  ).textContent = `${laptop.graphics.brand} ${laptop.graphics.model} (${laptop.graphics.type})`;

  document.getElementById(
    "modalDisplaySize"
  ).textContent = `${laptop.display.sizeInches}"`;

  document.getElementById("modalResolution").textContent =
    laptop.display.resolution;

  document.getElementById(
    "modalBattery"
  ).textContent = `${laptop.battery.capacityWh}Wh (${laptop.battery.estimatedUsageTime})`;

  document.getElementById(
    "modalWeight"
  ).textContent = `${laptop.buildQuality.weightKg}kg`;

  document.getElementById("modalMaterial").textContent =
    laptop.buildQuality.material;

  document.getElementById("modalFeatures").textContent =
    features.join(", ") || "None";

  modal.style.display = "flex";
  modal.style.backdropFilter = "blur(3px)";
}

window.onclick = function (event) {
  const modal = document.getElementById("laptopModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
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
    <div class="card-header">
        <img src="${laptop.imageURL}" alt="${laptop.model}">
        <h2 class='laptop-model'>${laptop.model}</h2>
        <div class="price">${
          laptop.price.startsWith("$") ? laptop.price : "$" + laptop.price
        }</div>
    </div>
    
    <div class="specs">
        <div class="spec-group">
            <h3><i class="fa-solid fa-microchip"></i> Processor</h3>
            <p>${laptop.processor.brand} ${laptop.processor.model}</p>
            <p>${laptop.processor.speedGHz}GHz · ${
      laptop.processor.cores
    }-core</p>
        </div>

        <div class="spec-group">
            <h3><i class="fa-solid fa-memory"></i> Memory & Storage</h3>
            <p>${laptop.memory.sizeGB}GB ${laptop.memory.type}</p>
            <p>${laptop.storage.type} ${laptop.storage.capacityGB}GB</p>
        </div>

   

        <div class="spec-group">
            <h3><i class="fa-solid fa-gears"></i> Graphics</h3>
            <p>${laptop.graphics.brand} ${laptop.graphics.model}</p>
            <p>${laptop.graphics.type}</p>
        </div>

       
    </div>

    <div class="features">
        ${
          laptop.specialFeatures.backlitKeyboard
            ? '<span class="feature-tag"><i class="fa-solid fa-keyboard"></i> Backlit KB</span>'
            : ""
        }
        ${
          laptop.specialFeatures.fingerprintReader
            ? '<span class="feature-tag"><i class="fa-solid fa-fingerprint"></i> Fingerprint</span>'
            : ""
        }
        ${
          laptop.specialFeatures.facialRecognition
            ? '<span class="feature-tag"><i class="fa-solid fa-face-smile"></i> Face Unlock</span>'
            : ""
        }
        ${
          laptop.specialFeatures.isConvertible
            ? '<span class="feature-tag"><i class="fa-solid fa-rotate"></i> Convertible</span>'
            : ""
        }
    </div>
    `;
    card.innerHTML =
      `<input type="checkbox" class="compare-checkbox" 
           data-model="${laptop.id}" 
           style="display: ${compareMode ? "block" : "none"}">` +
      card.innerHTML;

    // Add click handler for the checkbox
    const checkbox = card.querySelector(".compare-checkbox");

    // Add checkbox event handler
    checkbox.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent event from bubbling to card
    });
    checkbox.addEventListener("change", function () {
      console.log(this.dataset);

      const laptopModel = this.dataset.model;
      console.log(laptopModel);

      if (this.checked) {
        selectedLaptops.push(laptopModel);
      } else {
        selectedLaptops = selectedLaptops.filter(
          (model) => model !== laptopModel
        );
      }
      updateCompareButton();
    });
    card.style.marginBottom = "10px";
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
        laptops = [];
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
  if (suggestions.length > 0 && laptops.length === 0) {
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
// Add to JavaScript
let compareMode = false;
let selectedLaptops = [];
// Proper compare mode toggle handler
document.getElementById("toggleCompareMode").addEventListener("click", () => {
  compareMode = !compareMode;
  document.querySelectorAll(".compare-checkbox").forEach((checkbox) => {
    checkbox.style.display = compareMode ? "block" : "none";
  });
  document
    .getElementById("compareSelected")
    .classList.toggle("hidden", !compareMode);
  if (!compareMode) {
    selectedLaptops = [];
    updateCompareButton();
  }
});

function updateCompareButton() {
  const compareBtn = document.getElementById("compareSelected");
  compareBtn.textContent = `Compare (${selectedLaptops.length})`;
  // compareBtn.disabled = selectedLaptops.length < 2;
}

// Updated showComparison function
function showComparison() {
  
  if (selectedLaptops.length < 2 ) {
    showNotification("Please select at least 2 laptops to compare");
    return;
  }

  const modal = document.getElementById("comparisonModal");
  const imagesRow = modal.querySelector(".comparison-images-row");
  const modelsRow = modal.querySelector(".models-row");
  const tbody = modal.querySelector("tbody");

  // Clear existing content
  imagesRow.innerHTML = "";
  modelsRow.innerHTML = "<th >Features</th>";
  tbody.innerHTML = "";

  console.log(selectedLaptops);

  // Get selected laptops data from ALL laptops
  const selected = laptops.filter((l) => selectedLaptops.includes(l.id));
  console.log(selectedLaptops);

  console.log(selected);

  // imagesRow.innerHTML += `
  // <img class="comparison-image">`;
  // Add images and model names
  let index=0;
  selected.forEach((laptop) => {
    // Add image
    var temp= `
      <img src="${laptop.imageURL}" 
           alt="${laptop.model}" 
           class="comparison-image">`;
           
    
    // Add model name
    modelsRow.innerHTML += `
      <th>
        <div>${temp}${laptop.brand}</div>
        <div>${laptop.model}</div>
      </th>`;
      index++;
  });

  // Comparison rows (same features array as before)
  const features = [
    { label: "Price", value: (l) => l.price },
    {
      label: "Processor",
      value: (l) =>
        `${l.processor.brand} ${l.processor.model} (${l.processor.speedGHz}GHz)`,
    },
    { label: "RAM", value: (l) => `${l.memory.sizeGB}GB ${l.memory.type}` },
    {
      label: "Storage",
      value: (l) => `${l.storage.capacityGB}GB ${l.storage.type}`,
    },
    {
      label: "Display",
      value: (l) =>
        `${l.display.sizeInches}" ${l.display.resolution} ${
          l.display.isTouchscreen ? "(Touch)" : ""
        }`,
    },
    {
      label: "Graphics",
      value: (l) =>
        `${l.graphics.brand} ${l.graphics.model} (${l.graphics.type})`,
    },
    {
      label: "Battery",
      value: (l) =>
        `${l.battery.capacityWh}Wh (${l.battery.estimatedUsageTime})`,
    },
    { label: "Weight", value: (l) => `${l.buildQuality.weightKg}kg` },
  ];

  features.forEach((feature) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${feature.label}</td>`;
    selected.forEach((laptop) => {
      row.innerHTML += `<td>${feature.value(laptop)}</td>`;
    });
    tbody.appendChild(row);
  });

  modal.style.display = "flex";
}

// Update the compare button initialization (put this at bottom)
document
  .getElementById("compareSelected")
  .addEventListener("click", showComparison);

document.querySelector(".close-comparison").addEventListener("click", () => {
  selectedLaptops = [];
  // Select all checkboxes with the class "compare-checkbox"
  const checkboxes = document.querySelectorAll(".compare-checkbox");

  // Loop through each checkbox and set display to "none"
  checkboxes.forEach((checkbox) => {
    checkbox.style.display = "none";
    checkbox.checked = false; // Untick the checkbox
  });
  updateCompareButton();
  document.getElementById("comparisonModal").style.display = "none";
});

document.getElementById("crawlButton").addEventListener("click", function () {
  // Get the brand from your modal (assuming it's stored in modalBrand)
  const brand = document.getElementById("modalBrand").textContent;

  // URL encode the brand and create query parameter
  const queryParams = new URLSearchParams({
    company: encodeURIComponent(brand.toLowerCase()), // example: 'dell'
  }).toString();

  // Open new window with query parameters
  window.open(`../CrawlPage/CrawlPage.html?${queryParams}`, "_blank");
});

function clearFilters() {
  // Reset all select elements
  document.querySelectorAll("#filterPanel select").forEach((select) => {
    select.value = "";
  });

  // showNotification("All filters have been cleared!");
}
