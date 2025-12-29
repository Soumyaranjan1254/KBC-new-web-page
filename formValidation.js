// formValidation.js

const contactForm = document.getElementById("contactForm");
const nameInput   = document.getElementById("nameInput");
const emailInput  = document.getElementById("emailInput");
const msgInput    = document.getElementById("msgInput");

const nameError   = document.getElementById("nameError");
const emailError  = document.getElementById("emailError");
const msgError    = document.getElementById("msgError");
const successMsg  = document.getElementById("successMsg");
const submitBtn   = document.getElementById("submitBtn");
const msgCount    = document.getElementById("msgCount");

if (contactForm) {

  // Message textarea live counter
  msgInput.addEventListener("input", () => {
    const len = msgInput.value.length;
    if (msgCount) {
      msgCount.textContent = `${len} / 200 characters`;
    }
  });

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let hasError = false;

    // clear old messages
    nameError.textContent  = "";
    emailError.textContent = "";
    msgError.textContent   = "";
    successMsg.textContent = "";
    successMsg.classList.remove("show");

    nameInput.classList.remove("input-error", "input-ok");
    emailInput.classList.remove("input-error", "input-ok");
    msgInput.classList.remove("input-error", "input-ok");

    // Name validation
    const trimmedName = nameInput.value.trim();

    if (!trimmedName) {
      nameError.textContent = "Name required.";
      nameInput.classList.add("input-error");
      hasError = true;
    } else if (trimmedName.length < 3) {
      nameError.textContent = "Name at least 3 characters.";
      nameInput.classList.add("input-error");
      hasError = true;
    } else if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      nameError.textContent = "Only letters allowed in name.";
      nameInput.classList.add("input-error");
      hasError = true;
    } else {
      nameInput.classList.add("input-ok");
    }

    // Email validation
    const trimmedEmail = emailInput.value.trim();

    if (!trimmedEmail) {
      emailError.textContent = "Email required.";
      emailInput.classList.add("input-error");
      hasError = true;
    } else if (!trimmedEmail.includes("@")) {
      emailError.textContent = "Email @ required.";
      emailInput.classList.add("input-error");
      hasError = true;
    } else {
      emailInput.classList.add("input-ok");
    }

    // Message validation
    const trimmedMsg = msgInput.value.trim();
    const msgLength  = trimmedMsg.length;

    if (msgLength < 10) {
      msgError.textContent = "Message at least 10 characters.";
      msgInput.classList.add("input-error");
      hasError = true;
    } else if (msgLength > 200) {
      msgError.textContent = "Message max 200 characters.";
      msgInput.classList.add("input-error");
      hasError = true;
    } else {
      msgInput.classList.add("input-ok");
    }

    // If everything is OK
    if (!hasError) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      setTimeout(() => {
        successMsg.textContent = "Thank you! Your message has been sent.";
        successMsg.classList.add("show");
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit";

        setTimeout(() => {
          successMsg.classList.remove("show");
          successMsg.textContent = "";
        }, 4000);
      }, 800);
    }
  });
}
