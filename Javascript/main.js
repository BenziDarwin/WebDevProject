list = []
displayMessages()
editProfile()
hobbyHandler()

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
    image = document.getElementById("profilepic")
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
    sessionStorage.setItem("currentUserDetails", "")
    window.location = "../index.html"
}

function editProfile() {
    userData = JSON.parse(sessionStorage.getItem("currentUserDetails"))
    user = document.getElementById("username")
    password = document.getElementById("password")
    statement = document.getElementById("personalStatement")
    education = document.getElementById("education")
    hobbies = document.getElementById("hobby")
    listOfHobbies = document.getElementById("listOfHobbies")
    hobbyList = userData.hobbies
    hobbyList.forEach((x,i) => {
    li = document.createElement("li")
    node = document.createTextNode(x)
    li.appendChild(node)
    listOfHobbies.appendChild(li)
    })
    user.value = "top"
    console.log("Maple")
    statement.value = userData.personalStatement
    education.value = userData.education
}

function editHandler() {
    
}