var Transaction = function(id,produit,adresse,pays,mail, nom , prenom)
{
    this.id = id;
    this.produit = produit;
    this.adresse = adresse;
    this.pays = pays;
    this.mail = mail;
    this.nom= nom;
    this.prenom = prenom;
}

module.exports = Transaction;
