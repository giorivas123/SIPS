document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const appContainer = document.getElementById("app");
  const footer = document.querySelector("footer");

  // Define pages
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
        <input type="text" id="login-username" placeholder="Username" required>
        <input type="password" id="login-password" placeholder="Password" required>
        <div>
          <input type="checkbox" id="remember-me">
          <label for="remember-me">Remember Me</label>
        </div>
        <a href="#forgot-password" class="forgot-password">Forgot Password?</a>
        <button type="submit">Sign In</button>
      </form>
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
      <p>Search for something exciting!</p>
    `,
    favorites: `
      <h1>Favorites</h1>
      <p>Your saved items are shown here.</p>
    `,
    maps: `
      <h1>Maps</h1>
      <p>Find locations nearby!</p>
    `,
    "drink-diary": `
      <h1>Drink Diary</h1>
      <p>Track your drinks here.</p>
    `,
    "profile-user": `
      <h1>Profile</h1>
      <p>View and edit your profile information.</p>
    `,
  };

  // Function to toggle footer visibility
  function toggleFooter(visible) {
    footer.style.display = visible ? "block" : "none";
  }

  // Navigate to a page
  function navigate(page) {
    if (pages[page]) {
      content.innerHTML = pages[page];

      // Toggle footer visibility based on the page
      if (["signup", "login", "forgot-password"].includes(page)) {
        toggleFooter(false);
      } else {
        toggleFooter(true);
      }

      // Additional logic for signup and login pages
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

  // Accept button for terms and conditions
  document.getElementById("acceptBtn").addEventListener("click", () => {
    document.getElementById("termsModal").style.display = "none";
    appContainer.style.display = "block";
    navigate("signup");
  });

  // Form submission logic
  content.addEventListener("submit", (event) => {
    event.preventDefault();
    const formId = event.target.id;

    if (formId === "signup-form") {
      alert("Account created! Redirecting to login...");
      navigate("login");
    } else if (formId === "login-form") {
      const username = document.getElementById("login-username").value;
      const password = document.getElementById("login-password").value;

      // Check login credentials
      if (username === "Test" && password === "Test") {
        alert("Logged in successfully!");
        navigate("home-search");
      } else {
        alert("Invalid username or password. Try again.");
      }
    } else if (formId === "forgot-password-form") {
      alert("Password reset link sent to your email.");
      navigate("login");
    }
  });

  // Initial page setup
  navigate("signup");
});


  
