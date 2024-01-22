  // Fetch data and display article cards 
  async function fetchDataAndDisplay() {
    try {
      const response = await fetch("/fetch");
      const data = await response.json();
      
      // Checks if data is an object
      if (typeof data === "object" && data !== null) {
        // Conves data object into an array of documents
        const dataAsArray = Object.values(data);

        // Reference for article container
        const container = document.getElementById("articleCardContainer");

        // Article cards creation loop
        dataAsArray.forEach((article) => {
          const dateStr = article.date;
          // Date formatting 
          const date = new Date(dateStr);
          const formattedDate = `${date.toLocaleString("en-US", {month: "short",})} ${date.getDate()}, 
          ${date.getFullYear()}`;
          const cardTemplate = `
                <!-- Your Bootstrap article card template here -->
                <div class="card" style = "display: flex; flex-direction: row; font-size: 16px">
                    <div style = "display:flex; flex-direction: column; padding: 20px" class="card-body">
                        <h4 class="card-title">${article.title}</h4>
                        <p class="card-text"><strong>Description:</strong> ${article.description}</p>
                        <p class="card-text"><strong>Content:</strong> ${article.content}</p>
                        <p class="card-text"><strong>Category:</strong> ${article.category}</p>
                        <p class="card-text"><strong>Date:</strong> ${formattedDate}</p>
                        <p class="card-text"><strong>Source:</strong> ${article.source}</p>
                        <p class="card-text"><strong>Tags:</strong> ${article.tags}</p>
                        <p class="card-text"><strong>Article Id:</strong> ${article._id}</p>
                    </div>
                    <div style = "display:flex; padding: 20px;">
                        <img src="${article.imageUrl}" style="object-fit:cover;min-width:400px;max-height: 300px" class="img-fluid rounded mx-auto d-block" alt="image">
                    </div>
                </div>
            `;

          // Article card element
          const cardElement = document.createElement("div");
          cardElement.innerHTML = cardTemplate;
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
  fetchDataAndDisplay()