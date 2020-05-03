import MultiStepForm from "./msf";

export const elements = {
  form: document.getElementById("tailored-menu"),
  next: document.getElementById("tm-next"),
  add: document.getElementById("tm-add"),
  alert: document.getElementById("tm-alert"),
  pastriesContainer: document.getElementById("pastries-container"),
  confirmContainer: document.getElementById("confirm-container"),
  confirmBlocksClass: ".tm-confirm_pastries",
  nextText: "Next",
  submitText: "Submit",
  warningClass: "warning",
};

export const pastryOptions = [];

export const getPastryOptions = () => {
  const optionsCollection = document.querySelectorAll(".tm-options");

  optionsCollection.forEach((option) => {
    const data = {
      category: option.querySelector(".tm-options_category").textContent,
      flavors: option
        .querySelector(".tm-options_flavors")
        .textContent.split(", "),
      sizes: option.querySelector(".tm-options_sizes").textContent.split(", "),
      label: option.querySelector(".tm-options_label").textContent,
    };

    pastryOptions.push(data);
  });
};

export const msf = new MultiStepForm(elements);
