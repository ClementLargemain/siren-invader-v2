# Sirene Invader V2

### Commands

- `npm run start` : Start the process.json file, which will start the script main.js with pm2.
- `npm run stop` : Execute the `pm2 delete all` and `npm run clean:data` commands.
- `npm run clean:data` : Execute `rm -rf src/data/tmp && exit 0`. Do not launch this command, prefer `npm run stop`.

### Benchmark




| PRocessor | Execution time |
| ------ | ------ |
| AMD Ryzen 7 5800X3D 8-Core Processor | 100-120s |

![Benchmark](/documentation/inserted-data.png)