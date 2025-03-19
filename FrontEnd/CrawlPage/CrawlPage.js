loadingOverlay.style.display = "flex";

const urlParams = new URLSearchParams(window.location.search);
const company = urlParams.get("company");

if (!company) {
  alert("Company parameter is required");
  window.location.href = "../HomePage/HomePage.html";
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetchData(
      `/laptop/crawl?company=${encodeURIComponent(company)}`
    );

    const responseData = response;

    // Display base URL
    document.getElementById("baseUrl").textContent = responseData.baseUrl;

    // Display crawled URLs
    const urlList = document.getElementById("urlList");
    responseData.crawledUrls.forEach((url) => {
      const div = document.createElement("div");
      div.className = "url-item";
      div.textContent = url;
      div.style.fontWeight = "bold";
      urlList.appendChild(div);
    });

    // Update URL count
    document.getElementById("urlCount").textContent =
      responseData.crawledUrls.length;

    // Button click handler
    document.getElementById("extractData").addEventListener("click", () => {
      const container = document.getElementById("validationCards");
      container.innerHTML = "";
      if (responseData.validationEntities.length === 0) {
        container.innerHTML = `
              <div class="no-results">
                <img src="C:\\Users\\Admin\\Desktop\\ACC Project\\FrontEnd\\Resources\\Images\\Result Not Found.jpg" alt="No laptops found">
                <p>No Data for your search criteria</p>
              </div>
            `;
        return;
      }
      const { phone, email, url } = processEntities(
        responseData.validationEntities
      );

      if (phone.length)
        container.appendChild(
          createValidationCard("Phone Validation", "fa-phone", phone)
        );
      if (email.length)
        container.appendChild(
          createValidationCard("Email Validation", "fa-envelope", email)
        );
      if (url.length)
        container.appendChild(
          createValidationCard("URL Validation", "fa-link", url)
        );
    });
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to load data. Please try again later.");
  } finally {
    // Hide loading animation whether success or error
    loadingOverlay.style.display = "none";
  }
});
// Process entities
const processEntities = (entities) => {
  const categories = { phone: [], email: [], url: [] };
  entities.forEach((entity) => {
    if (categories[entity.key]) categories[entity.key].push(entity);
  });
  return categories;
};

// Create validation card
const createValidationCard = (title, icon, items) => {
  const card = document.createElement("div");
  card.className = "validation-card";

  const header = document.createElement("div");
  header.className = "validation-header";
  header.innerHTML = `<i class="fas ${icon}"></i><h3>${title} (${items.length})</h3>`;

  const content = document.createElement("div");
  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "entity-item";

    const icon = document.createElement("i");
    icon.className = item.valid
      ? "fas fa-check-circle valid-icon"
      : "fas fa-times-circle invalid-icon";

    const text = document.createElement("span");
    text.textContent = item.value;

    div.append(icon, text);
    content.appendChild(div);
  });

  card.append(header, content);
  return card;
};

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

const performSearch = async (query) => {
  try {
    const response = await fetchData(
      `/laptops/frequentCount?query=${encodeURIComponent(query)}`
    );
    const phones = [];
    const emails = [];
    const urls = [];

    updateUrlList(response);

    console.log(response.brand);
    const container = document.getElementById("validationCards");
    container.innerHTML = "";
    document.getElementById("extractData").disabled = true;
    document.getElementById("baseurl").style.display = "none";

    for (const brand of response.brand) {
      let result = await fetchData(
        `/laptop/crawl?company=${encodeURIComponent(brand)}`
      );

      let responseData = result;
      let { phone, email, url } = processEntities(
        responseData.validationEntities
      );
      console.log(email);

      phones.push(...phone);
      emails.push(...email);
      urls.push(...url);
    }

    console.log(emails);
    if (phones.length === 0 && emails.length === 0 && urls.length === 0) {
      container.innerHTML = `
        <div class="no-results">
          <img src="C:\\Users\\Admin\\Desktop\\ACC Project\\FrontEnd\\Resources\\Images\\Result Not Found.jpg" alt="No laptops found">
          <p>No Data for your search criteria</p>
        </div>
      `;
      return;
    }
    if (phones.length) {
      container.appendChild(
        createValidationCard("Phone Validation", "fa-phone", phones)
      );
    }
    if (emails.length) {
      container.appendChild(
        createValidationCard("Email Validation", "fa-envelope", emails)
      );
    }
    if (urls.length) {
      container.appendChild(
        createValidationCard("URL Validation", "fa-link", urls)
      );
    }
  } catch (error) {
    console.error("Search failed:", error);
  }
};

const updateUrlList = (results) => {
  const urlList = document.getElementById("urlList");
  urlList.innerHTML = "";

  results.lstTrieSearchResult.forEach((result) => {
    const div = document.createElement("div");
    div.className = "url-item";
    div.innerHTML = `
      <div><b>${result.url}</b></div>
      <div class="occurrence-count"><b>Occurrences:</b> ${result.count}</div>
  `;

    document.getElementById("urlCount").textContent =
      results.lstTrieSearchResult.length;

    document.getElementById("baseUrl").textContent = "";

    urlList.appendChild(div);
  });
};

// Debounce search input
let timeout;
// searchInput.addEventListener("input", (e) => {
//   clearTimeout(timeout);
//   timeout = setTimeout(() => {
//     if (e.target.value.trim()) {
//       performSearch(e.target.value.trim());
//     }
//   }, 500);
// });

searchButton.addEventListener("click", () => {
  if (searchInput.value.trim()) {
    performSearch(searchInput.value.trim());
  } else {
    console.log("Hello");

    showNotification("Please Enter Search Value");
  }
});
