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
// Экраны (ЕДИНАЯ функция)
// ==============================

const screens = document.querySelectorAll(".screen");

function showScreen(id) {
    // Скрываем все экраны
    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    // Показываем нужный экран
    const next = document.getElementById(id);
    if (!next) {
        console.error("Экран не найден:", id);
        return;
    }
    
    next.classList.add("active");

    // Анимация появления
    gsap.fromTo(
        next,
        {
            opacity: 0,
            y: 40
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }
    );
}


// ==============================
// Кнопки Далее
// ==============================

document.querySelectorAll(".next-btn").forEach(button => {
    button.addEventListener("click", () => {
        showScreen(button.dataset.next);
    });
});


// ==============================
// Выбор места
// ==============================

let selectedPlace = "";

document.querySelectorAll(".place-card").forEach(card => {
    card.addEventListener("click", () => {
        // Убираем выделение со всех карточек
        document.querySelectorAll(".place-card").forEach(c => {
            c.classList.remove("selected");
        });

        // Выделяем выбранную
        card.classList.add("selected");
        selectedPlace = card.dataset.place;

        // Переход к выбору даты
        setTimeout(() => {
            showScreen("dateScreen");
        }, 500);
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

    document.getElementById("selectedPlace").innerHTML =
        "<strong>📍 Место:</strong> " + selectedPlace;

    document.getElementById("selectedDate").innerHTML =
        "<strong>📅 Дата:</strong> " + selectedDate;

    showScreen("summary");
};


// ==============================
// Кнопка "Нет" (убегает)
// ==============================

// ==============================
// Кнопка "Нет" (плавно убегает)
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
    // Меняем текст кнопки
    noBtn.textContent = phrases[counter % phrases.length];
    counter++;

    // Если кнопка ещё не fixed, делаем её fixed
    if (noBtn.style.position !== "fixed") {
        noBtn.style.position = "fixed";
        noBtn.style.zIndex = "9999";
    }

    // Получаем актуальные размеры кнопки
    const btnRect = noBtn.getBoundingClientRect();
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;

    // Размеры окна
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Безопасные отступы от краёв
    const margin = 20;

    // Максимальные координаты
    const maxX = windowWidth - btnWidth - margin;
    const maxY = windowHeight - btnHeight - margin;

    // Случайная позиция в БЕЗОПАСНОЙ зоне
    const randomX = margin + Math.random() * maxX;
    const randomY = margin + Math.random() * maxY;

    // Применяем позицию
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
    noBtn.style.right = "auto";
    noBtn.style.bottom = "auto";
    
    // Плавная анимация
    noBtn.style.transition = "left 0.3s ease-out, top 0.3s ease-out";
}

// Удаляем старые обработчики (на всякий случай)
noBtn.removeEventListener("mouseenter", moveButton);
noBtn.removeEventListener("click", moveButton);

// Добавляем новые обработчики
noBtn.addEventListener("mouseenter", moveButton);
noBtn.addEventListener("click", moveButton);

// Сбрасываем позицию при загрузке
window.addEventListener("load", () => {
    noBtn.style.position = "relative";
    noBtn.style.left = "";
    noBtn.style.top = "";
    noBtn.textContent = "🙈 Нет";
});

// Сбрасываем позицию при изменении размера окна
window.addEventListener("resize", () => {
    noBtn.style.position = "relative";
    noBtn.style.left = "";
    noBtn.style.top = "";
    noBtn.textContent = "🙈 Нет";
});

// ==============================
// Кнопка "Да"
// ==============================

document.getElementById("yesBtn").addEventListener("click", () => {
    showScreen("finish");
    launchConfetti();
    
    // Запускаем музыку при согласии
    if (!playing) {
        music.play();
        playing = true;
        musicBtn.innerHTML = "🔊";
    }
});


// ==============================
// Конфетти
// ==============================

function launchConfetti() {
    const duration = 4000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 70,
            origin: { x: 0 }
        });

        confetti({
            particleCount: 5,
            angle: 120,
            spread: 70,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
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

    setTimeout(() => {
        heart.remove();
    }, 10000);
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
        music.play().catch(err => {
            console.log("Автовоспроизведение заблокировано браузером");
        });
        playing = true;
        musicBtn.innerHTML = "🔊";
    } else {
        music.pause();
        playing = false;
        musicBtn.innerHTML = "🎵";
    }
};

function moveButton(event) {
    // Меняем текст
    noBtn.textContent = phrases[counter % phrases.length];
    counter++;

    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    
    // Учитываем отступы
    const padding = 20;
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;
    
    // Минимальные отступы от краёв
    const randomX = Math.max(padding, Math.min(Math.random() * maxX, maxX));
    const randomY = Math.max(padding, Math.min(Math.random() * maxY, maxY));

    // Плавное перемещение
    noBtn.style.position = "fixed";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
    noBtn.style.transition = "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    noBtn.style.zIndex = "9999";
}

// Сброс позиции при изменении размера окна
window.addEventListener("resize", () => {
    noBtn.style.position = "relative";
    noBtn.style.left = "";
    noBtn.style.top = "";
});

// ==============================
// GSAP анимации карточек (при загрузке)
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

// Замени Telegram на Formspree
function sendToFormspree(place, date) {
    fetch('https://formspree.io/f/xrenwoqo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            place: place,
            date: date,
            time: new Date().toLocaleString('ru-RU')
        })
    });
}

// Измени обработчик кнопки "Да"
document.getElementById("yesBtn").addEventListener("click", () => {
    // Отправляем данные в Telegram
    sendToTelegram(selectedPlace, selectedDate);
    
    showScreen("finish");
    launchConfetti();
    
    if (!playing) {
        music.play();
        playing = true;
        musicBtn.innerHTML = "🔊";
    }
});

// ==============================
// Кнопка Рандомного выбора
// ==============================

const randomBtn = document.getElementById("randomBtn");
const placeCards = document.querySelectorAll(".place-card");

randomBtn.addEventListener("click", () => {
    // Убираем выделение со всех карточек
    placeCards.forEach(card => {
        card.classList.remove("selected");
    });

    // Анимация "перемешивания" карточек
    let shuffleCount = 0;
    const maxShuffles = 10;
    let currentCard = null;

    const shuffleInterval = setInterval(() => {
        // Убираем подсветку с предыдущей карточки
        if (currentCard) {
            currentCard.classList.remove("selected");
        }

        // Выбираем случайную карточку для подсветки
        const randomIndex = Math.floor(Math.random() * placeCards.length);
        currentCard = placeCards[randomIndex];
        currentCard.classList.add("selected");

        shuffleCount++;

        // Завершаем перемешивание
        if (shuffleCount >= maxShuffles) {
            clearInterval(shuffleInterval);

            // Финальный выбор
            const finalCard = placeCards[Math.floor(Math.random() * placeCards.length)];
            
            // Убираем все выделения
            placeCards.forEach(card => card.classList.remove("selected"));
            
            // Подсвечиваем финальную карточку
            finalCard.classList.add("selected");
            selectedPlace = finalCard.dataset.place;

            // Эффект конфетти (мини)
            confetti({
                particleCount: 30,
                spread: 70,
                origin: { y: 0.6 }
            });

            // Переход к выбору даты
            setTimeout(() => {
                showScreen("dateScreen");
            }, 800);
        }
    }, 150); // Каждые 150мс меняем карточку
});
// ==============================
// Приветствие в консоли
// ==============================

console.log("❤️ Добро пожаловать!");