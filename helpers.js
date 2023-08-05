import { getToken } from "./auth";
const host = "https://smoothy-api.onrender.com";
// const host = "http://localhost:3000";

export async function getProducts() {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(host + `/products`, options);

    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getProduct(slug) {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(host + `/products/${slug}`, options);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getBlogPosts() {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        authorization: ``,
      },
      method: "GET",
      // Body if post request
    };

    const res = await fetch(host + `/blogposts`, options);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getBlogPost(slug) {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(host + `/blogposts/${slug}`, options);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

export const getCartItems = async (setter) => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
    };

    console.log(`Bearer ${await getToken()}`);

    const res = await fetch(host + `/cart-items`, options);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = async (product, quantity) => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
      method: "POST",
      body: JSON.stringify({ product, quantity }),
    };

    const res = await fetch(host + `/cart-items`, options);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = async (product) => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
      method: "DELETE",
    };

    const res = await fetch(host + `/cart-items/${product}`, options);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const minusFromCart = async (product) => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
      method: "PATCH",
    };

    const res = await fetch(host + `/cart-items/${product}`, options);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const placeOrder = async (order) => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
      method: "POST",
      body: JSON.stringify(order),
    };

    const res = await fetch(host + `/orders`, options);
    // return await res.json();
    return { message: "Successfully Placed Order" };
  } catch (error) {
    console.log(error);
  }
};

export const userSignup = async (creds) => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(creds),
    };

    const res = await fetch(host + `/registrations`, options);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const userLogin = async (creds) => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(creds),
    };

    const res = await fetch(host + `/sessions`, options);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
