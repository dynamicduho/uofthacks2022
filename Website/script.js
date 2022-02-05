console.log("ho");
const db = getFirestore();
function adduser() {
  import { collection, addDoc } from "firebase/firestore";
  const docRef = await addDoc(collection(db, "users"), {
  name: document.getElementById("name").innerHTML;,
  codeword: document.getElementById("code").innerHTML;,
  });
  console.log("Document written with ID: ", docRef.id);
  window.location.href = "https://safelineai.cyraalesha.repl.co/success.html";
  }