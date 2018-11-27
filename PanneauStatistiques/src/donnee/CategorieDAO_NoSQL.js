const nano = require('nano')('http://localhost:5984');
const Categorie = require('../modele/Categorie');

class CategorieDAO
{

  constructor()
  {
    this.bdd = null;
  }

  async init()
  {
    var ok = await nano.db.create('adopte_un_caillou_dot_net_categorie').catch((err) => {});
    if(ok)
    {
        let bdd = nano.db.use('adopte_un_caillou_dot_net_categorie');
        await bdd.insert(new Categorie(1, "Caillou"),'1');
        await bdd.insert(new Categorie(2, "Rock"),'2');
        await bdd.insert(new Categorie(3, 'Roche'), '3');
    }
    this.bdd = nano.db.use('adopte_un_caillou_dot_net_categorie');
  }

  async getCategories()
  {
    var categories = [];
    var resultat = await this.bdd.list({include_docs: true});
    resultat.rows.forEach((doc) =>
    {
      var donneesCategorie = doc.doc;
      categories.push(new Categorie
        (
          donneesCategorie.id,
          donneesCategorie.nom
        ))
    })
    return categories;
  }

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
  }

}

module.exports = CategorieDAO;
