const form = document.getElementById("articleForm"); // Get the form element by ID
const dataContainer = document.getElementById("dataContainer"); // Get the input container element by ID
const deleteButton = document.getElementById("deleteButton"); // Get the Update button element by ID
var modal = document.getElementById("deleteModal");
var span = document.getElementsByClassName("close")[0];
var confirmDeleteBtn = document.getElementById("confirmDelete");
deleteButton.addEventListener("click", function () {
      modal.style.display = "block"; 
    });

span.onclick = function() {
      modal.style.display = "none";
}

confirmDeleteBtn.onclick = async function() {
      var _id = deleteButton.dataset.id
      const response = await fetch(`/delete/${_id}`, {
        method: "DELETE"
        }); 
      if (response.ok) {
        modal.style.display = "none";
        // Reset UI
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

form.addEventListener("submit", async function (e) {
e.preventDefault();

  const searchFormData = {
      _id: document.getElementById("_id").value,
      };

    async function searchData(searchFormData) {
      try {
        console.log("Client-side JavaScript is running");

        const response = await fetch(`/fetchById/${searchFormData._id}`);

        if (response.ok) {
          const user = await response.json();
          const formattedDate = new Date(user.date).toLocaleDateString('en-US');
          console.log("Data fetched successfully:", user);
                    
          dataContainer.innerHTML = `
            <div class="card" style="display: flex; flex-direction: row; font-size: 16px">
              <div style="display:flex; flex-direction: column; padding: 20px" class="card-body">
                <h4 class="card-title">${user.title}</h4>
                <p class="card-text"><strong>Description:</strong> ${user.description}</p>
                <p class="card-text"><strong>Content:</strong> ${user.content}</p>
                <p class="card-text"><strong>Category:</strong> ${user.category}</p>
                <p class="card-text"><strong>Date:</strong> ${formattedDate}</p>
                <p class="card-text"><strong>Source:</strong> ${user.source}</p>
                <p class="card-text"><strong>Tags:</strong> ${user.tags}</p>
                <p class="card-text"><strong>Article Id:</strong> ${user._id}</p>
              </div>
              <div style="display:flex; padding: 20px;">
                <img src="${user.imageUrl}" style="object-fit:cover;min-width:400px;max-height: 300px" class="img-fluid rounded mx-auto d-block" alt="image">
              </div>
            </div>`;
          
          const searchButton = document.querySelector(
            'button[type="submit"]'
          );
          searchButton.style.display = "none"; 
          deleteButton.style.display = "block";
          deleteButton.dataset.id = user._id;
         
      
        } else {
          throw new Error("Failed to submit data");
        }
      } catch (error) {
        console.error(error);
      }
    }

  // Call the searchFormData function with formData
  await searchData(searchFormData);
});
window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }