import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Avatar, Group, Paper, Text, TypographyStylesProvider, Button, Badge} from '@mantine/core';
//import '@styles/CommentHtml.module.css'
import classes from '@styles/CommentHtml.module.css';

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
            // console.log("logsarray" + JSON.stringify(logsArray[15].tags));
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
    // <main className="p-8">
    //     <h1 className="text-2xl font-bold mb-4">Logs</h1>
    //     <ul className="space-y-2">
    //     {logs.length > 0 ? (
    //         logs.map(log => (
    //         <li key={log.id} className="p-4 border rounded shadow-sm">
    //             <p>{log.title}</p>
    //             <p>Description: {log.description || ''}</p>
    //             <button onClick={()=>deleteLog(log.id)}>x</button>
    //         </li>
    //         ))
    //     ) : (
    //         <p>No logs recorded yet!</p>
    //     )}
    //     </ul>
    //     <Link href="/createLog">Add a log</Link>
    // </main>

        <ul className="space-y-2" style={{listStyleType:'none'}}>
        {logs.length > 0 ? (
            logs.map(log => (
            <li key={log.id}>
                <Paper withBorder radius="md" className={classes.comment}>
                <Group>
                    <Avatar
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                    alt="Jacob Warnhalter"
                    radius="xl"
                    />
                    <div>
                    <Text fz="sm">{log.title}</Text>
                    <Text fz="xs" c="dimmed">
                        10 minutes ago
                    </Text>
                    </div>
                </Group>
                {/* <TypographyStylesProvider className={classes.body}>
                    <div
                    className={classes.content}
                    dangerouslySetInnerHTML={{
                        __html:
                        `<p>${log.description || ""}</p>`,
                    }}
                    />
                </TypographyStylesProvider> */}
                <Text pl={54} pt="sm" size="sm">
                    {log.description || ''}
                </Text>
                <ul className="space-y-2" style={{listStyleType:'none', display:'flex'}}>
                    {(log.tags).length > 0 ? (
                        log.tags.map(tag => (
                        <li key={tag.id} className="p-4 border rounded shadow-sm">
                            {/* <p>{tag.name}</p> */}
                            <Badge color="cyan" radius="sm">{tag.name}</Badge>
                        </li>
                        ))
                    ) : (
                        <p></p>
                    )}
                </ul>
                <Button onClick={()=>deleteLog(log.id)} variant="filled" size="xs">x</Button>
                {/* <button onClick={()=>deleteLog(log.id)}>x</button> */}
                </Paper>
            </li>
            ))
        ) : (
            <p>No logs recorded yet!</p>
        )}
        </ul>
    );
}