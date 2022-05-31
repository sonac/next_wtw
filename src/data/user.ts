export const userFetcher = () => {
  //const url = `https://server.triplan.club/validate`
  console.log('validating')
  const url = `/api/validate`
  if (document.cookie.includes("jwtToken")) {
    return fetch(url, {method: "GET", credentials: "include", headers: {
      "Content-Type": "application/json",
    }}).then((res) => {
      console.log(res)  
      return res.text()
    })
  }
}
