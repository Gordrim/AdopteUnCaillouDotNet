const nano = require('nano')('http://localhost:5984');
const Produit = require('../modele/Produit')

class ProduitDAO
{
  constructor()
  {
    nano.db.create('AdopteUnCaillouDotNet');
    const alice = nano.db.use('AdopteUnCaillouDotNet');
  }

  lister()
  {
    return [Produit(1, "l'infernal", 666, "tout droit venu des enfer", 1)];
  }
}

module.exports = ProduitDAO;
