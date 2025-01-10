const textarea = document.getElementById("textarea");
const output = document.querySelector("p");
const showBtn = document.querySelector(".show-btn");

const genRanColor = () => {
  const red = Math.ceil(Math.random() * (255 - 0) + 0);
  const green = Math.ceil(Math.random() * (255 - 0) + 0);
  const blue = Math.ceil(Math.random() * (255 - 0) + 0);

  return `rgb(${red}, ${green}, ${blue})`;
};

const dropALetter = (letters, randomColor, randomPos = true) => {
  for (let i = 0; i < letters.length; i++) {
    const newRandomColor = genRanColor();
    setTimeout(() => {
      const letter = letters[i];
      const dropLetter = document.createElement("p");
      dropLetter.innerText = letter;
      dropLetter.style.color = randomColor || newRandomColor;
      if (randomPos) {
        dropLetter.style.left = `${Math.ceil(Math.random() * (95 - 5) + 5)}%`;
      } else {
        dropLetter.style.left = `calc(5% + ${i * 20}px)`;
      }
      dropLetter.style.textShadow = `0px 0px 20px ${
        randomColor || newRandomColor
      }`;
      dropLetter.className = "drop";
      setTimeout(() => {
        dropLetter.remove();
      }, 2500);
      document.body.insertAdjacentElement("afterbegin", dropLetter);
    }, i * 50);
  }
};

let prevContent = "";
textarea.addEventListener("input", (e) => {
  let content = e.target.value;
  if (prevContent && content.length < prevContent.length) {
    const letters = output.querySelectorAll("span");
    letters.forEach((letter, i) => {
      if (i > content.length - 1) {
        letter.remove();
      }
    });
    prevContent = content;
    return;
  }

  prevContent = content;
  const letter = content.at(-1);
  const letterSpan = document.createElement("span");
  letterSpan.innerText = letter;
  const randomColor = genRanColor();
  const randomClass = `letter-${Math.ceil(Math.random() * (1000000 - 0) + 0)}`;
  letterSpan.style.color = randomColor;
  letterSpan.className = randomClass;

  const styleEl = document.createElement("style");
  styleEl.insertAdjacentText(
    "beforeend",
    `
.${randomClass} {
text-shadow: 0px 0px 20px ${randomColor};
}
.${randomClass}::selection {
color: white;
background-color: ${randomColor};
}
    `
  );

  dropALetter(content.at(-1), randomColor);

  // const shineEl = document.createElement("div");
  // shineEl.style.color = randomColor;
  // shineEl.style.background = `radial-gradient(${randomColor} 40%, black 100%)`;
  // shineEl.style.top = `${Math.ceil(Math.random() * (95 - 5) + 5)}%`;
  // shineEl.style.left = `${Math.ceil(Math.random() * (95 - 5) + 5)}%`;
  // shineEl.className = "shine";
  // setTimeout(() => {
  //   shineEl.remove();
  // }, 2500);

  letterSpan.insertAdjacentElement("beforeend", styleEl);
  // document.body.insertAdjacentElement("afterbegin", shineEl);
  output.insertAdjacentElement("beforeend", letterSpan);
});

showBtn.addEventListener("click", () => {
  dropALetter(prevContent, undefined, false);
});
