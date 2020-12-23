import bcrypt from 'bcryptjs'

const users = [
    {
        firstname: 'Admin',
        lastname: 'User',
        last: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        firstname: 'John',
        lasttname: 'Doe',
        email: 'john@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
    {
        firstname: 'Jane',
        lastname: 'Doe',
        email: 'jane@gmail.com',
        password: bcrypt.hashSync('123456', 10),
       
    }
    

]

export default users