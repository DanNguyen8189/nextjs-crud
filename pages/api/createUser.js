
import prisma from '../../lib/prisma_lib';

// export async function createUser(){
//     const user = await prisma.user.create({
//         data: {
//           name: 'Karina',
//           email: 'kdelgado@dancestudio.com',
//         },
//       })
//       console.log(user)
// };

// req = HTTP incoming message, res = HTTP server response
export default async function handler(req, res) {
    const user = await prisma.user.create({
        data: {
          name: 'Karina',
          email: 'kdelgado@dancestudio.com',
        },
      })
      console.log(user)
    res.status(200).json({ text: 'Hello' });
    // ...
}