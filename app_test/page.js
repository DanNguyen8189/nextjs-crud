// import HomePage from './home-page'
// import prisma from '../lib/prisma_lib';

// export const metadata = {
//     title: 'My Page Title',
// }
   

// export async function getUsers(){
//     const users = await prisma.User.findMany();
//     return users
// };

// export default async function Page() {
//     // Fetch data directly in a Server Component
//     const users = await getUsers()
//     // Forward fetched data to your Client Component
//     return <HomePage users={users} />
// }
import React from 'react';

export default function HomePage() {
  return <div>This is my new App Route Home Page</div>;
}