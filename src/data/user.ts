export const userFetcher = () => {
  const url = `/api/validate`
  if (document.cookie.includes("jwtToken")) {
    return fetch(url, {method: "GET", credentials: "include", headers: {
      "Content-Type": "application/json",
    }}).then((res) => {
      return res.text()
    })
  }
}
