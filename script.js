let selectedExam = "WAEC";

function toggleMenu() {
    document.getElementById("nav").classList.toggle("show");
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

function selectExam(exam) {
    selectedExam = exam;

    document.getElementById("examTitle").innerText =
        "Preparing for " + exam;

    scrollToSection("practice");
}

// SAMPLE PRACTICE QUESTIONS
const questions = {
    "Mathematics": [
        {
            q: "What is 12 × 8?",
            options: ["86", "96", "108", "88"],
            answer: "96"
        },
        {
            q: "What is the square root of 144?",
            options: ["10", "11", "12", "14"],
            answer: "12"
        }
    ],

    "English Language": [
        {
            q: "Choose the correct spelling.",
            options: ["Accomodate", "Acommodate",
            "Accommodate", "Acomodate"],
            answer: "Accommodate"
        },
        {
            q: "What is the opposite of ancient?",
            options: ["Old", "Modern", "Past", "Historic"],
            answer: "Modern"
        }
    ],

    "Biology": [
        {
            q: "Which organelle produces energy in cells?",
            options: ["Nucleus", "Mitochondrion",
            "Ribosome", "Vacuole"],
            answer: "Mitochondrion"
        }
    ],

    "CRS": [
        {
            q: "Who built the ark?",
            options: ["Moses", "David", "Noah", "Abraham"],
            answer: "Noah"
        }
    ]
};

let currentQuestions = [];
let currentIndex = 0;
let totalScore = 0;

function startQuiz() {
    let subject = document.getElementById("subject").value;

    if (!subject) {
        alert("Please select a subject first.");
        return;
    }

    if (!questions[subject]) {
        alert("Practice questions for this subject are coming soon.");
        return;
    }

    currentQuestions = questions[subject];
    currentIndex = 0;
    totalScore = 0;

    showQuestion();
}

function showQuestion() {
    let box = document.getElementById("quiz");

    if (currentIndex >= currentQuestions.length) {
        finishQuiz();
        return;
    }

    let q = currentQuestions[currentIndex];

    box.innerHTML = `
        <h3>Question ${currentIndex + 1}
        of ${currentQuestions.length}</h3>

        <br>
        <h3>${q.q}</h3>

        ${q.options.map(option => `
            <button class="option"
            onclick="checkAnswer('${option.replace(/'/g, "\\'")}')">
            ${option}
            </button>
        `).join("")}
    `;
}

function checkAnswer(answer) {
    let correct = currentQuestions[currentIndex].answer;

    if (answer === correct) {
        totalScore++;
        alert("Correct! 🎉");
    } else {
        alert("Not quite! Correct answer: " + correct);
    }

    currentIndex++;
    showQuestion();
}

function finishQuiz() {
    let percentage = Math.round(
        (totalScore / currentQuestions.length) * 100
    );

    document.getElementById("quiz").innerHTML =
        `<h2>Practice Completed! 🎓</h2>
        <p>You scored ${totalScore} out of
        ${currentQuestions.length}.</p>
        <h3>${percentage}%</h3>`;

    document.getElementById("score").innerText =
        percentage + "%";

    let title = "";
    let message = "";

    if (percentage >= 80) {
        title = "Excellent Performance! 🏆";
        message = "Amazing work! Keep learning and challenging yourself.";
    } else if (percentage >= 50) {
        title = "Good Effort! 🌟";
        message = "You're making progress. Keep practising.";
    } else {
        title = "Your Journey Continues ❤️";
        message = "One practice test doesn't define your ability. Review your mistakes and try again.";
    }

    document.getElementById("resultTitle").innerText = title;
    document.getElementById("resultMessage").innerText = message;

    localStorage.setItem("examScore", percentage);
}

// BASIC STUDY ASSISTANT
// This is a simple offline prototype, not a real AI model.

function sendMessage() {
    let input = document.getElementById("userInput");
    let text = input.value.trim();

    if (!text) return;

    let messages = document.getElementById("chatMessages");

    messages.innerHTML += `
        <div class="user">${escapeHTML(text)}</div>
    `;

    let response = getAIResponse(text.toLowerCase());

    messages.innerHTML += `
        <div class="bot">${response}</div>
    `;

    input.value = "";
    messages.scrollTop = messages.scrollHeight;
}

function escapeHTML(text) {
    return text.replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

function getAIResponse(question) {
    if (question.includes("hello") ||
        question.includes("hi")) {
        return "Hello! Welcome to EXAMMATE. What subject are you studying?";
    }

    if (question.includes("math") ||
        question.includes("trigonometry")) {
        return "Mathematics becomes easier when you understand the steps. Tell me the exact topic or question you need help with.";
    }

    if (question.includes("english")) {
        return "Let's improve your English! We can practise grammar, vocabulary, comprehension and phonetics.";
    }

    if (question.includes("literature")) {
        return "Let's explore Literature-in-English! We can discuss themes, characters, plots and literary devices.";
    }

    if (question.includes("crs") ||
        question.includes("bible")) {
        return "I can help you study biblical events, characters, teachings and CRS topics. Which one interests you?";
    }

    if (question.includes("result") ||
        question.includes("fail") ||
        question.includes("score")) {
        return "Remember that one examination result does not determine your future. Let's identify your strengths and plan your next steps.";
    }

    if (question.includes("study")) {
        return "Create a realistic timetable, study one topic at a time, practise questions and review your mistakes regularly.";
    }

    return "That's an interesting question! Please tell me the subject and topic so I can help you learn.";
}

// Allow Enter key to send messages
document.getElementById("userInput")
.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
