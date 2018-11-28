var postgresql = require('pg');


class ProduitDAO
{


constructor()
  {
    this.chaineDeConnection ='postgres://postgres:test@localhost:5432/adopteUnCaillouDotNet'; 
    this.basededonnees =null;
    
  }

  async init()
  {
     
    this.basededonnees = new postgresql.Client(this.chaineDeConnection);
    await this.basededonnees.connect();
  }

  async getProduits()
  {
    var produits = [];
      var sql = "Select * from produit ";
    const resultat = await  this.basededonnees.query(sql); 
      // console.log(JSON.stringify(resultat.rows));
    resultat.rows.forEach((doc) =>
    {
      var donneesProduit = doc;
      produits.push(new Produit
        (
          donneesProduit.id,
          donneesProduit.nom,
          donneesProduit.prix,
          donneesProduit.description,
          donneesProduit.categorie
          
        ))
    })
    return produits;
  }

    async getProduitsBycategorie(categorieId)
  {
    var produits = [];
    var sql = "Select * from produit where categorie ={{categorieId}}";
	sql = sql.replace("{{categorieId}}",categorieId);
    const resultat = await  this.basededonnees.query(sql); 
    //   console.log(JSON.stringify(resultat.rows));
    resultat.rows.forEach((doc) =>
    {
      var donneesProduit = doc;
      produits.push(new Produit
        (
         donneesProduit.id,
          donneesProduit.nom,
          donneesProduit.prix,
          donneesProduit.description,
          donneesProduit.categorie
        
        ))
    })
    return produits;
  }

  async getProduit(id)
  {
    var sql = "Select * from produit where id ={{id}}";
	sql = sql.replace("{{id}}",id);
      
     // console.log(sql)
    const resultat = await  this.basededonnees.query(sql); 
    //console.log(JSON.stringify(resultat.rows));
    var donneesProduit = resultat.rows[0];
    return new Produit
        (
          donneesProduit.id,
          donneesProduit.nom,
          donneesProduit.prix,
          donneesProduit.description,
          donneesProduit.categorie
        
        );
  }

  async ajouterProduit(produit)
  {
    var sql = "insert into produit( nom, prix, description, categorie) VALUES ('{{nom}}',{{prix}},'{{description}}',{{categorie}})";
	sql = sql.replace("{{nom}}", produit.nom).replace("{{prix}}", produit.prix).replace("{{description}}", produit.description).replace("{{categorie}}", produit.categorie);
	//console.log(sql);
    basededonnees.query(sql); 
  }

  async modifierProduit(categorie)
  {
     var sql = "UPDATE produit SET nom='{{nom}}', prix={{prix}}, description='{{description}}', categorie={{categorie}} WHERE id= {{id}}";
	sql = sql.replace("{{nom}}", produit.nom).replace("{{prix}}", produit.prix).replace("{{description}}", produit.description).replace("{{categorie}}", produit.categorie).replace("{{id}}", produit.id);
	//console.log(sql);
    basededonnees.query(sql); 
  }

  async supprimerProduit(id)
  {
     var sql = "DELETE FROM produit WHERE id= {{id}}";
	sql = sql.replace("{{id}}",id);
	//console.log(sql);
    basededonnees.query(sql); 
  }

}

module.exports = ProduitDAO;
