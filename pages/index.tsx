import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <main>
      <Head>
        <title>multichat</title>
      </Head>
      <h1>multichat</h1>
      <p>
        howdy! enter Twitch usernames in the URL separated by plus signs to view
        multiple chats at once!
      </p>
    </main>
  );
};

export default Home;
