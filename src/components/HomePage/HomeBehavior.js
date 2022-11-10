import axios from "axios";
export const getAllMaps = async (req, res) => {
  const response = await axios.get(
    `https://deploybackenddacn.onrender.com/Auth/getAllMapOfUser`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return response.data;
};
export const updateMap = async (req, res) => {
  const response = await axios.put(
    `https://deploybackenddacn.onrender.com/Auth/updateMap/${localStorage.getItem("userid")}`,
    req,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return response;
};
//https://deploybackenddacn.onrender.com/Auth/updateMap/63666837deb4718624994e86 https://deploybackenddacn.onrender.com/Map/

//create Map
export const createMaps = async (req, res) => {
  const response = await axios.post(`https://deploybackenddacn.onrender.com/Map/`, req, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};
//Delete Map https://deploybackenddacn.onrender.com/Map/
export const deletedMap = async (req, res) => {
  const response = await axios.delete(`https://deploybackenddacn.onrender.com/Map/${req}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

//POST https://deploybackenddacn.onrender.com/Map/getAllMapById/63675d975f206c1fbd4d0035 get all map

export const getAllByMapId = async (req, res) => {
  const response = await axios.get(`https://deploybackenddacn.onrender.com/Map/getAllMapById/`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};
