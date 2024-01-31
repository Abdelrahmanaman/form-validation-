const postalCode = document.getElementById("postal");
const city = document.getElementById("city");
const form = document.querySelector("form");
const btn = document.querySelector("button");
const confirmPasswordInput = document.getElementById("confirmpassword");
const passwordInput = document.getElementById("password");





//** */ Function to fetch the suggestions based on postal code prefix **//
const getUserAddress = async () => {
    const postalCodeValue = postalCode.value
    const postalCodeUrl = `https://geo.api.gouv.fr/communes?codePostal=${postalCodeValue}`
    const departementCodeUrl = `https://geo.api.gouv.fr/departements/${postalCodeValue}/communes`


    try {

        // Creating if statments for department and city 
        if (postalCodeValue.length === 2) {
            let result = await fetch(departementCodeUrl);
            let response = await result.json();
            response.forEach((department) => {
                let appendOptions = document.createElement("option")
                appendOptions.textContent = department.nom;
                appendOptions.value = department.code
                city.appendChild(appendOptions)

            })

        } else if (postalCodeValue.length === 5) {
            let result = await fetch(postalCodeUrl);
            let response = await result.json();
            const appendOption = document.createElement("option")
            appendOption.textContent = response[0].nom
            appendOption.value = response[0].code
            city.appendChild(appendOption)

        } else return

    } catch (error) {
        console.log(`Failed to fetch data ${error.message}`);

    }
};
postalCode.addEventListener("change", getUserAddress)


//* Creating a password validation function *//
const isValidPassword = (password) => {
    const charError = document.querySelector(".longchar");
    const majError = document.querySelector(".maj");
    const chifError = document.querySelector(".chif");
    const charSpError = document.querySelector(".charsp");

    charError.style.color = "";
    majError.style.color = "";
    chifError.style.color = "";
    charSpError.style.color = "";
    passwordInput.style.border = ""


    
    if (password.length < 8) {
        charError.style.color = "red"
        passwordInput.style.border = "2px solid red"
    }

    if (!/[a-z]/.test(password)) {
        charError.style.color = "red"
        passwordInput.style.border = "2px solid red"

    }

    if (!/[A-Z]/.test(password)) {
        majError.style.color = "red"
        passwordInput.style.border = "2px solid red"

    }

    if (!/[0-9]/.test(password)) {
        chifError.style.color = "red"
        passwordInput.style.border = "2px solid red"

    }

    if (!/[^a-zA-Z0-9]/.test(password)) {
        charSpError.style.color = "red"
    }
    return true
}

    const validPassword = () => {
    const password = passwordInput.value
    if (isValidPassword(password)) {
        console.log(" good")
    }
    else {
        console.log("not good")
    }
    isPasswordMatch()
}

//* A function to check the password Match *//

const isPasswordMatch = () => {
    const confirmPassword = confirmPasswordInput.value;
    const password = passwordInput.value

    if (confirmPassword === password) {
        console.log("password Match")
        confirmPasswordInput.style.border = ""


    }
    else {
        console.log("password no match ")
        confirmPasswordInput.style.border = "2px solid red"

    }

}

passwordInput.addEventListener("input", validPassword)
confirmPasswordInput.addEventListener("input", validPassword)



form.addEventListener("submit", function(){
    event.preventDefault()
    console.log("testt")
})
    