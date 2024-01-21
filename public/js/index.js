  // Function to fetch data and display user cards in a Bootstrap layout
  async function fetchDataAndDisplay() {
    try {
      const response = await fetch("/fetch");
      const data = await response.json();
      console.log(JSON.stringify(data));
      // Check if data is an object
      if (typeof data === "object" && data !== null) {
        // Convert data object into an array of documents
        const dataAsArray = Object.values(data);

        // Get a reference to the container where user cards will be displayed
        const container = document.getElementById("userCardContainer");

        // Loop through the array of documents and create a user card for each
        dataAsArray.forEach((user) => {
          const dateStr = user.date;
          //Format date
          const date = new Date(dateStr);
          const formattedDate = `${date.toLocaleString("en-US", {month: "short",})} ${date.getDate()}, 
          ${date.getFullYear()}`;
          const cardTemplate = `
                <!-- Your Bootstrap user card template here -->
                <div class="card" style = "display: flex; flex-direction: row; font-size: 16px">
                    <div style = "display:flex; flex-direction: column; padding: 20px" class="card-body">
                        <h4 class="card-title">${user.title}</h4>
                        <p class="card-text"><strong>Description:</strong> ${user.description}</p>
                        <p class="card-text"><strong>Content:</strong> ${user.content}</p>
                        <p class="card-text"><strong>Category:</strong> ${user.category}</p>
                        <p class="card-text"><strong>Date:</strong> ${formattedDate}</p>
                        <p class="card-text"><strong>Source:</strong> ${user.source}</p>
                        <p class="card-text"><strong>Tags:</strong> ${user.tags}</p>
                        <p class="card-text"><strong>Article Id:</strong> ${user._id}</p>
                    </div>
                    <div style = "display:flex; padding: 20px;">
                        <img src="${user.imageUrl}" style="object-fit:cover;min-width:400px;max-height: 300px" class="img-fluid rounded mx-auto d-block" alt="image">
                    </div>
                </div>
            `;

          // Create a new element to hold the user card and set its inner HTML
          const cardElement = document.createElement("div");
          cardElement.innerHTML = cardTemplate;

          // Append the user card to the container
          container.appendChild(cardElement);
        });
        //Error handling
      } else {
        console.error("Data is not an object:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Call the fetchDataAndDisplay function when the page loads
  window.onload = fetchDataAndDisplay;  // Function to fetch data and display user cards in a Bootstrap layout
  async function fetchDataAndDisplay() {
    try {
      const response = await fetch("/fetch");
      const data = await response.json();
      console.log(JSON.stringify(data));
      // Check if data is an object
      if (typeof data === "object" && data !== null) {
        // Convert data object into an array of documents
        const dataAsArray = Object.values(data);

        // Get a reference to the container where user cards will be displayed
        const container = document.getElementById("userCardContainer");

        // Loop through the array of documents and create a user card for each
        dataAsArray.forEach((user) => {
          const dateStr = user.date;
          //Format date
          const date = new Date(dateStr);
          const formattedDate = `${date.toLocaleString("en-US", {month: "short",})} ${date.getDate()}, 
          ${date.getFullYear()}`;
          const cardTemplate = `
                <!-- Your Bootstrap user card template here -->
                <div class="card" style = "display: flex; flex-direction: row; font-size: 16px">
                    <div style = "display:flex; flex-direction: column; padding: 20px" class="card-body">
                        <h4 class="card-title">${user.title}</h4>
                        <p class="card-text"><strong>Description:</strong> ${user.description}</p>
                        <p class="card-text"><strong>Content:</strong> ${user.content}</p>
                        <p class="card-text"><strong>Category:</strong> ${user.category}</p>
                        <p class="card-text"><strong>Date:</strong> ${formattedDate}</p>
                        <p class="card-text"><strong>Source:</strong> ${user.source}</p>
                        <p class="card-text"><strong>Tags:</strong> ${user.tags}</p>
                        <p class="card-text"><strong>Article Id:</strong> ${user._id}</p>
                    </div>
                    <div style = "display:flex; padding: 20px;">
                        <img src="${user.imageUrl}" style="object-fit:cover;min-width:400px;max-height: 300px" class="img-fluid rounded mx-auto d-block" alt="image">
                    </div>
                </div>
            `;

          // Create a new element to hold the user card and set its inner HTML
          const cardElement = document.createElement("div");
          cardElement.innerHTML = cardTemplate;

          // Append the user card to the container
          container.appendChild(cardElement);
        });
        //Error handling
      } else {
        console.error("Data is not an object:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Call the fetchDataAndDisplay function when the page loads
  window.onload = fetchDataAndDisplay;