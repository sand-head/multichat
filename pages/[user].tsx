import { ChatClient } from '@twurple/chat';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useTwitchChat = (names: string[]) => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // this probably sucks, fix it later
    const chatClient = new ChatClient({ channels: names });
    chatClient.connect().then(() => {
      console.log('connected to twitch chat of these users', names);
      chatClient.onMessage(async (channel, user, message, msg) => {
        setMessages(m => [...m, message]);
      });
    });
  }, [names]);

  return messages;
};

const ChatView: NextPage = () => {
  const router = useRouter();
  const { user } = router.query;
  const users = (user as string)?.split('+') ?? [];
  const messages = useTwitchChat(users);

  return (
    <main>
      {messages.map((m, i) => (
        <div key={i}>{m}</div>
      ))}
    </main>
  );
};

export default ChatView;