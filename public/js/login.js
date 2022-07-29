const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const name = document.querySelector('#login-username').value.trim();
    const password = document.querySelector('#login-password').value.trim();
  
    if (name && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ name, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('response');
      console.log(response);
      console.log(response.ok);
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/home');
      } else {
        alert(response.statusText);
      }
    }
  };
  
document
  .querySelector('#login')
  .addEventListener('click', loginFormHandler);
  