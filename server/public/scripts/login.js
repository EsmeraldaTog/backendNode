const selector = document.querySelector(".saveButton");
selector.addEventListener("click", async () => {
  try {
    const data = {
      email: document.querySelector(".inputEmail").value,
      password: document.querySelector(".inputPass").value,
    };
    console.log(data);
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("http://localhost:8080/api/sessions/login", opts);
    response = await response.json();
    console.log(response);
    alert(response.message);
    response.session && location.replace("/");
  } catch (error) {
    alert(error.message);
  }
});