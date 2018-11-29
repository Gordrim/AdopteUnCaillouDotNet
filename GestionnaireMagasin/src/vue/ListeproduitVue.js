var ListeProduitVue = (function()
{
    var pageListeProduit = document.getElementById("page-liste-produit").innerHTML;

    return function(actionmodifierProduit,listeCategorieDonnee,listeProduitDonnee,idcategorie)
    {
        this.afficher = function()
        {
            document.getElementById("zone-affichage").innerHTML = pageListeProduit;

            var listeProduit= document.getElementById("liste-produit");
           if(idcategorie>-1)
           {
               document.getElementById("categorie-liste").innerHTML=" Liste des  "+listeCategorieDonnee[idcategorie].nom;
           }
            var li="";
            var tableauFormulaireModification=[];
            var tableauIdFormulaireModification=[];
            for(var numeroProduit in listeProduitDonnee)
            {
                li += '<li><form class="form-inline" id="formulaire-modif-produit'+numeroProduit+'">'+
                    '<div><label  for="nom">Nom</label>'+
					'<input class="form-control" type="text" name="nom" id="nom" value="'+listeProduitDonnee[numeroProduit].nom+'"/>'+
				'</div><div>'+
				'<label for="prenom">prix</label>'+
				'<input class="form-control"  type="number" min="0" name="prix" id="prix" value="'+listeProduitDonnee[numeroProduit].prix+'"/>'+
				'</div><div>'+
				'<label for="description">Description</label>'+
				'<textarea class="form-control"   name="description" id="description">'+listeProduitDonnee[numeroProduit].description+'</textarea>'+
				'</div><div>'+
                '<label for="categorie">Categorie </label>'+
                '<select class="form-control"name="categorie" id="categorie">';
                for(var numeroCategorie in listeCategorieDonnee)
                {
                   li +='<option value= "'+numeroCategorie+'" ';
                    if(numeroCategorie == listeProduitDonnee[numeroProduit].categorie )
                    {
                     li +='selected="selected"';   
                    }
                     li +='>'+ listeCategorieDonnee[numeroCategorie].nom +'</option>'; 
                }
                 li +='</select>'+
				'</div>'+
                '<input  type="hidden" id="id" value="'+listeProduitDonnee[numeroProduit].id+'"/>'+
				'<input class="btn btn-primary btn-lg" type="submit" id="modifier" name="modifier" value="modifier"/></form></li>';
            
            var idformulaire='formulaire-modif-produit'+numeroProduit;
            tableauIdFormulaireModification[numeroProduit]=idformulaire;
               
            }
            listeProduit.innerHTML = li;
            for(var idform in tableauIdFormulaireModification){
            tableauFormulaireModification[idform]=document.getElementById(tableauIdFormulaireModification[idform]);
            tableauFormulaireModification[idform].addEventListener("submit",modifierProduit);  
            }
             
        }
        
         var modifierProduit = function(evenement)
        {
            //alert("modifierProduit");
            evenement.preventDefault();
            
            var id =  document.getElementById("id").value;
            var nom = document.getElementById("nom").value;
            var prix = document.getElementById("prix").value;
            var description = document.getElementById("description").value;
            var categorie = document.getElementById("categorie").value;
            
            var produit = new Produit(id,nom,prix,description,categorie);

            actionmodifierProduit(produit);
        }
    };

})();

