const post = async (data) => {
  const resp = await fetch("http://localhost:5000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const sdata = await resp.json();
  console.log(sdata);
};

// const emailValidate = (email) => {
//     const re = /\S+@\S+\.\S+/;
//     return re.test(email)
// }

const form = document.getElementsByClassName("form")[0];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    // const email = data.email;
    // const yes=emailValidate(email)
  post(data);
});
