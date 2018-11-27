const nano = require('nano')('http://localhost:5984');
const Produit = require('../modele/Produit');

class ProduitDAO
{

  constructor()
  {
    this.bdd = null;
  }

  async init()
  {
    var ok = await nano.db.create('adopte_un_caillou_dot_net_produit').catch((err) => {});
    if(ok)
    {
        let bdd = nano.db.use('adopte_un_caillou_dot_net_produit');
        await bdd.insert(new Produit(1, "l'infernal", 666, "tout droit venu des enfer", 1),'1');
        await bdd.insert(new Produit(2, "le precieux", 9999, "attention aux hobbits", 1),'2');
        await bdd.insert(new Produit(3, 'The Rock', 8888, 'The Rock', 2), '3');
    }
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

  async getProduitParCategorie(categorie)
  {
    var produits = [];
    var resultat = await this.bdd.find({selector: {categorie: { "$eq": categorie}}});
    resultat.docs.forEach((donneesProduit) =>
    {
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

  async ajouterProduit(produit)
  {
    await this.bdd.insert(produit, String(produit.id));
  }

  async modifierProduit(produit)
  {
    var donneesProduit = await this.bdd.get(String(produit.id));
    produit._rev = donneesProduit._rev;
    produit._id = String(produit.id);
    await this.bdd.insert(produit);
  }

  async supprimerProduit(id)
  {
    var donneesProduit = await this.bdd.get(String(id));
    await this.bdd.destroy(String(id), donneesProduit._rev);
  }

}

module.exports = ProduitDAO;
