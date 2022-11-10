import axios from "axios";

export const sendemail = async (req, res) => {
  
  const response = await axios.post("https://deploybackenddacn.onrender.com/sendgmail", req);

  return response;
};
