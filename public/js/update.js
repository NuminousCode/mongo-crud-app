const form = document.getElementById("articleForm"); // Get the form element by ID
const inputContainer = document.getElementById("inputContainer"); // Get the input container element by ID
const updateButton = document.getElementById("updateButton"); // Get the Update button element by ID
let isUpdateListenerAdded = false;

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
        const dbUser = await response.json();
        console.log("Data fetched successfully:", dbUser);
        // Clear the previous input fields if any
        inputContainer.innerHTML = "";

        // Loop through the key-value pairs in the JSON response
        for (const key in dbUser) {
          if (
            dbUser.hasOwnProperty(key) &&
            key !== "__v"
          ) {
            const value = key === "content" ? dbUser[key] : dbUser[key];

            // Create a Bootstrap form group
            const formGroup = document.createElement("div");
            formGroup.classList.add("form-group"); // Add Bootstrap class "form-group"

            // Create a label element for the key
            const label = document.createElement("label");
            label.textContent = key;
            formGroup.appendChild(label);

            // Create an input field and set its value to the corresponding JSON value
            const input = document.createElement("textarea");
            if (key === "content") {
              input.rows = 5; 
            } else {
              input.type = "text";
            }
            input.value = value;
            input.classList.add("form-control"); 
            formGroup.appendChild(input);

            // Append the form group to the input container
            inputContainer.appendChild(formGroup);
          }
        }
        // Change the "Search" button to an "Update" button
        const searchButton = document.querySelector(
          'button[type="submit"]'
        );
        searchButton.style.display = "none"; // Hide the Search button
        updateButton.style.display = "block"; // Show the Update button

        // Add an event listener for the "Update" button
        if (!isUpdateListenerAdded) {
        updateButton.addEventListener("click", async function () {
          // Create an object to store the updated data
          const updatedData = {};

          // Loop through the form fields and get updated values
          const formGroups = inputContainer.querySelectorAll(".form-group");
          formGroups.forEach((formGroup) => {
            const label = formGroup.querySelector("label");
            const input = formGroup.querySelector("input, textarea");
            updatedData[label.textContent] = input.value;
          });

          // Send the updated data to the server for processing
          const response = await fetch("/update", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
          });

          if (response.ok) {
            const updatedUser = await response.json();
            console.log("Data updated successfully:", updatedUser);
             // Display the confirmation message
            const confirmationMessage = document.getElementById("confirmationMessage");
            confirmationMessage.textContent = 'Article updated successfully!';
            confirmationMessage.style.display = 'block';

            // Reset the form fields
            form.reset();
            
            // Clear the input fields
            inputContainer.innerHTML = '';
            
            // Hide the Update button and show the Search button
            updateButton.style.display = "none";
            const searchButton = document.querySelector('button[type="submit"]');
            searchButton.style.display = "block";
            
            // Optionally, hide the confirmation message after a few seconds
            setTimeout(() => {
                confirmationMessage.style.display = 'none';
            }, 3000);
            isUpdateListenerAdded = true;
          } else {
            throw new Error("Failed to update data");
          }
        })};
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