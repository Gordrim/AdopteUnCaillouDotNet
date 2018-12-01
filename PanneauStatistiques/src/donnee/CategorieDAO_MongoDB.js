const Categorie = require('../modele/Categorie');
const Connexion = require('./Connexion_MongoDB');

class CategorieDAO
{

  constructor()
  {
    if(!CategorieDAO.instance)
    {
      this.collection = null;
      CategorieDAO.instance = this;
    }
    return CategorieDAO.instance;
  }

  async initialiser()
  {
    await Connexion.initialiser();
    await Connexion.bdd.collection("Categorie").drop();
    this.collection = await Connexion.bdd.createCollection("Categorie").catch(() => {});
    if(this.collection)
    {
        var test = await this.collection.insertOne(new Categorie(1, "Caillou"));
        var test = await this.collection.insertOne(new Categorie(2, "Rock"));
        var test = await this.collection.insertOne(new Categorie(3, "Roche"));
    }
    else
    {
      this.bdd = await Connexion.bdd.collection("Categorie");
    }
  }

  creerCategorie(donneesCategorie)
  {
    return new Categorie
    (
        donneesCategorie._id,
        donneesCategorie.nom
    )
  }

  async getCategories()
  {
    var categories = [];
    var resultat = await this.collection.find({}).toArray();
    resultat.forEach((donneesCategorie) =>
    {
      categories.push(this.creerCategorie(donneesCategorie));
    })
    return categories;
  }


  async getCategorie(_id)
  {
    var donneesCategorie = await this.collection.findOne({_id: _id});
    if(donneesCategorie)
      return this.creerCategorie(donneesCategorie);
    return null;
  }
/*
  async getNombreCategories()
  {
    var categories = await this.getCategories();
    return categories.length;
  }
*/
  async ajouterCategorie(categorie)
  {
    var resultat = await this.collection.insertOne(categorie);
    categorie._id = resultat.insertedId;
  }

  async modifierCategorie(categorie)
  {
    await this.collection.updateOne({_id: categorie._id}, {$set: categorie});
  }

  async supprimerCategorie(_id)
  {
    await this.collection.deleteOne({_id: _id});
  }

}

const instance = new CategorieDAO();
module.exports = instance;
