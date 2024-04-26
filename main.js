import { PerformanceObserver } from 'perf_hooks';
import pm2 from 'pm2';
import setupMainWorker from './src/mainWorker.js';
import setupWorkers from './src/worker.js';

// Displays performance logs.
const perfObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log('====================');
    console.log(entry);
    console.log('====================');
  });
});

perfObserver.observe({ entryTypes: ['measure'], buffer: true });

pm2.connect((err) => {
  if (err) console.log(`pm2 connect: ${err}`);
  if (process.env.pm_id === '0') {
    // Main  worker.
    setupMainWorker();
  } else {
    // Other workers.
    setupWorkers();
  }
});
