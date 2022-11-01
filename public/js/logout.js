const logout = async () => {
  const response = await fetch('/api/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/login');
  } else {
    const { message } = await response.json();
    showToast({ message });
  }
};

document.querySelector('#logout').addEventListener('click', logout);