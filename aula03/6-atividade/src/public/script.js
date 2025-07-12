document.getElementById('loginForm').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const data = { email: form.email.value, password: form.password.value };
  const resp = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include'
  });
  if (resp.ok) {
    console.log('Login OK');
    console.log('Cookies disponíveis:', document.cookie);
  } else {
    alert('Falha no login');
  }
});
