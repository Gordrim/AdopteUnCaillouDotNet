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

  async getTransaction()
  {
    var transactions = [];
      var sql = "Select * from transaction ";
    const resultat = await  this.basededonnees.query(sql); 
     //  console.log(JSON.stringify(resultat.rows));
    resultat.rows.forEach((doc) =>
    {
      var donneesTransaction = doc;
      transactions.push(new transaction
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
    return transactions;
  }


  async getTransaction(id)
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

async getStatistiqueVenteParMois(annee)
  { 
        var statistiques = [];
       var sql = "Select EXTRACT(MONTH FROM transaction.date) as mois, Count(transaction.id) as nombreVente, sum(produit.prix) as profitTotal ,avg(produit.prix) as profitMoyenParVente   from transaction INNER JOIN  produit ON transaction.produit = produit.id where EXTRACT(YEAR FROM transaction.date) =  {{annee}} group by mois ";
      sql = sql.replace("{{annee}}",annee);
      
      const resultat = await  this.basededonnees.query(sql); 
      resultat.rows.forEach((doc) =>
    {
          //Todo a finir requette 
         var sqlproduit = "Select * from produit where id =  (Select idproduit from  (select produit.id as idproduit , sum(produit.prix) as benefice from transaction  INNER JOIN  produit ON transaction.produit = produit.id where EXTRACT(YEAR FROM transaction.date) = {{annee}} and EXTRACT(MONTH FROM transaction.date) = {{mois}} group by produit.id ORDER BY benefice DESC) as rechercheBenefice limit 1)";
          sqlproduit = sqlproduit.replace("{{annee}}",annee).replace("{{mois}}",doc.mois);
      
    
    const resultatproduit = await  this.basededonnees.query(sqlproduit); 
   
    var donneesProduit = resultatproduit.rows[0];
    var produit = new Produit(
          donneesProduit.id,
          donneesProduit.nom,
          donneesProduit.prix,
          donneesProduit.description,
          donneesProduit.categorie
    ); 
    
    var sqlCategorie = "Select * from categorie where id =  (Select idcategorie from  (select produit.categorie as idcategorie , sum(produit.prix) as benefice from transaction  INNER JOIN  produit ON transaction.produit = produit.id where EXTRACT(YEAR FROM transaction.date) = 2018 and EXTRACT(MONTH FROM transaction.date) = 11 group by produit.id, produit.categorie ORDER BY benefice DESC) as rechercheBenefice limit 1)";
          sqlproduit = sqlproduit.replace("{{annee}}",annee).replace("{{mois}}",doc.mois);
      
     
    const resultatCategorie = await  this.basededonnees.query(sqlCategorie); 
   
    var donneesCategorie = resultatCategorie.rows[0];
    var categorie =  new Categorie
    (
      donneesCategorie.id,
      donneesCategorie.nom
    );
    
      var donneesStatistique = doc;
      statistiques.push(
        {
         var mois = donneesStatistique.mois,
         var nombreVente = donneesStatistique.nombreVente,
         var profitTotal = donneesStatistique.profitTotal,
         var profitMoyenParVente = donneesStatistique.profitMoyenParVente,
         var meilleurProduit = produit,
         var meilleurCategorie = categorie
        })
    })
    return statistiques;
    
  }

module.exports = TransactionDAO;
