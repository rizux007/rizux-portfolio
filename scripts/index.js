const phrases = [
  "Web developer. ",
  "Mobile developer. ",
  "Software Engineer. ",
  "UI/UX Designer. ",
];

const typingText = document.getElementById("typing-text");
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  const displayText = isDeleting
    ? currentPhrase.slice(0, charIndex--)
    : currentPhrase.slice(0, charIndex++);

  typingText.textContent = displayText;

  // Contrôle de la vitesse
  let typingSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentPhrase.length) {
    // Pause à la fin d'une phrase
    typingSpeed = 1000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    // Passer à la phrase suivante
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length; // Boucle infinie
  }

  setTimeout(typeEffect, typingSpeed);
}

// Démarre l'animation
typeEffect();

//Mettre active sur les filtres
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section"); // Toutes les sections
  const navLinks = document.querySelectorAll(".nav-links li"); // Liens de navigation

  window.addEventListener("scroll", () => {
    let currentSection = "";

    // Détecte la section visible
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        currentSection = section.getAttribute("id");
      }
    });

    // Ajoute et enlève la classe 'active'
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (
        link.querySelector("a").getAttribute("href").includes(currentSection)
      ) {
        link.classList.add("active");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".testimonials-container");
  const testimonials = document.querySelectorAll(".testimonial");
  const prevBtn = document.querySelector("#prev-btn");
  const nextBtn = document.querySelector("#next-btn");

  let currentIndex = 0; // Index actuel
  const testimonialCount = testimonials.length;

  // Vérifier si l'écran est petit
  const isSmallScreen = () => window.innerWidth <= 769;

  // Fonction pour afficher les témoignages
  const showTestimonials = () => {
    const displayCount = isSmallScreen() ? 1 : 2; // Affiche 1 ou 2 témoignages selon la taille de l'écran

    testimonials.forEach((testimonial, index) => {
      if (index >= currentIndex && index < currentIndex + displayCount) {
        testimonial.style.display = "block"; // Afficher les témoignages actifs
        testimonial.style.opacity = "1";
      } else {
        testimonial.style.display = "none"; // Masquer les autres
        testimonial.style.opacity = "0";
      }
    });
  };

  // Afficher les témoignages suivants
  const nextTestimonials = () => {
    currentIndex = (currentIndex + 1) % testimonialCount; // Passer au témoignage suivant
    showTestimonials();
  };

  // Afficher les témoignages précédents
  const prevTestimonials = () => {
    currentIndex = (currentIndex - 1 + testimonialCount) % testimonialCount; // Passer au témoignage précédent
    showTestimonials();
  };

  // Ajouter les événements sur les boutons
  nextBtn.addEventListener("click", nextTestimonials);
  prevBtn.addEventListener("click", prevTestimonials);

  // Détecter les changements de taille de l'écran pour réajuster l'affichage
  window.addEventListener("resize", showTestimonials);

  // Défilement automatique toutes les 2 secondes (optionnel)
  setInterval(() => {
    nextTestimonials();
  }, 5000);

  // Afficher les témoignages initiaux
  showTestimonials();
});

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const btnNavigation = document.querySelector(".btn-navigation");
  const overlay = document.getElementById("overlay");

  // Ouvrir le sidebar
  menuToggle.addEventListener("click", () => {
    btnNavigation.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  // Fermer le sidebar en cliquant sur l'overlay
  overlay.addEventListener("click", () => {
    btnNavigation.classList.remove("active");
    overlay.classList.remove("active");
  });

  // Optionnel : Fermer le sidebar quand un lien est cliqué
  const navItems = document.querySelectorAll(".btn-navigation .nav-item a");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      btnNavigation.classList.remove("active");
      overlay.classList.remove("active");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".statistic-item h2");

  counters.forEach((counter) => {
    const target = +counter.textContent.replace("+", ""); // Récupérer la valeur cible
    counter.textContent = "0+"; // Initialiser à zéro

    const updateCounter = () => {
      const current = +counter.textContent.replace("+", ""); // Récupérer la valeur actuelle
      const remaining = target - current; // Calculer ce qui reste
      const increment = Math.ceil(remaining / 10000); // Réduire l'incrémentation à mesure qu'on approche

      if (current < target) {
        counter.textContent = `${current + increment}+`; // Mettre à jour le texte
        setTimeout(updateCounter, 50); // Reappel avec un délai constant
      } else {
        counter.textContent = `${target}+`; // Fixe le nombre final
      }
    };

    updateCounter();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Retirer la classe active des boutons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Obtenir la catégorie sélectionnée
      const category = button.textContent.toLowerCase();

      // Filtrer les projets
      projectCards.forEach((card) => {
        if (category === "all") {
          card.style.display = "block";
        } else if (card.classList.contains(category)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});
