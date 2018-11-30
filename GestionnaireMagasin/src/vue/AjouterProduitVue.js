var AjouterProduitVue = (function()
{
    var pageAjouterProduit = document.getElementById("page-formulaire-ajout-produit").innerHTML;

    return function(actionEnregistrerProduit,listeCategorieDonnee)
    {
        this.afficher = function()
        {
            document.getElementById("zone-affichage").innerHTML = pageAjouterProduit;

            var formulaireAjouter=document.getElementById('formulaire-ajout');
            
            
            var select="";
            for(var numeroCategorie in listeCategorieDonnee)
                {
                   select +='<option value= "'+numeroCategorie+'" >'+ listeCategorieDonnee[numeroCategorie].nom +'</option>'; 
                }
                document.getElementById("categorie").innerHTML= select;
            formulaireAjouter.addEventListener("submit",AjouterProduit);  
            
             
        }
        
         var AjouterProduit = function(evenement)
        {
            evenement.preventDefault();
            
           
            var nom = document.getElementById("nom").value;
            var prix = document.getElementById("prix").value;
            var description = document.getElementById("description").value;
            var categorie = document.getElementById("categorie").value;
            
            var produit = new Produit(0,nom,prix,description,categorie);

            actionEnregistrerProduit(produit);
        }
    };

})();

