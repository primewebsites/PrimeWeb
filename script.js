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
// Portfólio - cor dinâmica
// =============================
const portfolioItems = document.querySelectorAll(".portfolio-item");
const portfolioSection = document.querySelector(".portfolio-section");

// Defina as cores desejadas
const heroBgColor = "#0D1B2A";
const heroTextColor = "#FFFFFF";
const portfolioBgColor = "#F5F5F7";
const portfolioTextColor = "#1E1E1E";

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
  // Lógica de cores apenas para o Portfólio
  // =============================
  if (windowMid < portfolioSection.offsetTop) {
    // Antes do portfólio (hero ativo)
    portfolioSection.style.backgroundColor = heroBgColor;
    portfolioSection.style.color = heroTextColor;
    portfolioItems.forEach(item =>
      item.querySelectorAll("h3, p").forEach(el => el.style.color = heroTextColor)
    );
  } else if (windowMid >= portfolioSection.offsetTop &&
             windowMid < portfolioSection.offsetTop + portfolioSection.offsetHeight) {
    // Dentro do portfólio
    portfolioSection.style.backgroundColor = portfolioBgColor;
    portfolioSection.style.color = portfolioTextColor;
    portfolioItems.forEach(item =>
      item.querySelectorAll("h3, p").forEach(el => el.style.color = portfolioTextColor)
    );
  } else {
    // Depois do portfólio (volta para o hero)
    portfolioSection.style.backgroundColor = heroBgColor;
    portfolioSection.style.color = heroTextColor;
    portfolioItems.forEach(item =>
      item.querySelectorAll("h3, p").forEach(el => el.style.color = heroTextColor)
    );
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

// =============================
// Por que a Prime? - Carrossel 3 visíveis
// =============================
const carousel = document.querySelector(".why-carousel");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");
const whyCards = document.querySelectorAll(".why-prime-card");

// Largura de cada card + gap (ajuste se necessário)
const cardWidth = whyCards[0].offsetWidth + 30;

// Função para scrollar uma card por vez
rightArrow.addEventListener("click", () => {
  carousel.scrollBy({ left: cardWidth, behavior: "smooth" });
});

leftArrow.addEventListener("click", () => {
  carousel.scrollBy({ left: -cardWidth, behavior: "smooth" });
});

// Fade-in sequencial dos cards visíveis
function handleWhyScroll() {
  const triggerBottom = window.innerHeight * 0.85;
  whyCards.forEach((card, index) => {
    const cardTop = card.getBoundingClientRect().top;
    if (!card.classList.contains("show")) {
      if (cardTop < triggerBottom) {
        setTimeout(() => card.classList.add("show"), index * 150);
      }
    }
  });
}

window.addEventListener("scroll", () => requestAnimationFrame(handleWhyScroll));
handleWhyScroll();

// Forçar os 3 primeiros cards a aparecer imediatamente
whyCards.forEach((card, index) => {
  if (index < 3) {
    card.classList.add("show");
  }
});


document.querySelector('.back-to-top').addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
document.querySelectorAll('.portfolio-img img').forEach(img => {
  if (img.complete) {
    img.classList.add('loaded'); // caso já esteja carregada do cache
  } else {
    img.addEventListener('load', () => img.classList.add('loaded'));
  }
});
