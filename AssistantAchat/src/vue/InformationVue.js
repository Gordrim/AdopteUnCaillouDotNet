var InformationVue = (function()
{
    var pageInformation = document.getElementById("page-formulaire-info-client").innerHTML;

    return function(produit,actionEnregistrerTransaction)
    {
        this.afficher = function()
        {
            document.getElementById("zone-affichage").innerHTML = pageInformation;


            var formulaireInformation = document.getElementById("formulaire-client");
            formulaireInformation.addEventListener("submit",enregistrerTransaction);

        }

        var enregistrerTransaction = function(evenement)
        {
            //alert("enregistrerCadeau");
            evenement.preventDefault();

            var nom = document.getElementById("nom").value;
            var prenom = document.getElementById("prenom").value;
            var mail = document.getElementById("mail").value;
            var adresse = document.getElementById("adresse").value +" "+ document.getElementById("cp").value +" "+ document.getElementById("ville").value ;
            var pays = document.getElementById("pays").value;
            var transaction = new Transaction(1,produit.id,adresse,pays,mail, nom , prenom);

            actionEnregistrerTransaction(transaction);
        }

    };
})();
