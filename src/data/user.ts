export const userFetcher = () => {
  if (document.cookie.includes("jwtToken")) {
    return fetch("http://localhost:8080/validate", {method: "GET", credentials: "include"}).then((res) => res.json())
  }
}
