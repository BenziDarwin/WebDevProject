
users = []
list = []
if (window.location.pathname === "/Pages/chat.html") {
    displayMessages()
}

function imageHandler() {
    image = document.getElementById("profilepic")
    reader = new FileReader()
    reader.onload = () => {
        if(reader.readyState === 2) {
            image.src = reader.result;
        }
    }
    reader.readAsDataURL(event.target.files[0])
}

function checkPassword() {
    username = document.getElementById("username")
    password = document.getElementById("password")
    usersList = JSON.parse(sessionStorage.getItem("users"))
    usersList.forEach((x,i) => {
        if(x.name === username.value) {
            if (x.password === password.value) {
                window.location = "./chat.html"
            }
            else{
                console.log("Wrong password!")
            }
        }
        else {
            console.log("User doesn't exist")
        }
    })
         
}

function submitHandler() {
    username = document.getElementById("username")
    password = document.getElementById("password")
    personalStatement = document.getElementById("personalStatement")
    education = document.getElementById("education")
    hobbies = list
    user = {
        name: username.value,
        password: password.value,
        personalStatement: personalStatement.value,
        education: education.value,
        hobbies: hobbies
    }
    users.push(user)
    sessionStorage.setItem("users",JSON.stringify(users))
    sessionStorage.setItem("currentUser",username.value)
    console.log(JSON.parse(sessionStorage.getItem("users")))
    window.location = "./chat.html"
}
function hobbyHandler() {
    hobby = document.getElementById("hobby")
    list.push(hobby.value)
    hobby.value = ""
}

function displayMessages() {
    box = document.getElementById("box")
    box.innerHTML = "";
    if(sessionStorage.getItem("MessageList") !== null) {
        list = JSON.parse(sessionStorage.getItem("MessageList"))
        list.forEach((x,i) => {
            li = document.createElement("li")
            node = document.createTextNode(x.msg)
            if(x.user == sessionStorage.getItem("currentUser")) {
                li.appendChild(node)
                box.appendChild(li)
            }
            else {
                li.setAttribute("style", "text-align:right")
                li.appendChild(node)
                box.appendChild(li)
            }
        })
    }
}

function addMessage() {
    message = document.getElementById("textBox")
    list = []
    if(sessionStorage.getItem("MessageList") === null) {
        list.push({user:sessionStorage.getItem("currentUser"), msg:message.value})
        sessionStorage.setItem("MessageList", JSON.stringify(list))
    }
    else {
        list = JSON.parse(sessionStorage.getItem("MessageList"))
        list.push({user:sessionStorage.getItem("currentUser"), msg:message.value})
        sessionStorage.setItem("MessageList", JSON.stringify(list))
    }
    message.value = ""
    displayMessages()
}

function displayProfile() {
    userList =  
}