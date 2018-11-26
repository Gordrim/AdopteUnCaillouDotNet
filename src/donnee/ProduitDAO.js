const nano = require('nano')('http://localhost:5984');
const Produit = require('../modele/Produit');

class ProduitDAO
{

  constructor()
  {
    nano.db.get('adopte_un_caillou_dot_net', function(err, body) {
      if (err)
      {
        nano.db.create('adopte_un_caillou_dot_net');
      }
    });

    const alice = nano.db.use('adopte_un_caillou_dot_net');
  }

  lister()
  {
    return [Produit(1, "l'infernal", 666, "tout droit venu des enfer", 1)];
  }

}

module.exports = ProduitDAO;
