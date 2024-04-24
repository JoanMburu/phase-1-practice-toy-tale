let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.getElementById("toy-collection");

  // Step 1: Fetch Andy's Toys
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toys => {
      toys.forEach(toy => {
        // Step 2: Add Toy Info to the Card
        const card = document.createElement("div");
        card.className = "card";

        const h2 = document.createElement("h2");
        h2.textContent = toy.name;

        const img = document.createElement("img");
        img.src = toy.image;
        img.className = "toy-avatar";

        const p = document.createElement("p");
        p.textContent = `${toy.likes} Likes`;

        const likeBtn = document.createElement("button");
        likeBtn.textContent = "Like ❤️";
        likeBtn.className = "like-btn";
        likeBtn.id = toy.id;

        // Step 4: Increase a Toy's Likes
        likeBtn.addEventListener("click", () => {
          // Capture the toy's id
          const toyId = toy.id;
          // Calculate the new number of likes
          const newLikes = toy.likes + 1;
          // Send a PATCH request to update the toy's likes count
          fetch(`http://localhost:3000/toys/${toyId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              likes: newLikes
            })
          })
            .then(response => response.json())
            .then(updatedToy => {
              // Update the toy's card in the DOM
              p.textContent = `${updatedToy.likes} Likes`;
            });
        });

        // Append elements to card
        card.appendChild(h2);
        card.appendChild(img);
        card.appendChild(p);
        card.appendChild(likeBtn);

        // Append card to toy collection
        toyCollection.appendChild(card);
      });
    });

  // Step 3: Add a New Toy
  const toyForm = document.querySelector(".add-toy-form");
  toyForm.addEventListener("submit", event => {
    event.preventDefault();

    const formData = new FormData(toyForm);
    const name = formData.get("name");
    const image = formData.get("image");

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: name,
        image: image,
        likes: 0
      })
    })
      .then(response => response.json())
      .then(newToy => {
        // Add the new toy to the DOM
        // This can be done similarly as in Step 2
      });
  });
});
