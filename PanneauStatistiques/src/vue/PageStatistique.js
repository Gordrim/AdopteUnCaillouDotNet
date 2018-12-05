const Connexion = require('../donnee/Connexion_MongoDB');

var categorieDAO = require('../donnee/CategorieDAO_MongoDB');
const Categorie = require('../modele/Categorie');

var transactionDAO = require('../donnee/TransactionDAO_MongoDB');
const Transaction = require('../modele/Transaction');

var produitDAO = require('../donnee/ProduitDAO_MongoDB');
const Produit = require('../modele/Produit');

listeMois =
[
  "Janvier",
  "Fevrier",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Decembre"
]

document.querySelector('#bouton-statistique-par-mois').addEventListener("click", afficherStatistiqueParMois);
document.querySelector('#bouton-statistique-par-produits').addEventListener("click", afficherStatistiqueParProduits);
document.querySelector('#bouton-statistique-par-categories').addEventListener("click", afficherStatistiqueParCategories);
document.querySelector('#bouton-statistique-par-regions').addEventListener("click", afficherStatistiqueParRegions);

async function afficherStatistiqueParMois()
{
  var tableauStatistique = document.querySelector('#tableau-statistiques')
  var statistiquesMois = await transactionDAO.getStatistiqueVenteParMois((new Date()).getFullYear());
  tableauStatistique.innerHTML =
  "<tr>"+
    "<th>mois</th>"+
    "<th>nombre ventes</th>"+
    "<th>profit total</th>"+
    "<th>profit moyen</th>"+
    "<th>meilleur produit</th>"+
    "<th>meilleure categorie</th>"+
  "</tr>";
  statistiquesMois.forEach((statistiqueMois) =>
  {
    tableauStatistique.innerHTML +=
    "<tr>"+
      "<td>"+listeMois[statistiqueMois._id.mois-1]+"</td>"+
      "<td>"+statistiqueMois.nombreVente+"</td>"+
      "<td>"+statistiqueMois.profitTotal+"</td>"+
      "<td>"+statistiqueMois.profitMoyenParVente+"</td>"+
      "<td>"+statistiqueMois.meilleurProduit.nom+"</td>"+
      "<td>"+statistiqueMois.meilleurCategorie.nom+"</td>"+
    "</tr>";
  })
}

async function afficherStatistiqueParProduits()
{
  var tableauStatistique = document.querySelector('#tableau-statistiques')
  var statistiquesProduits = await transactionDAO.getStatistiqueVenteParProduits((new Date()).getFullYear());
  tableauStatistique.innerHTML =
  "<tr>"+
    "<th>Produits</th>"+
    "<th>nombre ventes</th>"+
    "<th>profit total</th>"+
    "<th>profit moyen</th>"+
    "<th>meilleur mois</th>"+
    "<th>categorie</th>"+
  "</tr>";
  statistiquesProduits.forEach((statistiquesProduit) =>
  {
    tableauStatistique.innerHTML +=
    "<tr>"+
      "<td>"+statistiquesProduit._id.produit.nom+"</td>"+
      "<td>"+statistiquesProduit.nombreVente+"</td>"+
      "<td>"+statistiquesProduit.profitTotal+"</td>"+
      "<td>"+statistiquesProduit.profitMoyenParVente+"</td>"+
      "<td>"+listeMois[statistiquesProduit.meilleurMois-1]+"</td>"+
      "<td>"+statistiquesProduit.categorie.nom+"</td>"+
    "</tr>";
  })
}

async function afficherStatistiqueParCategories()
{
  var tableauStatistique = document.querySelector('#tableau-statistiques')
  var statistiquesCategorie = await transactionDAO.getStatistiqueVenteParCategories((new Date()).getFullYear());
  tableauStatistique.innerHTML =
  "<tr>"+
    "<th>Categories</th>"+
    "<th>nombre ventes</th>"+
    "<th>profit total</th>"+
    "<th>profit moyen</th>"+
    "<th>meilleur mois</th>"+
    "<th>meilleur produit</th>"+
  "</tr>";
  statistiquesCategorie.forEach((statistiqueCategorie) =>
  {
    tableauStatistique.innerHTML +=
    "<tr>"+
      "<td>"+statistiqueCategorie._id.categorie.nom+"</td>"+
      "<td>"+statistiqueCategorie.nombreVente+"</td>"+
      "<td>"+statistiqueCategorie.profitTotal+"</td>"+
      "<td>"+statistiqueCategorie.profitMoyenParVente+"</td>"+
      "<td>"+listeMois[statistiqueCategorie.meilleurMois-1]+"</td>"+
      "<td>"+statistiqueCategorie.meilleurProduit.nom+"</td>"+
    "</tr>";
  })
}

async function afficherStatistiqueParRegions()
{
  var tableauStatistique = document.querySelector('#tableau-statistiques')
  var statistiquesRegion = await transactionDAO.getStatistiqueVenteParRegions((new Date()).getFullYear());
  tableauStatistique.innerHTML =
  "<tr>"+
    "<th>Pays</th>"+
    "<th>nombre ventes</th>"+
    "<th>profit total</th>"+
    "<th>profit moyen</th>"+
    "<th>meilleur produit</th>"+
    "<th>meilleure categorie</th>"+
  "</tr>";
  statistiquesRegion.forEach((statistiqueRegion) =>
  {
    tableauStatistique.innerHTML +=
    "<tr>"+
      "<td>"+statistiqueRegion._id.pays+"</td>"+
      "<td>"+statistiqueRegion.nombreVente+"</td>"+
      "<td>"+statistiqueRegion.profitTotal+"</td>"+
      "<td>"+statistiqueRegion.profitMoyenParVente+"</td>"+
      "<td>"+statistiqueRegion.meilleurProduit.nom+"</td>"+
      "<td>"+statistiqueRegion.meilleurCategorie.nom+"</td>"+
    "</tr>";
  })
}

async function mettreAJourInformationsGlobales()
{
  document.querySelector('#nombre-produits').innerHTML = await produitDAO.getNombreProduits();
  document.querySelector('#nombre-categories').innerHTML = await categorieDAO.getNombreCategories();
}

async function mettreAJourProfitTotal()
{
  document.querySelector('#profit-total').innerHTML = await transactionDAO.getProfitTotal((new Date()).getFullYear());
}

var initialiser = async function()
{
  await categorieDAO.initialiser();
  await transactionDAO.initialiser();
  await produitDAO.initialiser();
  mettreAJourInformationsGlobales();
  mettreAJourProfitTotal();
  afficherStatistiqueParMois();
}

initialiser();
