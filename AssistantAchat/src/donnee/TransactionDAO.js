var postgresql = require('pg');


class TransactionDAO
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
     //  console.log(JSON.stringify(resultat.rows));
    resultat.rows.forEach((doc) =>
    {
      var donneesTransaction = doc;
      produits.push(new transaction
        (
         donneesTransaction.id,
          donneesTransaction.produit,
          donneesTransaction.adresse,
          donneesTransaction.pays,
          donneesTransaction.mail,
          donneesTransaction.nom,
          donneesTransaction.prenom,
          donneesTransaction.date
          
        ))
    })
    return produits;
  }


  async getProduit(id)
  {
    var sql = "Select * from transaction where id ={{id}}";
	sql = sql.replace("{{id}}",id);
      
    //  console.log(sql)
    const resultat = await  this.basededonnees.query(sql); 
   // console.log(JSON.stringify(resultat.rows));
    var donneesTransaction = resultat.rows[0];
    return new transaction
        (
         donneesTransaction.id,
          donneesTransaction.produit,
          donneesTransaction.adresse,
          donneesTransaction.pays,
          donneesTransaction.mail,
          donneesTransaction.nom,
          donneesTransaction.prenom,
          donneesTransaction.date
          
        );
  }

  async ajouterTransaction(transaction)
  {
    var sql = "INSERT INTO transaction( produit, adresse, pays, mail, nom, prenom, date) VALUES ({{produit}},'{{adresse}}','{{pays}}','{{mail}}','{{nom}}','{{prenom}}',now())";
	sql = sql.replace("{{produit}}", transaction.produit).replace("{{adresse}}",transaction.adresse).replace("{{pays}}", transaction.pays).replace("{{mail}}", transaction.mail).replace("{{nom}}", transaction.nom).replace("{{prenom}}", transaction.prenom);
	//console.log(sql);
   basededonnees.query(sql); 
  }

  async modifierProduit(categorie)
  {
     var sql = "UPDATE transaction	SET  produit={{produit}}, adresse='{{adresse}}', pays='{{pays}}', mail='{{mail}}', nom='{{nom}}', prenom='{{prenom}}', date={{date}}' WHERE id= {{id}}";
	sql = sql.replace("{{produit}}", transaction.produit).replace("{{adresse}}",transaction.adresse).replace("{{pays}}", transaction.pays).replace("{{mail}}", transaction.mail).replace("{{nom}}", transaction.nom).replace("{{prenom}}", transaction.prenom).replace("{{date}}", transaction.date);
	//console.log(sql);
    basededonnees.query(sql); 
  }

  async supprimerProduit(id)
  {
     var sql = "DELETE FROM transaction WHERE id= {{id}}";
	sql = sql.replace("{{id}}",id);
//	console.log(sql);
    basededonnees.query(sql); 
  }

}

module.exports = TransactionDAO;
