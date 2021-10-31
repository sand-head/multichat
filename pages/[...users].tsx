import { ChatClient } from '@twurple/chat';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Message, { MessageType } from '../components/Message';

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
        setMessages((m) => [
          ...m,
          {
            id: msg.id,
            userName: user,
            channelName: channel,
            content: message,
          },
        ]);
      });
    };

    createAndConnectAsync();
  }, [router.isReady, router.query]);

  return connected ? (
    <main>
      {messages.map((m) => (
        <Message key={m.id} message={m} />
      ))}
    </main>
  ) : (
    <main>Connecting...</main>
  );
};

export default ChatView;
