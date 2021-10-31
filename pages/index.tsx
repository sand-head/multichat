import type { NextPage } from 'next';
import Head from 'next/head';
import styles from './index.module.scss';

const Home: NextPage = () => {
  return (
    <main className={styles.page}>
      <Head>
        <title>multichat</title>
      </Head>
      <h1>multichat</h1>
      <p>
        howdy! enter Twitch usernames in the URL separated by forward slashes to
        view multiple chats at once!
      </p>
      <p>
        <a
          href='https://github.com/sand-head/multichat'
          target='_blank'
          rel='noreferrer'
        >
          GitHub
        </a>
      </p>
    </main>
  );
};

export default Home;
