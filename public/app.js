// Signup Page
async function signup() {
  const first_name = document.getElementById("firstName").value;
  const last_name = document.getElementById("lastName").value;
  const email = document.getElementById("userEmail").value;
  const password = document.getElementById("UserPassword").value;
  const phone = document.getElementById("UserPhone").value;
  const address = document.getElementById("userAddress").value;
  if (
    first_name === "" &&
    last_name === "" &&
    email === "" &&
    password === "" &&
    phone === "" &&
    address === ""
  ) {
    alert("Please Fill Out All Input Fields");
  } else {
    try {
      const res = await axios.post("http://localhost:3000/signup", {
        first_name,
        last_name,
        email,
        password,
        phone,
        address,
      });
      alert("Your Account Create Successfully");
      window.location.href = "login.html";
    } catch (err) {
      console.log(err);
    }
  }
}
// Login Page
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (email === "" && password === "") {
    alert("Please Fill Out All Input Fields");
  } else {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      alert("User Login Successfully");
      window.location.href = "./userdetail.html";
    } catch (err) {
      console.log(err);
    }
  }
}
// Show User Details
async function userdetails() {
  try {
    let userTable = document.getElementById("userdata");
    const res = await axios.get("http://localhost:3000/userDetails");
    let userData = res.data.users;
    userData.forEach((user) => {
      userTable.innerHTML += `<tr>
      <td>${user.first_name}</td>
      <td>${user.last_name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>${user.address}</td>
      </tr>`;
    });
  } catch (err) {
    console.log(err);
  }
}
function createBlog() {
  const Blog = document.getElementById("blog");
  Blog.classList.add("model");
  Blog.classList.remove("hide");
}
function closebtn() {
  const Blog = document.getElementById("blog");
  Blog.classList.remove("model");
  Blog.classList.add("hide");
}
// Create Blog
async function blogf() {
  const blog_title = document.getElementById("title").value;
  const blog_author = document.getElementById("author").value;
  const blog_content = document.getElementById("content").value;
  try {
    const res = await axios.post("http://localhost:3000/blog", {
      blog_title,
      blog_author,
      blog_content,
    });
    const Blog = document.getElementById("blog");
    Blog.classList.remove("model");
    Blog.classList.add("hide");
  } catch (err) {
    console.log(err);
  }
}
// Blog Section
function showBlog() {
  window.location.href = "./showblogs.html";
}
async function blogsdetails() {
  try {
    let card = document.getElementById("Cards");
    const res = await axios.get("http://localhost:3000/blogGet");
    let blog = res.data.users;
    blog.forEach((blog) => {
      card.innerHTML += `<div class="card">
    <div class="iamge">
          <img src="./images/screenshot.jpg" alt="">
        </div>
        <div class="title">
          <h1>${blog.blog_title}</h1>
        </div>
        <div class="content">
          <p>${blog.blog_content}</p>
        </div>
        <div class="author">
          <p><b>Author:</b><span>${blog.blog_author}</span></p>
        </div>
    </div>`;
    });
  } catch (err) {
    console.log(err);
  }
}
window.onload = function () {
  if (document.getElementById("userdata")) {
    userdetails();
  }
  if (document.getElementById("Cards")) {
    blogsdetails();
  }
};
