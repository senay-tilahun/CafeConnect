function FrontEnd() {
  const me = {
    amenities: [],
  };

  me.showErrorMessage = (message, type = "danger") => {
    const messagesDiv = document.querySelector("#messages");

    const wrapper = document.createElement("div");
    wrapper.innerHTML = `<div class="alert alert-${type} alert-dismissible" role="alert">
         <div>${message}</div>
         <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
      </div>`;

    messagesDiv.append(wrapper);
  };

  me.reloadRestaurants = async () => {
    let query = "";
    if (me.amenities.length) {
      query = "?amenities=" + me.amenities.join(",");
    }
    const res = await fetch("/api/restaurants" + query);
    if (!res.ok) {
      me.showErrorMessage("Error leading the restaurants");
      return;
    }

    const restaurants = await res.json();

    me.renderRestaurants(restaurants);
  };

  const renderRestaurant = (restaurant) => {
    return `
    <div class="col-4">
        <div class="listing card">
            <img height="300px"
                src="${restaurant.image}"
                class="card-img-top"
                alt="Airbnb Listing"
            />
            <div class="card-body">
                <h2 class="card-title">${restaurant.name}</h2>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">wifi: ${restaurant.Amenities.wifi}</li>
                    <li class="list-group-item">outlet: ${restaurant.Amenities.outlet}</li>
                    <li class="list-group-item">restroom: ${restaurant.Amenities.restroom}</li>
                </ul>
                <div class="card-body">
                    <a href="#" class="card-link">edit</a>
                </div>
            </div>
        </div>
    </div>
    `;
  };

  me.renderRestaurants = (restaurants) => {
    const restaurantsDiv = document.querySelector("#restaurants");

    restaurantsDiv.innerHTML = restaurants.map(renderRestaurant).join("\n");
  };

  me.amenitiesListener = () => {
    const amenityCheckboxes = document.querySelectorAll(".amenties");
    amenityCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", (event) => {
        if (event.currentTarget.checked) {
          me.amenities = [...me.amenities, checkbox.name];
        } else {
          me.amenities = me.amenities.filter((am) => am !== checkbox.name);
        }
        me.reloadRestaurants();
      });
    });
  };

  return me;
}

const frontend = FrontEnd();

frontend.reloadRestaurants();
frontend.amenitiesListener();
