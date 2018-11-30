var ModifierProduitVue = (function()
{
    var pageModifierProduit = document.getElementById("page-formulaire-modifier-produit").innerHTML;

    return function(actionmodifierProduit,listeCategorieDonnee,produit)
    {
        this.afficher = function()
        {
            document.getElementById("zone-affichage").innerHTML = pageModifierProduit;

            var formulairemodifier=document.getElementById('formulaire-modif-produit');
            
            document.getElementById("nom").value  = produit.nom;
            document.getElementById("prix").value = produit.prix;
             document.getElementById("description").value = produit.description;
            document.getElementById("categorie").value = produit.categorie ;
            
            var select="";
            for(var numeroCategorie in listeCategorieDonnee)
                {
                   select +='<option value= "'+numeroCategorie+'" ';
                    if(numeroCategorie == produit.categorie )
                    {
                     select +='selected="selected"';   
                    }
                     select +='>'+ listeCategorieDonnee[numeroCategorie].nom +'</option>'; 
                }
                document.getElementById("categorie").innerHTML= select;
            formulairemodifier.addEventListener("submit",modifierProduit);  
            
             
        }
        
         var modifierProduit = function(evenement)
        {
            evenement.preventDefault();
            
           
            var nom = document.getElementById("nom").value;
            var prix = document.getElementById("prix").value;
            var description = document.getElementById("description").value;
            var categorie = document.getElementById("categorie").value;
            
            var produitModifier = new Produit(produit.id,nom,prix,description,categorie);

            actionmodifierProduit(produitModifier);
        }
    };

})();

