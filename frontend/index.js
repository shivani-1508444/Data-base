const API = "http://localhost:5000/api/bookings";

const form = document.getElementById("booking-form");
const bookingsDiv = document.getElementById("bookings");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    passengerName: document.getElementById("name").value,
    age: Number(document.getElementById("age").value),
    source: document.getElementById("source").value,
    destination: document.getElementById("destination").value,
    journeyDate: document.getElementById("date").value,
    trainNumber: document.getElementById("train").value,
  };

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Request failed with status ${res.status}`);
    }

    const result = await res.json();
    console.log("Booking created:", result);

    loadBookings();
    form.reset();
  } catch (err) {
    console.error("Error creating booking:", err);
    alert("Booking create nahi ho payi: " + err.message);
  }
});

async function loadBookings() {
  try {
    const res = await fetch(API);

    if (!res.ok) {
      throw new Error(`Failed to fetch bookings: ${res.status}`);
    }

    const bookings = await res.json();

    bookingsDiv.innerHTML = "";

    if (bookings.length === 0) {
      bookingsDiv.innerHTML = "<p>Koi booking nahi mili.</p>";
      return;
    }

    bookings.forEach((b) => {
      bookingsDiv.innerHTML += `
        <div class="booking">
          <b>${b.passengerName}</b><br>
          ${b.source} → ${b.destination}<br>
          Train: ${b.trainNumber}<br>
          Date: ${new Date(b.journeyDate).toDateString()}
        </div>
      `;
    });
  } catch (err) {
    console.error("Error loading bookings:", err);
    bookingsDiv.innerHTML = "<p>An error occurred while loading bookings.</p>";
  }
}

loadBookings();
