import resultFormat from './models/resultFormat.js';
import fs from 'fs';
import dataModel from './models/dataModel.js';
import mongoose from 'mongoose';
import { mongoUrl } from './constants.js';

// Processes the given file.
const processChunk = async (filename) => {
  console.log('Proccessing file:  ' + filename);
  const data = fs.readFileSync(filename);
  await parseChunk(data);

  //Delete the  file reading is done.
  fs.unlink(filename, (err) => {
    if (err) console.log(`Error while deleting: ${err}`);
  });
};

// Sends data to db.
const sendData = async (data) => {
  try {
    await dataModel.collection.insertMany(data, {
      ordered: false,
      bypassDocumentValidation: true,
    });
  } catch {
    //  Lost connection.
    console.log('Lost connection, reconnecting.');
    await mongoose.connect(mongoUrl, {});
    await sendData(data);
  }
};

// Returns a JSON object from the given data.
const parseChunk = async (data) => {
  let dataJSON = [];
  const lines = Buffer.from(data).toString().split('\n');
  lines.shift();
  let count = 0;
  for (let index = 0; index < lines.length; index += 1) {
      if (count > 2000) {
          await sendData(dataJSON);
          dataJSON = [];
          count = 0;
      }
      const dataSplit = lines[index].split(",");
      const stock = {
          _id: new mongoose.Types.ObjectId().toString(),
          siren: dataSplit[0].replace(/['"]+/g, '') || undefined, //
          nic: dataSplit[1].replace(/['"]+/g, '') || undefined, //
          siret: dataSplit[2].replace(/['"]+/g, '') || undefined, //
          dateCreationEtablissement: dataSplit[4].replace(/['"]+/g, '') || undefined, //
          dateDernierTraitementEtablissement: dataSplit[8].replace(/['"]+/g, '') || undefined,
          typeVoieEtablissement: dataSplit[14].replace(/['"]+/g, '') || undefined,
          libelleVoieEtablissement: dataSplit[15].replace(/['"]+/g, '') || undefined,
          codePostalEtablissement: dataSplit[16].replace(/['"]+/g, '') || undefined,
          libelleCommuneEtablissement: dataSplit[17].replace(/['"]+/g, '') || undefined,
          codeCommuneEtablissement: dataSplit[20].replace(/['"]+/g, '') || undefined,
          dateDebut: dataSplit[39].replace(/['"]+/g, '') || undefined,
          etatAdministratifEtablissement: dataSplit[40].replace(/['"]+/g, '') || undefined
      };
      dataJSON.push(Object.fromEntries(Object.entries(stock).filter(([, value]) => value !== undefined)));
      count++;
  }
  if (dataJSON.length) await sendData(dataJSON);
};

export default processChunk;
