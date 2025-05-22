const API_URL = "http://localhost:5000/api"; // backend URL


export async function fetchSoftwareList() {
  const res = await fetch("http://localhost:5000/api/software", {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch software list");
  }

  return res.json();
}

export async function submitRequest(
  softwareId: number,
  accessType: string,
  reason: string,
  token: string
) {
  const res = await fetch("http://localhost:5000/api/requests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ softwareId, accessType, reason }),
  });

  if (!res.ok) {
    throw new Error("Request submission failed");
  }

  return res.json();
}

export async function signupUser(username: string, password: string) {
  const res = await fetch("http://localhost:5000/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error("Signup failed");
  return res.json();
}

export async function loginUser(username: string, password: string) {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function createSoftware(
  name: string,
  description: string,
  accessLevels: string[],
  token: string
) {
  const res = await fetch("http://localhost:5000/api/software", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, description, accessLevels }),
  });

  if (!res.ok) {
    throw new Error("Failed to create software");
  }

  return res.json();
}
export async function fetchAllRequests(token: string) {
  const res = await fetch("http://localhost:5000/api/requests", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Failed to fetch requests");
  return res.json();
}

export async function updateRequestStatus(id: number, status: string, token: string) {
  const res = await fetch(`http://localhost:5000/api/requests/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error("Failed to update status");
  return res.json();
}
