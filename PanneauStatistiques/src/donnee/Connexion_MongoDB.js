var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

class Connexion
{

  constructor()
  {
    if(!Connexion.instance)
    {
      this.bdd = null;
      Connexion.instance = this;
    }
    return Connexion.instance;
  }

  async initialiser()
  {
    if(!this.bdd)
    {
      var connexion = await MongoClient.connect(url, { useNewUrlParser: true });
      this.bdd = await connexion.db('AdopteUnCaillouDotNet');
      console.log("Database created!");
    }
  }
}

const instance = new Connexion();
module.exports = instance;
