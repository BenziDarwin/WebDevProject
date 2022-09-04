
users = []
list = []
console.log(users)
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
    users.push(event.target.value);
    console.log(event.target.value)
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
    console.log(JSON.parse(sessionStorage.getItem("users")))
    window.location = "./chat.html"
}
function hobbyHandler() {
    hobby = document.getElementById("hobby")
    list.push(hobby.value)
    hobby.value = ""
}