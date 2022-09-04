
users = []

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
    username = document.body.getElementById("username")
    password = document.body.getElementById("password")
    personalStatement = document.body.getElementById("personalStatement")
    education = document.body.getElementById("education")
    hobbies = document.body.getElementById ("hobbies")
    user = {
        name: username.value,
        password: password.value,
        personalStatement: personalStatement.value,
        education: education.value,
        hobbies: hobbies.value
    }
    users.push(user)
    console.log(users)
}
list = []
function hobbyHandler() {
    hobby = document.getElementById("hobby")
    list.push(hobby.value)
    console.log(list)
}