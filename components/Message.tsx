import React from 'react';
import { useColor } from '../utils/useColor';
import styles from './Message.module.scss';

export interface MessageType {
  id: string;
  userName: string;
  channelName: string;
  content: (string | React.ReactElement)[];
}

const Message: React.FC<{ message: MessageType }> = ({ message }) => {
  const { background, foreground } = useColor(message.channelName);

  return (
    <div
      className={styles.message}
      style={{ backgroundColor: background, color: foreground }}
    >
      <span className={styles.channelName}>{message.channelName}</span>
      {message.userName}: {message.content}
    </div>
  );
};

export default React.memo(Message);
