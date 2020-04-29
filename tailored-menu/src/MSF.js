export default class MSF {
  constructor(data) {
    this.currentStep = 0;
    this.form = document.getElementById(data.formID);
    this.next = document.getElementById(data.nextID);
    this.add = document.getElementById(data.addID);
    this.submitButton = this.form.querySelector('input[type="submit"]');
    this.mask = this.form.querySelector(".w-slider-mask");
    this.steps = this.form.querySelectorAll(".w-slide");
    this.rightArrow = this.form.querySelector(".w-slider-arrow-right");
    this.leftArrow = this.form.querySelector(".w-slider-arrow-left");
    this.sliderNav = this.form.querySelectorAll(".w-slider-dot");
    this.formNav = document.querySelectorAll("[data-msf-nav]");
    this.nextText = data.nextText;
    this.submitText = data.submitText;
    this.warningClass = data.warningClass;
    this.alertElementID = document.getElementById(data.alertElementID);
  }

  getInputs(index) {
    const inputs = this.steps[index].querySelectorAll(
      "input, select, textarea"
    );
    return Array.from(inputs);
  }

  setMaskHeight() {
    this.mask.style.height = "";
    this.mask.style.height = `${this.steps[this.currentStep].offsetHeight}px`;
  }

  setNextButtonText() {
    if (this.currentStep === this.steps.length - 1) {
      this.next.textContent = this.submitText;
    }
    if (this.currentStep === this.steps.length - 2) {
      this.next.textContent = this.nextText;
    }
  }

  goNext() {
    this.rightArrow.click();
  }

  goBack() {
    this.leftArrow.click();
  }

  goNav(step) {
    if (step < this.currentStep) {
      this.sliderNav[step].click();
      this.currentStep = step;
      this.setMaskHeight();
      this.setNextButtonText();
    }
  }

  submitForm() {
    this.submitButton.click();
  }

  hideButtons() {
    this.next.style.display = "none";
    this.add.style.display = "none";
  }

  addWarningClass(target) {
    target.classList.add(this.warningClass);
  }

  removeWarningClass(target) {
    target.classList.remove(this.warningClass);
  }

  showAlert() {
    if (this.alertText) {
      alert(this.alertText);
    }

    if (this.alertElement) {
      this.alertElement.classList.remove("hidden");
    }
  }

  hideAlert() {
    if (this.alertElement) {
      this.alertElement.classList.add("hidden");
    }
  }

  setConfirmValues(index) {
    const inputs = this.getInputs(index);

    inputs.forEach((input) => {
      let value, confirmElement;

      if (input.type === "radio") {
        const radioGroup = input.getAttribute("name");
        const isChecked = document.querySelector(
          `input[name="${radioGroup}"]:checked`
        );

        if (isChecked) {
          value = isChecked.value;
          confirmElement = document.getElementById(`${radioGroup}-value`);
        }
      } else {
        value = input.value;
        confirmElement = document.getElementById(`${input.id}-value`);
      }

      if (value && confirmElement) {
        confirmElement.textContent = value;
      } else if (!value && confirmElement) {
        confirmElement.textContent = "-";
      }
    });
  }
}
