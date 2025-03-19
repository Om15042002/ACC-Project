const BASEBEURL = "http://localhost:8080";

async function postData(path, data) {
  try {
    const response = await fetch(BASEBEURL + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), 
      mode: "cors", 
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    console.log(responseData); 
    return responseData;
  } catch (error) {
    console.error("Error:", error); 
  }
}

async function fetchData(path) {
  try {
    const response = await fetch(BASEBEURL + path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors", 
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
}
