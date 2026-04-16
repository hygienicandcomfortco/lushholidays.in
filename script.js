const packageData = [
  {
    title: "Thailand Calling",
    duration: "06 Nights",
    includes: "Flights + 4* stay + Tours",
    price: "INR 63,000 / person",
    tag: "Popular",
  },
  {
    title: "Kashmir Retreat",
    duration: "05 Nights",
    includes: "Houseboat + Transfers + Sightseeing",
    price: "INR 38,500 / person",
    tag: "Best Seller",
  },
  {
    title: "Dubai Luxe Escape",
    duration: "04 Nights",
    includes: "Flights + Downtown hotel + Desert safari",
    price: "INR 57,000 / person",
    tag: "Limited Offer",
  },
];

const tabs = document.querySelectorAll(".tab-btn");
const panels = document.querySelectorAll(".tab-panel");
const cardsHost = document.getElementById("package-cards");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const leadForm = document.querySelector(".lead-form");
const footerYear = document.getElementById("year");
const requestForms = document.querySelectorAll(".request-form");

if (tabs.length && panels.length) {
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;
      const targetPanel = document.getElementById(target);

      tabs.forEach((btn) => btn.classList.remove("active"));
      panels.forEach((panel) => panel.classList.remove("active"));

      tab.classList.add("active");
      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    });
  });
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

if (cardsHost) {
  packageData.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="card-top">
        <span class="pill">${item.tag}</span>
        <strong>${item.duration}</strong>
      </div>
      <h3>${item.title}</h3>
      <p>${item.includes}</p>
      <p class="price">${item.price}</p>
      <a href="contact.html" class="btn btn-outline">Request Itinerary</a>
    `;
    cardsHost.appendChild(card);
  });
}

if (leadForm) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitBtn = leadForm.querySelector("button");
    submitBtn.textContent = "Request Sent";
    submitBtn.disabled = true;
    setTimeout(() => {
      submitBtn.textContent = "Get Free Consultation";
      submitBtn.disabled = false;
      leadForm.reset();
    }, 1800);
  });
}

if (requestForms.length) {
  requestForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const requestType = form.dataset.requestType || "Travel";
      const requestId = `LH-${Date.now().toString().slice(-6)}`;
      const formData = Object.fromEntries(new FormData(form).entries());
      const feedback = form.querySelector(".form-feedback");
      const submitBtn = form.querySelector("button[type='submit']");

      const requestPayload = {
        requestId,
        requestType,
        submittedAt: new Date().toISOString(),
        details: formData,
      };

      try {
        const existingRequests = JSON.parse(localStorage.getItem("lushRequests") || "[]");
        existingRequests.push(requestPayload);
        localStorage.setItem("lushRequests", JSON.stringify(existingRequests));
      } catch (error) {
        // Keep silent fallback for browsers blocking storage.
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Request Sent";
      }

      if (feedback) {
        feedback.textContent = `Request submitted successfully. Your request ID is ${requestId}.`;
      }

      setTimeout(() => {
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = `Send ${requestType} Request`;
        }
      }, 2200);
    });
  });
}

if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}
