document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "/api/bookings";
  const form = document.getElementById("bookingForm");
  const bookingsList = document.getElementById("bookingsList");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const bookingId = document.getElementById("bookingId").value;
    const bookingData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      roomType: document.getElementById("roomType").value,
      checkInDate: document.getElementById("checkInDate").value,
      checkOutDate: document.getElementById("checkOutDate").value,
    };

    try {
      const url = bookingId ? `${API_URL}/${bookingId}` : API_URL;
      const method = bookingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error ${res.status}`);
      }

      const result = await res.json();
      console.log("Booking saved:", result);
      alert("Booking saved successfully");
      form.reset();
      document.getElementById("bookingId").value = "";
      await loadBookings();
    } catch (error) {
      console.error("Save error:", error);
      alert("Error saving booking: " + error.message);
    }
  });

  async function loadBookings() {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error(`Unable to load bookings (${res.status})`);
      }
      const data = await res.json();

      bookingsList.innerHTML = "";
      data.forEach((b) => {
        const div = document.createElement("div");
        div.classList.add("booking-item");
        div.innerHTML = `
          <p><strong>${b.name}</strong> (${b.email})</p>
          <p>Room: ${b.roomType}</p>
          <p>${new Date(b.checkInDate).toDateString()} - ${new Date(b.checkOutDate).toDateString()}</p>
          <div class="actions">
            <button onclick="editBooking('${b._id}','${b.name}','${b.email}','${b.roomType}','${b.checkInDate}','${b.checkOutDate}')">Edit</button>
            <button class="delete" onclick="deleteBooking('${b._id}')">Delete</button>
          </div>
        `;
        bookingsList.appendChild(div);
      });
    } catch (error) {
      console.error("Load error:", error);
      alert("Error loading bookings: " + error.message);
    }
  }

  window.editBooking = (id, name, email, roomType, checkIn, checkOut) => {
    document.getElementById("bookingId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("roomType").value = roomType;
    document.getElementById("checkInDate").value = checkIn.split("T")[0];
    document.getElementById("checkOutDate").value = checkOut.split("T")[0];
  };

  window.deleteBooking = async (id) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Unable to delete booking (${res.status})`);
      await loadBookings();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting booking: " + error.message);
    }
  };

  loadBookings();
});
