import { ChatClient } from '@twurple/chat';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Message, { MessageType } from '../components/Message';
import styles from './[...users].module.scss';

const ChatView: NextPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [connected, setConnected] = useState<boolean>(false);

  // get the users from the path and connect to Twitch
  useEffect(() => {
    if (!router.isReady) return;
    let { users } = router.query as { users: string[] };

    const createAndConnectAsync = async () => {
      console.log('joining channels', users);
      const chatClient = new ChatClient({ channels: users });
      await chatClient.connect();
      setConnected(true);

      chatClient.onJoin((channel) => {
        console.log('joined channel', channel);
      });
      chatClient.onMessage((channel, user, message, msg) => {
        const messageWithEmotes = msg
          .parseEmotes()
          .reduce<(string | JSX.Element)[]>((prev, curr) => {
            if (curr.type == 'text') {
              prev.push(curr.text);
            } else if (curr.type == 'emote') {
              const src = `https://static-cdn.jtvnw.net/emoticons/v2/${curr.id}/default/light/2.0`;
              prev.push(
                <Image src={src} alt={curr.name} height={28} width={28} />
              );
            }
            return prev;
          }, []);

        setMessages((m) => [
          ...m,
          {
            id: msg.id,
            userName: user,
            channelName: channel,
            content: messageWithEmotes,
          },
        ]);
      });
    };

    createAndConnectAsync();
  }, [router.isReady, router.query]);

  return connected ? (
    <main className={styles.feed}>
      {messages.map((m) => (
        <Message key={m.id} message={m} />
      ))}
    </main>
  ) : (
    <main className={styles.feed}>
      <div>Connecting...</div>
    </main>
  );
};

export default ChatView;
