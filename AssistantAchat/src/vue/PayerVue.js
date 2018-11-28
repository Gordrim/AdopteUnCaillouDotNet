var PayerVue = (function()
{
    var pageCondition = document.getElementById("page-formulaire-payement").innerHTML;

    return function(transaction,actionValiderCondition)
    {
        this.afficher = function()
        {
            document.getElementById("zone-affichage").innerHTML = pageCondition;


            var formulairePayer = document.getElementById("formulaire-payment");
            formulairePayer.addEventListener("submit",validerCondition);

        }

        var validerCondition = function(evenement)
        {
            
            evenement.preventDefault();


            actionValiderCondition(transaction);
        }

    };
})();
