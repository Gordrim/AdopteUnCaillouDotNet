var redis = require("redis")
const {promisify} = require('util');

class Redis
{


constructor()
  { 
      this.client = redis.createClient();
        this.getAsync = promisify(this.client.hgetall).bind(this.client);
  }

  async init()
  {
    

  }

  async cacheCategories(categories)
  {
    categories.forEach((donneesCategorie) =>
    {
        var jsonDonneesCategorie='{"id" : '+donneesCategorie.id+', "nom" : "'+donneesCategorie.nom+'"}';
    this.client.hmset("Categories",""+donneesCategorie.id,jsonDonneesCategorie,function(err,reply) {
 console.log(err);
 console.log(reply);
});
          
    })
     
    return categories;
  }

    async getCategories()
  {
      var categories=[];
   var listeCategorie = await this.getAsync("Categories") 
 //console.log(err);
// console.log(listeCategorie);
//var jsonrep=JSON.parse(reply);

    for(var valeur in listeCategorie)
    {
        //console.log(listeCategorie[valeur]);
        var stringJson=listeCategorie[valeur];
        var document= JSON.parse(stringJson);
       // console.log(document.nom);
      categories.push(new Categorie
        (
          document.id,
           document.nom
        ))        
    }
         

   
     
    return categories;
  }

  

}

module.exports = Redis;
