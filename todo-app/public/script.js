const API = "/api/todos";

async function fetchTodos() {
  const res = await fetch(API);
  const data = await res.json();

  const list = document.getElementById("todoList");
  list.innerHTML = "";

  data.forEach(todo => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${todo.title}</span>
      <button onclick="deleteTodo('${todo._id}')">Delete</button>
    `;
    list.appendChild(li);
  });
}

async function createTodo() {
  const title = document.getElementById("title").value.trim();
  if (!title) return;


  try {
    const response = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        user: "64a1234567890abcdef12345" // Use 24-character valid hex ObjectId
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create todo");
    }

    document.getElementById("title").value = ""; // input clear
    fetchTodos();
  } catch (error) {
    console.error("Error creating todo:", error);
    alert("Error: " + error.message);
  }
}

async function deleteTodo(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  fetchTodos();
}

// Initial load
fetchTodos();
