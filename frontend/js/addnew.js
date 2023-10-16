function AddNew() {
  const me = {};

  me.addRestaurantListener = () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const newRestaurant = {
        cafeName: formData.get("cafename"),
        cafeAddress: formData.get("cafeaddress"),
        hasOutlet: formData.get("outlet") === "outlet",
        hasRestroom: formData.get("restroom") === "restroom",
        hasWifi: formData.get("wifi") === "wifi",
      };

      try {
        const response = await fetch("/apiAddNew/add-pending-restaurant", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRestaurant),
        });
        // const data = await response.json();
        if (response.ok) {
          displayMessage(
            "Thank you for submitting this new restaurant, our admin team will vet this restaurant and we will add it to the our featured list soon. Please feel free to add another!",
            30000
          ); // 30 seconds
          form.reset(); // Optional: Reset the form after successful submission
        } else {
          displayMessage("An error occurred. Please try again later.", 30000); // 30 seconds
        }
      } catch (error) {
        console.error("Error adding new restaurant:", error);
        displayMessage("An error occurred. Please try again later.", 30000); // 30 seconds
      }
    });
  };

  const displayMessage = (message, duration) => {
    const messageBox = document.createElement("div");
    messageBox.textContent = message;
    messageBox.classList.add("message");
    document.body.appendChild(messageBox);
    setTimeout(() => {
      messageBox.remove();
    }, duration);
  };

  return me;
}

const addNew = AddNew();

addNew.addRestaurantListener();
