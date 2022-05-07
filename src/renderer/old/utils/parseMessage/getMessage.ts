type Arguments = {
  message: string;
  messageType: 'incoming' | 'outgoing';
};

const getMessage = ({ messageType, message }: Arguments) => {
  let splitMessage =
    message.split(messageType === 'incoming' ? '@From' : '@To').pop() + '';
  splitMessage = splitMessage.split(':').pop() + '';

  return splitMessage;
};

export default getMessage;
