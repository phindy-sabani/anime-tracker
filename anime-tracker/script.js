// Canvas background
const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");

let petals = [];
const numPetals = 60;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Petal {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.size = Math.random() * 12 + 8;
        this.speed = Math.random() * 1 + 0.5;
        this.swing = Math.random() * 2 + 1;
        this.angle = Math.random() * Math.PI * 2;
    }
    update() {
        this.y += this.speed;
        this.x += Math.sin(this.angle) * this.swing;
        this.angle += 0.01;
        if (this.y > canvas.height) this.reset();
    }
    draw() {
        ctx.fillStyle = "#ffb7c5";
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.size * 0.6, this.size, Math.PI / 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = "#ff69b4";
        ctx.stroke();
    }
}

class SakuraPetals {
    constructor() {
        this.petals = [];
        this.numPetals = 40;
        this.active = false;
    }

    start() {
        if (this.active) return; // already running
        this.active = true;
        this.petals = [];
        for (let i = 0; i < this.numPetals; i++) {
            this.petals.push(new Petal());
        }
        this.animate();
    }

    stop() {
        this.active = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    animate = () => {
        if (!this.active) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.petals.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(this.animate);
    }
}

class PurpleBackground {
    constructor() {
        this.active = false;
        this.circles = [];
        this.numCircles = 30;

        for (let i = 0; i < this.numCircles; i++) {
            this.circles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 50 + 20,
                alpha: Math.random() * 0.5 + 0.2,
                speed: Math.random() * 0.01 + 0.005
            });
        }
    }

    start() {
        if (this.active) return;
        this.active = true;
        this.animate();
    }

    stop() {
        this.active = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    animate = () => {
        if (!this.active) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.circles.forEach(c => {
            c.alpha += c.speed;
            if (c.alpha >= 1 || c.alpha <= 0.2) c.speed *= -1;
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.radius, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(168, 85, 247, ${c.alpha})`; // purple glow
            ctx.fill();
        });
        requestAnimationFrame(this.animate);
    }
}

class DarkStars {
    constructor() {
        this.active = false;
        this.stars = [];
        this.numStars = 100;

        for (let i = 0; i < this.numStars; i++) {
            this.stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5,
                alpha: Math.random(),
                speed: Math.random() * 0.3 + 0.05
            });
        }
    }

    start() {
        if (this.active) return;
        this.active = true;
        this.animate();
    }

    stop() {
        this.active = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    animate = () => {
        if (!this.active) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.stars.forEach(s => {
            s.y += s.speed;
            if (s.y > canvas.height) {
                s.y = 0;
                s.x = Math.random() * canvas.width;
            }
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
            ctx.fill();
        });

        requestAnimationFrame(this.animate);
    }
}

class LightBubbles {
    constructor() {
        this.active = false;
        this.bubbles = [];
        this.numBubbles = 40;

        for (let i = 0; i < this.numBubbles; i++) {
            this.bubbles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 15 + 10,
                alpha: Math.random() * 0.4 + 0.2,
                speed: Math.random() * 0.5 + 0.2
            });
        }
    }

    start() {
        if (this.active) return;
        this.active = true;
        this.animate();
    }

    stop() {
        this.active = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    animate = () => {
        if (!this.active) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.bubbles.forEach(b => {
            b.y -= b.speed;
            if (b.y + b.radius < 0) {
                b.y = canvas.height + b.radius;
                b.x = Math.random() * canvas.width;
            }
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.radius, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(173, 216, 230, ${b.alpha})`; // light blue bubbles
            ctx.fill();
        });

        requestAnimationFrame(this.animate);
    }
}



const sakura = new SakuraPetals();
const purpleBg = new PurpleBackground();
const darkBg = new DarkStars();
const lightBg = new LightBubbles();

function switchThemeCanvas(theme) {
    sakura.stop();
    purpleBg.stop();
    darkBg.stop();
    lightBg.stop();

    if (theme === 'sakura') sakura.start();
    else if(theme === 'default') purpleBg.start();
    else if (theme === 'dark') darkBg.start();
    else if (theme === 'light') lightBg.start();
}

const themeSelector = document.getElementById("themePicker");

window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("data-theme") || "default";
    document.documentElement.setAttribute("data-theme", savedTheme);
    themeSelector.value = savedTheme;
    switchThemeCanvas(savedTheme);
});

themeSelector.addEventListener('change', () => {
    const selectedTheme = themeSelector.value;
    localStorage.setItem("data-theme", selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
    switchThemeCanvas(selectedTheme);
});

// ============================================================
let animeList = [];

const savedAnime = localStorage.getItem("animeList");
if (savedAnime) {
    animeList = JSON.parse(savedAnime);
}
else {
    
}

const animeContainer = document.getElementById("anime-list");

function displayAnime(filter = "All") {
    if (animeList.length === 0) {
        animeContainer.innerHTML = `<p class="anime-view">No anime to view yet
        <span class="tooltip-text">Get started by adding an anime</span>
        </p>`;
    }

    else {
        animeContainer.innerHTML = "";
        animeList
        .filter(anime => filter === "All" || anime.status === filter)
        .forEach((anime, index) => {
            const card = document.createElement("div");
            card.classList.add("anime-card");

            card.innerHTML = `
            <img src="${anime.image}" alt="${anime.title}">
            <h2>${anime.title}</h2>
            <p>Status: ${anime.status}</p>
            <button class="delete-btn">Delete</button>
            <button class="edit-btn">Edit</button>
            `;

            animeContainer.appendChild(card);

            const deleteBtn = card.querySelector(".delete-btn");
            deleteBtn.addEventListener("click", () => {
                if (confirm("Are you sure you want to delete this anime?")) {
                    animeList.splice(index, 1);
                    saveToLocalStorage();
                    displayAnime();
                }
            });

            const editBtn = card.querySelector(".edit-btn");
            editBtn.addEventListener("click", () => {
                if(confirm("Your anime has been moved to the form above. Edit the details and re-add it to save changes.")) {
                    document.getElementById("anime-title").value = anime.title;
                    document.getElementById("anime-image").value = anime.image;
                    document.getElementById("anime-status").value = anime.status;

                    animeList.splice(index, 1);
                    saveToLocalStorage();
                    displayAnime();

                };
            });
        });

    }
}

displayAnime();

const buttons = document.querySelectorAll("nav button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const status = button.getAttribute("data-status");
        displayAnime(status);
    })
})

document.getElementById("add-btn").addEventListener("click", () => {
    const title = document.getElementById("anime-title").value;
    const image = document.getElementById("anime-image").value;
    const status = document.getElementById("anime-status").value;

    if (title && image && status) {
        animeList.push({title, image, status});
        saveToLocalStorage();
        displayAnime();
        setTimeout(function() {
            alert(`${title} was added successfully!`);
        }, 5);

        //Clear inputs
        document.getElementById("anime-title").value = "";
        document.getElementById("anime-image").value = "";
        document.getElementById("anime-status").value = "Watching";
    }else {
        alert("Please fill in all fields!");
    }
});

function saveToLocalStorage() {
    localStorage.setItem("animeList", JSON.stringify(animeList));
}