const createAcconutBtn = document.querySelectorAll('#btn-create');
const signinBtn = document.querySelectorAll('#btn-signin');
const creationCard = document.getElementById('signup-card');
const loginCard = document.getElementById('signin-card');
const ctaStack = document.getElementById('cta-stack');
const headline = document.querySelector('.headlinespan');
const subheadline = document.querySelector('.sub');
const submitCreation = document.getElementById("btn-signup-submit");
const submitLogin = document.getElementById("btn-signin-submit");
const nameField = document.getElementById('su-name');
const userNameField = document.getElementById('su-username');
const emailField = document.getElementById('su-email');
const passField = document.getElementById('su-password');
// const dayField = document.getElementById('su-dob-d');
// const monthField = document.getElementById('su-dob-m');
// const yearField = document.getElementById('su-dob-y');

const fields = [
  nameField,
  emailField,
  passField,
  userNameField
];

createAcconutBtn.forEach(btn => btn.addEventListener("click", () => {
    creationCard.style.display = 'flex';
    ctaStack.style.display = 'none';
    loginCard.style.display = 'none';
    headline.style.display = 'none';
    subheadline.style.display = 'none';
}));

signinBtn.forEach(btn => btn.addEventListener("click", () => {
    creationCard.style.display = 'none';
    ctaStack.style.display = 'none';
    loginCard.style.display = 'flex';
    headline.style.display = 'none';
    subheadline.style.display = 'none';
}));

submitCreation.addEventListener("click", () => {
    let details = {
        nickName: "",
        email: "",
        password: "",
        userName: ""
    }
    for(let field of fields) {
        if (field.value == "" || !field.value) {
            console.error("Canceled Execution! Due incomplete info.");
            return;            
        } else {
            details[field.name] = field.value;
        }
    }
    // console.log(details);
    createAccount(details);
});

async function createAccount(details) {
    const response = await fetch('https://s952p6zm-8080.inc1.devtunnels.ms/signup', 
        {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(details)
        }
    )

    if(response.ok) {
        const res = await response.json()
        console.log(res)
    }
    else {
        console.error(response)
    }

}