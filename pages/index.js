import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Link from 'next/link'
import { Modal, Button, Menu, Text, Divider} from '@mantine/core';
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from '@tabler/icons-react';
//import '@mantine/core/styles.css';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
      </main>
    {/* <Menu shadow="md" width={200}>
      <Menu.Target>
        <IconSettings size={14}/>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item leftSection={<IconSettings size={14} />}>
          Settings
        </Menu.Item>
        <Menu.Item leftSection={<IconMessageCircle size={14} />}>
          Messages
        </Menu.Item>
        <Menu.Item leftSection={<IconPhoto size={14} />}>
          Gallery
        </Menu.Item>
        <Menu.Item
          leftSection={<IconSearch size={14} />}
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          leftSection={<IconArrowsLeftRight size={14} />}
        >
          Transfer my data
        </Menu.Item>
        <Menu.Item
          color="red"
          leftSection={<IconTrash size={14} />}
        >
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu> */}
    <Menu>
      <Menu.Label>Application</Menu.Label>
      <Menu.Item icon={<IconMessageCircle size={14} />}>Settings</Menu.Item>
      <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
      <Menu.Item icon={<IconMessageCircle size={14} />}>Gallery</Menu.Item>
      <Menu.Item
        icon={<IconMessageCircle size={14} />}
        rightSection={<Text size="xs" color="dimmed">⌘K</Text>}
      >
        Search
      </Menu.Item>

      <Divider />

      <Menu.Label>Danger zone</Menu.Label>
      <Menu.Item icon={<IconMessageCircle size={14} />}>Transfer my data</Menu.Item>,
      <Menu.Item color="red" icon={<IconMessageCircle size={14} />}>Delete my account</Menu.Item>
    </Menu>
      {/* <Prisma_test/> */}
      <Link href="/page">Test page</Link>
      <Link href="/logs">Logs Page</Link>
      <Footer />
    </div>
  )
}
