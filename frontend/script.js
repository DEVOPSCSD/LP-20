// ================= BACKEND URL =================

const API_URL = "http://127.0.0.1:5000/api";


// ================= REGISTER =================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const name = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {

            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {

                alert("Registration successful! Please login.");

                registerForm.reset();

                window.location.href = "login.html";

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error("Registration error:", error);

            alert(
                "Cannot connect to the backend. Make sure Flask is running."
            );
        }

    });

}


// ================= LOGIN =================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        try {

            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {

                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(data.user)
                );

                alert("Login successful!");

                window.location.href = "index.html";

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error("Login error:", error);

            alert(
                "Cannot connect to the backend. Make sure Flask is running."
            );
        }

    });

}


// ================= REPORT LOST ITEM =================

const lostForm = document.getElementById("lostForm");

if (lostForm) {

    lostForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const item = {

            title:
                document.getElementById("lostItemName").value.trim(),

            description:
                document.getElementById("lostDescription").value.trim(),

            location:
                document.getElementById("lostLocation").value.trim(),

            date:
                document.getElementById("lostDate").value,

            type: "Lost",

            category: "Other"
        };

        try {

            const response = await fetch(`${API_URL}/items`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(item)

            });

            const data = await response.json();

            if (response.ok) {

                alert("Lost item reported successfully!");

                lostForm.reset();

                window.location.href = "items.html";

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error("Lost item error:", error);

            alert(
                "Cannot connect to the backend. Make sure Flask is running."
            );
        }

    });

}


// ================= REPORT FOUND ITEM =================

const foundForm = document.getElementById("foundForm");

if (foundForm) {

    foundForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const item = {

            title:
                document.getElementById("foundItemName").value.trim(),

            description:
                document.getElementById("foundDescription").value.trim(),

            location:
                document.getElementById("foundLocation").value.trim(),

            date:
                document.getElementById("foundDate").value,

            type: "Found",

            category: "Other"
        };

        try {

            const response = await fetch(`${API_URL}/items`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(item)

            });

            const data = await response.json();

            if (response.ok) {

                alert("Found item reported successfully!");

                foundForm.reset();

                window.location.href = "items.html";

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error("Found item error:", error);

            alert(
                "Cannot connect to the backend. Make sure Flask is running."
            );
        }

    });

}


// ================= DISPLAY ITEMS =================

async function displayItems(filterType = "all") {

    const container =
        document.getElementById("itemsContainer");

    if (!container) {
        return;
    }

    try {

        const response =
            await fetch(`${API_URL}/items`);

        const items = await response.json();

        let filteredItems = items;

        if (filterType !== "all") {

            filteredItems = items.filter(function(item) {

                return item.type.toLowerCase() === filterType;

            });

        }

        if (filteredItems.length === 0) {

            container.innerHTML = `
                <div class="empty-message">

                    <h2>
                        No ${filterType === "all" ? "" : filterType}
                        items available.
                    </h2>

                    <p>
                        Be the first person to report an item.
                    </p>

                </div>
            `;

            return;
        }

        container.innerHTML = "";

        filteredItems.forEach(function(item) {

            const card =
                document.createElement("div");

            card.className =
                "item-card " +
                item.type.toLowerCase();

            const statusClass =
                item.type.toLowerCase() === "lost"
                    ? "lost-status"
                    : "found-status";

            const statusText =
                item.type.toLowerCase() === "lost"
                    ? "LOST"
                    : "FOUND";

            card.innerHTML = `

                <h2>
                    ${escapeHTML(item.title)}
                </h2>

                <p>
                    <span class="status ${statusClass}">
                        ${statusText}
                    </span>
                </p>

                <p>
                    <strong>Description:</strong>
                    ${escapeHTML(item.description || "")}
                </p>

                <p>
                    <strong>Location:</strong>
                    ${escapeHTML(item.location || "")}
                </p>

                <p>
                    <strong>Date:</strong>
                    ${escapeHTML(item.date || "")}
                </p>

            `;

            container.appendChild(card);

        });

    } catch (error) {

        console.error("Error loading items:", error);

        container.innerHTML = `
            <div class="empty-message">
                <h2>Unable to load items</h2>
                <p>
                    Make sure the Flask backend is running.
                </p>
            </div>
        `;
    }
}


// ================= FILTER BUTTONS =================

function showLostItems() {

    displayItems("lost");

}


function showFoundItems() {

    displayItems("found");

}


function showAllItems() {

    displayItems("all");

}


// ================= SAFE HTML =================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

}


// ================= LOAD ITEMS PAGE =================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const container =
            document.getElementById("itemsContainer");

        if (container) {

            displayItems();

        }

    }
<<<<<<< HEAD
);
=======
);
>>>>>>> 381f6def5da9f70cbbb29e65632f04e87c4b6e84
