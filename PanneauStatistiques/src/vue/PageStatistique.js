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


async function afficherStatistiqueParMois()
{
  var tableauStatistique = document.querySelector('#tableau-statistiques')
  var statistiquesMois = await transactionDAO.getStatistiqueVenteParMois((new Date()).getFullYear());
  tableauStatistique.innerHTML +=
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

async function mettreAJourInformationsGlobales()
{
  document.querySelector('#nombre-produits').innerHTML = await produitDAO.getNombreProduits();
  document.querySelector('#nombre-categories').innerHTML = await categorieDAO.getNombreCategories();
  transactionDAO.getTransactionsParProduit(1);
}

var initialiser = async function()
{
  await categorieDAO.initialiser();
  await transactionDAO.initialiser();
  await produitDAO.initialiser();
  mettreAJourInformationsGlobales();
  afficherStatistiqueParMois();
}

initialiser();
