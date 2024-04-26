import fs from 'fs';

export const createNewFile = async (file, path) => {
  return fs.writeFileSync(path, file);
};
