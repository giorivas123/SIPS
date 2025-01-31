document.addEventListener("DOMContentLoaded", function () {
  console.log("App Loaded");

  const content = document.getElementById("content");
  const bottomNav = document.querySelector("footer");
  const app = document.getElementById("app");
  const termsModal = document.getElementById("termsModal");
  const acceptTermsBtn = document.getElementById("acceptTermsBtn");
  const blurBackground = document.getElementById("blurBackground");

  app.style.display = "none";

  if (!localStorage.getItem("termsAccepted")) {
    console.log("Terms not accepted, showing modal.");
    termsModal.style.display = "flex";
    blurBackground.style.display = "block";
  } else {
    console.log("Terms accepted, showing content.");
    showAppContent();
  }

  if (acceptTermsBtn) {
    acceptTermsBtn.addEventListener("click", function () {
      console.log("Terms accepted, storing in localStorage.");
      localStorage.setItem("termsAccepted", "true");
      termsModal.style.display = "none";
      blurBackground.style.display = "none";
      navigate("login");
    });
  }

  function showAppContent() {
    app.style.display = "block";
    navigate("signup");
  }

  function navigate(page) {
    console.log(`Navigating to ${page}...`);
    const logoHTML = `<img src="images/sips-logo.png" alt="App Logo" style="display: block; margin: 0 auto; max-width: 150px; width: 100%; height: auto; margin-bottom: 20px;">`;
    if (page === "signup") {
      content.innerHTML = `
        ${logoHTML}
        <h1>Sign Up</h1>
        <form id="signup-form" class="auth-form">
          <input type="text" class="input-field" placeholder="Full Name" required>
          <input type="text" class="input-field" placeholder="Create Username" required>
          <input type="password" class="input-field" placeholder="New Password" required>
          <input type="password" class="input-field" placeholder="Confirm Password" required>
          <button type="submit" class="primary-btn">Create Account</button>
        </form>
        <div class='social-login'>
          <p style="text-align: center;">Sign in with</p> <!-- Center-align the "Sign in with" text -->
          <div class='social-icons' style='display: flex; justify-content: center; gap: 20px;'>
            <img src='images/apple-icon.png' class='social-icon same-size' alt='Apple Login' style='width: 35px; height: 35px;' onclick="socialLogin('Apple')">
            <img src='images/google-icon.png' class='social-icon same-size' alt='Google Login' style='width: 35px; height: 35px;' onclick="socialLogin('Google')">
            <img src='images/facebook-icon.png' class='social-icon same-size' alt='Facebook Login' style='width: 35px; height: 35px;' onclick="socialLogin('Facebook')">
          </div>
        </div>
      `;
      bottomNav.style.display = "none";
    } else if (page === "login") {
      content.innerHTML = `
        ${logoHTML}
        <h1>Login</h1>
        <form id="login-form" class="auth-form">
          <input type="text" class="input-field" placeholder="Username" required>
          <input type="password" class="input-field" placeholder="Password" required>
          <div class="options" style="display: flex; flex-direction: column; gap: 10px;">
            <label><input type="checkbox"> Remember me</label>
            <button type="submit" class="primary-btn">Sign In</button>
            <a href="#" class="forgot-password" style="margin-top: 10px;">Forgot Password?</a> <!-- Forgot password placed below Sign In button -->
          </div>
        </form>
        
        <!-- Move New User and Create Account Link Above -->
        <p class='signup-text' style="text-align: center;">New User? <a href="#" id='toSignup' class='signup-link'>Create an account</a></p>
        
        <div class='social-login'>
          <p style="text-align: center;">Sign in with</p> <!-- Center-align the "Sign in with" text -->
          <div class='social-icons' style='display: flex; justify-content: center; gap: 20px;'>
            <img src='images/apple-icon.png' class='social-icon same-size' alt='Apple Login' style='width: 35px; height: 35px;' onclick="socialLogin('Apple')">
            <img src='images/google-icon.png' class='social-icon same-size' alt='Google Login' style='width: 35px; height: 35px;' onclick="socialLogin('Google')">
            <img src='images/facebook-icon.png' class='social-icon same-size' alt='Facebook Login' style='width: 35px; height: 35px;' onclick="socialLogin('Facebook')">
          </div>
        </div>
      `;
      bottomNav.style.display = "none";
    }
  }

  content.addEventListener("submit", (event) => {
    event.preventDefault();
    const formId = event.target.id;
    if (formId === "signup-form") {
      console.log("Sign up form submitted!");
      alert("Account created! Redirecting to login...");
      setTimeout(() => {
        termsModal.style.display = "flex";
        blurBackground.style.display = "block";
      }, 1000);
    } else if (formId === "login-form") {
      console.log("Login form submitted!");
      alert("Logged in successfully!");
      window.location.href = "home.html";
    }
  });

  content.addEventListener("click", (event) => {
    if (event.target.id === "toSignup") {
      navigate("signup");
    }
  });

  window.socialLogin = function (platform) {
    alert(`${platform} Login Successful!`);
    window.location.href = "home.html";
  };
});
document.getElementById('trash-btn').addEventListener('click', function () {
  // Select all checked favorite items
  const selectedItems = document.querySelectorAll('.select-favorite:checked');
  selectedItems.forEach(item => {
    item.closest('.favorite-item').remove(); // Remove the entire item
  });
});
let index = 0;
const timeline = document.querySelector(".timeline-content");
const totalItems = document.querySelectorAll(".timeline-box").length;

// Moves the timeline manually
function moveTimeline(direction) {
  index += direction;
  if (index < 0) index = totalItems - 1;
  if (index >= totalItems) index = 0;
  timeline.style.transition = "transform 0.8s ease-in-out";
  timeline.style.transform = `translateX(${-index * 160}px)`;
}

// Stops animation when hovered
timeline.addEventListener("mouseenter", () => {
  timeline.style.animationPlayState = "paused";
});

// Resumes animation when mouse leaves
timeline.addEventListener("mouseleave", () => {
  timeline.style.animationPlayState = "running";
});

