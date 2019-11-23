 const users = [
    {
      id: 1,
      username: 'danijela123',
      email: 'danijela123@gmail.com' ,
      age: 24
    },
    {
      id: 2,
      username: 'jojo007',
      email: 'jojo007@gmail.com' ,
      age: 26
    },
    {
      id: 3,
      username: 'michaela456',
      email: 'mikaela456@gmail.com' ,
      age: 28
    },
    {
      id: 4,
      username: 'beckyg414',
      email: 'beckyg4146@gmail.com' ,
      age: 30
    }
  ]
  
  export const sleep = m => new Promise(r => setTimeout(r, m))
  
  export const fetchUserList = () => {
    return users 
  }