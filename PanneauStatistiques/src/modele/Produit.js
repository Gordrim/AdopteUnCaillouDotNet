class Produit {
  constructor(_id, nom, prix, description, categorie)
  {
    this._id = _id;
    this.nom = nom;
    this.prix = prix;
    this.description = description;
    this.categorie = categorie;
  }
}

module.exports = Produit;
