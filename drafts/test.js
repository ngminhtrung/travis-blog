function theLongestSub(str) {
  var sub = [],
    word = "";
  for (var i = 0; i < str.length; i++) {
    var a = str.indexOf(str[i]);
    if (a === i) {
      word += str[i];
    } else {
      sub.push(word);
      word = "";
      str = str.substr(i - 1);
      i = 0;
    }
  }
  return sub;
}

theLongestSub("hell");

function printing() {
  console.log(1);
  setTimeout(function() {console.log(2);},1000);
  setTimeout(function() {console.log(3);},0);
  console.log(4);
};