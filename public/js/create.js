      // Wait until the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("articleForm");
      // Add an event listener for the 'submit' event on the form
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      // Construct the formData object from the form's input values
      const formData = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        content: document.getElementById("content").value,
        imageUrl: document.getElementById("imageUrl").value,
        category: document.getElementById("category").value,
        date: Date.now(),
        source: document.getElementById("source").value,
        tags: document
          .getElementById("tags")
          .value.split(",")
          .map((tag) => tag.trim()),
      };
      // Define an asynchronous function to submit the formData to the server
      async function submitData(formData) {
        try {
          const response = await fetch("/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            const dbarticle = await response.json();
            console.log("Data submitted successfully:", dbarticle);
      // Display a confirmation message to the user
            const confirmationMessage = document.getElementById("confirmationMessage");
            confirmationMessage.textContent = 'Article updated successfully!';
            confirmationMessage.style.display = 'block';
            form.reset();
            setTimeout(() => {
              confirmationMessage.style.display = 'none';
          }, 3000);
          } else {
      // error handling
            throw new Error("Failed to submit data");
          }
        } catch (error) {
          console.error(error);
        }
      }
      // Call the submitData function with the formData
      await submitData(formData);
    });
  });