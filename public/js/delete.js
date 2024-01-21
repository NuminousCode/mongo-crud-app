// DOM element references
const form = document.getElementById("articleForm"); 
const dataContainer = document.getElementById("dataContainer"); 
const deleteButton = document.getElementById("deleteButton"); 
var modal = document.getElementById("deleteModal");
var span = document.getElementsByClassName("close")[0];
var confirmDeleteBtn = document.getElementById("confirmDelete");

// Event listener for showing the delete confirmation modal
deleteButton.addEventListener("click", function () {
      modal.style.display = "block"; 
    });

// Event listener for closing the delete confirmation modal
span.onclick = function() {
      modal.style.display = "none";
}

// Event listener for confirming article deletion
confirmDeleteBtn.onclick = async function() {
      var _id = deleteButton.dataset.id
      const response = await fetch(`/delete/${_id}`, {
        method: "DELETE"
        }); 
      if (response.ok) {
        // Handle successful deletion
        modal.style.display = "none";
        dataContainer.innerHTML = '';
        document.getElementById("_id").value = '';
        const searchButton = document.querySelector('button[type="submit"]');
        const confirmationMessage = document.getElementById("confirmationMessage");
        deleteButton.style.display = "none";
        searchButton.style.display = "block";
        confirmationMessage.textContent = 'Article deleted successfully!';
        confirmationMessage.style.display = 'block';
        
        setTimeout(() => {
                confirmationMessage.style.display = 'none';
            }, 3000);
      } else {
          console.error("Failed to delete the article.");
      }
}

// Event listener for form submission to fetch article data by ID
form.addEventListener("submit", async function (e) {
e.preventDefault();

  const searchFormData = {
      _id: document.getElementById("_id").value,
      };

      // Fetch article data from the server
    async function searchData(searchFormData) {
      try {
        console.log("Client-side JavaScript is running");

        const response = await fetch(`/fetchById/${searchFormData._id}`);

        if (response.ok) {
          const article = await response.json();
          const formattedDate = new Date(article.date).toLocaleDateString('en-US');
          console.log("Data fetched successfully:", article);
          
            //Add card with article data to dataContainer
          dataContainer.innerHTML = `
            <div class="card" style="display: flex; flex-direction: row; font-size: 16px">
              <div style="display:flex; flex-direction: column; padding: 20px" class="card-body">
                <h4 class="card-title">${article.title}</h4>
                <p class="card-text"><strong>Description:</strong> ${article.description}</p>
                <p class="card-text"><strong>Content:</strong> ${article.content}</p>
                <p class="card-text"><strong>Category:</strong> ${article.category}</p>
                <p class="card-text"><strong>Date:</strong> ${formattedDate}</p>
                <p class="card-text"><strong>Source:</strong> ${article.source}</p>
                <p class="card-text"><strong>Tags:</strong> ${article.tags}</p>
                <p class="card-text"><strong>Article Id:</strong> ${article._id}</p>
              </div>
              <div style="display:flex; padding: 20px;">
                <img src="${article.imageUrl}" style="object-fit:cover;min-width:400px;max-height: 300px" class="img-fluid rounded mx-auto d-block" alt="image">
              </div>
            </div>`;
          
          const searchButton = document.querySelector(
            'button[type="submit"]'
          );
          searchButton.style.display = "none"; 
          deleteButton.style.display = "block";
          deleteButton.dataset.id = article._id;
         
      
        } else {
          throw new Error("Failed to submit data");
        }
      } catch (error) {
        console.error(error);
      }
    }

  await searchData(searchFormData);
});
// Event listener to close the modal if clicked outside of it
window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }