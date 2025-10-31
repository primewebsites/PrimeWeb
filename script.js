document.addEventListener("DOMContentLoaded", function() {
  const sliderWrapper = document.querySelector(".projetos-slider-wrapper");
  const slider = document.querySelector(".projetos-slider");
  const cards = document.querySelectorAll(".card-projeto");
  const setaEsquerda = document.querySelector(".seta.esquerda");
  const setaDireita = document.querySelector(".seta.direita");

  const cardsVisiveis = 3; // 3 cards visíveis
  const intervalo = 10000; // 10 segundos
  let index = 0;
  let autoSlide;

  // DUPLICA OS CARDS PARA LOOP INFINITO
  const totalCards = cards.length;
  for (let i = 0; i < cardsVisiveis; i++) {
    const clone = cards[i].cloneNode(true);
    slider.appendChild(clone);
  }

  function atualizarSlider(transicao = true) {
    const cardWidth = cards[0].offsetWidth + 30; // card + gap
    slider.style.transition = transicao ? "transform 0.5s ease-in-out" : "none";
    slider.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  function proximo() {
    index++;
    atualizarSlider();

    if (index >= totalCards) {
      // Quando passar dos cards originais, "reseta" sem animação
      setTimeout(() => {
        index = 0;
        atualizarSlider(false);
      }, 500); // 500ms = tempo da transição
    }
  }

  function anterior() {
    if (index === 0) {
      // Vai para o final
      index = totalCards;
      atualizarSlider(false);
      setTimeout(() => {
        index--;
        atualizarSlider(true);
      }, 50);
    } else {
      index--;
      atualizarSlider();
    }
  }

  setaDireita.addEventListener("click", () => {
    proximo();
    reiniciarAutoSlide();
  });

  setaEsquerda.addEventListener("click", () => {
    anterior();
    reiniciarAutoSlide();
  });

  function iniciarAutoSlide() {
    autoSlide = setInterval(proximo, intervalo);
  }

  function reiniciarAutoSlide() {
    clearInterval(autoSlide);
    iniciarAutoSlide();
  }

  window.addEventListener("resize", () => atualizarSlider(false));

  atualizarSlider();
  iniciarAutoSlide();
});
document.addEventListener("DOMContentLoaded", function() {
  // ======= SCROLL SUAVE =======
  const links = document.querySelectorAll('nav ul li a');
  links.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ======= FADE-IN DAS SEÇÕES =======
  const secoes = document.querySelectorAll("section");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, { threshold: 0.15 });

  secoes.forEach(sec => observer.observe(sec));

  // ======= HOVER ANIMATION NOS CARDS =======
  const cards = document.querySelectorAll(".card-projeto");
  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)";
      card.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "0 6px 25px rgba(0,0,0,0.25)";
    });
  });

  // ======= LAZY LOAD DE IMAGENS =======
  const imagens = document.querySelectorAll("img");
  imagens.forEach(img => {
    if ("loading" in HTMLImageElement.prototype) {
      img.setAttribute("loading", "lazy");
    } else {
      // fallback para browsers antigos
      const observerImg = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const src = img.dataset.src;
            if (src) {
              img.src = src;
              obs.unobserve(img);
            }
          }
        });
      });
      observerImg.observe(img);
    }
  });
});

// ======== FAQ – Perguntas Frequentes ========
document.addEventListener("DOMContentLoaded", function() {
  const faqs = document.querySelectorAll(".faq-question");

  faqs.forEach(faq => {
    faq.addEventListener("click", function() {
      const answer = this.nextElementSibling;
      const isActive = this.classList.contains("active");

      // Fecha todas as respostas
      faqs.forEach(f => {
        f.classList.remove("active");
        f.nextElementSibling.classList.remove("show");
      });

      // Se não estava ativo, abre
      if (!isActive) {
        this.classList.add("active");
        answer.classList.add("show");
      }
    });
  });
});
faqQuestions.forEach(q => {
  q.addEventListener('click', () => {
    const answer = q.nextElementSibling;
    const expanded = q.classList.toggle('active');

    if (expanded) {
      answer.style.maxHeight = answer.scrollHeight + "px";
      answer.style.padding = "10px 0";
    } else {
      answer.style.maxHeight = 0;
      answer.style.padding = "0 0";
    }
  });
});
