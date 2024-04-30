const btnsign = document.querySelector(".btnsignout");
btnsign.addEventListener("click", async () => {
  try {
    const token= localStorage.getItem("token");
   const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json"/*, token */}
      // body: JSON.stringify(data),
    };


    let response = await fetch("/api/sessions/signout", opts);
    response = await response.json();
    alert(response.message)
   if(response.statusCode===200){
    location.replace("/");
      // localStorage.removeItem("token")
    }   
   
  } catch (error) {
    console.log(error.message)
    alert(error.message);
  }
});