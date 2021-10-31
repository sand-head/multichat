import { ChatClient } from '@twurple/chat';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Message, { MessageType } from '../components/Message';
import styles from './[...users].module.scss';

const ChatView: NextPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [connected, setConnected] = useState<boolean>(false);
  const bottomRef = useRef<HTMLDivElement>(null);

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
      chatClient.onMessage((channel, user, _, msg) => {
        const messageWithEmotes = msg
          .parseEmotes()
          .reduce<(string | JSX.Element)[]>((prev, curr) => {
            if (curr.type == 'text') {
              prev.push(curr.text);
            } else if (curr.type == 'emote') {
              const emoteSrc = curr.displayInfo.getUrl({
                size: '2.0',
                animationSettings: 'default',
                backgroundType: 'light',
              });

              prev.push(
                <Image
                  key={`${curr.id}-${curr.position}`}
                  src={emoteSrc}
                  alt={curr.name}
                  height={28}
                  width={28}
                />
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

        // scroll the latest message into view when new ones arrive
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      });
    };

    createAndConnectAsync();
  }, [router.isReady, router.query]);

  return connected ? (
    <main className={styles.feed}>
      {messages.map((m) => (
        <Message key={m.id} message={m} />
      ))}
      <div ref={bottomRef} />
    </main>
  ) : (
    <main className={styles.feed}>
      <div>Connecting...</div>
    </main>
  );
};

export default ChatView;
