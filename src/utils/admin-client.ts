export const ADMIN_KEY = "pf_admin_token";

export const getAdminToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token");
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
  
  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  headers.set("Content-Type", "application/json");

  return fetch(url, {
    ...options,
    headers,
  });
};