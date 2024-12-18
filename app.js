const filmsList = document.querySelector("#films");
const poster = document.querySelector("#movie-poster");
const title = document.querySelector("#movie-title");
const runtime = document.querySelector("#runtime");
const showtime = document.querySelector("#showtime");
const description = document.querySelector("#description");
const availableTickets = document.querySelector("#available-tickets");
const buyTicketButton = document.querySelector("#buy-ticket");

const BASE_URL = "http://localhost:5000/films";

// Fetch all movies and populate the movie menu
fetch(BASE_URL) 
  .then((response) => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  })
  .then((movies) => {
    filmsList.innerHTML = ""; // Clear placeholder
    movies.forEach((movie) => {
      const li = document.createElement("li");
      li.textContent = movie.title;
      li.classList.add("film", "item");
      li.addEventListener("click", () => showMovieDetails(movie));
      if (movie.capacity - movie.tickets_sold <= 0) {
        li.classList.add("sold-out");
      }
      filmsList.appendChild(li);
    });
    // Load the first movie by default
    if (movies.length > 0) {
      showMovieDetails(movies[0]);
    }
  })
  .catch((error) => console.error("Error fetching movies:", error));

// Function to display movie details
function showMovieDetails(movie) {
  poster.src = movie.poster;
  title.textContent = movie.title;
  runtime.textContent = `Runtime: ${movie.runtime} minutes`;
  showtime.textContent = `Showtime: ${movie.showtime}`;
  description.textContent = movie.description;

  let ticketsAvailable = movie.capacity - movie.tickets_sold;
  availableTickets.textContent = ticketsAvailable;
  buyTicketButton.disabled = ticketsAvailable <= 0;
  buyTicketButton.textContent = ticketsAvailable > 0 ? "Buy Ticket" : "Sold Out";

  // Buy ticket functionality
  buyTicketButton.onclick = () => {
    if (ticketsAvailable > 0) {
      ticketsAvailable--;
      movie.tickets_sold++;
      availableTickets.textContent = ticketsAvailable;

      if (ticketsAvailable <= 0) {
        buyTicketButton.disabled = true;
        buyTicketButton.textContent = "Sold Out";
      }

      updateMovieStatus(movie.id, movie.tickets_sold);
    }
  };
}

// Function to update ticket sales on the server
function updateMovieStatus(id, ticketsSold) {
  fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tickets_sold: ticketsSold }),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to update ticket");
      return response.json();
    })
    .then((data) => console.log("Ticket updated successfully:", data))
    .catch((error) => console.error("Error updating ticket:", error));
}
