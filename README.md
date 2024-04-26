# Sirene Invader V2

## Introduction
Sirene Invader is a Node.js application designed to efficiently process and analyze large CSV files containing French company data. It utilizes clustering and parallel processing to split the workload across multiple workers, improving performance and scalability.

## Features
- CSV Splitting: Large CSV files are split into smaller chunks for parallel processing.
- Parallel Processing: Multiple worker processes handle chunks of data simultaneously for faster execution.
- MongoDB Integration: Processed data is stored in a MongoDB database for easy retrieval and analysis.
- Performance Monitoring: Utilizes performance monitoring to track and optimize processing times.
## Installation
1. Clone the repository: git clone https://github.com/your_username/sirene-invader.git
2. Sirene Invader V2 requires [Node.js](https://nodejs.org/) to run.
3. You also need to install pm2 : `npm install pm2 -g` and mongoose : `npm install mongoose`

## Configuration

Update constants.js with your MongoDB connection URL (mongoUrl), CSV file path (csvFilePath), and temporary directory (tmpDir).

## Usage
- `npm run start` : Start the process.json file, which will start the script main.js with pm2.
- `npm run stop` : Execute the `pm2 delete all` and `npm run clean:data` commands.
- `npm run clean:data` : Execute `rm -rf src/data/tmp && exit 0`. Do not launch this command, prefer `npm run stop`.


## Project Structure
- process.json: PM2 configuration file defining the application's behavior.
- main.js: Entry point of the application responsible for initializing PM2, setting up main and worker processes, and performance monitoring.
- mainWorker.js: Main worker responsible for coordinating CSV splitting and managing worker processes.
- worker.js: Worker processes responsible for processing chunks of CSV data.
- utils.js: Utility functions used throughout the application.
- sendMessage.js: Module for sending messages between worker processes.
- csvSplitter.js: Module for splitting large CSV files into smaller chunks for parallel processing.
- chunksProcessing.js: Module for processing individual chunks of CSV data.
- models/: Directory containing Mongoose models for defining MongoDB schemas (dataModel.js, resultFormat.js).


### Schema

![Algo](/documentation/algo.png)

![Topo](/documentation/topo.png)
*

### Benchmark


| PRocessor | Execution time |
| ------ | ------ |
| AMD Ryzen 7 5800X3D 8-Core Processor | 100-120s |

![Benchmark](/documentation/inserted-data.png)
