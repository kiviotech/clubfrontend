import axios from "axios";

const signupUser = async (email, username, password) => {
  try {
    // Replace with your Strapi instance URL
    const response = await axios.post('http://localhost:1337/api/register', {
        email,
        username,
        password,
      });
      
    alert(response.data.message); // Show success message from Strapi
  } catch (error) {
    console.error(error.response?.data || error.message); // Log error
    alert('Error during signup.');
  }
};

export default signupUser;
