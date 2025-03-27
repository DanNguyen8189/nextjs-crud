import prisma from '../lib/prisma_lib';
import Link from 'next/link'

export async function getStaticProps(){
    const logs = await prisma.Log.findMany();

    //can't return a map object here
    return {
        props: { logs },
    };
};

// export async function getServerSideProps(){
//     const logs = await prisma.Log.findMany();

//     //can't return a map object here
//     return {
//         props: { logs },
//     };
// };

/** This component itself can't be async, but the above can? To get the data*/
export default function Page({logs}) {
    async function deleteLog(id) {
        try {
            //logs.delete(id)
            console.log(logs)
            // Handle response if necessary
            // const data = await response.json()
            // console.log(data)
            // ...
        } catch (error) {
            // Capture the error message to display to the user
            //setError(error.message)
            console.error(error)
        } finally {
        }
    }

    return (
    <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">Crashouts</h1>
        <ul className="space-y-2">
        {logs.length > 0 ? (
            logs.map(log => (
            <li key={log.id} className="p-4 border rounded shadow-sm">
                <p>{log.title}</p>
                <p>Description: {log.description || ''}</p>
                <button onClick={()=>deleteLog(log.id)}>x</button>
            </li>
            ))
        ) : (
            <p>No crashouts recorded yet. Start tweaking!</p>
        )}
        </ul>
        {/* <button onClick={createLog}>createLogtest</button> */}
        <Link href="/createLog">Add a crashout</Link>
    </main>
    );
}