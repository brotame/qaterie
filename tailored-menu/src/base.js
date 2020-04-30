import MultiStepForm from "./msf";

export const elements = {
  form: document.getElementById("tailored-menu"),
  next: document.getElementById("tm-next"),
  add: document.getElementById("tm-add"),
  alert: document.getElementById("tm-alert"),
  pastriesContainer: document.getElementById("pastries-container"),
  nextText: "Next",
  submitText: "Submit",
  warningClass: "warning",
};

export const optionsList = {
  category: [],
  flavor: [],
};

export const msf = new MultiStepForm(elements);
