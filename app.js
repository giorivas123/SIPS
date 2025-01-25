document.addEventListener("DOMContentLoaded", function () {
  console.log("App Loaded");

  const content = document.getElementById("content");
  const bottomNav = document.querySelector("footer");
  const app = document.getElementById("app");
  const termsModal = document.getElementById("termsModal");
  const acceptTermsBtn = document.getElementById("acceptTermsBtn");
  const blurBackground = document.getElementById("blurBackground");

  // Initially hide app content
  app.style.display = "none";

  // Check if terms have been accepted
  if (!localStorage.getItem("termsAccepted")) {
    console.log("Terms not accepted, showing modal.");
    termsModal.style.display = "flex"; // Show terms modal if not accepted
    blurBackground.style.display = "block"; // Show background blur
  } else {
    console.log("Terms accepted, showing content.");
    showAppContent(); // If terms are accepted, show the main app content
  }

  // Handle Terms and Conditions acceptance
  if (acceptTermsBtn) {
    acceptTermsBtn.addEventListener("click", function () {
      console.log("Terms accepted, storing in localStorage.");
      localStorage.setItem("termsAccepted", "true"); // Save terms acceptance
      termsModal.style.display = "none"; // Hide the modal
      blurBackground.style.display = "none"; // Hide the background blur
      navigate("login"); // Show the Login page after accepting terms
    });
  }

  // Show the App Content
  function showAppContent() {
    app.style.display = "block"; // Show the app content
    navigate("signup"); // Show the Sign Up page after terms are accepted
  }

  // Navigation function for Sign Up and Login pages
  function navigate(page) {
    console.log(`Navigating to ${page}...`);
    if (page === "signup") {
      content.innerHTML = `
        <h1>Sign Up</h1>
        <form id="signup-form">
          <input type="text" placeholder="Full Name" required>
          <input type="text" placeholder="Create Username" required>
          <input type="password" placeholder="New Password" required>
          <input type="password" placeholder="Confirm Password" required>
          <button type="submit">Create Account</button>
        </form>
      `;
      bottomNav.style.display = "none"; // Hide bottom nav on signup page
    } else if (page === "login") {
      content.innerHTML = `
        <h1>Login</h1>
        <form id="login-form">
          <input type="text" placeholder="Username" required>
          <input type="password" placeholder="Password" required>
          <button type="submit">Sign In</button>
        </form>
        <button id="toSignup">Go to Sign Up</button>
      `;
      bottomNav.style.display = "none"; // Hide bottom nav on login page
    }
  }

  // Handle form submissions (for Sign Up, Login)
  content.addEventListener("submit", (event) => {
    event.preventDefault();
    const formId = event.target.id;

    if (formId === "signup-form") {
      console.log("Sign up form submitted!");
      alert("Account created! Redirecting to login...");
      // After Sign Up, show the Terms and Conditions modal
      setTimeout(function () {
        termsModal.style.display = "flex"; // Show terms modal after sign up
        blurBackground.style.display = "block"; // Show background blur
      }, 1000); // Delay to simulate the transition
    } else if (formId === "login-form") {
      console.log("Login form submitted!");
      alert("Logged in successfully!");
      window.location.href = "home.html"; // Redirect to home page after login
    }
  });

  // Handle footer links for navigation to separate HTML pages
  document.querySelectorAll("footer a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetPage = event.target.closest("a").getAttribute("href"); // Get href attribute (e.g., home.html)
      window.location.href = targetPage; // Navigate to the respective page
    });
  });
});
