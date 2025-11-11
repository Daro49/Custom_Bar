import { activeUser } from "./Login.js";

export async function saveProfileChanges(loggedIn) {
  try {
    const response = await fetch(
      `https://itu-wb12.onrender.com/users/${loggedIn}/edit`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'newUsername': activeUser.value.username,
          'email': activeUser.value.email,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Profile update failed');
    }

    localStorage.setItem('activeUser', JSON.stringify(activeUser.value));
    return true;
  } catch (error) {
    console.error('Profile update error:', error);
    alert('Profile update error: ' + error.message);
    return false;
  }
}