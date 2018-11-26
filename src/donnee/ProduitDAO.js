const nano = require('nano')('http://localhost:5984');
const Produit = require('../modele/Produit');

class ProduitDAO
{

  constructor()
  {
    nano.db.create
    (
      'adopte_un_caillou_dot_net_produit',
      function(err, body)
      {
        if (!err)
        {
          let bdd = nano.db.use('adopte_un_caillou_dot_net_produit');
          bdd.insert(new Produit(1, "l'infernal", 666, "tout droit venu des enfer", 1),'1');
          bdd.insert(new Produit(2, "le precieux", 9999, "attention aux hobbits", 1),'2');
          bdd.insert(new Produit(404, "le doublon", 404, "ne serra pas inseré car même id", 404),'2');
        }
      }
    );
    this.bdd = nano.db.use('adopte_un_caillou_dot_net_produit');
  }

  async getProduits()
  {
    var produits = [];
    var resultat = await this.bdd.list({include_docs: true});
    resultat.rows.forEach((doc) =>
    {
      var donneesProduit = doc.doc;
      produits.push(new Produit
        (
          donneesProduit.id,
          donneesProduit.nom,
          donneesProduit.prix,
          donneesProduit.description,
          donneesProduit.categorie
        ))
    })
    return produits;
  }

  async getProduit(id)
  {
    var donneesProduit = await this.bdd.get(String(id));
    return new Produit
    (
      donneesProduit.id,
      donneesProduit.nom,
      donneesProduit.prix,
      donneesProduit.description,
      donneesProduit.categorie
    );
  }

  getProduitParCategorie(idCategorie)
  {

  }

  ajouterProduit(produit)
  {

  }

  modifierProduit(produit)
  {

  }

  supprimerProduit(produit)
  {

  }

}

module.exports = ProduitDAO;
