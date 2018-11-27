var ListeProduitVue = (function()
{
    var pageListeProduit = document.getElementById("page-liste-produit").innerHTML;

    return function(listeProduitDonnee)
    {
        this.afficher = function()
        {
            document.getElementById("zone-affichage").innerHTML = pageListeProduit;

            var listeProduit= document.getElementById("liste-produit");

            var li="";
            for(var numeroProduit in listeProduitDonnee)
            {
                li += '<li><a href="#produit/'+
                numeroProduit +
                '">' +
                listeProduitDonnee[numeroProduit].nom+
                '</a>';
            }
            listeProduit.innerHTML = li;
        }
    };

})();

