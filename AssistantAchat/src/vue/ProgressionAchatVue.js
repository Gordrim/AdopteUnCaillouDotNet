var ProgressionAchatVue = (function()
{


    return function(idEtapeVente)
    {
        this.afficher = function()
        {

            var barreProgression = document.getElementById("progression-processus");
            
            switch(idEtapeVente) {
                case 1:
                barreProgression.innerHTML="choisir la personnalisation";   
                barreProgression.style.width="20%";
                break;
                case 2:
                barreProgression.innerHTML="renseigner info perso"; 
                barreProgression.style.width="40%";
                break;
                case 3:
                barreProgression.innerHTML="accepter les conditions de vente";
                barreProgression.style.width="60%";
                break;
                case 4:
                 barreProgression.innerHTML="payer";
                barreProgression.style.width="80%";
                break;
                case 4:
                barreProgression.innerHTML=" confirmation d'achat "; 
                barreProgression.style.width="100%";
                break;
                default:
                 barreProgression.style.width="0%";
}    
        }
    };

})();

