document.addEventListener("DOMContentLoaded", function () {
  console.log("App Loaded");

  const content = document.getElementById("content");
  const bottomNav = document.querySelector("footer");
  const app = document.getElementById("app");
  const termsModal = document.getElementById("termsModal");
  const acceptTermsBtn = document.getElementById("acceptTermsBtn");
  const blurBackground = document.getElementById("blurBackground");

  app.style.display = "none";

  //  Show Terms & Conditions Modal Before Signup
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
      console.log(" Terms accepted, storing in localStorage.");
      localStorage.setItem("termsAccepted", "true");
      termsModal.style.display = "none";
      blurBackground.style.display = "none";
      showAppContent(); //  Show Signup Page
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
          <input type="text" id="full-name" class="input-field" placeholder="Full Name" required>
          <input type="text" id="username" class="input-field" placeholder="Create Username" required>
          <input type="password" id="password" class="input-field" placeholder="New Password" required>
          <input type="password" id="confirm-password" class="input-field" placeholder="Confirm Password" required>
          <button type="submit" class="primary-btn">Create Account</button>
        </form>

        <p class='signup-text' style="text-align: center; margin-top: 10px;">
          Already have an account? <a href="#" id="toLogin" class="signup-link">Sign in</a>
        </p>
      `;
      bottomNav.style.display = "none";
    } else if (page === "login") {
      content.innerHTML = `
        ${logoHTML}
        <h1>Login</h1>
        <form id="login-form" class="auth-form">
          <input type="text" id="login-username" class="input-field" placeholder="Username" required>
          <input type="password" id="login-password" class="input-field" placeholder="Password" required>
          <button type="submit" class="primary-btn">Sign In</button>
        </form>

        <p class='signup-text' style="text-align: center; margin-top: 10px;">
          New User? <a href="#" id="toSignup" class="signup-link">Create an account</a>
        </p>
      `;
      bottomNav.style.display = "none";
    }
  }

  //  Handle Sign Up & Login
  content.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formId = event.target.id;

    if (formId === "signup-form") {
      console.log("Sign up form submitted!");
      const fullName = document.getElementById("full-name").value;
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        const response = await fetch("https://sips-rh1i.onrender.com/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, fullName, password }),
        });

        const data = await response.json();
        if (response.ok) {
          alert("Account created! Redirecting to login...");
          navigate("login");
        } else {
          alert(`Signup failed: ${data.error}`);
        }
      } catch (error) {
        console.error("Signup Error:", error);
        alert("Something went wrong. Check console logs.");
      }
    } else if (formId === "login-form") {
      console.log("Login form submitted!");
      const username = document.getElementById("login-username").value;
      const password = document.getElementById("login-password").value;

      try {
        const response = await fetch("https://sips-rh1i.onrender.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("token", data.token);
          alert("Logged in successfully!");
          window.location.href = "home.html"; // Redirect after login
        } else {
          alert(`Login failed: ${data.error}`);
        }
      } catch (error) {
        console.error("Login Error:", error);
        alert("Something went wrong. Check console logs.");
      }
    }
  });

  content.addEventListener("click", (event) => {
    if (event.target.id === "toSignup") {
      navigate("signup");
    } else if (event.target.id === "toLogin") {
      navigate("login");
    }
  });

  window.socialLogin = function (platform) {
    alert(`${platform} Login Successful!`);
    window.location.href = "home.html";
  };
});
