const url = process.env.REACT_APP_API_URI;

export const signup = (user) => {
  return fetch(`${url}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const activate = (data) => {
  return fetch(`${url}/activate`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (data) => {
  return fetch(`${url}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const forgotPassword = (data) => {
  return fetch(`${url}/forgot-password`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const resetPassword = (data) => {
  return fetch(`${url}/reset-password`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const createBooking = async (data) => {
  const token = await localStorage.getItem("token");
  const auth = "Bearer " + token;
  return fetch(`${url}/createBookings`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}

export const logout = () => {
  localStorage.clear();
}
