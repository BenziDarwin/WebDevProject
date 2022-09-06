list = []
displayMessages()
editProfile()
hobbyHandler()

function imageHandler() {
    image = document.getElementById("profile")
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
                sessionStorage.setItem("currentUserDetails",JSON.stringify(x))
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
    image = document.getElementById("profile")
    username = document.getElementById("username")
    password = document.getElementById("password")
    personalStatement = document.getElementById("personalStatement")
    education = document.getElementById("education")
    hobbies = list
    user = {
        img: image.src,
        name: username.value,
        password: password.value,
        personalStatement: personalStatement.value,
        education: education.value,
        hobbies: hobbies
    }
    
    if (JSON.parse(sessionStorage.getItem("users")) !== null) {
        users = JSON.parse(sessionStorage.getItem("users"))
        users.push(user)
        sessionStorage.setItem("users",JSON.stringify(users))
    }else{
        users = []
        users.push(user)
        sessionStorage.setItem("users",JSON.stringify(users))
    }
    sessionStorage.setItem("currentUser",username.value)
    sessionStorage.setItem("currentUserDetails",JSON.stringify(user))
    console.log(JSON.parse(sessionStorage.getItem("users")))
    window.location = "./chat.html"
}
function hobbyHandler() {
    hobby = document.getElementById("hobby")
    if(sessionStorage.getItem("currentUserDetails")!== null) {
        details = JSON.parse(sessionStorage.getItem("currentUserDetails"))
        list = details.hobbies
        list.push(hobby.value)
        details.hobbies = list
        sessionStorage.setItem("currentUserDetails", JSON.stringify(details))
        hobby.value = ""
        hobbyList = document.getElementById("hobbyList")
        hobbyList.innerHTML = ""
        list.forEach((x,i) => {
        li = document.createElement("li")
        li.value = i
        node = document.createTextNode(x)
        li.appendChild(node)
        hobbyList.appendChild(li)
        })
    } else {
        list.push(hobby.value)
        hobby.value = ""
        hobbyList = document.getElementById("hobbyList")
        hobbyList.innerHTML = ""
        list.forEach((x,i) => {
            li = document.createElement("li")
            node = document.createTextNode(x)
            li.appendChild(node)
            hobbyList.appendChild(li)
            })
    }
}
function displayMessages() {
    box = document.getElementById("box")
    box.innerHTML = "";
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

function logout() {
    sessionStorage.removeItem("currentUserDetails")
    window.location = "../index.html"
}

function editHandler() {
    image = document.getElementById("profile")
    username = document.getElementById("username")
    password = document.getElementById("password")
    personalStatement = document.getElementById("personalStatement")
    education = document.getElementById("education")
    details = JSON.parse(sessionStorage.getItem("currentUserDetails"))
    hobbies = details.hobbies
    user = {
        img: image.src,
        name: username.value,
        password: password.value,
        personalStatement: personalStatement.value,
        education: education.value,
        hobbies: hobbies
    }
    sessionStorage.setItem("currentUserDetails", JSON.stringify(user))
    users = JSON.parse(sessionStorage.getItem("users"))
    users.forEach((x,i) => {
        if(x.name === user.name) {
            x.name = user.name
            x.img = user.img
            x.password = user.password
            x.personalStatement = user.personalStatement
            x.education = user.education
            x.hobbies = user.hobbies
        }
    })
    sessionStorage.setItem("users",JSON.stringify(users))
    window.location = "./display.html"
}

function resetHobbyList() {
    user = JSON.parse(sessionStorage.getItem("currentUserDetails"))
    user.hobbies = []
    users = JSON.parse(sessionStorage.getItem("users"))
    users.forEach((x,i) => {
        if(x.name === user.name) {
            x.name = user.name
            x.img = user.img
            x.password = user.password
            x.personalStatement = user.personalStatement
            x.education = user.education
            x.hobbies = []
        }
    })
    sessionStorage.setItem("users", JSON.stringify(users))
    sessionStorage.setItem("currentUserDetails", JSON.stringify(user))
    location.reload()
    console.log("List Reset")
}