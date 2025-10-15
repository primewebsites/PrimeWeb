document.addEventListener("DOMContentLoaded", () => {
  // =============================
  // Tela de carregamento animada
  // =============================
  const loadingScreen = document.getElementById("loading-screen");
  const text = document.getElementById("loading-text");
  const letters = text.textContent.split("");
  text.textContent = "";

  letters.forEach((letter, index) => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.style.animationDelay = `${index * 0.1}s`;
    text.appendChild(span);
  });

  setTimeout(() => {
    loadingScreen.style.transform = "translateY(-100%)";
    loadingScreen.style.opacity = "0";
    setTimeout(() => { loadingScreen.style.display = "none"; }, 800);
  }, 2000);
});

// =============================
// Animação inicial do Hero
// =============================
window.addEventListener("load", () => {
  const heroText = document.querySelectorAll(".hero-content h1, .hero-content p");
  heroText.forEach((el, index) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";
    setTimeout(() => {
      el.style.transition = "all 0.8s ease-out";
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, index * 200);
  });
});

// =============================
// Portfólio + cores dinâmicas
// =============================
const portfolioItems = document.querySelectorAll(".portfolio-item");
const portfolioSection = document.querySelector(".portfolio-section");
const faqSection = document.getElementById("faq");
const faqTitle = faqSection.querySelector(".section-title");

// Defina as cores desejadas
const heroBgColor = "#0D1B2A";
const heroTextColor = "#FFFFFF";
const portfolioBgColor = "#F5F5F7";
const portfolioTextColor = "#1E1E1E";
const faqInitialBgColor = "#F5F5F7"; // FAQ começa clara
const faqInitialTextColor = "#1E1E1E"; // FAQ inicial: texto escuro
const faqFinalBgColor = "#0D1B2A"; // FAQ fundo hero ao rolar
const faqFinalTextColor = "#FFFFFF"; // FAQ texto branco ao rolar

// Inicializa FAQ com fundo e cores iniciais
faqSection.style.backgroundColor = faqInitialBgColor;
faqTitle.style.color = faqInitialTextColor;
faqSection.querySelectorAll(".faq-question, .faq-answer p").forEach(el => el.style.color = faqInitialTextColor);

function handleScroll() {
  const scrollY = window.scrollY;
  const windowMid = scrollY + window.innerHeight / 2;

  // Fade-in portfólio
  const triggerBottom = window.innerHeight * 0.85;
  portfolioItems.forEach((item, index) => {
    const itemTop = item.getBoundingClientRect().top;
    if (itemTop < triggerBottom && !item.classList.contains("show")) {
      setTimeout(() => item.classList.add("show"), index * 200);
    }
  });

  // =============================
  // Lógica de cores unificada
  // =============================
  if (windowMid < portfolioSection.offsetTop) {
    // Hero ativo
    portfolioSection.style.backgroundColor = heroBgColor;
    portfolioSection.style.color = heroTextColor;
    portfolioItems.forEach(item => item.querySelectorAll("h3, p").forEach(el => el.style.color = heroTextColor));

    faqSection.style.backgroundColor = faqInitialBgColor;
    faqTitle.style.color = faqInitialTextColor;
    faqSection.querySelectorAll(".faq-question, .faq-answer p").forEach(el => el.style.color = faqInitialTextColor);

  } else if (windowMid >= portfolioSection.offsetTop && windowMid < faqSection.offsetTop) {
    // Portfólio ativo
    portfolioSection.style.backgroundColor = portfolioBgColor;
    portfolioSection.style.color = portfolioTextColor;
    portfolioItems.forEach(item => item.querySelectorAll("h3, p").forEach(el => el.style.color = portfolioTextColor));

    faqSection.style.backgroundColor = faqInitialBgColor;
    faqTitle.style.color = faqInitialTextColor;
    faqSection.querySelectorAll(".faq-question, .faq-answer p").forEach(el => el.style.color = faqInitialTextColor);

  } else if (windowMid >= faqSection.offsetTop) {
    // FAQ ativo
    portfolioSection.style.backgroundColor = heroBgColor;
    portfolioSection.style.color = heroTextColor;
    portfolioItems.forEach(item => item.querySelectorAll("h3, p").forEach(el => el.style.color = heroTextColor));

    faqSection.style.backgroundColor = faqFinalBgColor;
    faqTitle.style.color = faqFinalTextColor;
    faqSection.querySelectorAll(".faq-question, .faq-answer p").forEach(el => el.style.color = faqFinalTextColor);
  }
}

// Otimização com requestAnimationFrame
window.addEventListener("scroll", () => requestAnimationFrame(handleScroll));
handleScroll();

// =============================
// FAQ Toggle
// =============================
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  question.addEventListener("click", () => {
    const isOpen = answer.style.maxHeight && answer.style.maxHeight !== "0px";

    // Fecha todas as respostas
    faqItems.forEach(i => {
      const ans = i.querySelector(".faq-answer");
      ans.style.maxHeight = "0";
      ans.style.paddingTop = "0";
      ans.style.paddingBottom = "0";
    });

    // Abre a clicada
    if (!isOpen) {
      answer.style.maxHeight = answer.scrollHeight + "px";
      answer.style.paddingTop = "10px";
      answer.style.paddingBottom = "10px";
    }
  });
});
const whyCards = document.querySelectorAll(".why-prime-card");
const whySection = document.getElementById("why-prime");

function handleWhyScroll() {
  const triggerBottom = window.innerHeight * 0.85;
  whyCards.forEach((card, index) => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < triggerBottom && !card.classList.contains("show")) {
      setTimeout(() => card.classList.add("show"), index * 200);
    }
  });
}

window.addEventListener("scroll", () => requestAnimationFrame(handleWhyScroll));
handleWhyScroll();
