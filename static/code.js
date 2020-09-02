const langname = document.querySelector("title").textContent
const post = document.querySelector(".post")
fetch("http://localhost:3000/comments?lang=" + langname).then((response) => {
    response.json().then((data) => {
        post.innerHTML = ""
        for(let i=0;i<data.comment.length;i++)
        {
         const div1 = document.createElement("div")
         div1.className = "sub1"
         div1.innerHTML = `<img src = "Images/${(data.img[i])}">
         <h3>${data.comment[i].name}</h3>
         <b id="time">at ${data.comment[i].createdAt}</b>`
         const div2 = document.createElement("div")
         div2.className = "sub2"
         div2.innerHTML = `<b>${data.comment[i].title}</b>
         <b>${data.comment[i].comment}</b>`
         post.appendChild(div1)
         post.appendChild(div2)
        }
    })
})