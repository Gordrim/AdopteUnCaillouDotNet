const CategorieDao = require('../donnee/CategorieDao');
const ProduitDao = require('../donnee/ProduitDao');
const TransactionDao = require('../donnee/TransactionDao');
(function()
{
    var categorieDao= new CategorieDao();   
    var produitDao= new ProduitDao();
    var transactionDao = new TransactionDao();
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
        
       console.log(hash); 
        if(!hash)
        {
            var listecategorie = await categorieDao.getCategories();
            var vueListeCategorie = new ListeCategorieVue(listecategorie);
            vueListeCategorie.afficher();
            
            var idCategorie =-1;
            
            var listeProduit=await produitDao.getProduits();
            var vueListeProduit = new ListeProduitVue(listecategorie,listeProduit,idCategorie);
            vueListeProduit.afficher();
        }
        else if( hash.match(/^#categorie\/([0-9]+)/))
        {
            var navigation = hash.match(/^#categorie\/([0-9]+)/);
           
            var idCategorie = navigation[1];
           
            
            var listecategorie = await categorieDao.getCategories();
            var vueListeCategorie = new ListeCategorieVue(listecategorie);
            vueListeCategorie.afficher();
            
             
            var listeProduit=await produitDao.getProduitsBycategorie(idCategorie);
            var vueListeProduit = new ListeProduitVue(listecategorie,listeProduit,idCategorie);
            vueListeProduit.afficher();
        }
         else if( hash.match(/^#ajoutProduit/))
        {
                    
            var listecategorie = await categorieDao.getCategories();
            var vueListeCategorie = new ListeCategorieVue(listecategorie);
            vueListeCategorie.afficher();
            
            
            var vueAjouterProduit = new AjouterProduitVue(actionEnregistrerProduit,listecategorie);
           vueAjouterProduit.afficher();
        }
         else if( hash.match(/^#modifierProduit\/([0-9]+)/))
        {
           
            var navigation = hash.match(/^#modifierProduit\/([0-9]+)/);
           
            var idProduit = navigation[1];
             
            var listecategorie = await categorieDao.getCategories();
            var vueListeCategorie = new ListeCategorieVue(listecategorie);
            vueListeCategorie.afficher();
            
            var produit= await produitDao.getProduit(idProduit);
            var vueModifierProduit = new ModifierProduitVue(actionmodifierProduit,listecategorie,produit);
            vueModifierProduit.afficher();
        }
    }
        
      var actionmodifierProduit = async function(produit)
    {
              produitDao.modifierProduit(produit);
        window.location.hash = "#categorie/"+produit.categorie;
    }
      var actionEnregistrerProduit = async function(produit)
    {
              produitDao.ajouterProduit(produit);
        window.location.hash = "#categorie/"+produit.categorie;
    }
    
      
    initialiser();

})();