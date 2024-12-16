const filmsList = document.querySelector("#films");
const poster = document.querySelector("#movie-poster");
const title = document.querySelector("#movie-title");
const runtime = document.querySelector("#runtime");
const showtime = document.querySelector("#showtime");
const description = document.querySelector("#description");
const availableTickets = document.querySelector("#available-tickets");
const buyTicketButton = document.querySelector("#buy-ticket");

const BASE_URL = "http://localhost:3000/films";

// Fetch all movies and populate the menu
fetch(`${BASE_URL}`)
  .then((response) => response.json())
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
  });

// Show details for the first movie by default
fetch(`${BASE_URL}/1`)
  .then((response) => response.json())
  .then((movie) => showMovieDetails(movie));

// Function to show movie details
function showMovieDetails(movie) {
  poster.src = movie.poster;
  title.textContent = movie.title;
  runtime.textContent = `Runtime: ${movie.runtime} minutes`;
  showtime.textContent = `Showtime: ${movie.showtime}`;
  description.textContent = movie.description;
  const ticketsAvailable = movie.capacity - movie.tickets_sold;
  availableTickets.textContent = ticketsAvailable;
  buyTicketButton.disabled = ticketsAvailable <= 0;

  // Buy ticket event
  buyTicketButton.onclick = () => {
    if (ticketsAvailable > 0) {
      movie.tickets_sold++;
      availableTickets.textContent = movie.capacity - movie.tickets_sold;
      if (movie.capacity - movie.tickets_sold <= 0) {
        buyTicketButton.disabled = true;
        buyTicketButton.textContent = "Sold Out";
        updateMovieStatus(movie.id, movie.tickets_sold);
      }
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
  });
}
