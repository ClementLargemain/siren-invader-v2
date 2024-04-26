import processChunk from './chunksProcessing.js';
import mongoose from 'mongoose';
import { mongoUrl } from './constants.js';
import pm2 from 'pm2';
import { performance } from 'perf_hooks';

// List of files to process.
let files = [];

// Boolean to know if processFiles started.
let started = false;

// Process files from the queue.
export const processFiles = async () => {
  while (files.length > 0) {
    const nextFile = files.pop();
    await processChunk(nextFile);
  }
  performance.mark('END_WORKER');
  performance.measure(
    `WORKER_${process.env.pm_id}`,
    'START_WORKER',
    'END_WORKER'
  );
  console.log('Done.');
  pm2.stop(process.env.pm_id);
};

// Setups workers.
const setupWorkers = async () => {
  performance.mark('START_WORKER');
  await mongoose.connect(mongoUrl, {});

  process.on('message', (message) => {
    const filename = message.data;
    files.push(filename);
    if (!started) {
      started = true;
      processFiles();
    }
  });
};

export default setupWorkers;
