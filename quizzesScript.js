// Quiz Data
const quizData = [
  {
      question: "ما هو أفضل وصف للتصيد الاحتيالي (Phishing)؟",
      options: [
          "برنامج لحماية الجهاز من الفيروسات",
          "هجوم عبر البريد الإلكتروني لسرقة المعلومات",
          "أسلوب لتحسين سرعة الإنترنت"
      ],
      correct: 1
  },
  {
      question: "ما الغرض الرئيسي من جدار الحماية (Firewall)؟",
      options: [
          "زيادة سرعة الإنترنت",
          "تحسين أداء الحاسوب",
          "منع الوصول غير المصرح به"
      ],
      correct: 2
  },
  {
      question: "ما معنى الاختصار HTTPS في عناوين المواقع؟",
      options: [
          "نظام نقل الملفات السريع",
          "بروتوكول نقل البريد الإلكتروني",
          "نظام نقل النصوص التشعبي الآمن"
      ],
      correct: 2
  },
  {
      question: "ما هو الغرض من التحديثات الأمنية؟",
      options: [
          "إصلاح الثغرات الأمنية وتحسين الحماية",
          "إضافة ميزات جديدة فقط",
          "تحسين أداء الجهاز فقط"
      ],
      correct: 0
  },
  {
      question: "ما هو أفضل وصف للهندسة الاجتماعية؟",
      options: [
          "التلاعب النفسي للحصول على معلومات حساسة",
          "فرع من فروع الهندسة الكهربائية",
          "دراسة تأثير التكنولوجيا على المجتمع"
      ],
      correct: 0
  },
  {
      question: "ما هو الهدف الرئيسي من هجوم DDoS؟",
      options: [
          "سرقة البيانات الشخصية",
          "إغراق الخادم بطلبات وهمية لإيقاف الخدمة",
          "اختراق الحسابات البنكية"
      ],
      correct: 1
  },
  {
      question: "ما هو الاستخدام الصحيح لشبكة VPN؟",
      options: [
          "إخفاء النشاط الرقمي وحماية الاتصال",
          "زيادة سرعة الإنترنت",
          "الوصول إلى المواقع المحجوبة فقط"
      ],
      correct: 0
  },
  {
      question: "ما هو الغرض من المصادقة الثنائية (2FA)؟",
      options: [
          "تسريع عملية تسجيل الدخول",
          "تخزين كلمات المرور بشكل آمن",
          "إضافة طبقة حماية إضافية للحسابات"
      ],
      correct: 2
  }
];

// Quiz Logic
let currentQuestion = 0;
let score = 0;
const quizContainer = document.getElementById("quiz-container");
const submitBtn = document.getElementById("submit-btn");

function initializeQuiz() {
quizData.forEach((q, index) => {
  const questionHTML = `
          <div class="question-card ${index === 0 ? "active" : ""}">
              <div class="question-number">السؤال ${index + 1} من ${
    quizData.length
  }</div>
              <div class="question-text">${q.question}</div>
              ${q.options
                .map(
                  (opt, i) => `
                  <div class="option" onclick="selectAnswer(${index}, ${i})">
                      ${opt}
                  </div>
              `
                )
                .join("")}
          </div>
      `;
  quizContainer.innerHTML += questionHTML;
});
}

function selectAnswer(qIndex, optionIndex) {
const question = quizData[qIndex];
const options = document.querySelectorAll(
  `.question-card:nth-child(${qIndex + 1}) .option`
);

options.forEach((opt) => opt.classList.remove("selected"));
options[optionIndex].classList.add("selected");

if (qIndex === currentQuestion) {
  setTimeout(() => {
    showNextQuestion();
  }, 500);
}
}

function showNextQuestion() {
document.querySelector(".question-card.active").classList.remove("active");
currentQuestion++;

if (currentQuestion < quizData.length) {
  document
    .querySelectorAll(".question-card")
    [currentQuestion].classList.add("active");
} else {
  submitBtn.disabled = false;
  // Enable button
  document.querySelector(".results").disabled = false;
}
}

function showResults() {
const reviewContainer = document.getElementById("answers-review");
let reviewHTML = "";

document.querySelectorAll(".question-card").forEach((card, index) => {
  const question = quizData[index];
  const selectedOption = card.querySelector(".selected");
  const isCorrect = selectedOption
    ? card.children[question.correct + 2] === selectedOption
    : false;

  if (isCorrect) {
    score++;
  }

  reviewHTML += `
          <div class="answer-review-item ${
            isCorrect ? "correct-answer" : "wrong-answer"
          }">
              <h3>السؤال ${index + 1}: ${question.question}</h3>
              <p>إجابتك: ${
                selectedOption ? selectedOption.textContent : "لم يتم الإجابة"
              }</p>
              <p>الإجابة الصحيحة: ${question.options[question.correct]}</p>
          </div>
      `;
});

document.getElementById(
  "score"
).textContent = `النتيجة: ${score}/${quizData.length}`;
reviewContainer.innerHTML = reviewHTML;
document.getElementById("results").style.display = "block";
window.scrollTo({ top: 0, behavior: "smooth" });
}

// Password Strength Checker
function checkPasswordStrength(password) {
const strengthBar = document.getElementById("strength-bar");
const criteria = {
  length: password.length >= 8,
  uppercase: /[A-Z]/.test(password),
  number: /\d/.test(password),
  special: /[!@#$%^&*]/.test(password),
};

// Update criteria list
Object.keys(criteria).forEach((key) => {
  const item = document.getElementById(key);
  item.classList.toggle("valid", criteria[key]);
  item.querySelector("i").className = criteria[key]
    ? "fas fa-check"
    : "fas fa-times";
});

// Calculate strength
const strength = Object.values(criteria).filter(Boolean).length;
const width = (strength / 4) * 100;
strengthBar.style.width = `${width}%`;
strengthBar.style.backgroundColor =
  strength < 2 ? "#dc3545" : strength < 4 ? "#ffc107" : "#28a745";
}

function generatePassword() {
const length = 12;
const chars = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+",
};

let password = "";
// Ensure at least one character from each set
password += getRandomChar(chars.lowercase);
password += getRandomChar(chars.uppercase);
password += getRandomChar(chars.numbers);
password += getRandomChar(chars.symbols);

// Fill the rest randomly
const allChars = Object.values(chars).join("");
for (let i = password.length; i < length; i++) {
  password += getRandomChar(allChars);
}

// Shuffle the password
password = password
  .split("")
  .sort(() => Math.random() - 0.5)
  .join("");

const input = document.querySelector(".password-input");
input.value = password;
checkPasswordStrength(password);
}

function getRandomChar(charSet) {
return charSet[Math.floor(Math.random() * charSet.length)];
}

function copyPassword() {
const input = document.querySelector(".password-input");
input.select();
document.execCommand("copy");
alert("تم نسخ كلمة المرور!");
}

function resetQuiz() {
currentQuestion = 0;
score = 0;
document.querySelectorAll(".option").forEach((opt) => {
  opt.classList.remove("selected", "correct", "wrong");
});
document.getElementById("results").style.display = "none";
document.querySelectorAll(".question-card").forEach((card, index) => {
  card.classList.toggle("active", index === 0);
});
submitBtn.disabled = true;
// Disable button
document.querySelector(".results").disabled = true;
}

// Initialize Quiz
initializeQuiz();
