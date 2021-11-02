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
      className={styles.messageWrapper}
      style={{ backgroundColor: background, color: foreground }}
    >
      <div className={styles.message}>
        <strong className={styles.channelName}>{message.channelName}</strong>
        <span className={styles.userName}>{message.userName}</span>
        <span className={styles.separator}>:&nbsp;</span>
        <span className={styles.content}>{message.content}</span>
      </div>
    </div>
  );
};

export default React.memo(Message);
