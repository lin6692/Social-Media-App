export default class Auth {
  async createUser(formData) {
    const savedUserResponse = await fetch(
      `${process.env.SERVER_URL}/auth/register`,
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    return savedUser;
  }

  async login(data) {
    const loggedInResponse = await fetch(
      `${process.env.SERVER_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const loggedIn = await loggedInResponse.json();
    return loggedIn;
  }
}
