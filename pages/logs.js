import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Avatar, Group, Paper, Text, Button, Badge, Loader, Menu} from '@mantine/core';
//import classes from '@styles/CommentHtml.module.css';
import CreateLog from './createLog'

import {
    IconSettings,
    IconSearch,
    IconPhoto,
    IconMessageCircle,
    IconTrash,
    IconArrowsLeftRight,
    IconDots,
    IconEdit,
    IconSunFilled
} from '@tabler/icons-react';

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
    const [opened, setOpened] = useState(false); // menu items

    async function fetchData() {
        try{
            setIsLoading(true) // Set loading to true when the request starts
            const response = await fetch(`/api/logs`, {
                method: 'GET'
            })
            let logsArray = await response.json(); // properly turns response into array
            logsArray = logsArray.reverse()
            setLogs(logsArray);
            setIsLoading(false);
        } catch (e) {
            console.error(e)
        }
    }

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

    const onSignal = () => {
        //console.log('Signal received from child:', data);
        // Perform actions based on the signal
        fetchData();
    };

    // look at database to get all logs
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={classes.body}>
        <CreateLog onSignal={onSignal}/>
            {/* <Alert variant="light" color="blue" title="Alert title">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. At officiis, quae tempore necessitatibus placeat saepe.
    </Alert> */}
        {(isLoading) && <div className={classes.loader}><Loader color="blue" size="xl" /></div>}
        {(!isLoading && logs.length <= 0) && <p>No logs recorded</p>}
        {(!isLoading && logs.length > 0) &&
            <ul style={{listStyleType:'none'}}>
                {logs.map(log => (
                <li key={log.id}>
                    <Paper withBorder radius="md" className={classes.comment}>
                    <Group>
                        {/* <Avatar
                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                        alt="Jacob Warnhalter"
                        radius="xl"
                        /> */}
                        <IconSunFilled size={30} />
                        <div>
                        <Text fz="sm">{log.title}</Text>
                        <Text fz="xs" c="dimmed">
                            some time ago
                        </Text>
                        <Text pt="sm" size="sm">
                            {log.description || ''}
                        </Text>
                        </div>
                    </Group>

                    <Menu shadow="md" width={200} className={classes.menu}>
                        <Menu.Target>
                            <IconDots size={20}/>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item leftSection={<IconEdit size={14} />}>
                            Edit
                            </Menu.Item>
                            <Menu.Item 
                                color="red" leftSection={<IconTrash size={14} />}
                                onClick={()=>deleteLog(log.id)}>
                            Delete
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                    <ul className={classes.tags}>
                        {(log.tags).length > 0 ? (
                            log.tags.map(tag => (
                            <li key={tag.id} className={classes.tag}>
                                <Badge variant="light" tt="none" color="cyan" radius="sm">{tag.name}</Badge>
                            </li>
                            ))
                        ) : (
                            <p></p>
                        )}
                    </ul>
                    {/* <Button onClick={()=>deleteLog(log.id)} variant="filled" size="xs">x</Button> */}
                    </Paper>
                </li>
                ))
            }
            </ul>
        }
        </div>
    );
}
