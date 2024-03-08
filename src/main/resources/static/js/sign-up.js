function submitSignUpForm() {
    var username = document.getElementById('username').value;
    var data = JSON.stringify({ "email": username });

    fetch('/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/login';
        } else {
            console.error('Sign-up failed. Status:', response.status);
        }
    })
    .catch(error => console.error('Sign-up failed:', error));
}
