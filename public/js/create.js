document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("articleForm");

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

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
            const confirmationMessage = document.getElementById("confirmationMessage");
            confirmationMessage.textContent = 'Article updated successfully!';
            confirmationMessage.style.display = 'block';
            form.reset();
            setTimeout(() => {
              confirmationMessage.style.display = 'none';
          }, 3000);
          } else {
            throw new Error("Failed to submit data");
          }
        } catch (error) {
          console.error(error);
        }
      }
      await submitData(formData);
    });
  });