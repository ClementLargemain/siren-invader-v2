import pm2 from 'pm2';

let currentWorker = 0;

// Returns the next worker.
const nextWorker = () => {
  if (++currentWorker >= process.env.instances) currentWorker = 1;
  return currentWorker;
};

// Sends a message to the next worker.
const sendMessage = (filename) => {
  pm2.sendDataToProcessId(
    nextWorker(),
    {
      id: 0,
      type: 'process:msg',
      data: filename,
      topic: 'this is an example',
    },
    (err) => {
      if (err) console.log('Error while sending message: ' + err);
    }
  );
};

export default sendMessage;
