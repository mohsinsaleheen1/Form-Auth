gsap.from(".signupform", {
  opacity: 0,
  duration: 1,
  y: 30,
  delay: 1,
});
// ============== Signup Page ==============
async function signup() {
  const last_name = document.getElementById("lastName").value;
  const first_name = document.getElementById("firstName").value;
  const email = document.getElementById("userEmail").value;
  const password = document.getElementById("UserPassword").value;
  const phone = document.getElementById("UserPhone").value;
  const address = document.getElementById("userAddress").value;
  let selectElemet = document.getElementById("role");
  let role = selectElemet.value;
  if (
    first_name === "" ||
    last_name === "" ||
    email === "" ||
    password === "" ||
    phone === "" ||
    address === ""
  ) {
    alert("Please Fill Out All Input Fields");
  } else {
    try {
      const res = await axios.post("http://localhost:3000/api/form/signup", {
        first_name,
        last_name,
        email,
        role,
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
// ============== Login Page =======================
async function login() {
  const token = document.cookie;
  console.log("cookie", token);
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (email === "" || password === "") {
    return alert("Please Fill Out All Input Fields");
  }
  try {
    const res = await axios.post("http://localhost:3000/api/form/login", {
      email,
      password,
    });
    console.log(res.data.role);
    const token = res.data.token;
    localStorage.setItem("token", token);
    alert("User Login Successfully");
    getToken();
    if (res.data.status !== 200) {
      alert(res.data.message);
      return;
    }
    window.location.href = "./userdetail.html";
  } catch (err) {
    console.log(err);
  }
}
// Get Token
async function getToken() {
  const token = localStorage.getItem("token");
  console.log(token);
  const res = await axios.get("http://localhost:3000/api/blog", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res.data.user);
  if (res.data.user.role === "user") {
    window.location.href = "./showblogs.html";
  } else if (res.data.user.role === "admin") {
    window.location.href = "./userdetail.html";
  }
}
// ============= Show User Details=========
async function userdetails() {
  try {
    let userTable = document.getElementById("userdata");
    const res = await axios.get("http://localhost:3000/api/blog/userDetails");
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
  const uBlog = document.getElementById("ublog");
  uBlog.classList.remove("umodel");
  uBlog.classList.add("hide");
  Blog.classList.remove("model");
  Blog.classList.add("hide");
}
// ============= Create Blog ==================
async function blogf() {
  const blog_title = document.getElementById("title").value;
  const blog_author = document.getElementById("author").value;
  const blog_content = document.getElementById("content").value;
  if (blog_title === "" || blog_author === "" || blog_content === "") {
    alert("Please Fill the all Field must required!");
  } else {
    try {
      const res = await axios.post("http://localhost:3000/api/blog/blog", {
        blog_title,
        blog_author,
        blog_content,
      });
      const Blog = document.getElementById("blog");
      Blog.classList.remove("model");
      Blog.classList.add("hide");
      showBlog();
    } catch (err) {
      console.log(err);
    }
  }
}
// ============== Blog Section ======================
function showBlog() {
  window.location.href = "./showblogs.html";
}
async function blogsdetails() {
  try {
    let card = document.getElementById("Cards");
    const res = await axios.get("http:/localhost:3000/api/blog/blogGet");
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
          <div class="ubtns">
          <button onclick="update('${blog._id}')" class="update"><i class="fa-solid fa-pen-to-square"></i></button>
          <button onclick="delet('${blog._id}')" class="delete"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
    </div>`;
    });
  } catch (err) {
    console.log(err);
  }
}
// ============== update blog Section ======================
async function update(id) {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/blog/getSingleBlog/${id}`
    );
    const data = res.data.singleBlog;
    const blog_title = (document.getElementById("utitle").value =
      data.blog_title);
    const blog_author = (document.getElementById("uauthor").value =
      data.blog_author);
    const blog_content = (document.getElementById("ucontent").value =
      data.blog_content);
    const Blog = document.getElementById("ublog");
    Blog.classList.add("umodel");
    Blog.classList.remove("hide");
    window.currentBlogId = id;
  } catch (err) {
    console.log(err);
  }
}
async function blogupdate() {
  try {
    const blog_title = document.getElementById("utitle").value;
    const blog_author = document.getElementById("uauthor").value;
    const blog_content = document.getElementById("ucontent").value;
    const res = await axios.put(
      `http://localhost:3000/api/blog/updateblog/${window.currentBlogId}`,
      {
        blog_title,
        blog_author,
        blog_content,
      }
    );
    const Blog = document.getElementById("ublog");
    Blog.classList.remove("umodel");
    Blog.classList.add("hide");
    showBlog();
  } catch (err) {
    console.log(err);
  }
}
// ============== delete blog Section ======================
async function delet(id) {
  try {
    const res = await axios.delete(
      `http://localhost:3000/api/blog/deleteblog/${id}`
    );
    console.log(res);
    showBlog();
  } catch (err) {
    console.log(err);
  }
}
// ============== Onload ======================
window.onload = function () {
  if (document.getElementById("userdata")) {
    userdetails();
  }
  if (document.getElementById("Cards")) {
    blogsdetails();
  }
};
