const syntaxColor = (span, color) => {
  switch (color) {
    case 0:
      span.classList.add("white");
      break;
    case 1:
      span.classList.add("light-blue");
      break;
    case 2:
      span.classList.add("dark-blue");
      break;
    case 3:
      span.classList.add("red");
      break;
    case 4:
      span.classList.add("purple");
      break;
    case 5:
      span.classList.add("number-color");
      break;
    case 6:
      span.classList.add("yellow");
      break;
    case 7:
      span.classList.add("comment");
      break;
    case 8:
      span.classList.add("light-blue");
      span.classList.add("italic");
      break;
    case 9:
      span.classList.add("green");
      break;
    default:
      break;
  }
}

export default syntaxColor;