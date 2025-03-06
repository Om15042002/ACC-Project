const BASEBEURL="http://localhost:8080"

async function postData(path, data) {
    try {
        const response = await fetch(BASEBEURL + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Send the data as JSON
            mode: 'cors', // Ensure the request is sent with CORS mode enabled
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData); // Handle the response data here
    } catch (error) {
        console.error('Error:', error); // Handle any errors here
    }
}

async function fetchData(path) {
    try {
        const response = await fetch(BASEBEURL + path, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors', // Ensure the request is sent with CORS mode enabled
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error:', error);
        return error;
    }
}