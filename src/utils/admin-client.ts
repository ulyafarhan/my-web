export const ADMIN_KEY = "pf_admin_token";

export const getAdminToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(ADMIN_KEY);
  }
  return null;
};

export const setAdminToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(ADMIN_KEY, token);
  }
};

export const logoutAdmin = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ADMIN_KEY);
    window.location.href = "/admin/login";
  }
};

export const adminFetch = async (url: string, options: RequestInit = {}) => {
  const token = getAdminToken();
  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };

  const res = await fetch(url, { ...options, headers });
  if (res.status === 401) {
    logoutAdmin();
    throw new Error("Unauthorized");
  }
  return res;
};