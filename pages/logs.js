import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Avatar, Group, Paper, Text, TypographyStylesProvider, Button, Badge, Loader} from '@mantine/core';
//import classes from '@styles/CommentHtml.module.css';
import CreateLog from './createLog'
import classes from '../styles/logs.module.css'

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
    const [isLoading, setIsLoading] = useState(false)

    // look at database to see all tag options
    useEffect(() => {
    async function fetchData() {
        try{
            setIsLoading(true) // Set loading to true when the request starts
            const response = await fetch(`/api/logs`, {
                method: 'GET'
            })
            const logsArray = await response.json(); // properly turns response into array
            setLogs(logsArray);
            setIsLoading(false);
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
        <div className={classes.body}>
        <CreateLog/>
        {(isLoading) && <div className={classes.loader}><Loader color="blue" size="xl" /></div>}
        {(!isLoading && logs.length <= 0) && <p>No logs recorded</p>}
        {(!isLoading && logs.length > 0) &&
            <ul className="space-y-2" style={{listStyleType:'none'}}>
                {logs.map(log => (
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
                    <Text pl={54} pt="sm" size="sm">
                        {log.description || ''}
                    </Text>
                    <ul className="space-y-2" style={{listStyleType:'none', display:'flex'}}>
                        {(log.tags).length > 0 ? (
                            log.tags.map(tag => (
                            <li key={tag.id} className="p-4 border rounded shadow-sm">
                                <Badge color="cyan" radius="sm">{tag.name}</Badge>
                            </li>
                            ))
                        ) : (
                            <p></p>
                        )}
                    </ul>
                    <Button onClick={()=>deleteLog(log.id)} variant="filled" size="xs">x</Button>
                    </Paper>
                </li>
                ))
            }
            </ul>
        }
        </div>
    );
}
