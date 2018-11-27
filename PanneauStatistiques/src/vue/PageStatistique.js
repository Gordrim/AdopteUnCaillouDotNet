var ProduitDAO = require('../donnee/ProduitDAO');
const Produit = require('../modele/Produit');

var produitDAO = new ProduitDAO();

init();

async function afficherStatistiqueParProduit()
{
  document.querySelector('#nombre-produit').innerHTML = "test";

  await produitDAO.ajouterProduit(new Produit(4,'La mousseuse', 465, 'ne se boit pas', 3));

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
