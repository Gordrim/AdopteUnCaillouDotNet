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
      await this.collection.insertOne(new Transaction(5, 2, 'paumé', 'pauméland', '404@404.404', 'lepetit', 'paumé', new Date('2018-02-01T00:00:00.000Z')));
      await this.collection.insertOne(new Transaction(6, 1, 'paumé', 'pauméland', '404@404.404', 'lepetit', 'paumé', new Date('2018-02-01T00:00:00.000Z')));
      await this.collection.insertOne(new Transaction(7, 3, 'paumé', 'pauméland', '404@404.404', 'lepetit', 'paumé', new Date('2018-02-01T00:00:00.000Z')));
      await this.collection.insertOne(new Transaction(8, 3, 'paumé', 'pauméland', '404@404.404', 'lepetit', 'paumé', new Date('2018-02-01T00:00:00.000Z')));
      await this.collection.insertOne(new Transaction(9, 2, 'paumé', 'pauméland', '404@404.404', 'lepetit', 'paumé', new Date('2018-10-01T00:00:00.000Z')));
      await this.collection.insertOne(new Transaction(10, 2, 'paumé', 'pauméland', '404@404.404', 'lepetit', 'paumé', new Date()));
      await this.collection.insertOne(new Transaction(11, 3, 'paumé', 'pauméland', '404@404.404', 'lepetit', 'paumé', new Date()));
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

  async getStatistiqueVenteParMois(annee)
  {
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
        from: 'Produit', localField: 'produit',
        foreignField: '_id', as: 'donneesProduit'
      }
    },
    { $unwind: '$donneesProduit' },
    {
      $lookup:
      {
      from: 'Categorie', localField: 'donneesProduit.categorie',
      foreignField: '_id', as: 'donneesCategorie'
      }
    },
    { $unwind: '$donneesCategorie' },
    {
      $group:
      {
        _id:
        {
          mois: { $month: '$date' },
          produit: '$donneesProduit',
          categorie: '$donneesCategorie'
        },
        nombreVente: { $sum: 1 },
        profitTotal: { $sum: '$donneesProduit.prix' },
        profitMoyenParVente: { $avg: '$donneesProduit.prix' }
      }
    },
    { $sort : { 'profitTotal': -1 } },
    {
      $group:
      {
        _id:
        {
          mois: '$_id.mois',
          categorie: '$_id.categorie'
        },
        nombreVente: { $sum: '$nombreVente' },
        profitTotal: { $sum: '$profitTotal' },
        profitMoyenParVente: { $avg: '$profitMoyenParVente' },
        meilleurProduit: { $first: '$$ROOT._id.produit' },
        meilleurProfitProduit: { $first: '$$ROOT.profitTotal' }
      }
    },
    { $sort: { 'profitTotal': -1 } },
    { $addFields: { 'meilleurProduit.profitTotal': '$meilleurProfitProduit' } },
    {
      $group:
      {
        _id: { mois: '$_id.mois' },
        nombreVente: { $sum: '$nombreVente' },
        profitTotal: { $sum: '$profitTotal' },
        profitMoyenParVente: { $avg: '$profitMoyenParVente' },
        meilleurCategorie: { $first: '$$ROOT._id.categorie' },
        produit: { $push: '$meilleurProduit' }
      }
    },
    { $unwind: '$produit' },
    { $sort: { 'produit.profitTotal': -1 } },
    {
      $group:
      {
        _id: { mois: '$_id.mois' },
        nombreVente: { $first: '$$ROOT.nombreVente' },
        profitTotal: { $first: '$$ROOT.profitTotal' },
        profitMoyenParVente: { $first: '$$ROOT.profitMoyenParVente' },
        meilleurCategorie: { $first: '$$ROOT.meilleurCategorie' },
        meilleurProduit: { $first: '$$ROOT.produit'}
      }
    },
    { $sort: { '_id.mois': 1 } }
    ]).toArray();
    return resultat;
  }

  async getStatistiqueVenteParProduits(annee)
  {
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
          from: 'Produit', localField: 'produit',
          foreignField: '_id', as: 'donneesProduit'
        }
      },
      { $unwind: "$donneesProduit" },
      {
        $group:
        {
          _id:
          {
            produit: "$donneesProduit",
            mois: { $month: '$date' }
          },
          nombreVente: { $sum: 1 },
          profitTotal: { $sum: "$donneesProduit.prix" },
          profitMoyenParVente: { $avg: "$donneesProduit.prix" }
        }
      },
      { $sort: {'profitTotal' : -1}},
      {
        $group:
        {
          _id:
          {
            produit: "$_id.produit"
          },
          nombreVente: { $sum: "$nombreVente" },
          profitTotal: { $sum: "$profitTotal" },
          profitMoyenParVente: { $avg: "$profitMoyenParVente" },
          meilleurMois : {$first : "$$ROOT._id.mois"}
        }
      },
      {
        $lookup:
        {
          from: 'Categorie', localField: '_id.produit.categorie',
          foreignField: '_id', as: 'categorie'
        }
      },
      { $unwind: "$categorie" }
      ]).toArray();
    return resultat;
  }

  async getStatistiqueVenteParCategories(annee)
  {
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
        from: 'Produit', localField: 'produit',
        foreignField: '_id', as: 'donneesProduit'
      }
    },
    { $unwind: '$donneesProduit' },
    {
      $lookup:
      {
      from: 'Categorie', localField: 'donneesProduit.categorie',
      foreignField: '_id', as: 'donneesCategorie'
      }
    },
    { $unwind: '$donneesCategorie' },
    {
      $group:
      {
        _id:
        {
          categorie: '$donneesCategorie',
          mois: { $month: '$date' },
          produit: '$donneesProduit'
        },
        nombreVente: { $sum: 1 },
        profitTotal: { $sum: '$donneesProduit.prix' },
        profitMoyenParVente: { $avg: '$donneesProduit.prix' }
      }
    },
    { $sort : { 'profitTotal': -1 } },
    {
      $group:
      {
        _id:
        {
          categorie: '$_id.categorie',
          mois: '$_id.mois'
        },
        nombreVente: { $sum: '$nombreVente' },
        profitTotal: { $sum: '$profitTotal' },
        profitMoyenParVente: { $avg: '$profitMoyenParVente' },
        meilleurProduit: { $first: '$$ROOT._id.produit' },
        meilleurProfitProduit: { $first: '$$ROOT.profitTotal' }
      }
    },
    { $sort: { 'profitTotal': -1 } },
    { $addFields: { 'meilleurProduit.profitTotal': '$meilleurProfitProduit' } },
    {
      $group:
      {
        _id: { categorie: '$_id.categorie' },
        nombreVente: { $sum: '$nombreVente' },
        profitTotal: { $sum: '$profitTotal' },
        profitMoyenParVente: { $avg: '$profitMoyenParVente' },
        meilleurMois: { $first: '$$ROOT._id.mois' },
        produit: { $push: '$meilleurProduit' }
      }
    },
    { $unwind: '$produit' },
    { $sort: { 'produit.profitTotal': -1 }
    },
    {
      $group:
      {
        _id: { categorie: '$_id.categorie' },
        nombreVente: { $first: '$$ROOT.nombreVente' },
        profitTotal: { $first: '$$ROOT.profitTotal' },
        profitMoyenParVente: { $first: '$$ROOT.profitMoyenParVente' },
        meilleurMois: { $first: '$$ROOT.meilleurMois' },
        meilleurProduit: { $first: '$$ROOT.produit'}
      }
    }
    ]).toArray();
    return resultat;
  }

  async getStatistiqueVenteParRegions(annee)
  {
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
        from: 'Produit', localField: 'produit',
        foreignField: '_id', as: 'donneesProduit'
      }
    },
    { $unwind: '$donneesProduit' },
    {
      $lookup:
      {
      from: 'Categorie', localField: 'donneesProduit.categorie',
      foreignField: '_id', as: 'donneesCategorie'
      }
    },
    { $unwind: '$donneesCategorie' },
    {
      $group:
      {
        _id:
        {
          pays: '$pays',
          categorie: '$donneesCategorie',
          produit: '$donneesProduit'
        },
        nombreVente: { $sum: 1 },
        profitTotal: { $sum: '$donneesProduit.prix' },
        profitMoyenParVente: { $avg: '$donneesProduit.prix' }
      }
    },
    { $sort : { 'profitTotal': -1 } },
    {
      $group:
      {
        _id:
        {
          pays: '$_id.pays',
          categorie: '$_id.categorie',
        },
        nombreVente: { $sum: '$nombreVente' },
        profitTotal: { $sum: '$profitTotal' },
        profitMoyenParVente: { $avg: '$profitMoyenParVente' },
        meilleurProduit: { $first: '$$ROOT._id.produit' },
        meilleurProfitProduit: { $first: '$$ROOT.profitTotal' }
      }
    },
    { $sort: { 'profitTotal': -1 } },
    { $addFields: { 'meilleurProduit.profitTotal': '$meilleurProfitProduit' } },
    {
      $group:
      {
        _id: { pays: '$_id.pays' },
        nombreVente: { $sum: '$nombreVente' },
        profitTotal: { $sum: '$profitTotal' },
        profitMoyenParVente: { $avg: '$profitMoyenParVente' },
        meilleurCategorie: { $first: '$$ROOT._id.categorie' },
        produit: { $push: '$meilleurProduit' }
      }
    },
    { $unwind: '$produit' },
    { $sort: { 'produit.profitTotal': -1 }
    },
    {
      $group:
      {
        _id: { pays: '$_id.pays' },
        nombreVente: { $first: '$$ROOT.nombreVente' },
        profitTotal: { $first: '$$ROOT.profitTotal' },
        profitMoyenParVente: { $first: '$$ROOT.profitMoyenParVente' },
        meilleurCategorie: { $first: '$$ROOT.meilleurCategorie' },
        meilleurProduit: { $first: '$$ROOT.produit'}
      }
    }
    ]).toArray();
    return resultat;
  }

  async getProfitTotal(annee)
  {
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
        from: 'Produit', localField: 'produit',
        foreignField: '_id', as: 'donneesProduit'
      }
    },
    { $unwind: '$donneesProduit' },
    {
      $group:
      {
        _id: null,
        profitTotal: { $sum: '$donneesProduit.prix' },
      }
    }
    ]).toArray();
    return resultat[0].profitTotal;
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
