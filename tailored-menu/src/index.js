/**
 * Multi Step Form functionality for Qaterie
 */

import MSF from "./MSF";
import Pastry from "./Pastry";

let tmData = new MSF({
  formID: "tailored-menu",
  nextID: "tm-next",
  addID: "tm-add",
  nextText: "Next",
  submitText: "Submit",
  alertText: "Please, fill all the required fields.",
  warningClass: "warning",
});
msfController.init(tmData);

let msfController = {
  init: (msf) => {
    const start = () => {
      console.log(msf);
      setEventListeners();
      msf.setMaskHeight();
    };

    let setEventListeners = () => {
      msf.next.addEventListener("click", nextClick);
      msf.add.addEventListener("click", addPastry);
      if (msf.formNav) {
        msf.formNav.forEach((nav) => {
          nav.addEventListener("click", navClick);
        });
      }
    };

    const nextClick = () => {
      const filledFields = checkRequiredInputs(msf.currentStep);

      if (filledFields) {
        msf.setConfirmValues(msf.currentStep);
        msf.currentStep++;
        if (msf.currentStep === msf.steps.length) {
          msf.submitForm();
          msf.hideButtons();
          msf.hideAlert();
        } else {
          msf.goNext();
          msf.setMaskHeight();
          msf.setNextButtonText();
          msf.hideAlert();
        }
      } else {
        msf.showAlert();
      }
    };

    let addPastry = () => {};

    let navClick = (e) => {
      const step = e.currentTarget.dataset.msfNav - 1;
      msf.goNav(step);
    };

    const checkRequiredInputs = (index) => {
      const inputs = msf.getInputs(index);
      const requiredInputs = inputs.filter((input) => input.required);
      const requiredCheckboxes = requiredInputs.filter(
        (input) => input.type === "checkbox"
      );
      const requiredRadios = requiredInputs.filter(
        (input) => input.type === "radio"
      );
      let filledInputs = 0;

      requiredInputs.forEach((input) => {
        if (input.value && input.type !== "email") {
          msf.removeWarningClass(input);
          filledInputs++;
        } else if (input.value && input.type === "email") {
          const correctEmail = validateEmail(input.value);
          if (correctEmail) {
            msf.removeWarningClass(input);
            filledInputs++;
          } else {
            msf.addWarningClass(input);
          }
        } else {
          msf.addWarningClass(input);
        }
      });

      requiredCheckboxes.forEach((input) => {
        const checkbox = input.parentNode.querySelector(".w-checkbox-input");

        if (input.checked) {
          if (checkbox) {
            msf.removeWarningClass(checkbox);
          }
          filledInputs++;
        } else {
          if (checkbox) {
            msf.addWarningClass(checkbox);
          }
        }
      });

      requiredRadios.forEach((input) => {
        const radio = input.parentNode.querySelector(".w-radio-input");
        const radioGroup = input.getAttribute("name");
        const isChecked = document.querySelector(
          `input[name="${radioGroup}"]:checked`
        );

        if (isChecked) {
          msf.removeWarningClass(radio);
          filledInputs++;
        } else {
          msf.addWarningClass(radio);
        }
      });

      return filledInputs ===
        requiredInputs.length +
          requiredCheckboxes.length +
          requiredRadios.length
        ? true
        : false;
    };

    const validateEmail = (email) => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };

    start();
  },
};
