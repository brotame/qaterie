import { elements, pastryOptions } from "./base";

export default class Pastry {
  constructor(id) {
    this.id = id;
    this.collapsed = false;
    this.inputs = {};
    this.values = {};
  }

  renderInputs() {
    const template = `
    <div id="pastry-${this.id}" class="tm-pastry" style="opacity: 0;"><div class="tm-pastry_head"><h2 class="tm-heading pastries">Tailor Pastry #${this.id}</h2><div class="tm-delete w-embed"><svg viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1.70697 47.707L24 25.414L46.293 47.707L47.707 46.293L25.414 24L47.707 1.70697L46.293 0.292969L24 22.586L1.70697 0.292969L0.292969 1.70697L22.586 24L0.292969 46.293L1.70697 47.707Z"></path></svg></div></div><div class="tm-pastry_inputs_wrap" style="height: 426px;"><div class="tm-pastry_inputs"><select id="category-${this.id}" name="Category-${this.id}" data-name="Category-${this.id}" required="" class="tm-select w-select"><option value="">Pick a category</option></select><select id="flavor-${this.id}" name="Flavor-${this.id}" data-name="Flavor-${this.id}" required="" class="tm-select w-select"><option value="">Select flavor</option></select><select id="size-${this.id}" name="Size-${this.id}" data-name="Size-${this.id}" required="" class="tm-select w-select"><option value="">Select desired size</option></select><div class="tm-pastry_quantity"><input type="number" class="tm-quantity w-input" maxlength="256" name="Quantity-${this.id}" data-name="Quantity-${this.id}" min="1" placeholder="Select quantity" id="quantity-${this.id}" required=""><div class="tm-quantity_label">Piece(s)</div></div><textarea placeholder="Additional Notes" maxlength="5000" id="notes-${this.id}" name="Notes-${this.id}" data-name="Notes-${this.id}" class="tm-textarea w-input"></textarea><div class="w-embed"><input type="file" id="file-${this.id}" name="File-${this.id}" accept="image/*"></div></div></div></div>
    `;

    // Append pastry to the container
    if (this.id !== 1) {
      elements.pastriesContainer.insertAdjacentHTML("beforeend", template);
    }

    // Store pastry elements
    this.storeElements();

    // Get category options
    this.getOptions();

    // Disable inputs
    this.disableInputs();

    // Set inputs height
    this.inputsWrap.style.height = `${this.inputsHeight}px`;

    // Animate opacity of pastry (initially hidden with inline style)
    requestAnimationFrame(() => {
      this.pastryBlock.removeAttribute("style");
    });
  }

  storeElements() {
    // Store elements in the pastry object
    this.pastryBlock = document.getElementById(`pastry-${this.id}`);
    this.pastryHeading = this.pastryBlock.querySelector(".tm-heading");
    this.inputsWrap = this.pastryBlock.querySelector(".tm-pastry_inputs_wrap");
    this.inputsHeight = this.inputsWrap.offsetHeight;

    // Store each input of the Pastry Block in the this.inputs object
    this.pastryBlock
      .querySelectorAll("select, textarea, input")
      .forEach((input) => {
        const inputName = input.id.split("-")[0];
        this.inputs[inputName] = input;
      });
  }

  enableInputs(inputName) {
    switch (inputName) {
      case "category":
        this.inputs["flavor"].disabled = false;
        break;

      case "flavor":
        this.inputs["size"].disabled = false;
        break;

      case "size":
        this.inputs["quantity"].disabled = false;
        break;

      case "quantity":
        this.inputs["notes"].disabled = false;
        this.inputs["file"].disabled = false;
        break;
    }
  }

  disableInputs(inputName = "category") {
    switch (inputName) {
      case "category":
        for (const name in this.inputs) {
          if (name !== "category") {
            this.inputs[name].disabled = true;
            this.deleteOptions(this.inputs[name]);
          }
        }
        break;

      case "flavor":
        for (const name in this.inputs) {
          if (name !== "category" && name !== "flavor") {
            this.inputs[name].disabled = true;
            this.deleteOptions(this.inputs[name]);
          }
        }
        break;

      case "size":
        for (const name in this.inputs) {
          if (name !== "category" && name !== "flavor" && name !== "size") {
            this.inputs[name].disabled = true;
          }
        }
        break;

      case "quantity":
        for (const name in this.inputs) {
          if (
            name !== "category" &&
            name !== "flavor" &&
            name !== "size" &&
            name !== "quantity"
          ) {
            this.inputs[name].disabled = true;
          }
        }
        break;
    }
  }

  deleteOptions(target) {
    // Delete all options of the dropdown except first
    if (target.type === "select-one") {
      while (target.options.length > 1) {
        target.removeChild(target.lastElementChild);
      }
    }
  }

  getOptions(inputName = "init") {
    let optionsArray, renderTarget;
    const selectedCategory = pastryOptions.find(
      (option) => option.category === this.values.category
    );

    switch (inputName) {
      case "init":
        optionsArray = pastryOptions.map((option) => option.category);
        renderTarget = "category";
        break;

      case "category":
        optionsArray = selectedCategory.flavors;
        renderTarget = "flavor";
        break;

      case "flavor":
        optionsArray = selectedCategory.sizes;
        renderTarget = "size";
        break;

      default:
        return;
    }
    this.renderOptions(optionsArray, this.inputs[renderTarget]);
  }

  renderOptions(optionsArray, target) {
    optionsArray.forEach((option) => {
      target.insertAdjacentHTML(
        "beforeend",
        `<option value="${option}">${option}</option>`
      );
    });
  }

  expand() {
    if (!this.collapsed) return;

    this.pastryHeading.style.cursor = "auto";
    this.inputsWrap.style.height = `${this.inputsHeight}px`;
    this.collapsed = false;
  }

  collapse() {
    if (this.collapsed) return;

    this.pastryHeading.style.cursor = "pointer";
    this.inputsWrap.style.height = "0px";
    this.collapsed = true;
  }

  hide() {
    this.pastryBlock.style.opacity = "0";
  }

  delete() {
    elements.pastriesContainer.removeChild(this.pastryBlock);
  }
}
