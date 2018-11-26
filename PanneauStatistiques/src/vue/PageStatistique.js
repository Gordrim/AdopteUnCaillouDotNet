var ProduitDAO = require('../donnee/ProduitDAO')

var produitDAO = new ProduitDAO();

document.querySelector('#nombre-produit').innerHTML = "test";

produitDAO.getProduits().then((produits) =>
{
  console.log(produits);
});
produitDAO.getProduit(1).then((produit) =>
{
  console.log(produit);
});
