export default function authHeader() {
    const userStr = localStorage.getItem("user");
    let data = null;
    if (userStr)
      data = JSON.parse(userStr);
      console.log(data.user);
    if (data.user && data.user.token) {
      return { Authorization: 'Bearer ' + data.user.token }; // for Spring Boot back-end
      // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    } else {
      return { Authorization: '' }; // for Spring Boot back-end
      // return { 'x-access-token': null }; // for Node Express back-end
    }
  }