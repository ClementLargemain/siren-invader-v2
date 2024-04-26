import fs from 'fs';
import { chunkSize, csvFilePath, tmpDir } from './constants.js';
import { createNewFile } from './utils.js';
import { performance } from 'perf_hooks';
import sendMessage from './sendMessage.js';

let currentFile = 0;

// Splits the big csv.
export const splitCsv = () => {
  performance.mark('START_SPLITING');
  const fd = fs.openSync(csvFilePath, 'r');
  const buffer = Buffer.alloc(chunkSize);
  let tailBuffer = Buffer.alloc(0);

  const readNextChunk = () => {
    const bytesRead = fs.readSync(fd, buffer, 0, chunkSize, null);

    if (bytesRead === 0) {
      fs.closeSync(fd);

      performance.mark('END_SPLITING');
      performance.measure('SPLIT_TIME', 'START_SPLITING', 'END_SPLITING');
      console.log('Split is done.');
      return;
    }

    let data;
    if (bytesRead < chunkSize) data = buffer.slice(0, bytesRead);
    else data = buffer;

    const slicedData = data.slice(0, data.lastIndexOf('\n'));

    const filename = `${tmpDir}${currentFile}.csv`;

    // Add remaining line in front of next chunk
    createNewFile(Buffer.concat([tailBuffer, slicedData]), filename).then(() =>
      sendMessage(filename)
    );
    currentFile++;
    tailBuffer = Buffer.from(data.slice(data.lastIndexOf('\n'), bytesRead));
    readNextChunk();
  };
  readNextChunk();
};
