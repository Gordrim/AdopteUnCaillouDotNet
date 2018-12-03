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
      await this.collection.insertOne(new Transaction(1, 1, 'paumé', 'pauméland', '404@404.404', 'lepetit', 'paumé', new Date()));
      await this.collection.insertOne(new Transaction(2, 1, 'paumé', 'pauméland', '404@404.404', 'lepetit', 'paumé', new Date('2017-08-01T00:00:00.000Z')));
      await this.collection.insertOne(new Transaction(3, 1, 'paumé', 'pauméland', '404@404.404', 'lepetit', 'paumé', new Date('2018-09-01T00:00:00.000Z')));
      await this.collection.insertOne(new Transaction(4, 1, 'paumé', 'pauméland', '404@404.404', 'lepetit', 'paumé', new Date('2018-10-01T00:00:00.000Z')));
      await this.collection.insertOne(new Transaction(5, 2, 'paumé', 'pauméland', '404@404.404', 'lepetit', 'paumé', new Date('2018-10-01T00:00:00.000Z')));
      await this.collection.insertOne(new Transaction(6, 2, 'paumé', 'pauméland', '404@404.404', 'lepetit', 'paumé', new Date()));
      await this.collection.insertOne(new Transaction(7, 3, 'paumé', 'pauméland', '404@404.404', 'lepetit', 'paumé', new Date()));
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

  async getStatistiqueVenteProduitParMois(annee)
  {
    await console.log(await this.getTransactions());
    var resultat = await this.collection.aggregate([
      {
        $match:
        {
          date:
          {
            $gte: new Date(annee+'-01-01T00:00:00.000Z'),
            $lt: new Date(annee+1+'-01-01T00:00:00.000Z')
          }
        }
      },
      {
        $lookup:
        {
          from: 'Produit',
          localField: 'produit',
          foreignField: '_id',
          as: 'donneesProduit'

        }
      },
      {
        $unwind: "$donneesProduit"
      },
      {
        $sort:
        {
          "donneesProduit.prix": -1
        }
      },
      {
        $lookup:
        {
          from: 'Categorie',
          localField: 'donneesProduit.categorie',
          foreignField: '_id',
          as: 'donneesCategorie'

        }
      },
      {
        $unwind: "$donneesCategorie"
      },
      {
        $group:
        {
          _id:
          {
            mois:
            {
              $month: "$date"
            }
          },
          nombreVente:
          {
            $sum: 1
          },
          profitTotal:
          {
            $sum: "$donneesProduit.prix"
          },
          profitMoyenParVente:
          {
            $avg: "$donneesProduit.prix"
          },
          meilleurProduit:
          {
            $first: "$$ROOT.donneesProduit"
          },
          meilleurCategorie:
          {
            $first: "$$ROOT.donneesCategorie"
          }
        }
      }]).toArray();
    return resultat;
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
