import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Avatar, Group, Paper, Text, Button, Badge, Loader, Menu, Switch} from '@mantine/core';
//import classes from '@styles/CommentHtml.module.css';
import CreateLog from '../components/createLog';
import apiUrl from '../lib/apiUrl';

import {
    IconSettings,
    IconSearch,
    IconPhoto,
    IconMessageCircle,
    IconTrash,
    IconArrowsLeftRight,
    IconDots,
    IconEdit,
    IconSunFilled,
    IconCloudStorm,
    IconSun, 
    IconMoonStars
} from '@tabler/icons-react';

import classes from '../styles/logs.module.css'

//export const dynamic = 'force-dynamic'; // sets this to be a dynamic route (vs static) in netlify build. Needs to be dynamic 
// in order to properly avoid problems when one page is doing all fetching during the build time and showing same static page
// even after data updates
export const revalidate = 0;

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
    const [checked, setChecked] = useState(false); // lightmode/darkmode

    async function fetchData() {
        try{
            setIsLoading(true) // Set loading to true when the request starts
            const response = await fetch(`${apiUrl}/api/logs`, {
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
            const response = await fetch(`${apiUrl}/api/logs/${id}`, {
                method: 'DELETE'
            })
            if (response.ok){
                // update logs array to delete log from the client side - that way we don't have to reload the whole page again
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
        {/* <Switch
            size="md"
            color="violet.7"
            onLabel={<IconMoonStars size={16} stroke={2.5} color="var(--mantine-color-yellow-4)" />}
            offLabel={<IconSun size={16} stroke={2.5} color="var(--mantine-color-violet-6)" />}
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
        /> */}
        <CreateLog onSignal={onSignal}/>
            {/* <Alert variant="light" color="blue" title="Alert title">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. At officiis, quae tempore necessitatibus placeat saepe.
    </Alert> */}
        {(isLoading) && <div className={classes.loader}><Loader color="blue" size="xl" /></div>}
        {(!isLoading && logs.length <= 0) && <p>No meltdowns recorded. Get crashing!</p>}
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
                        <IconCloudStorm size={30} />
                        <div>
                        <Text className={classes.text}>{log.title}</Text>
                        <Text c="dimmed" className={classes.text}>
                            some time ago
                        </Text>
                        <Text pt="sm" className={classes.text}>
                            {log.description || ''}
                        </Text>
                        </div>
                    </Group>

                    <Menu shadow="md" className={classes.menu}>
                        <Menu.Target>
                            <IconDots size={20}/>
                        </Menu.Target>

                        <Menu.Dropdown className={classes.dropdown}>
                            {/* <Menu.Item leftSection={<IconEdit size={14} />}>
                            Edit
                            </Menu.Item> */}
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
