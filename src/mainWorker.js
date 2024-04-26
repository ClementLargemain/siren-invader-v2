import { splitCsv } from './csvSplitter.js';
import { tmpDir } from './constants.js';
import { mongoUrl } from './constants.js';
import { performance } from 'perf_hooks';
import pm2 from 'pm2';
import fs from 'fs';
import mongoose from 'mongoose';
import dataModel from './models/dataModel.js';

let startTime;

const createDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

const setupMainWorker = async () => {
  startTime = Date.now();
  // Check if tmpDir exists.
  createDir(tmpDir);

  console.log('Started spliting big csv');
  splitCsv();

  waitForWorkers();
};

// Worker Available
const waitForWorkers = async () => {
  await mongoose.connect(mongoUrl, {});

  let number;
  fs.watch(tmpDir, async () => {
    const files = fs.readdirSync(tmpDir).length;
    const time = Math.round((Date.now() - startTime) / 1000);
    console.log(`[${time} sec] remaining files: ${files}`);

    // Finished
    if (files == 0) {
      performance.mark('DONE_SENDING');
      performance.measure('EXECUTION_TIME', 'START_SPLITING', 'DONE_SENDING');
      number = await dataModel.countDocuments();
      console.log(`final number of document: ${number}`);
      pm2.stop(0);
    }
  });
};

export default setupMainWorker;
