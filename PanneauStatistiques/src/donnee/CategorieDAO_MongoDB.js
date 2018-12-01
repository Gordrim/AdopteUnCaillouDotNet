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
    return this.creerCategorie(donneesCategorie);
  }
/*
  async getNombreCategories()
  {
    var categories = await this.getCategories();
    return categories.length;
  }

  async ajouterCategorie(categorie)
  {
    await this.bdd.insert(categorie, String(categorie.id));
  }

  async modifierCategorie(categorie)
  {
    var donneesCategorie = await this.bdd.get(String(categorie.id));
    categorie._rev = donneesCategorie._rev;
    categorie._id = String(categorie.id);
    await this.bdd.insert(categorie);
  }

  async supprimerCategorie(id)
  {
    var donneesCategorie = await this.bdd.get(String(id));
    await this.bdd.destroy(String(id), donneesCategorie._rev);
  }*/

}

const instance = new CategorieDAO();
module.exports = instance;
