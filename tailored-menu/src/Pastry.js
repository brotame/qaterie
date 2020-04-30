import { elements, msf } from "./base";

export default class Pastry {
  constructor(id) {
    this.id = id;
    this.collapsed = false;
  }

  renderOptions() {
    const template = `
    <div id="pastry-${this.id}" class="tm-pastry" style="opacity: 0;">
      <div class="tm-pastry_head">
        <h2 class="tm-heading pastries">Tailor Pastry #${this.id}</h2>
        <div class="tm-delete w-embed">
          <svg viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.70697 47.707L24 25.414L46.293 47.707L47.707 46.293L25.414 24L47.707 1.70697L46.293 0.292969L24 22.586L1.70697 0.292969L0.292969 1.70697L22.586 24L0.292969 46.293L1.70697 47.707Z"></path>
          </svg>
        </div>
      </div>
      <div class="tm-pastry_options_wrap">
        <div class="tm-pastry_options">
          <select id="category-${this.id}" name="Category-${this.id}" data-name="Category-${this.id}" required="" class="tm-select w-select">
            <option value="">Pick a category</option>
            <option value="First">First Choice</option>
            <option value="Second">Second Choice</option>
            <option value="Third">Third Choice</option>
          </select>
          <select id="flavor-${this.id}" name="Flavor-${this.id}" data-name="Flavor-${this.id}" required="" class="tm-select w-select">
            <option value="">Flavor</option>
          </select>
          <select id="quantity-${this.id}" name="Quantity-${this.id}" data-name="Quantity-${this.id}" required="" class="tm-select w-select">
            <option value="">Select Desired Quantity</option>
          </select>
          <textarea placeholder="Additional Notes" maxlength="5000" id="notes-${this.id}" name="Notes-${this.id}" data-name="Notes-${this.id}" class="tm-textarea w-input"></textarea>
          <div class="w-embed">
            <input type="file" id="file-${this.id}" name="File-${this.id}" accept="image/*">
          </div>
        </div>
      </div>
    </div>
    `;

    // Append pastry to the container
    if (this.id !== 1) {
      elements.pastriesContainer.insertAdjacentHTML("beforeend", template);
    }

    // Store pastry elements
    this.storeElements();

    // Disable options
    this.disableOptions();

    // Set options height
    this.optionsWrap.style.height = `${this.optionsHeight}px`;

    // Animate opacity of pastry (initially hidden with inline style)
    requestAnimationFrame(() => {
      this.pastryBlock.removeAttribute("style");
    });

    // Set transition listener (height) to the options
    this.optionsWrap.addEventListener("transitionend", (e) => {
      msf.setMaskHeight();
    });
  }

  storeElements() {
    this.pastryBlock = document.getElementById(`pastry-${this.id}`);
    this.pastryHeading = this.pastryBlock.querySelector(".tm-heading");
    this.optionsWrap = this.pastryBlock.querySelector(
      ".tm-pastry_options_wrap"
    );
    this.optionsHeight = this.optionsWrap.offsetHeight;
    this.options = Array.from(
      this.pastryBlock.querySelectorAll("select, textarea, input")
    );
    this.optionsName = this.options.map((option) => option.id.split("-")[0]);
  }

  getOptions(optionName, selectedValue) {}

  enableOptions(inputName) {
    switch (inputName) {
      case "category":
        this.optionsName.forEach((optionName, index) => {
          if (optionName === "flavor") this.options[index].disabled = false;
        });
        break;
      case "flavor":
        this.optionsName.forEach((optionName, index) => {
          if (optionName === "quantity") this.options[index].disabled = false;
        });
        break;
      case "quantity":
        this.optionsName.forEach((optionName, index) => {
          if (optionName === "notes" || optionName === "file")
            this.options[index].disabled = false;
        });
        break;
    }
  }

  disableOptions(inputName = "category") {
    switch (inputName) {
      case "category":
        this.optionsName.forEach((optionName, index) => {
          if (optionName !== "category") {
            this.options[index].disabled = true;
            this.deleteOptions(this.options[index]);
          }
        });
        break;
      case "flavor":
        this.optionsName.forEach((optionName, index) => {
          if (optionName !== "category" && optionName !== "flavor") {
            this.options[index].disabled = true;
            this.deleteOptions(this.options[index]);
          }
        });
        break;
      case "quantity":
        this.optionsName.forEach((optionName, index) => {
          if (
            optionName !== "category" &&
            optionName !== "flavor" &&
            optionName !== "quantity"
          ) {
            this.options[index].disabled = true;
          }
        });
        break;
    }
  }

  deleteOptions(target) {
    if (target.type === "select") {
      while (target.childNodes.length > 1) {
        target.removeChild(target.lastElementChild);
      }
    }
  }

  pushValue(optionName, selectedValue) {
    this[optionName] = selectedValue;
    console.log(this);
  }

  expand() {
    if (!this.collapsed) return;

    this.pastryHeading.style.cursor = "auto";
    this.optionsWrap.style.height = `${this.optionsHeight}px`;
    this.collapsed = false;
  }

  collapse() {
    if (this.collapsed) return;

    this.pastryHeading.style.cursor = "pointer";
    this.optionsWrap.style.height = "0px";
    this.collapsed = true;
  }
}

/*
    this.id = data.id;
    this.category = data.category;
    this.flavor = data.flavor;
    this.quantity = data.quantity;
    this.notes = data.notes;
    this.file = data.file;
*/
