function submitLoginForm() {
    var username = document.getElementById('email').value;
    var data = JSON.stringify({ "email": username });

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/login');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var responseData = JSON.parse(xhr.responseText);
            var redirectUrl = responseData.redirectUrl;
            console.log("Redirecting to:", redirectUrl);
            window.location.href = redirectUrl;
        } else {
            console.error('Request failed. Status:', xhr.status);
        }
    };
    xhr.onerror = function() {
        console.error('Request failed. Network error.');
    };
    xhr.send(data);
}
