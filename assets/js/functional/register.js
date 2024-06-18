const proceedBtn = document.getElementById("proceedBtn");
const submitBtn = document.getElementById("submitButton");
const errorInForm = document.querySelector(".errorInForm");

proceedBtn.addEventListener("click", function () {
  let form = document.getElementById("signupForm");
  let data = new FormData(form);
  const formData = Object.fromEntries(data);
  delete formData.otp;

  if (!areAllFieldsFilled(formData)) {
    errorInForm.classList.remove("d-none");
    errorInForm.textContent = "All fields are required";
    setTimeout(() => {
      errorInForm.classList.add("d-none");
      errorInForm.textContent = "";
    }, 5000);
    return;
  }

  let emailField = document.querySelector('input[name="email"]');

  if (!validateEmail(emailField.value)) {
    errorInForm.classList.remove("d-none");
    errorInForm.textContent = "Invalid Email";
    setTimeout(() => {
      errorInForm.classList.add("d-none");
      errorInForm.textContent = "";
    }, 5000);

    return;
  }

  if (formData["password"].length < 5) {
    errorInForm.classList.remove("d-none");
    errorInForm.textContent =
      "Password must contain at least five(5) characters";
    setTimeout(() => {
      errorInForm.classList.add("d-none");
      errorInForm.textContent = "";
    }, 5000);
    return;
  }

  if (formData["password"] !== formData["confirmPassword"]) {
    errorInForm.classList.remove("d-none");
    errorInForm.textContent = "Password didn't Match";
    setTimeout(() => {
      errorInForm.classList.add("d-none");
      errorInForm.textContent = "";
    }, 5000);
    return;
  }

  // Hide the submit button and show loader
  document.getElementById("submitButton").classList.add("d-none");
  document.getElementById("loaderSection").classList.remove("d-none");

  // Perform the first step of form submission

  fetch(
    "https://api.cognospheredynamics.com/api/auth/sendMailForVerification",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      // Handle response
      if (data.success) {
        // Show OTP section
        document.getElementById("otpSection").classList.remove("d-none");
        document.getElementById("submitButton").classList.remove("d-none");
        document.getElementById("proceedBtn").classList.add("d-none");
        document.getElementById("loaderSection").classList.add("d-none");
      } else {
        document.querySelector(".loader").innerHTML = data.errors.email[0];
        console.log(document.querySelector(".loader").innerHTML);

        document.querySelector(".loader").style.color = "red";
        setTimeout(() => {
          document.querySelector(".loader").style.color = "#303030";
          document.querySelector(".loader").innerHTML = `
                  <div class="w-25 text-center mx-auto">
                    <div class="loader">
                      verifying...
                      <span
                        class="spinner-border spinner-border-sm ms-2"
                        style="color: #388da8"
                        aria-hidden="true"
                      ></span>
                    </div>
                  </div>`;
          document.getElementById("loaderSection").classList.add("d-none");
        }, 5000);
        emailField.value = "";
      }
      // Hide loader and show submit button
    })
    .catch((error) => {
      console.log(error);
      // // Hide loader and show submit button
      document.getElementById("loaderSection").classList.add("d-none");
      // document.getElementById("submitButton").classList.remove("d-none");
    });
});

// Add an event listener to handle OTP submission
submitBtn.addEventListener("click", function () {
  // Function to check if all fields are filled

  var otp = document.getElementById("otp").value;
  let form = document.getElementById("signupForm");
  let data = new FormData(form);
  const formData = Object.fromEntries(data);
  formData.velification_code = otp;

  // Perform OTP verification
  fetch("https://api.cognospheredynamics.com/api/auth/verifyingCode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle response
      if (data.success) {
        window.location.href = `./sphere_signin.html`;
        // Redirect or perform further actions
      } else {
        document.querySelector(".title-otp").textContent =
          "Wrong OTP try again";
        document.querySelector(".title-otp").style.color = "red";
        setTimeout(() => {
          document.querySelector(".title-otp").textContent =
            "Enter OTP sent to your Email";
          document.querySelector(".title-otp").style.color = "#303030";
        }, 5000);
        // alert("Wrong OTP try again");
      }
    })
    .catch((error) => {
      alert("Error: ", error);
    });
});

// functions

// check if email is right

function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}

// check if all fields are filled

function areAllFieldsFilled(formData) {
  for (let key in formData) {
    if (formData[key].trim() === "") {
      return false;
    }
  }
  return true;
}
