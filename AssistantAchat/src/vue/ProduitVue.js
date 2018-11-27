var ProduitVue = (function()
{
    var pageProduit = document.getElementById("page-produit").innerHTML;

    return function(produit)
    {
        this.afficher = function()
        {
            document.getElementById("zone-affichage").innerHTML = pageProduit;

             document.getElementById("produit-nom").innerHTML=produit.nom;
             document.getElementById("produit-prix").innerHTML=produit.prix;
             document.getElementById("produit-description").innerHTML=produit.description;
             document.getElementById("retour-categorie").href="#categorie/"+produit.categorie.id;
            document.getElementById("produit-acheter").href="#information/"+produit.id;
  
        }
    };

})();

