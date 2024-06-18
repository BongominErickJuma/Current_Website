function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

const continueBtn = $("#organizationProceedBtn");
const orgSubmitBtn = $("#organizationSubmitButton");
const orgInputError = $(".errorInOrgForm");
const organizationOtpBtn = $("#organizationOtpBtn");
const contactPerson = $(".contact-person");
const organizationProfile = $(".organization-profile");
const downKey = $(".back-to-business-profile");

continueBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const form = $("#organizationForm");
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  const errorInOrgForm = $(".errorInOrgForm");

  const selectedData = selectFields(data, [
    "name",
    "email",
    "username",
    "phone",
  ]);

  if (!allFields(selectedData)) {
    errorInOrgForm.textContent = "All fields are required";
    errorInOrgForm.classList.remove("d-none");
    setTimeout(() => {
      errorInOrgForm.textContent = "";
      errorInOrgForm.classList.add("d-none");
    }, 1500);
    return;
  }
  if (!validateEmail(selectedData.email)) {
    errorInOrgForm.textContent = "Invalid Email";
    errorInOrgForm.classList.remove("d-none");
    setTimeout(() => {
      errorInOrgForm.textContent = "";
      errorInOrgForm.classList.add("d-none");
    }, 1500);
    return;
  }

  continueBtn.textContent = "Please Wait...";

  const orgOtpSection = $("#orgOtpSection");
  setTimeout(() => {
    orgOtpSection.classList.remove("d-none");
    organizationOtpBtn.classList.remove("d-none");
    continueBtn.classList.add("d-none");
    contactPerson.classList.add("freeze");
    continueBtn.textContent = "Continue >>>";
  }, 1500);
});

organizationOtpBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const form = $("#organizationForm");
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  const errorInOrgForm = $(".errorInOrgForm");
  let serverOtp = 1234;
  let clientOtp = parseInt(data.otp);

  if (clientOtp !== serverOtp) {
    errorInOrgForm.textContent = "Wrong OTP, Try Again";
    errorInOrgForm.classList.remove("d-none");
    setTimeout(() => {
      errorInOrgForm.textContent = "";

      errorInOrgForm.classList.add("d-none");
    }, 1500);
    return;
  }

  const orgOtpSection = $("#orgOtpSection");

  organizationOtpBtn.textContent = "Please Wait...";
  setTimeout(() => {
    downKey.classList.remove("d-none");
    orgOtpSection.classList.add("d-none");
    organizationOtpBtn.classList.add("d-none");
    contactPerson.classList.add("d-none");
    contactPerson.classList.remove("freeze");
    orgSubmitBtn.classList.remove("d-none");
    organizationProfile.classList.remove("d-none");
    organizationOtpBtn.textContent = "Continue >>>";
  }, 1500);
});

// submit form
const form = $("#organizationForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  const errorInOrgForm = $(".errorInOrgForm");

  const selectedData = selectFields(data, [
    "organizationPassword",
    "confirmOrgPassword",
  ]);

  if (selectedData.organizationPassword !== selectedData.confirmOrgPassword) {
    errorInOrgForm.textContent = "Password did not match";
    errorInOrgForm.classList.remove("d-none");
    setTimeout(() => {
      errorInOrgForm.textContent = "";
      errorInOrgForm.classList.add("d-none");
    }, 1500);
    return;
  }

  if (selectedData.organizationPassword.length < 5) {
    errorInOrgForm.textContent = "Password must be at least five(5) characters";
    errorInOrgForm.classList.remove("d-none");
    setTimeout(() => {
      errorInOrgForm.textContent = "";
      errorInOrgForm.classList.add("d-none");
    }, 1500);
    return;
  }

  const orgSubmitBtn = $("#organizationSubmitButton");

  orgSubmitBtn.textContent = "please wait ...";

  setTimeout(() => {
    window.location.href = `./sphere_signin.html`;
    orgSubmitBtn.textContent = "Continue >>>";
  }, 1500);
});

const upKey = $(".back-to-contact-person");

upKey.addEventListener("click", function (event) {
  event.preventDefault();
  hideAll();
  contactPerson.classList.remove("d-none");
  $(".contact-person-form").classList.add("freeze");
});

downKey.addEventListener("click", function (event) {
  event.preventDefault();
  hideAll();
  orgSubmitBtn.classList.remove("d-none");
  organizationProfile.classList.remove("d-none");
});

function hideAll() {
  contactPerson.classList.add("d-none");
  continueBtn.classList.add("d-none");
  orgOtpSection.classList.add("d-none");
  organizationOtpBtn.classList.add("d-none");
  orgSubmitBtn.classList.add("d-none");
  organizationProfile.classList.add("d-none");
}

function selectFields(obj, fields) {
  return fields.reduce((accumulator, field) => {
    if (obj.hasOwnProperty(field)) {
      accumulator[field] = obj[field];
    }
    return accumulator;
  }, {});
}

// check if all form fields are filled
function allFields(formData) {
  for (let key in formData) {
    if (formData[key].trim() === "") {
      return false;
    }
  }
  return true;
}

// verify the email input
function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}
