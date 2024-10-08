// Hamburger Menu
document.addEventListener("DOMContentLoaded", (event) => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Contact Validation
  const contactForm = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");

  // Real time validation
  if (contactForm) {
    nameInput.addEventListener("input", () => {
      if (nameInput.value.trim() === "") {
        nameError.textContent = "Please enter your name.";
        nameInput.setAttribute("aria-invalid", "true");
        nameError.style.display = "block";
      } else {
        nameError.style.display = "none";
        nameInput.setAttribute("aria-invalid", "false");
      }
    });

    emailInput.addEventListener("input", () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value)) {
        emailError.textContent = "Please enter a valid email address.";
        emailInput.setAttribute("aria-invalid", "true");
        emailError.style.display = "block";
      } else {
        emailError.style.display = "none";
        emailInput.setAttribute("aria-invalid", "false");
      }
    });

    messageInput.addEventListener("input", () => {
      if (messageInput.value.trim() === "") {
        messageError.textContent = "Please enter your message.";
        messageInput.setAttribute("aria-invalid", "true");
        messageError.style.display = "block";
      } else {
        messageError.style.display = "none";
        messageInput.setAttribute("aria-invalid", "false");
      }
    });

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      alert("Form submitted successfully!");
      contactForm.reset();
    });
  }

  // Drink builder
  const drinkTypeSelect = document.getElementById("drink-type");
  const sizeSelect = document.getElementById("size");
  const milkSelect = document.getElementById("milk");
  const syrupSelect = document.getElementById("syrup");
  const fatsSpan = document.getElementById("fats");
  const carbsSpan = document.getElementById("carbs");
  const proteinSpan = document.getElementById("protein");
  const calculateButton = document.getElementById("calculate-button");

  const drinkMacros = {
    latte: { fats: 5, carbs: 15, protein: 8 },
    americano: { fats: 0, carbs: 0, protein: 1 },
    "cold-brew": { fats: 0, carbs: 0, protein: 1 },
    "iced-coffee": { fats: 0, carbs: 0, protein: 1 },
    cappuccino: { fats: 4, carbs: 10, protein: 7 },
  };

  const sizeMultiplier = {
    small: 1,
    medium: 1.33,
    large: 1.67,
  };

  const milkMacros = {
    none: { fats: 0, carbs: 0, protein: 0 },
    "2%": { fats: 5, carbs: 12, protein: 8 },
    nonfat: { fats: 0, carbs: 12, protein: 8 },
    whole: { fats: 8, carbs: 12, protein: 8 },
    oat: { fats: 5, carbs: 16, protein: 1 },
    almond: { fats: 2.5, carbs: 1, protein: 1 },
    coconut: { fats: 5, carbs: 7, protein: 0 },
    soy: { fats: 4, carbs: 7, protein: 8 },
  };

  const syrupMacros = {
    none: { fats: 0, carbs: 0, protein: 0 },
    vanilla: { fats: 0, carbs: 20, protein: 0 },
    caramel: { fats: 0, carbs: 20, protein: 0 },
    mocha: { fats: 1, carbs: 25, protein: 1 },
    "cinnamon-dolce": { fats: 0, carbs: 20, protein: 0 },
    hazelnut: { fats: 0, carbs: 20, protein: 0 },
    "toffee-nut": { fats: 0, carbs: 20, protein: 0 },
    "sugar-free-vanilla": { fats: 0, carbs: 0, protein: 0 },
  };

  function calculateMacros() {
    const drink = drinkTypeSelect.value;
    const size = sizeSelect.value;
    const milk = milkSelect.value;
    const syrup = syrupSelect.value;

    // Error handling for drink type
    if (!drinkMacros[drink]) {
      console.error(`Error: Drink type "${drink}" not found.`);
      return;
    }

    // Error handling for size
    if (!sizeMultiplier[size]) {
      console.error(`Error: Size "${size}" not found.`);
      return;
    }

    // Error handling for milk type
    if (!milkMacros[milk]) {
      console.error(`Error: Milk type "${milk}" not found.`);
      return;
    }

    // Error handling for syrup type
    if (!syrupMacros[syrup]) {
      console.error(`Error: Syrup type "${syrup}" not found.`);
      return;
    }

    let fats =
      drinkMacros[drink].fats + milkMacros[milk].fats + syrupMacros[syrup].fats;
    let carbs =
      drinkMacros[drink].carbs +
      milkMacros[milk].carbs +
      syrupMacros[syrup].carbs;
    let protein =
      drinkMacros[drink].protein +
      milkMacros[milk].protein +
      syrupMacros[syrup].protein;

    const multiplier = sizeMultiplier[size];
    fats *= multiplier;
    carbs *= multiplier;
    protein *= multiplier;

    fatsSpan.textContent = fats.toFixed(1);
    carbsSpan.textContent = carbs.toFixed(1);
    proteinSpan.textContent = protein.toFixed(1);
  }

  if (
    drinkTypeSelect &&
    sizeSelect &&
    milkSelect &&
    syrupSelect &&
    calculateButton
  ) {
    // Event listeners for dynamic updates
    drinkTypeSelect.addEventListener("change", calculateMacros);
    sizeSelect.addEventListener("change", calculateMacros);
    milkSelect.addEventListener("change", calculateMacros);
    syrupSelect.addEventListener("change", calculateMacros);
    calculateButton.addEventListener("click", calculateMacros);
  }
});
