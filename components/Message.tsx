import React from 'react';
import { useColor } from '../utils/useColor';

export interface MessageType {
  id: string;
  userName: string;
  channelName: string;
  content: string;
}

const Message: React.FC<{ message: MessageType }> = ({ message }) => {
  const { background, foreground } = useColor(message.channelName);

  return (
    <div style={{ backgroundColor: background, color: foreground }}>
      <strong>[{message.channelName}]</strong>
      {message.userName}: {message.content}
    </div>
  );
};

export default React.memo(Message);
