# Flatdango
Flatdango is an application for Flatiron Movie Theater that allows users to purchase movie tickets conveniently. This project involves building an interactive frontend to 
display movie details and handle ticket purchasing.

### Features

As a user, you can:

1. **View Movie Details**:
   - See the details of the first movie, including its poster, title, runtime, showtime, and available tickets when the page loads.

2. **View a List of Movies**:
   - A menu displays all movies in the `ul#films` element.

3. **Buy Tickets**:
   - Click the "Buy Ticket" button to reduce the number of available tickets.
   - Prevent ticket purchase when the showing is sold out (available tickets = 0).

### Example JSON Response
#### Single Movie
```json
{
  "id": "1",
  "title": "The Giant Gila Monster",
  "runtime": "108",
  "capacity": 30,
  "showtime": "04:00PM",
  "tickets_sold": 27,
  "description": "A giant lizard terrorizes a rural Texas community and a heroic teenager attempts to destroy the creature.",
  "poster": "https://www.gstatic.com/tv/thumb/v22vodart/2157/p2157_v_v8_ab.jpg"
}
```

#### Movie List
```json
[
  {
    "id": "1",
    "title": "The Giant Gila Monster",
    "runtime": "108",
    "capacity": 30,
    "showtime": "04:00PM",
    "tickets_sold": 27,
    "description": "A giant lizard terrorizes a rural Texas community and a heroic teenager attempts to destroy the creature.",
    "poster": "https://www.gstatic.com/tv/thumb/v22vodart/2157/p2157_v_v8_ab.jpg"
  },
  {
    "id": "2",
    "title": "Manos: The Hands Of Fate",
    "runtime": "118",
    "capacity": 50,
    "showtime": "06:45PM",
    "tickets_sold": 44,
    "description": "A family gets lost on the road and stumbles upon a hidden, underground, devil-worshiping cult led by the fearsome Master and his servant Torgo.",
    "poster": "https://www.gstatic.com/tv/thumb/v22vodart/47781/p47781_v_v8_ac.jpg"
  }
]
```

## Bonus Deliverables

1. **Replace Movie Details**:
   - Click on a movie in the menu to update the displayed details.
   - Make an additional `GET` request to fetch the movie details.

2. **Sold-Out Indicator**:
   - Change the "Buy Ticket" button text to "Sold Out" when tickets are unavailable.
   - Add a `sold-out` class to the movie in the `ul#films` list.

## Extra Bonus Deliverables

1. **Persist Tickets Sold**:
   - Update the number of `tickets_sold` on the server.
