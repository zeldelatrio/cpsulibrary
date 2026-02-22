const API = "https://cpsulibrary.up.railway.app/books";

// Load books when page loads
window.addEventListener("DOMContentLoaded", loadBooks);

async function loadBooks() {
  try {
    const res = await fetch(API);

    if (!res.ok) {
      throw new Error("Failed to fetch books");
    }

    const books = await res.json();

    const table = document.getElementById("bookTable");
    table.innerHTML = "";

    if (books.length === 0) {
      table.innerHTML = `
        <tr>
          <td colspan="4">No books found</td>
        </tr>
      `;
      return;
    }

    books.forEach(book => {
      const row = `
        <tr>
          <td>${book.id}</td>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>
            <button onclick="editBook(${book.id}, '${book.title.replace(/'/g, "\\'")}', '${book.author.replace(/'/g, "\\'")}')">
              Edit
            </button>
            <button onclick="deleteBook(${book.id})">
              Delete
            </button>
          </td>
        </tr>
      `;
      table.innerHTML += row;
    });

  } catch (error) {
    console.error("Load Error:", error);
    alert("Cannot connect to server. Check Railway deployment.");
  }
}

async function addBook() {
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (!title || !author) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, author })
    });

    if (!res.ok) {
      throw new Error("Failed to add book");
    }

    titleInput.value = "";
    authorInput.value = "";

    await loadBooks();

  } catch (error) {
    console.error("Add Error:", error);
    alert("Failed to add book.");
  }
}

async function deleteBook(id) {
  const confirmDelete = confirm("Are you sure you want to delete this book?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`${API}/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      throw new Error("Failed to delete book");
    }

    await loadBooks();

  } catch (error) {
    console.error("Delete Error:", error);
    alert("Failed to delete book.");
  }
}

async function editBook(id, oldTitle, oldAuthor) {
  const title = prompt("New Title:", oldTitle);
  const author = prompt("New Author:", oldAuthor);

  if (!title || !author) return;

  try {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, author })
    });

    if (!res.ok) {
      throw new Error("Failed to update book");
    }

    await loadBooks();

  } catch (error) {
    console.error("Edit Error:", error);
    alert("Failed to update book.");
  }
}