var ProduitDAO = require('../donnee/ProduitDAO_NoSQL');
const Produit = require('../modele/Produit');
var CategorieDAO = require('../donnee/CategorieDAO_NoSQL');
const Categorie = require('../modele/Categorie');

var produitDAO = new ProduitDAO();
var categorieDAO = new CategorieDAO();

init();

async function afficherStatistiqueParProduit()
{
}

async function mettreAJourInformationsGlobales()
{
  document.querySelector('#nombre-produits').innerHTML = await produitDAO.getNombreProduits();
  document.querySelector('#nombre-categories').innerHTML = await categorieDAO.getNombreCategories();
}

async function init()
{
  await produitDAO.init();
  await categorieDAO.init();
  await mettreAJourInformationsGlobales();
  await afficherStatistiqueParProduit();
}
