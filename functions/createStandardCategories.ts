export const createStandardCategories = async (
  id: string,
  email: string,
  password: string
) => {
  const schoolBody = {
    userId: id,
    title: "School",
  }

  const freetimeBody = {
    userId: id,
    title: "Free time",
  }

  const otherBody = {
    userId: id,
    title: "Other",
  }

  const authHeader = `Basic ${btoa(`${email}:${password}`)}`

  const schoolRes = await fetch(`../api/category/new`, {
    // ändrat denna till signup

    method: "POST", // byter metod till POST
    credentials: "include" as RequestCredentials,
    body: JSON.stringify(schoolBody),
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
  })
  const schoolJson = await schoolRes.json()
  const schoolData = JSON.parse(JSON.stringify(schoolJson.result))

  const freeRes = await fetch(`../api/category/new`, {
    // ändrat denna till signup

    method: "POST", // byter metod till POST
    credentials: "include" as RequestCredentials,
    body: JSON.stringify(freetimeBody),
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
  })
  const freeJson = await freeRes.json()
  const freeData = JSON.parse(JSON.stringify(freeJson.result))

  const otherRes = await fetch(`../api/category/new`, {
    // ändrat denna till signup

    method: "POST", // byter metod till POST
    credentials: "include" as RequestCredentials,
    body: JSON.stringify(schoolBody),
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
  })
  const otherJson = await otherRes.json()
  const otherData = JSON.parse(JSON.stringify(otherJson.result))

  return [schoolData, freeData, otherData]
}
