let score = 0;
function register() {
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  auth.createUserWithEmailAndPassword(email, pass)
    .then(() => alert("Registered!"))
    .catch(e => alert(e.message));
}
function login() {
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  auth.signInWithEmailAndPassword(email, pass)
    .then(() => {
      document.getElementById('auth').style.display = 'none';
      document.getElementById('game').style.display = 'block';
      loadLeaderboard();
    })
    .catch(e => alert(e.message));
}
function clickButton() {
  score++;
  document.getElementById('score').innerText = `Score: ${score}`;
  const user = auth.currentUser;
  if (user) {
    db.collection("leaderboard").doc(user.uid).set({
      email: user.email,
      score: score
    });
  }
}
function loadLeaderboard() {
  db.collection("leaderboard").orderBy("score", "desc").limit(10).onSnapshot(snapshot => {
    const list = document.getElementById("leaderboard");
    list.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      const li = document.createElement("li");
      li.textContent = `${data.email} - ${data.score}`;
      list.appendChild(li);
    });
  });
}