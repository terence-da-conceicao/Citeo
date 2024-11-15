

// On transforme le chemin relatif de notre fichier json en URL afin de pouvoir effectuer un fetch dessus

let allQuotes;
let sagesse = [];
let motivation = [];


//fonction de déclenchement du bouton ok (fonctionnalité recherche) 
document.getElementById("ok").addEventListener('click', function() {
let mot = champRecherche.value;
  if (mot.length != 0) {
    cherche(mot)
  } else {
    document.getElementById("citation").innerHTML = "Mais tu n'as écrit aucun mot?! Bah écris un mot...."
    document.getElementById("auteur").innerHTML = "☼ Célia, Tiphaine et Térence ☼"
  }

});


fetch(chrome.runtime.getURL('quotes.json'))
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    allQuotes = data;
    afficher(data);
    return(data);
  })
  
  .catch(function(error) {
    console.error("Erreur lors du chargement du fichier JSON : ", error);
  });
  

function afficher(dataFetch) {
  if(dataFetch === undefined){
    console.error("Paramètre dataFetch de la fonction afficher ne doit pas être undefined ");
    return;
  }

  let randomId = Math.floor(Math.random() * dataFetch.quotes.length);

  document.getElementById("citation").innerHTML= dataFetch.quotes[randomId].quote;
  document.getElementById("auteur").innerHTML= dataFetch.quotes[randomId].author;

  let sagesseId = [0,1,2,3,4,11,12,13,14,15,16,17,18,20,23,24,26,27,30,31,32,33,34,35,36,37,38,39,42,43];
  sagesse = sagesseId.map(i => dataFetch.quotes[i]);

  let motivationId = [1,2,4,5,6,7,8,9,10,13,19,20,21,22,25,28,29,32,35,36,37,40,41];
  motivation = motivationId.map(i => dataFetch.quotes[i]);

  

}



function afficherSagesse() {
  let randomSagesseId = Math.floor(Math.random() * sagesse.length);

  document.getElementById("citation").innerHTML= sagesse[randomSagesseId].quote;
  document.getElementById("auteur").innerHTML= sagesse[randomSagesseId].author;
}


function afficherMotivation() {
  let randomMotivationId = Math.floor(Math.random() * motivation.length);

  document.getElementById("citation").innerHTML = motivation[randomMotivationId].quote;
  document.getElementById("auteur").innerHTML = motivation[randomMotivationId].author;
}


document.getElementById("aleatoire").addEventListener('click', function() {
  afficher(allQuotes);
});

document.getElementById("sagesse").addEventListener('click', function() {
  afficherSagesse();
  
});

document.getElementById("motivation").addEventListener('click', function() {
   afficherMotivation();
});



function cherche(mot){
  let rechercheParMot = [];
  let rechercheParAuteur = [];
  let tableau = allQuotes.quotes
 
  for (let i = 0; i < tableau.length; i++ ) {
    let citation = tableau[i].quote
    let auteur = tableau[i].author
    if (citation.includes(mot)) {
      rechercheParMot.push(citation);
      rechercheParAuteur.push(auteur);
    }
  }

  
  if (rechercheParMot.length != 0) {
    let randomIdCitation = Math.floor(Math.random() * rechercheParMot.length); 
    document.getElementById("citation").innerHTML = rechercheParMot[randomIdCitation];
    document.getElementById("auteur").innerHTML = rechercheParAuteur[randomIdCitation];
  
  } else {
    document.getElementById("citation").innerHTML = "Oh non... aucune citation ne contient ce mot! Essaye autre chose!"
    document.getElementById("auteur").innerHTML = ""
  }
}