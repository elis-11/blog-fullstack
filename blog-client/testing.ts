export type User = {
  email: string,
  name: string
  age?: number
}

let everything: any = "hallo"
everything = 10
everything = true

// vaname: type
let user: User

user = { email: "rob@rob.com", name: "rob" }

const sayName = (user: User) => {
  console.log(user.name)
}

sayName(user)


// UNION TYPE
let strOrNum: string | number 

strOrNum = "10"
strOrNum = 5
// strOrNum = true // does not work to store boolean!


