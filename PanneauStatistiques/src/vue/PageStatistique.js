const Connexion = require('../donnee/Connexion_MongoDB');

var categorieDAO = require('../donnee/CategorieDAO_MongoDB');
const Categorie = require('../modele/Categorie');


var initialiser = async function()
{
  await categorieDAO.initialiser();
  console.log(await categorieDAO.getCategories());
  console.log(await categorieDAO.getCategorie(1));
  var categorieDuTest = new Categorie(null, "test");
  await categorieDAO.ajouterCategorie(categorieDuTest);
  console.log(await categorieDAO.getCategorie(categorieDuTest._id));
}

initialiser();
/*var ProduitDAO = require('../donnee/ProduitDAO_NoSQL');
const Produit = require('../modele/Produit');
var CategorieDAO = require('../donnee/CategorieDAO_NoSQL');
const Categorie = require('../modele/Categorie');
var TransactionDAO = require('../donnee/TransactionDAO_NoSQL');
const Transaction = require('../modele/Transaction');

var produitDAO = new ProduitDAO();
var categorieDAO = new CategorieDAO();
var transactionDAO = new TransactionDAO();

init();

async function afficherStatistiqueParProduit()
{
  var tableauStatistique = document.querySelector('#tableau-statistiques')
  var produits = produitDAO.getProduits();
  produits.forEach((produit) =>
  {
    tableauStatistique.innerHTML += "<tr><td>"+"</td></tr>";
  })
}

async function mettreAJourInformationsGlobales()
{
  document.querySelector('#nombre-produits').innerHTML = await produitDAO.getNombreProduits();
  document.querySelector('#nombre-categories').innerHTML = await categorieDAO.getNombreCategories();
  transactionDAO.getTransactionsParProduit(1);
}

async function init()
{
  await produitDAO.init();
  await categorieDAO.init();
  await transactionDAO.init();
  await mettreAJourInformationsGlobales();
  //await afficherStatistiqueParProduit();
}*/
