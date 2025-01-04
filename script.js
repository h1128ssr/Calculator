let display = document.querySelector("#displayNum");

let ac = document.querySelector("#AC");
ac.addEventListener("click", () => {
  display.value = "";
  updateScroll();
});

function updateScroll() {
  display.scrollLeft = display.scrollWidth;
}

const buttons = document.querySelectorAll("#keys button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent.trim();

    if (display.value === "error") {
      display.value = "";
    }

    if (!isNaN(value) || value === ".") {
      display.value += value;
      updateScroll();
    } else if (["÷", "×", "+", "–", "%"].includes(value)) {
      if (display.value !== "" && !["÷", "×", "+", "–", "%"].includes(display.value.slice(-1))) {
        display.value += value;
        updateScroll();
      }
    } else if (button.id === "backspace") {
      display.value = display.value.slice(0, -1);
      updateScroll();
    } else if (button.id === "equal") {
      if (display.value === "" || ["÷", "×", "+", "–", "%"].includes(display.value.slice(-1))) {
        display.value = display.value;
      } else {
        if (display.value === "") {
          display.value = "";
        }
        try {
          let expression = display.value
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/–/g, "-");
          display.value = eval(expression);
          display.scrollLeft = 0;
        } catch {
          display.value = "error";
          display.scrollLeft = 0;
        }
      }
    }
  });
});