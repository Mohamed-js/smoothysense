export const host = "https://smoothy-api.onrender.com";
// export const host = "http://localhost:4000";

export async function getProducts(token) {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(host + `/products`, options);

    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getProduct(slug, token) {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }

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
        Authorization: ``,
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

export const getCartItems = async (token) => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await fetch(host + `/cart-items`, options);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = async (product, quantity, token) => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

export const removeFromCart = async (product, token) => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    };

    const res = await fetch(host + `/cart-items/${product}`, options);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const minusFromCart = async (product, token) => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
    };

    const res = await fetch(host + `/cart-items/${product}`, options);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const placeOrder = async (order, token) => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify(order),
    };

    const res = await fetch(host + `/orders`, options);

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
