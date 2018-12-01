var Transaction = function(id,produit,adresse,pays,mail, nom , prenom, date)
{
    this.id = id;
    this.produit = produit;
    this.adresse = adresse;
    this.pays = pays;
    this.mail = mail;
    this.nom= nom;
    this.prenom = prenom;
    this.date = date;
}

module.exports = Transaction;
