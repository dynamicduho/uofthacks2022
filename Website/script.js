
function adduser() {
  db.collection("users").doc().set({
  name: document.getElementById("name").innerHTML, 
  codeword: document.getElementById("code").innerHTML
}).then(function() {
  console.log("user added");
  window.location.href = "https://safelineai.cyraalesha.repl.co/success.html";
});
    
  }