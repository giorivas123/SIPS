document.addEventListener("DOMContentLoaded", () => {
    const termsModal = document.getElementById("termsModal");
    const acceptBtn = document.getElementById("acceptBtn");
    const appContent = document.getElementById("app");
    const content = document.getElementById("content");
  
    const pages = {
      signup: `
        <h1>Sign Up</h1>
        <p>Enter your username and password to sign up.</p>
        <form id="signupForm">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required placeholder="Enter username">
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required placeholder="Enter password">
          <button type="submit">Sign Up</button>
        </form>
      `,
      login: "<h1>Login Page</h1><p>Please log in to your account.</p>",
      "forgot-password": `
        <h1>Forgot Password</h1>
        <p>Enter your email to receive a password reset link.</p>
        <button onclick="navigate('reset-link')">Send Reset Link</button>
      `,
      "reset-link": "<h1>Reset Link Page</h1><p>A link has been sent to your email!</p>",
      "home-search": "<h1>Home (Search)</h1><p>Search for something exciting!</p>",
      "home-for-you": "<h1>Home (For You)</h1><p>Personalized content just for you.</p>",
      settings: "<h1>Settings</h1><p>Configure your preferences here.</p>",
      favorites: "<h1>Favorites</h1><p>Your saved items are shown here.</p>",
      maps: "<h1>Maps</h1><p>Find locations nearby!</p>",
      "drink-diary": "<h1>Drink Diary</h1><p>Track your drinks here.</p>",
      "profile-user": "<h1>User Profile</h1><p>View and edit your profile information.</p>",
      "profile-business": "<h1>Business Profile</h1><p>Details about your business.</p>",
      insights: "<h1>Insights</h1><p>Business insights and analytics.</p>",
      edit: "<h1>Edit Page</h1><p>Make changes to your account or content.</p>",
    };
  
    function navigate(page) {
      if (pages[page]) {
        content.innerHTML = pages[page];
      } else {
        content.innerHTML = "<h1>404</h1><p>Page not found.</p>";
      }
    }
  
    // Show terms modal before content
    termsModal.style.display = "flex";
  
    acceptBtn.addEventListener("click", () => {
      // Hide the modal and show the sign-up form
      termsModal.style.display = "none";
      appContent.style.display = "block";
      navigate("signup"); // Load the sign-up page
    });
  
    // Handle sign-up form submission
    document.addEventListener("submit", function(event) {
      if (event.target.id === "signupForm") {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
  
        // Check if username and password match 'Test'
        if (username === "Test" && password === "Test") {
          navigate("home-search"); // Redirect to the main page after successful login
        } else {
          alert("Invalid username or password!");
        }
      }
    });
  
    document.querySelectorAll("nav a").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const page = event.target.getAttribute("href").substring(1);
        navigate(page);
      });
    });
  });
  
