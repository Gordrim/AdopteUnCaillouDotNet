var ListeCategorieVue = (function()
{
    var pageListeCategorie = document.getElementById("page-liste-Categorie").innerHTML;

    return function(listeCategorieDonnee)
    {
        this.afficher = function()
        {
            document.getElementsByTagName("body")[0].innerHTML = pageListeCadeau;

            var listeCadeau = document.getElementById("liste-Categorie");

            var li="";
            for(var numeroCategorie in listeCategorieDonnee)
            {   
                
                li += '<a class="nav-link" href="#categorie/'+
                numeroCategorie +
                '">' +
                listeCategorieDonnee[numeroCategorie].nom+
                '</a>;
                    
            }
            listeCadeau.innerHTML = li;
        }
    };

})();

