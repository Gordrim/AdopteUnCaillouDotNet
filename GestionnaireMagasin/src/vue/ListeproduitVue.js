var ListeProduitVue = (function()
{
    var pageListeProduit = document.getElementById("page-liste-produit").innerHTML;

    return function(listeCategorieDonnee,listeProduitDonnee,idcategorie)
    {
        
        this.afficher = function()
        {
            document.getElementById("zone-affichage").innerHTML = pageListeProduit;

            var listeProduit= document.getElementById("liste-produit");

            var li="";
            for(var numeroProduit in listeProduitDonnee)
            {
                li += '<li> ' +
                listeProduitDonnee[numeroProduit].nom+ ' <a class="btn btn-primary btn-lg" href="#modifierProduit/'+
                 listeProduitDonnee[numeroProduit].id +
                '"> Modifier </a></li>';
            }
            listeProduit.innerHTML = li;
        }
        
       
    };

})();

