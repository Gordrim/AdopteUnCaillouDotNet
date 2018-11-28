var postgresql = require('pg');

//const Categorie = require('../modele/Categorie');

class CategorieDAO
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

  async getCategories()
  {
    var categories = [];
      var sql = "Select * from categorie ";
    const resultat = await  this.basededonnees.query(sql); 
       console.log(JSON.stringify(resultat.rows));
    resultat.rows.forEach((doc) =>
    {
      var donneesCategorie = doc;
      categories.push(new Categorie
        (
          donneesCategorie.id,
          donneesCategorie.nom
        ))
    })
    return categories;
  }

  async getCategorie(id)
  {
    var sql = "Select * from categorie where id ={{id}}";
	sql = sql.replace("{{id}}",id);
      
      console.log(sql)
    const resultat = await  this.basededonnees.query(sql); 
    console.log(JSON.stringify(resultat.rows));
    //var donneesCategorie = resultat.rows[0];
    return /*new Categorie
    (
      donneesCategorie.id,
      donneesCategorie.nom
    )*/ 1;
  }

  async ajouterCategorie(categorie)
  {
    var sql = "insert into categorie (nom) VALUES({{nom}})";
	sql = sql.replace("{{nom}}", categorie.nom);
	console.log(sql);
    basededonnees.query(sql); 
  }

  async modifierCategorie(categorie)
  {
     var sql = "update categorie nom={{nom}} WHERE id= {{id}}";
	sql = sql.replace("{{nom}}", categorie.nom).replace("{{id}}", categorie.id);
	console.log(sql);
    basededonnees.query(sql); 
  }

  async supprimerCategorie(id)
  {
     var sql = "DELETE FROM categorie WHERE id= {{id}}";
	sql = sql.replace("{{id}}",id);
	console.log(sql);
    basededonnees.query(sql); 
  }

}

module.exports = CategorieDAO;
