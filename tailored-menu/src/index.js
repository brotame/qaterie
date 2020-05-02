/**
 * Qaterie Tailored Menu
 */

import { elements, getPastryOptions, msf } from "./base";
import Pastry from "./pastry";

/**
 * Multi Step Form Controller
 */
const msfController = {
  init: () => {
    const start = () => {
      setEventListeners();
      msf.setMaskHeight();
    };

    const setEventListeners = () => {
      msf.next.addEventListener("click", nextClick);
      if (msf.formNav) {
        msf.formNav.forEach((nav) => {
          nav.addEventListener("click", navClick);
        });
      }
    };

    const nextClick = () => {
      const filledFields = checkRequiredInputs(msf.currentStep);

      if (!filledFields) {
        msf.showAlert();
        return;
      }

      msf.setConfirmValues();
      msf.currentStep++;

      if (msf.currentStep === msf.steps.length) {
        msf.submitForm();
        msf.hideButtons();
      } else {
        msf.goNext();
        msf.setMaskHeight();
        msf.setNextButtonText();
      }

      msf.hideAlert();
    };

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
        if (!input.value) {
          msf.addWarningClass(input);
          return;
        }

        if (input.type === "email") {
          const correctEmail = validateEmail(input.value);
          if (!correctEmail) {
            msf.addWarningClass(input);
            return;
          }

          msf.removeWarningClass(input);
          filledInputs++;
          return;
        }

        msf.removeWarningClass(input);
        filledInputs++;
      });

      requiredCheckboxes.forEach((input) => {
        const checkbox = input.parentNode.querySelector(".w-checkbox-input");

        if (!input.checked) {
          if (checkbox) msf.addWarningClass(checkbox);
          return;
        }

        if (checkbox) msf.removeWarningClass(checkbox);
        filledInputs++;
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

/**
 * Pastries Controller
 */
const pastriesController = {
  init: () => {
    const pastries = [];
    let currentID = 1;

    const start = () => {
      getPastryOptions();
      addPastry();
      setEventListeners();
    };

    const setEventListeners = () => {
      elements.pastriesContainer.addEventListener("click", pastryClick);
      elements.pastriesContainer.addEventListener("change", pastryInput);
      elements.add.addEventListener("click", addPastry);
    };

    const pastryClick = (e) => {
      const pastryBlock = e.target.closest(".tm-pastry");
      let pastryID;

      // Get the ID of the pastry
      if (pastryBlock) pastryID = parseInt(pastryBlock.id.split("-")[1]);

      // Trigger corresponding methods
      if (e.target.classList.contains("tm-heading")) togglePastry(pastryID);
      if (
        e.target.classList.contains("tm-delete") ||
        e.target.parentNode.classList.contains("tm-delete")
      )
        deletePastry(pastryID);
    };

    const pastryInput = (e) => {
      let value = e.target.value;

      // Get input name and pastry ID and find the object in the store array
      const [inputName, pastryID] = e.target.id.split("-");
      const pastry = pastries.find((el) => el.id === parseInt(pastryID));

      // Modify value when conditions are met
      if (inputName === "quantity" && value < 1) value = e.target.value = 1;
      if (inputName === "file" && value) value = e.target.files[0].name;

      // Trigger corresponding methods
      if (value) {
        pastry.values[inputName] = value;
        pastry.enableInputs(inputName);
        pastry.getOptions(inputName);
      } else {
        pastry.disableInputs(inputName);
      }

      console.log(pastry);
    };

    const addPastry = () => {
      // Create pastry
      const newPastry = new Pastry(currentID);

      // Collapse all pastries
      pastries.forEach((pastry) => pastry.collapse());

      // Render new pastry
      newPastry.renderInputs();

      // Set transition listener (height) to adapt the mask height
      newPastry.inputsWrap.addEventListener("transitionend", () => {
        msf.setMaskHeight();
      });

      // Push pastry to the store array
      pastries.push(newPastry);

      // Increase ID counter
      currentID++;
    };

    const deletePastry = (targetID) => {
      if (pastries.length <= 1) return;

      const target = pastries.find((pastry) => pastry.id === targetID);
      const targetIndex = pastries.indexOf(target);
      const previousPastry = pastries[targetIndex - 1]
        ? pastries[targetIndex - 1]
        : pastries[pastries.length - 1];

      // Listen for target.hide() transition. When it ends, delete the element and toggle the previous pastry.
      target.pastryBlock.addEventListener("transitionend", (e) => {
        target.delete();

        // Update the pastry number in the title
        pastries.forEach((pastry, index) => {
          pastry.updatePastryNumber(index + 1);
        });

        // Expand previous pastry if the target was expanded.
        if (target.collapsed) {
          msf.setMaskHeight();
        } else {
          togglePastry(previousPastry.id);
        }
      });

      // Set opacity to the target.
      target.hide();

      // Delete the pastry from the array
      pastries.splice(targetIndex, 1);
      console.log(pastries);
    };

    const togglePastry = (targetID) => {
      pastries.forEach((pastry) => {
        pastry.id === targetID ? pastry.expand() : pastry.collapse();
      });
    };

    start();
  },
};

Webflow.push(function () {
  msfController.init();
  pastriesController.init();
});
