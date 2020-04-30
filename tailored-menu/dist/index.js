parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"aA31":[function(require,module,exports) {
"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var s=0;s<e.length;s++){var i=e[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function s(t,s,i){return s&&e(t.prototype,s),i&&e(t,i),t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var i=function(){function e(s){t(this,e),this.currentStep=0,this.form=s.form,this.next=s.next,this.submitButton=this.form.querySelector('input[type="submit"]'),this.mask=this.form.querySelector(".w-slider-mask"),this.steps=this.form.querySelectorAll(".w-slide"),this.rightArrow=this.form.querySelector(".w-slider-arrow-right"),this.leftArrow=this.form.querySelector(".w-slider-arrow-left"),this.sliderNav=this.form.querySelector(".w-slider-nav").childNodes,this.formNav=document.querySelectorAll("[data-msf-nav]"),this.nextText=s.nextText,this.submitText=s.submitText,this.warningClass=s.warningClass,this.alertElement=s.alert}return s(e,[{key:"getInputs",value:function(t){var e=this.steps[t].querySelectorAll("input, select, textarea");return Array.from(e)}},{key:"setMaskHeight",value:function(){this.mask.style.height="",this.mask.style.height="".concat(this.steps[this.currentStep].offsetHeight,"px")}},{key:"setNextButtonText",value:function(){this.currentStep===this.steps.length-1&&(this.next.textContent=this.submitText),this.currentStep===this.steps.length-2&&(this.next.textContent=this.nextText)}},{key:"goNext",value:function(){this.rightArrow.click()}},{key:"goBack",value:function(){this.leftArrow.click()}},{key:"goNav",value:function(t){t<this.currentStep&&(this.sliderNav[t].click(),this.currentStep=t,this.setMaskHeight(),this.setNextButtonText())}},{key:"submitForm",value:function(){this.submitButton.click()}},{key:"hideButtons",value:function(){this.next.style.display="none",this.add.style.display="none"}},{key:"addWarningClass",value:function(t){t.classList.add(this.warningClass)}},{key:"removeWarningClass",value:function(t){t.classList.remove(this.warningClass)}},{key:"showAlert",value:function(){this.alertText&&alert(this.alertText),this.alertElement&&this.alertElement.classList.remove("hidden")}},{key:"hideAlert",value:function(){this.alertElement&&this.alertElement.classList.add("hidden")}},{key:"setConfirmValues",value:function(t){this.getInputs(t).forEach(function(t){var e,s;if("radio"===t.type){var i=t.getAttribute("name"),n=document.querySelector('input[name="'.concat(i,'"]:checked'));n&&(e=n.value,s=document.getElementById("".concat(i,"-value")))}else e=t.value,s=document.getElementById("".concat(t.id,"-value"));e&&s?s.textContent=e:!e&&s&&(s.textContent="-")})}}]),e}();exports.default=i;
},{}],"Vlbn":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.msf=exports.optionsList=exports.elements=void 0;var e=t(require("./msf"));function t(e){return e&&e.__esModule?e:{default:e}}var n={form:document.getElementById("tailored-menu"),next:document.getElementById("tm-next"),add:document.getElementById("tm-add"),alert:document.getElementById("tm-alert"),pastriesContainer:document.getElementById("pastries-container"),nextText:"Next",submitText:"Submit",warningClass:"warning"};exports.elements=n;var r={category:[],flavor:[]};exports.optionsList=r;var o=new e.default(n);exports.msf=o;
},{"./msf":"aA31"}],"k4E6":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=require("./base");function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function o(t,e,o){return e&&i(t.prototype,e),o&&i(t,o),t}var s=function(){function i(t){e(this,i),this.id=t,this.collapsed=!1}return o(i,[{key:"renderOptions",value:function(){var e=this,i='\n    <div id="pastry-'.concat(this.id,'" class="tm-pastry" style="opacity: 0;">\n      <div class="tm-pastry_head">\n        <h2 class="tm-heading pastries">Tailor Pastry #').concat(this.id,'</h2>\n        <div class="tm-delete w-embed">\n          <svg viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n            <path d="M1.70697 47.707L24 25.414L46.293 47.707L47.707 46.293L25.414 24L47.707 1.70697L46.293 0.292969L24 22.586L1.70697 0.292969L0.292969 1.70697L22.586 24L0.292969 46.293L1.70697 47.707Z"></path>\n          </svg>\n        </div>\n      </div>\n      <div class="tm-pastry_options_wrap">\n        <div class="tm-pastry_options">\n          <select id="category-').concat(this.id,'" name="Category-').concat(this.id,'" data-name="Category-').concat(this.id,'" required="" class="tm-select w-select">\n            <option value="">Pick a category</option>\n            <option value="First">First Choice</option>\n            <option value="Second">Second Choice</option>\n            <option value="Third">Third Choice</option>\n          </select>\n          <select id="flavor-').concat(this.id,'" name="Flavor-').concat(this.id,'" data-name="Flavor-').concat(this.id,'" required="" class="tm-select w-select">\n            <option value="">Flavor</option>\n          </select>\n          <select id="quantity-').concat(this.id,'" name="Quantity-').concat(this.id,'" data-name="Quantity-').concat(this.id,'" required="" class="tm-select w-select">\n            <option value="">Select Desired Quantity</option>\n          </select>\n          <textarea placeholder="Additional Notes" maxlength="5000" id="notes-').concat(this.id,'" name="Notes-').concat(this.id,'" data-name="Notes-').concat(this.id,'" class="tm-textarea w-input"></textarea>\n          <div class="w-embed">\n            <input type="file" id="file-').concat(this.id,'" name="File-').concat(this.id,'" accept="image/*">\n          </div>\n        </div>\n      </div>\n    </div>\n    ');1!==this.id&&t.elements.pastriesContainer.insertAdjacentHTML("beforeend",i),this.storeElements(),this.disableOptions(),this.optionsWrap.style.height="".concat(this.optionsHeight,"px"),requestAnimationFrame(function(){e.pastryBlock.removeAttribute("style")}),this.optionsWrap.addEventListener("transitionend",function(e){t.msf.setMaskHeight()})}},{key:"storeElements",value:function(){this.pastryBlock=document.getElementById("pastry-".concat(this.id)),this.pastryHeading=this.pastryBlock.querySelector(".tm-heading"),this.optionsWrap=this.pastryBlock.querySelector(".tm-pastry_options_wrap"),this.optionsHeight=this.optionsWrap.offsetHeight,this.options=Array.from(this.pastryBlock.querySelectorAll("select, textarea, input")),this.optionsName=this.options.map(function(t){return t.id.split("-")[0]})}},{key:"getOptions",value:function(t,e){}},{key:"enableOptions",value:function(t){var e=this;switch(t){case"category":this.optionsName.forEach(function(t,i){"flavor"===t&&(e.options[i].disabled=!1)});break;case"flavor":this.optionsName.forEach(function(t,i){"quantity"===t&&(e.options[i].disabled=!1)});break;case"quantity":this.optionsName.forEach(function(t,i){"notes"!==t&&"file"!==t||(e.options[i].disabled=!1)})}}},{key:"disableOptions",value:function(){var t=this;switch(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"category"){case"category":this.optionsName.forEach(function(e,i){"category"!==e&&(t.options[i].disabled=!0,t.deleteOptions(t.options[i]))});break;case"flavor":this.optionsName.forEach(function(e,i){"category"!==e&&"flavor"!==e&&(t.options[i].disabled=!0,t.deleteOptions(t.options[i]))});break;case"quantity":this.optionsName.forEach(function(e,i){"category"!==e&&"flavor"!==e&&"quantity"!==e&&(t.options[i].disabled=!0)})}}},{key:"deleteOptions",value:function(t){if("select"===t.type)for(;t.childNodes.length>1;)t.removeChild(t.lastElementChild)}},{key:"pushValue",value:function(t,e){this[t]=e,console.log(this)}},{key:"expand",value:function(){this.collapsed&&(this.pastryHeading.style.cursor="auto",this.optionsWrap.style.height="".concat(this.optionsHeight,"px"),this.collapsed=!1)}},{key:"collapse",value:function(){this.collapsed||(this.pastryHeading.style.cursor="pointer",this.optionsWrap.style.height="0px",this.collapsed=!0)}}]),i}();exports.default=s;
},{"./base":"Vlbn"}],"Focm":[function(require,module,exports) {
"use strict";var t=require("./base"),e=n(require("./pastry"));function n(t){return t&&t.__esModule?t:{default:t}}function r(t,e){return f(t)||o(t,e)||i(t,e)||a()}function a(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function i(t,e){if(t){if("string"==typeof t)return s(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(t,e):void 0}}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function o(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var n=[],r=!0,a=!1,i=void 0;try{for(var s,o=t[Symbol.iterator]();!(r=(s=o.next()).done)&&(n.push(s.value),!e||n.length!==e);r=!0);}catch(f){a=!0,i=f}finally{try{r||null==o.return||o.return()}finally{if(a)throw i}}return n}}function f(t){if(Array.isArray(t))return t}var u={init:function(){var e=function(){t.msf.next.addEventListener("click",n),t.msf.formNav&&t.msf.formNav.forEach(function(t){t.addEventListener("click",r)})},n=function(){a(t.msf.currentStep)?(t.msf.setConfirmValues(t.msf.currentStep),t.msf.currentStep++,t.msf.currentStep===t.msf.steps.length?(t.msf.submitForm(),t.msf.hideButtons(),t.msf.hideAlert()):(t.msf.goNext(),t.msf.setMaskHeight(),t.msf.setNextButtonText(),t.msf.hideAlert())):t.msf.showAlert()},r=function(e){var n=e.currentTarget.dataset.msfNav-1;t.msf.goNav(n)},a=function(e){var n=t.msf.getInputs(e).filter(function(t){return t.required}),r=n.filter(function(t){return"checkbox"===t.type}),a=n.filter(function(t){return"radio"===t.type}),s=0;return n.forEach(function(e){if(e.value&&"email"!==e.type)t.msf.removeWarningClass(e),s++;else if(e.value&&"email"===e.type){i(e.value)?(t.msf.removeWarningClass(e),s++):t.msf.addWarningClass(e)}else t.msf.addWarningClass(e)}),r.forEach(function(e){var n=e.parentNode.querySelector(".w-checkbox-input");e.checked?(n&&t.msf.removeWarningClass(n),s++):n&&t.msf.addWarningClass(n)}),a.forEach(function(e){var n=e.parentNode.querySelector(".w-radio-input"),r=e.getAttribute("name");document.querySelector('input[name="'.concat(r,'"]:checked'))?(t.msf.removeWarningClass(n),s++):t.msf.addWarningClass(n)}),s===n.length+r.length+a.length},i=function(t){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(t).toLowerCase())};e(),t.msf.setMaskHeight()}},c={init:function(){var n=[],a=1,i=function(){t.elements.pastriesContainer.addEventListener("change",s),t.elements.pastriesContainer.addEventListener("click",o),t.elements.add.addEventListener("click",f)},s=function(t){var e=t.target.value,a=r(t.target.id.split("-"),2),i=a[0],s=a[1],o=n.find(function(t){return t.id===parseInt(s)});e?(o.pushValue(i,e),o.enableOptions(i),o.getOptions(i,e)):o.disableOptions(i)},o=function(t){var e,n=t.target.closest(".tm-pastry");n&&(e=parseInt(n.id.split("-")[1])),t.target.classList.contains("tm-heading")&&c(e),(t.target.classList.contains("tm-delete")||t.target.parentNode.classList.contains("tm-delete"))&&u(e)},f=function(){var t=new e.default(a);n.forEach(function(t){return t.collapse()}),t.renderOptions(),n.push(t),a++},u=function(t){console.log("Borrar Pastry")},c=function(t){n.forEach(function(e){e.id===t?e.expand():e.collapse()})};f(),i()}};Webflow.push(function(){u.init(),c.init()});
},{"./base":"Vlbn","./pastry":"k4E6"}]},{},["Focm"], null)