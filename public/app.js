// Signup Page
const signUp = document.getElementById("signup");
signUp.addEventListener("submit", async (e) => {
  e.preventDefault();
  const first_name = document.getElementById("firstName").value;
  const last_name = document.getElementById("lastName").value;
  const email = document.getElementById("userEmail").value;
  const password = document.getElementById("UserPassword").value;
  const phone = document.getElementById("UserPhone").value;
  const userAddress = document.getElementById("userAddress").value;
  try {
    const res = await axios.post("http://localhost:3000/signup", {
      first_name,
      last_name,
      email,
      password,
      phone,
      userAddress,
    });
    console.log(res.data);
    alert("Your Account Create Successfully");
    window.location.href = "login.html";
  } catch (err) {
    console.log(err);
  }
});
// Login Page
const login = document.getElementById("login");
login.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const res = await axios.post("http://localhost:3000/login", {
      email,
      password,
    });
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
});

// Show User Details

// Blog Section

function createBlog() {
  const Blog = document.getElementById("blog");
  Blog.classList.add("model");
  Blog.classList.remove("hide");
};
function closebtn(){
  const Blog = document.getElementById("blog");
  Blog.classList.remove("model");
  Blog.classList.add("hide");
}