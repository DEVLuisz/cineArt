function togglePasswordVisibility() {
  const passwordInput = document.getElementById("password");
  const openEyeIcon = document.querySelector(".open-eye");
  const closedEyeIcon = document.querySelector(".closed-eye");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    openEyeIcon.style.display = "none";
    closedEyeIcon.style.display = "block";
  } else {
    passwordInput.type = "password";
    openEyeIcon.style.display = "block";
    closedEyeIcon.style.display = "none";
  }
}