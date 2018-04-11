function rot13(str) {
  const rot13 = [];

  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) < 65 || str.charCodeAt(i) > 90) {
      rot13.push(str.charAt(i));
    } else if (str.charCodeAt(i) > 77) {
      rot13.push(String.fromCharCode(str.charCodeAt(i) - 13));
    } else {
      rot13.push(String.fromCharCode(str.charCodeAt(i) + 13));
    }
  }
  return rot13.join("");
}
// Change the inputs below to test
rot13("SERR PBQR PNZC");
