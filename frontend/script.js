
/ ================= REGISTER =================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const userExists = users.some(function(user) {
            return user.email === email;
        });

        if (userExists) {
            alert("User already exists. Please login.");
            window.location.href = "login.html";
            return;
        }

        const user = {
            name: name,
            email: email,
            password: password
        };

        users.push(user);

        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration successful! Please login.");

        window.location.href = "login.html";

    });

}


// ================= LOGIN =================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(function(user) {

            return user.email === email &&
                   user.password === password;

        });

        if (user) {

            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );

            alert("Login successful!");

            window.location.href = "index.html";

        } else {

            alert("Invalid email or password!");

        }

    });

}


// ================= REPORT LOST ITEM =================

const lostForm = document.getElementById("lostForm");

if (lostForm) {

    lostForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const item = {

            id: Date.now(),

            type: "lost",

            name: document.getElementById("lostItemName").value.trim(),

            description: document.getElementById("lostDescription").value.trim(),

            location: document.getElementById("lostLocation").value.trim(),

            date: document.getElementById("lostDate").value,

            contact: document.getElementById("lostContact").value.trim()

        };

        let items = JSON.parse(localStorage.getItem("items")) || [];

        items.push(item);

        localStorage.setItem("items", JSON.stringify(items));

        alert("Lost item reported successfully!");

        lostForm.reset();

        window.location.href = "items.html";

    });

}


// ================= REPORT FOUND ITEM =================

const foundForm = document.getElementById("foundForm");

if (foundForm) {

    foundForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const item = {

            id: Date.now(),

            type: "found",

            name: document.getElementById("foundItemName").value.trim(),

            description: document.getElementById("foundDescription").value.trim(),

            location: document.getElementById("foundLocation").value.trim(),

            date: document.getElementById("foundDate").value,

            contact: document.getElementById("foundContact").value.trim()

        };

        let items = JSON.parse(localStorage.getItem("items")) || [];

        items.push(item);

        localStorage.setItem("items", JSON.stringify(items));

        alert("Found item reported successfully!");

        foundForm.reset();

        window.location.href = "items.html";

    });

}


// ================= DISPLAY ITEMS =================

function displayItems(filterType = "all") {

    const container = document.getElementById("itemsContainer");

    if (!container) {
        return;
    }

    let items = JSON.parse(localStorage.getItem("items")) || [];

    if (filterType !== "all") {

        items = items.filter(function(item) {

            return item.type === filterType;

        });

    }

    if (items.length === 0) {

        container.innerHTML = `
            <div class="empty-message">
                <h2>No ${filterType === "all" ? "" : filterType} items available.</h2>
                <p>Be the first person to report an item.</p>
            </div>
        `;

        return;
    }

    container.innerHTML = "";

    items.forEach(function(item) {

        const card = document.createElement("div");

        card.className = "item-card " + item.type;

        const statusClass =
            item.type === "lost"
                ? "lost-status"
                : "found-status";

        const statusText =
            item.type === "lost"
                ? "LOST"
                : "FOUND";

        card.innerHTML = `
            <h2>${escapeHTML(item.name)}</h2>

            <p>
                <span class="status ${statusClass}">
                    ${statusText}
                </span>
            </p>

            <p>
                <strong>Description:</strong>
                ${escapeHTML(item.description)}
            </p>

            <p>
                <strong>Location:</strong>
                ${escapeHTML(item.location)}
            </p>

            <p>
                <strong>Date:</strong>
                ${escapeHTML(item.date)}
            </p>

            <p>
                <strong>Contact:</strong>
                ${escapeHTML(item.contact)}
            </p>
        `;

        container.appendChild(card);

    });

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

    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

}


// ================= LOAD ITEMS PAGE =================

document.addEventListener("DOMContentLoaded", function() {

    const container = document.getElementById("itemsContainer");

    if (container) {
        displayItems();
    }

});

