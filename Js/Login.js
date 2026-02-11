
document.addEventListener("DOMContentLoaded", () => {
  const emailEl = document.getElementById("email");
  const passEl = document.getElementById("password");
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");
  const msgEl = document.getElementById("msg");

  function show(msg){ msgEl.textContent = msg; }

  loginBtn.addEventListener("click", () => {
    const email = emailEl.value.trim();
    const pass = passEl.value.trim();
    if(!email || !pass){ show("Please enter email and password."); return; }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(u => u.email === email && u.pass === pass);

    if(found){
      localStorage.setItem("loggedUser", email);
      show("Login successful! Redirecting...");
      setTimeout(() => { location.href = "index.html"; }, 800);
    } else {
      show("Incorrect email or password.");
    }
  });
  
    const emailInput = document.getElementById("email");
    const passInput = document.getElementById("password");

    emailInput.addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
        passInput.focus();
      }
    });

    passInput.addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
        login();
      }
    });


  registerBtn.addEventListener("click", () => {
    const email = emailEl.value.trim();
    const pass = passEl.value.trim();
    if(!email || !pass){ show("All fields required."); return; }

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    if(users.some(u => u.email === email)){ show("User already exists."); return; }

    users.push({ email, pass });
    localStorage.setItem("users", JSON.stringify(users));
    show("Registration successful. You can login now.");
  });
});

