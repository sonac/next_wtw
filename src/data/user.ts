export const userFetcher = () => {
  const url = `https://server.triplan.club/validate`
  //const url = `http://localhost:8080/validate`
  if (document.cookie.includes("jwtToken")) {
    return fetch(url, {method: "GET", credentials: "include", headers: {
      "Content-Type": "application/json",
    }}).then((res) => {
      console.log(res)  
      return res.text()
    })
  }
}
