document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        username: this.username.value,
        password: this.password.value,
        email: this.email.value
    };

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
});
