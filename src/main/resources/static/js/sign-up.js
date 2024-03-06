function submitSignUpForm() {
    var username = document.getElementById('username').value;
    var data = JSON.stringify({ "email": username });

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/sign-up');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Redirect to the login page upon successful sign-up
            window.location.href = '/';
        } else {
            console.error('Request failed. Status:', xhr.status);
            // Handle error response
        }
    };
    xhr.onerror = function() {
        console.error('Request failed. Network error.');
        // Handle network error
    };
    xhr.send(data);
}
