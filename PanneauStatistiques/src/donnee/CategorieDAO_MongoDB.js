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
        var categorie = new Categorie(1, "Caillou");
        categorie._id = 1;
        var test = await this.collection.insertOne(categorie);
        var categorie = new Categorie(1, "Rock");
        categorie._id = 2;
        var test = await this.collection.insertOne(categorie);
        var categorie = new Categorie(1, "Roche");
        categorie._id = 3;
        var test = await this.collection.insertOne(categorie);
    }
    else
    {
      this.bdd = await Connexion.bdd.collection("Categorie");
    }
  }

  async getCategories()
  {
    var categories = [];
    var resultat = await this.collection.find({}).toArray();
    console.log(resultat);
    /*resultat.rows.forEach((doc) =>
    {
      var donneesCategorie = doc.doc;
      categories.push(new Categorie
        (
          donneesCategorie.id,
          donneesCategorie.nom
        ))
    })
    return categories;*/
  }

/*
  async getCategorie(id)
  {
    var donneesCategorie = await this.bdd.get(String(id));
    return new Categorie
    (
      donneesCategorie.id,
      donneesCategorie.nom
    );
  }

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
