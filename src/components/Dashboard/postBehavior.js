import axios from "axios";

export const getPosts = async (req, res) => {
  const response = await axios.get("https://deploybackenddacn.onrender.com/Post/getAllpost", {
    headers: { Authorization: `Bearer ${req}` },
  });
  if (response.data.success) {
  }
  return response.data;
};

export const getPostsByMapId = async (req, res) => {
  const response = await axios.get(
    `https://deploybackenddacn.onrender.com/Post/GetPostsOfUserByMapid/${req}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return response.data;
};

// https://deploybackenddacn.onrender.com/Map/636a5e1faa9c6130f9788553 get one map by _id
export const getOneMapby_Id = async (req, res) => {
  const response = await axios.get(`https://deploybackenddacn.onrender.com/Map/${req}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};
export const updateMap = async (req, res) => {
  const response = await axios.put(
    `https://deploybackenddacn.onrender.com/Map/${localStorage.getItem("mapid")}`,
    { color: req },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return response.data;
};
export const createnewPost = async (req, res) => {
  const response = await axios.post("https://deploybackenddacn.onrender.com/Post/", req, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  return response;
};

export const DeletedPost = async (req, res) => {
  const response = await axios.delete(`https://deploybackenddacn.onrender.com/Post/${req}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

export const getOnePost = async (req, res) => {
  const response = await axios.post(
    `https://deploybackenddacn.onrender.com/Post/getOnePost/${req}`,
    {
      params: {
        _id: `${req}`,
      },
    },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return response.data;
};

export const EditPost = async (req, res) => {
  const response = await axios.put(
    `https://deploybackenddacn.onrender.com/Post/${req._id}`,
    req,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return response;
};

//init columns

export const initColumns = async (req, res) => {
  const response = await axios.post(`https://deploybackenddacn.onrender.com/columns`, req, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response;
};

//update columns
export const updateColumns = async (req, res) => {
  const response = await axios.put(
    `https://deploybackenddacn.onrender.com/columns/${req._id}`,
    req,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return response;
};

// https://deploybackenddacn.onrender.com/columns/updatetaskid/636cbb2dd87f89ac1186807d
export const updateTaskidColumns = async (req, res) => {
  const response = await axios.put(
    `https://deploybackenddacn.onrender.com/columns/updatetaskid/${req._id}`,
    { taskIds: [req.taskIds[0]] },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return response;
};
//getAll Columns
export const getAllColumns = async (req, res) => {
  const response = await axios.get(`https://deploybackenddacn.onrender.com/columns`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response;
};
//getAll Columns by map id
export const getColumnsByMapId = async (req, res) => {
  const response = await axios.get(`https://deploybackenddacn.onrender.com/columns/${req}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};
//Deleted Columns
export const DeletedColumns_ByID = async (req, res) => {
  const response = await axios.delete(`https://deploybackenddacn.onrender.com/columns/${req}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response;
};
//get one column by id body
export const getOneColumsByidBody = async (req, res) => {
  const response = await axios.post(
    "https://deploybackenddacn.onrender.com/columns/getIdinit",
    req,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return response.data;
};

//init columnOrder

export const initColumnOrder = async (req, res) => {
  const response = await axios.post(`https://deploybackenddacn.onrender.com/columnorder`, req, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response;
};

export const getAllColumnOrder = async (req, res) => {
  const response = await axios.get(`https://deploybackenddacn.onrender.com/columnorder`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response;
};
//Update ColumnOrder https://deploybackenddacn.onrender.com/columnorder/
export const updateColumnOrder = async (req, res) => {
  const response = await axios.put(
    `https://deploybackenddacn.onrender.com/columnorder/${req._id}`,
    req,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return response;
};

export const getOneColums = async (req, res) => {
  const response = await axios.post(
    `https://deploybackenddacn.onrender.com/columns/${req}`,
    {
      params: {
        _id: `${req}`,
      },
    },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return response.data;
};
