const CategorieDao = require('../donnee/CategorieDao');
const ProduitDao = require('../donnee/ProduitDao');
(function()
{
    var categorieDao= new CategorieDao();   
    var produitDao= new ProduitDao();   
    var instance = this;

    var initialiser = async function()
    {
        await produitDao.init();
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
            
            
            //var produit1 = new Produit(1,"galet commun clasique",25,"description galette commun clasique",listecategorie[0]);
            //var produit2 = new Produit(2,"galet commun rugeut ",25," description galette commun rugeut ",listecategorie[0]);
            var listeProduit=await produitDao.getProduits();
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
            
             
            var listeProduit=await produitDao.getProduitsBycategorie(idCategorie);
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
            
            
           
             var produit= await produitDao.getProduit(idProduit);
            var vueProduit = new ProduitVue(produit);
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
            
            
            var produit= await produitDao.getProduit(idProduit);
            var informationVue = new InformationVue(produit,actionEnregistrerTransaction);
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