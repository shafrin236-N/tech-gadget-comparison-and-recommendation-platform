const API_URL = "http://127.0.0.1:8000";

export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Registration failed");
  }

  return data;
}


export async function loginUser(loginData) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(loginData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Login failed");
  }

  return data;
}


export async function getGadgets(search = "") {
  const url = search
    ? `${API_URL}/gadgets/?search=${encodeURIComponent(search)}`
    : `${API_URL}/gadgets/`;

  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Unable to load gadgets");
  }

  return data;
}


export async function getGadget(gadgetId) {
  const response = await fetch(
    `${API_URL}/gadgets/${gadgetId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Gadget not found");
  }

  return data;
}