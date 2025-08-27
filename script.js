
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
const messageArea = document.getElementById('message-area');
const siIdentifier = document.getElementById('si-identifier');
const siPassword = document.getElementById('si-password');

const fields = [
    nameField,
    emailField,
    passField,
    userNameField
];

if(localStorage.getItem('isAuthenticated') === 'true') {
    window.location.href = `https://s952p6zm-5501.inc1.devtunnels.ms/?username=${localStorage.getItem('username')}&nickname${localStorage.getItem('nickname')}`;
}

function showMessage(msg, type = 'info') {
        messageArea.style.display = 'block';
        messageArea.textContent = msg;
        messageArea.style.background = type === 'success' ? '#d4edda' : (type === 'error' ? '#f8d7da' : '#e2e3e5');
        messageArea.style.color = type === 'success' ? '#155724' : (type === 'error' ? '#721c24' : '#383d41');
        setTimeout(() => { messageArea.style.display = 'none'; }, 4000);
}

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
            showMessage("Please fill in all fields.", 'error');
            return;
        } else {
            details[field.name] = field.value;
        }
    }
    if(!details.userName.includes("@")) {
        details.userName = "@" + details.userName;
    }
    createAccount(details);
});

async function createAccount(details) {
    try {
        const response = await fetch('https://s952p6zm-8080.inc1.devtunnels.ms/signup', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(details)
        });
        if(response.ok) {
            const res = await response.json();
            showMessage(res.message || "Account created successfully!", 'success');
            // Redirect with username and nickname in query params
            const params = new URLSearchParams({
                username: details.userName || '',
                nickname: details.nickName || ''
            });
            localStorage.setItem('username', details.userName);
            localStorage.setItem('nickname', details.nickName);
            localStorage.setItem('isAuthenticated', 'true');
            window.location.href = `https://s952p6zm-5501.inc1.devtunnels.ms/?${params.toString()}`;
            // Optionally reset fields
            fields.forEach(f => f.value = "");
        } else {
            const err = await response.json().catch(() => ({}));
            showMessage(err.message || "Signup failed. Please try again.", 'error');
        }
    } catch (e) {
        showMessage("Network error. Please try again.", 'error');
    }
}

// LOGIN LOGIC
if (submitLogin) {
    submitLogin.addEventListener("click", async () => {
        if (!siIdentifier.value || !siPassword.value) {
            showMessage("Please enter your username/email and password.", 'error');
            return;
        }
        try {
            const response = await fetch('https://s952p6zm-8080.inc1.devtunnels.ms/login', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    identifier: siIdentifier.value,
                    password: siPassword.value
                })
            });
            if (response.ok) {
                const res = await response.json();
                showMessage(res.message || "Login successful!", 'success');
                // Redirect with username and nickname in query params
                const params = new URLSearchParams({
                    username: res.identifier,
                    nickname: res.nickName
                });

                localStorage.setItem('username', res.identifier);
                localStorage.setItem('nickname', res.nickName);
                localStorage.setItem('isAuthenticated', 'true');
                
                window.location.href = `https://s952p6zm-5501.inc1.devtunnels.ms/?${params.toString()}`;
                // Optionally reset fields
                siIdentifier.value = "";
                siPassword.value = "";
            } else {
                const err = await response.json().catch(() => ({}));
                showMessage(err.message || "Login failed. Please check your credentials.", 'error');
            }
        } catch (e) {
            showMessage("Network error. Please try again.", 'error');
        }
    });
}
