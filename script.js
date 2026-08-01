// ==============================
// Печатающийся текст
// ==============================

const message =
`У меня есть для тебя небольшой сюрприз...
Я долго думал, как сделать приглашение особенным.
Поэтому создал этот маленький сайт только для тебя ❤️`;

const typing = document.getElementById("typingText");
let index = 0;

function typeText() {
    if (index < message.length) {
        typing.innerHTML += message.charAt(index);
        index++;
        setTimeout(typeText, 45);
    }
}
typeText();


// ==============================
// Экраны
// ==============================

const screens = document.querySelectorAll(".screen");

function showScreen(id) {
    screens.forEach(screen => screen.classList.remove("active"));

    const next = document.getElementById(id);
    if (!next) {
        console.error("Экран не найден:", id);
        return;
    }
    
    next.classList.add("active");

    gsap.fromTo(next, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
}


// ==============================
// Кнопки Далее
// ==============================

document.querySelectorAll(".next-btn").forEach(button => {
    button.addEventListener("click", () => showScreen(button.dataset.next));
});


// ==============================
// Выбор места
// ==============================

let selectedPlace = "";

document.querySelectorAll(".place-card").forEach(card => {
    card.addEventListener("click", () => {
        document.querySelectorAll(".place-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        selectedPlace = card.dataset.place;

        setTimeout(() => showScreen("dateScreen"), 500);
    });
});


// ==============================
// Выбор даты
// ==============================

let selectedDate = "";

document.getElementById("dateBtn").onclick = () => {
    const date = document.getElementById("datePicker").value;

    if (date === "") {
        alert("Выбери дату ❤️");
        return;
    }

    selectedDate = date;

    document.getElementById("selectedPlace").innerHTML = "<strong>📍 Место:</strong> " + selectedPlace;
    document.getElementById("selectedDate").innerHTML = "<strong>📅 Дата:</strong> " + selectedDate;

    showScreen("summary");
};


// ==============================
// Кнопка "Нет" (убегает)
// ==============================

const noBtn = document.getElementById("noBtn");

const phrases = [
    "🥺 Ну пж",
    "🥺 Ну пжж",
    "🥺 Ну пжжж",
    "🥺 Ну пжжжж",
    "🥺 Ну пжжжжж"
];

let counter = 0;

function moveButton(event) {
    noBtn.textContent = phrases[counter % phrases.length];
    counter++;

    if (noBtn.style.position !== "fixed") {
        noBtn.style.position = "fixed";
        noBtn.style.zIndex = "9999";
    }

    const btnRect = noBtn.getBoundingClientRect();
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const margin = 20;
    const maxX = windowWidth - btnWidth - margin;
    const maxY = windowHeight - btnHeight - margin;

    const randomX = margin + Math.random() * maxX;
    const randomY = margin + Math.random() * maxY;

    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
    noBtn.style.right = "auto";
    noBtn.style.bottom = "auto";
    noBtn.style.transition = "left 0.3s ease-out, top 0.3s ease-out";
}

noBtn.addEventListener("mouseenter", moveButton);
noBtn.addEventListener("click", moveButton);

window.addEventListener("load", () => {
    noBtn.style.position = "relative";
    noBtn.style.left = "";
    noBtn.style.top = "";
    noBtn.textContent = "🙈 Нет";
});

window.addEventListener("resize", () => {
    noBtn.style.position = "relative";
    noBtn.style.left = "";
    noBtn.style.top = "";
    noBtn.textContent = "🙈 Нет";
});


// ==============================
// Кнопка "Да" + Отправка в Formspree
// ==============================

document.getElementById("yesBtn").addEventListener("click", () => {
    // Отправляем в Formspree
    sendToFormspree(selectedPlace, selectedDate);
    
    showScreen("finish");
    launchConfetti();
    
    if (!playing) {
        music.play();
        playing = true;
        musicBtn.innerHTML = "🔊";
    }
});


// ==============================
// Отправка в Formspree
// ==============================

function sendToFormspree(place, date) {
    fetch('https://formspree.io/f/xrenwoqo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            place: place,
            date: date,
            time: new Date().toLocaleString('ru-RU')
        })
    })
    .then(response => {
        if (response.ok) {
            console.log('✅ Отправлено на почту!');
        } else {
            console.log('❌ Ошибка отправки');
        }
    })
    .catch(error => {
        console.log('❌ Ошибка:', error);
    });
}


// ==============================
// Конфетти
// ==============================

function launchConfetti() {
    const duration = 4000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 70, origin: { x: 0 } });
        confetti({ particleCount: 5, angle: 120, spread: 70, origin: { x: 1 } });

        if (Date.now() < end) requestAnimationFrame(frame);
    })();
}


// ==============================
// Падающие сердечки
// ==============================

const heartContainer = document.getElementById("hearts");

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (20 + Math.random() * 30) + "px";
    heart.style.animationDuration = (5 + Math.random() * 5) + "s";

    heartContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 10000);
}

setInterval(createHeart, 450);


// ==============================
// Музыка
// ==============================

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
let playing = false;

musicBtn.onclick = () => {
    if (!playing) {
        music.play().catch(err => console.log("Браузер заблокировал музыку"));
        playing = true;
        musicBtn.innerHTML = "🔊";
    } else {
        music.pause();
        playing = false;
        musicBtn.innerHTML = "🎵";
    }
};


// ==============================
// Кнопка Рандомного выбора
// ==============================

const randomBtn = document.getElementById("randomBtn");
const placeCards = document.querySelectorAll(".place-card");

randomBtn.addEventListener("click", () => {
    placeCards.forEach(card => card.classList.remove("selected"));

    let shuffleCount = 0;
    const maxShuffles = 10;
    let currentCard = null;

    const shuffleInterval = setInterval(() => {
        if (currentCard) currentCard.classList.remove("selected");

        const randomIndex = Math.floor(Math.random() * placeCards.length);
        currentCard = placeCards[randomIndex];
        currentCard.classList.add("selected");
        shuffleCount++;

        if (shuffleCount >= maxShuffles) {
            clearInterval(shuffleInterval);

            const finalCard = placeCards[Math.floor(Math.random() * placeCards.length)];
            placeCards.forEach(card => card.classList.remove("selected"));
            finalCard.classList.add("selected");
            selectedPlace = finalCard.dataset.place;

            confetti({ particleCount: 30, spread: 70, origin: { y: 0.6 } });

            setTimeout(() => showScreen("dateScreen"), 800);
        }
    }, 150);
});


// ==============================
// GSAP анимации карточек
// ==============================

window.addEventListener("load", () => {
    gsap.from(".card", {
        duration: 1,
        opacity: 0,
        y: 60,
        stagger: 0.12,
        ease: "power3.out"
    });
});


// ==============================
// Приветствие в консоли
// ==============================

console.log("❤️ Добро пожаловать!");
