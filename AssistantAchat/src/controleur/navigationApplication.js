const CategorieDao = require('../donnee/CategorieDao');
(function()
{
    var categorieDao= new CategorieDao();   
    var instance = this;

    var initialiser = async function()
    {
        
        await categorieDao.init();
        window.addEventListener("hashchange",naviguer);

        await naviguer();

    }

    var naviguer = async function()
    {
     var hash = window.location.hash;

        if(!hash)
        {
           var progression = new ProgressionAchatVue(1);
            progression.afficher();
            var listecategorie = await categorieDao.getCategories();
            var vueListeCategorie = new ListeCategorieVue(listecategorie);
            vueListeCategorie.afficher();
            
            
            var produit1 = new Produit(1,"galet commun clasique",25,"description galette commun clasique",listecategorie[0]);
            var produit2 = new Produit(2,"galet commun rugeut ",25," description galette commun rugeut ",listecategorie[0]);
            var listeProduit=[produit1,produit2];
            var vueListeProduit = new ListeProduitVue(listeProduit);
            vueListeProduit.afficher();
        }
        else if( hash.match(/^#categorie\/([0-9]+)/))
        {
            var navigation = hash.match(/^#categorie\/([0-9]+)/);
           
            var idCategorie = navigation[1];
           
            var progression = new ProgressionAchatVue(1);
            progression.afficher();
            
            var listecategorie = await categorieDao.getCategories();
            var vueListeCategorie = new ListeCategorieVue(listecategorie);
            vueListeCategorie.afficher();
            
            var categorie = await categorieDao.getCategorie(idCategorie);
             
            var produit1 = new Produit(1,"galet commun clasique",25,"description galette commun clasique",categorie);
            var produit2 = new Produit(2,"galet commun rugeut ",25," description galette commun rugeut ",categorie);
            var listeProduit=[produit1,produit2];
            var vueListeProduit = new ListeProduitVue(listeProduit);
            vueListeProduit.afficher();
        }
         else if( hash.match(/^#produit\/([0-9]+)/))
        {
            var navigation = hash.match(/^#produit\/([0-9]+)/);
           
            var idProduit = navigation[1];
           
             var progression = new ProgressionAchatVue(1);
            progression.afficher();
            
            var listecategorie = await categorieDao.getCategories();
            var vueListeCategorie = new ListeCategorieVue(listecategorie);
            vueListeCategorie.afficher();
            
            
            var produit1 = new Produit(1,"galet commun clasique",25,"description galette commun clasique",listecategorie[0]);
            var vueProduit = new ProduitVue(produit1);
            vueProduit.afficher();
        }
        else if( hash.match(/^#information\/([0-9]+)/))
        {
            var navigation = hash.match(/^#information\/([0-9]+)/);
           
            var idProduit = navigation[1];
           
             var progression = new ProgressionAchatVue(2);
            progression.afficher();
            
            var listecategorie = await categorieDao.getCategories();
            var vueListeCategorie = new ListeCategorieVue(listecategorie);
            vueListeCategorie.afficher();
            
            
           var produit1 = new Produit(1,"galet commun clasique",25,"description galette commun clasique",listecategorie[0]);
            var informationVue = new InformationVue(produit1,actionEnregistrerTransaction);
            informationVue.afficher();
        }
        else if( hash.match(/^#condition\/([0-9]+)/))
        {
            var navigation = hash.match(/^#condition\/([0-9]+)/);
           
            var idTransaction = navigation[1];
           
             var progression = new ProgressionAchatVue(3);
            progression.afficher();
            
            var listecategorie = await categorieDao.getCategories();
            var vueListeCategorie = new ListeCategorieVue(listecategorie);
            vueListeCategorie.afficher();
            
            var conditionVue = new ConditionVue(idTransaction,actionValiderCondition);
            conditionVue.afficher();
        }
        else if( hash.match(/^#payer\/([0-9]+)/))
        {
            var navigation = hash.match(/^#payer\/([0-9]+)/);
           
            var idTransaction = navigation[1];
           
             var progression = new ProgressionAchatVue(4);
            progression.afficher();
            
            var listecategorie = await categorieDao.getCategories();
            var vueListeCategorie = new ListeCategorieVue(listecategorie);
            vueListeCategorie.afficher();
            
            var payerVue = new PayerVue(idTransaction,actionValiderPayment);
            payerVue.afficher();
        }
        else if( hash.match(/^#comfirmation/))
        {
            
             var progression = new ProgressionAchatVue(5);
            progression.afficher();
            
           var listecategorie = await categorieDao.getCategories();
            var vueListeCategorie = new ListeCategorieVue(listecategorie);
            vueListeCategorie.afficher();
            
            var confirmerVue = new ConfirmerVue();
            confirmerVue.afficher();
        }
    }
      var actionEnregistrerTransaction = function(transaction)
    {
       
         window.location.hash = "#condition/"+transaction.id;
    }
     var actionValiderCondition = function(idTransaction)
    {
       
         window.location.hash = "#payer/"+idTransaction;
    }
      var actionValiderPayment = function(idTransaction)
    {
       
         window.location.hash = "#comfirmation";
    }
    
      
    initialiser();

})();