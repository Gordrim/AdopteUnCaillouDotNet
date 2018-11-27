var ConfirmerVue = (function()
{
    var pageConfirmer = document.getElementById("page-confirmation-achat").innerHTML;

    return function()
    {
        this.afficher = function()
        {
            document.getElementById("zone-affichage").innerHTML = pageConfirmer;


           

        }


    };
})();
