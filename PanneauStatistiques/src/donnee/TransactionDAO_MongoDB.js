const Transaction = require('../modele/Transaction');
const Connexion = require('./Connexion_MongoDB');

class TransactionDAO
{

  constructor()
  {
    if(!TransactionDAO.instance)
    {
      this.collection = null;
      TransactionDAO.instance = this;
    }
    return TransactionDAO.instance;
  }

  async initialiser()
  {
    await Connexion.initialiser();
    await Connexion.bdd.collection("Transaction").drop();
    this.collection = await Connexion.bdd.createCollection("Transaction").catch(() => {});
    if(this.collection)
    {
      var test = await this.collection.insertOne(new Transaction(1, 1, 'paumé', 'pauméland', '404@404.404', 'lepetit', 'paumé'));
    }
    else
    {
      this.bdd = await Connexion.bdd.collection("Transaction");
    }
  }

  creerTransaction(donneesTransaction)
  {
    return new Transaction
    (
      donneesTransaction._id,
      donneesTransaction.produit,
      donneesTransaction.adresse,
      donneesTransaction.pays,
      donneesTransaction.mail,
      donneesTransaction.nom,
      donneesTransaction.prenom,
      donneesTransaction.date
    )
  }

  async getTransactions()
  {
    var transactions = [];
    var resultat = await this.collection.find({}).toArray();
    resultat.forEach((donneesTransaction) =>
    {
      transactions.push(this.creerTransaction(donneesTransaction));
    })
    return transactions;
  }


  async getTransaction(_id)
  {
    var donneesTransaction = await this.collection.findOne({_id: _id});
    if(donneesTransaction)
      return this.creerTransaction(donneesTransaction);
    return null;
  }

  async getNombreTransactions()
  {
    return this.collection.countDocuments();
  }

  async ajouterTransaction(transaction)
  {
    var resultat = await this.collection.insertOne(transaction);
    transaction._id = resultat.insertedId;
  }

  async modifierTransaction(transaction)
  {
    await this.collection.updateOne({_id: transaction._id}, {$set: transaction});
  }

  async supprimerTransaction(_id)
  {
    await this.collection.deleteOne({_id: _id});
  }

}

const instance = new TransactionDAO();
module.exports = instance;
