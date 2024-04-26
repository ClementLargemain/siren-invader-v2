const resultFormat = (list) => ({
  siren: list[0],
  nic: list[1],
  siret: list[2],
  dateCreationEtablissement: list[4],
  dateDernierTraitementEtablissement: list[8],
  typeVoieEtablissement: list[14],
  libelleVoieEtablissement: list[15],
  codePostalEtablissement: list[16],
  libelleCommuneEtablissement: list[17],
  codeCommuneEtablissement: list[20],
  dateDebut: list[39],
  etatAdministratifEtablissement: list[40],
});

export default resultFormat;
