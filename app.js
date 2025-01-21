document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");

  // Pages
  const pages = {
    signup: `
      <h1>Sign Up</h1>
      <form id="signup-form">
        <input type="text" placeholder="Full Name" required>
        <input type="text" placeholder="Create Username" required>
        <input type="password" placeholder="New Password" required>
        <input type="password" placeholder="Confirm Password" required>
        <button type="submit">Create Account</button>
        <button id="toLogin">Login</button>
      </form>
    `,
    login: `
      <h1>Login</h1>
      <form id="login-form">
        <input type="text" placeholder="Username" required>
        <input type="password" placeholder="Password" required>
        <div class="toggle-container">
          <input type="checkbox" id="remember-me">
          <label for="remember-me">Remember Me</label>
        </div>
        <a href="#forgot-password" class="forgot-password">Forgot Password?</a>
        <button type="submit">Sign In</button>
      </form>
      <div class="social-buttons">
        <button>Sign in with Apple</button>
        <button>Sign in with Google</button>
        <button>Sign in with Facebook</button>
      </div>
    `,
    "forgot-password": `
      <h1>Forgot Password</h1>
      <p>Enter your email to receive a password reset link.</p>
      <form id="forgot-password-form">
        <input type="email" placeholder="Email" required>
        <button type="submit">Send Reset Link</button>
      </form>
    `,
    "home-search": `
      <h1>Home</h1>
      <p>Search for exciting things here!</p>
    `,
    favorites: `
      <h1>Favorites</h1>
      <p>Your saved items are here.</p>
    `,
    maps: `
      <h1>Maps</h1>
      <p>Find locations nearby.</p>
    `,
    "drink-diary": `
      <h1>Drink Diary</h1>
      <p>Track your drinks.</p>
    `,
    "profile-user": `
      <h1>Profile</h1>
      <p>View and edit your profile.</p>
    `,
  };

  // Navigation Logic
  function navigate(page) {
    if (pages[page]) {
      content.innerHTML = pages[page];

      // Additional logic for buttons
      if (page === "signup") {
        document.getElementById("toLogin").addEventListener("click", (e) => {
          e.preventDefault();
          navigate("login");
        });
      }
    } else {
      content.innerHTML = "<h1>404</h1><p>Page not found.</p>";
    }
  }

  // Handle navigation links
  document.querySelectorAll("footer a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const page = event.target.getAttribute("href").substring(1);
      navigate(page);
    });
  });

  // Accept button for terms and conditions
  document.getElementById("acceptBtn").addEventListener("click", () => {
    document.getElementById("termsModal").style.display = "none";
    document.getElementById("app").style.display = "block";
    navigate("signup");
  });

  // Handle form submissions
  content.addEventListener("submit", (event) => {
    event.preventDefault();
    const formId = event.target.id;
    if (formId === "signup-form") {
      alert("Account created! Redirecting to login...");
      navigate("login");
    } else if (formId === "login-form") {
      alert("Logged in successfully!");
      navigate("home-search");
    } else if (formId === "forgot-password-form") {
      alert("Password reset link sent to your email.");
      navigate("login");
    }
  });

  // Initial page setup
  navigate("signup");
});


  

  
