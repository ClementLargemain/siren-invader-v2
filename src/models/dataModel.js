import mongoose from 'mongoose';

const dataModel = mongoose.model('dataModel', {
  siren: String,
  nic: String,
  siret: String,
  dateCreationEtablissement: String,
  dateDernierTraitementEtablissement: String,
  typeVoieEtablissement: String,
  libelleVoieEtablissement: String,
  codePostalEtablissement: String,
  libelleCommuneEtablissement: String,
  codeCommuneEtablissement: String,
  dateDebut: String,
  etatAdministratifEtablissement: String,
});

export default dataModel;
