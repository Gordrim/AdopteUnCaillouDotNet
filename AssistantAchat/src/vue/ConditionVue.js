var ConditionVue = (function()
{
    var pageCondition = document.getElementById("page-formulaire-acceptation-condition").innerHTML;

    return function(idTransaction,actionValiderCondition)
    {
        this.afficher = function()
        {
            document.getElementById("zone-affichage").innerHTML = pageCondition;


            var formulaireCondition = document.getElementById("formulaire-condition");
            formulaireCondition.addEventListener("submit",validerCondition);

        }

        var validerCondition = function(evenement)
        {
            
            evenement.preventDefault();


            actionValiderCondition(idTransaction);
        }

    };
})();
