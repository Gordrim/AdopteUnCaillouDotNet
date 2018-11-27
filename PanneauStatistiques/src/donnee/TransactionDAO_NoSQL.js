const nano = require('nano')('http://localhost:5984');
const Transaction = require('../modele/Transaction');

class TransactionDAO
{

  constructor()
  {
    this.bdd = null;
  }

  async init()
  {
    var ok = await nano.db.create('adopte_un_caillou_dot_net_transaction').catch((err) => {});
    if(ok)
    {
        let bdd = nano.db.use('adopte_un_caillou_dot_net_transaction');
        await bdd.insert(new Transaction(1, 1, 'paumé', 'pauméland', '404@404.404', 'lepetit', 'paumé'),'1');
    }
    this.bdd = nano.db.use('adopte_un_caillou_dot_net_transaction');
  }

  async getTransactions()
  {
    var transactions = [];
    var resultat = await this.bdd.list({include_docs: true});
    resultat.rows.forEach((doc) =>
    {
      var donneesTransaction = doc.doc;
      transactions.push(new Transaction
        (
          donneesTransaction.id,
          donneesTransaction.produit,
          donneesTransaction.adresse,
          donneesTransaction.mail,
          donneesTransaction.nom,
          donneesTransaction.prenom
        ))
    })
    return transactions;
  }

  async getTransaction(id)
  {
    var donneesTransaction = await this.bdd.get(String(id));
    return new Transaction
    (
      donneesTransaction.id,
      donneesTransaction.produit,
      donneesTransaction.adresse,
      donneesTransaction.mail,
      donneesTransaction.nom,
      donneesTransaction.prenom
    );
  }

  async getTransactionParProduit(produit)
  {
    var transactions = [];
    var resultat = await this.bdd.find({selector: {produit: { "$eq": produit}}});
    resultat.docs.forEach((donneesTransaction) =>
    {
      transactions.push(new Transaction
        (
          donneesTransaction.id,
          donneesTransaction.produit,
          donneesTransaction.adresse,
          donneesTransaction.mail,
          donneesTransaction.nom,
          donneesTransaction.prenom
        ))
    })
    return transactions;
  }

  async ajouterTransaction(transaction)
  {
    await this.bdd.insert(transaction, String(transaction.id));
  }

  async modifierTransaction(transaction)
  {
    var donneesTransaction = await this.bdd.get(String(transaction.id));
    transaction._rev = donneesTransaction._rev;
    transaction._id = String(transaction.id);
    await this.bdd.insert(transaction);
  }

  async supprimerTransaction(id)
  {
    var donneesTransaction = await this.bdd.get(String(id));
    await this.bdd.destroy(String(id), donneesTransaction._rev);
  }

}

module.exports = TransactionDAO;
