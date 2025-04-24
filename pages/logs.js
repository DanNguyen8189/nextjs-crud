import Link from 'next/link'
import React, { useState, useEffect } from 'react'

// this technically works, but ... this data probably shouldn't be publicky cached??
// export async function getStaticProps(){
//     const logs = await prisma.Log.findMany();

//     //can't return a map object here
//     return {
//         props: { logs },
//     };
// };

// export async function getServerSideProps(){
//     const logs = await prisma.Log.findMany();

//     //can't return a map object here
//     return {
//         props: { logs },
//     };
// };

/** This component itself can't be async, but the above can? To get the data*/
export default function Page() {
    const [logs, setLogs] = useState([]);

    // look at database to see all tag options
    useEffect(() => {
    async function fetchData() {
        try{
            const response = await fetch(`/api/logs`, {
                method: 'GET'
            })
            const logsArray = await response.json(); // properly turns response into array
            setLogs(logsArray);
            //console.log("from useeffect logs response: ", logsArray)
            // console.log("fromgetstaticprops: ", logs)
        } catch (e) {
            console.error(e)
        }
    }
    fetchData();
    }, []);

    async function deleteLog(id) {
        try {
            // https://react.dev/learn/updating-arrays-in-state
            //console.log("deleting log id: ", id);
            const response = await fetch(`/api/logs/${id}`, {
                method: 'DELETE'
            })
            if (response.ok){
                setLogs(logs.filter(l => l.id != id));
            }
            // const data = await response.json()
            // console.log(data)
        } catch (e){
            console.error(e)
        }
        
    }

    return (
    <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">Logs</h1>
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
            <p>No logs recorded yet!</p>
        )}
        </ul>
        {/* <button onClick={createLog}>createLogtest</button> */}
        <Link href="/createLog">Add a log</Link>
    </main>
    );
}