var ProduitDAO = require('../donnee/ProduitDAO');

var produitDAO = new ProduitDAO();

init();

async function afficherStatistiqueParProduit()
{
  document.querySelector('#nombre-produit').innerHTML = "test";

  await produitDAO.getProduits().then((produits) =>
  {
    console.log(produits);
  });
  await produitDAO.getProduit(1).then((produit) =>
  {
    console.log(produit);
  });

  await produitDAO.getProduitParCategorie(2).then((produits) =>
  {
    console.log(produits);
  });
}

async function init()
{
  await produitDAO.init();
  await afficherStatistiqueParProduit();
}
