import prisma from '../lib/prisma_lib';
// import { createUser } from '/api/api'

//useful to look at too for later: getServerSideProps: https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props
export async function getStaticProps(){
  const users = await prisma.User.findMany(
    // where: { published: true },
    // include: {
    //   author: {
    //     select: { name: true },
    //   },
    // },
  );
  return {
    props: { users },
  };
};


/** This component itself can't be async, but the above can? To get the data*/
export default function Page({users}) {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <ul className="space-y-2">
        {users.length > 0 ? (
          users.map(user => (
            <li key={user.id} className="p-4 border rounded shadow-sm">
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Name:</strong> {user.name || 'N/A'}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </li>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </ul>
      {/* <button onClick={createUser}>createUsertest</button> */}
    </main>
  );
}