export const userFetcher = () => {
  if (document.cookie.includes("jwtToken")) {
    return fetch(`http://${process.env.SERVER}/validate`, {method: "GET", credentials: "include", headers: {
      "Content-Type": "application/json",
    }}).then((res) => {
      console.log(res)  
      return res.text()
    })
  }
}
