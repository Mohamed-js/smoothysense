export const setToken = (token) => {
  localStorage.setItem("smoothy-token", JSON.stringify(token));
};

export const getToken = async () => {
  if (typeof window !== "undefined") {
    const token = JSON.parse(localStorage.getItem("smoothy-token"));

    if (token) {
      const isValid = await isAuthenticated(token);
      if (isValid) {
        console.log(token);
        return token;
      } else {
        localStorage.removeItem("smoothy-token");
        location.reload();
      }
    } else {
      return false;
    }
  }
};

async function isAuthenticated(token) {
  const host = "https://smoothy-api.onrender.com";
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    const res = await fetch(host + `/auth`, options);
    const data = await res.json();
    if (data.message && data.message === "exists") {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
}
