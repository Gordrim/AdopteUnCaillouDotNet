const Produit = require('../modele/Produit');
const Connexion = require('./Connexion_MongoDB');

class ProduitDAO
{

  constructor()
  {
    if(!ProduitDAO.instance)
    {
      this.collection = null;
      ProduitDAO.instance = this;
    }
    return ProduitDAO.instance;
  }

  async initialiser()
  {
    await Connexion.initialiser();
    await Connexion.bdd.collection("Produit").drop();
    this.collection = await Connexion.bdd.createCollection("Produit").catch(() => {});
    if(this.collection)
    {
        var test = await this.collection.insertOne(new Produit(1, "l'infernal", 666, "tout droit venu des enfer", 1));
        var test = await this.collection.insertOne(new Produit(2, "le precieux", 9999, "attention aux hobbits", 1));
        var test = await this.collection.insertOne(new Produit(3, 'The Rock', 8888, 'The Rock', 2));
    }
    else
    {
      this.bdd = await Connexion.bdd.collection("Produit");
    }
  }

  creerProduit(donneesProduit)
  {
    return new Produit
    (
        donneesProduit._id,
        donneesProduit.nom,
        donneesProduit.prix,
        donneesProduit.description,
        donneesProduit.categorie
    )
  }

  async getProduits()
  {
    var produits = [];
    var resultat = await this.collection.find({}).toArray();
    resultat.forEach((donneesProduit) =>
    {
      produits.push(this.creerProduit(donneesProduit));
    })
    return produits;
  }


  async getProduit(_id)
  {
    var donneesProduit = await this.collection.findOne({_id: _id});
    if(donneesProduit)
      return this.creerProduit(donneesProduit);
    return null;
  }

  async getNombreProduits()
  {
    return this.collection.countDocuments();
  }

  async ajouterProduit(produit)
  {
    var resultat = await this.collection.insertOne(produit);
    produit._id = resultat.insertedId;
  }

  async modifierProduit(produit)
  {
    await this.collection.updateOne({_id: produit._id}, {$set: produit});
  }

  async supprimerProduit(_id)
  {
    await this.collection.deleteOne({_id: _id});
  }

}

const instance = new ProduitDAO();
module.exports = instance;
