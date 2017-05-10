// ==UserScript==
// @name      1and1 Antivirus of emails
// @namespace http://freeshell.de/~manu67/pub/
// @description Help to disable antivirus of mail on the 1&1 Customer Area
// @include     https://clients.1and1.fr/CenterCommunication*
// @version    2.0
// @run-at      document-end
// ==/UserScript==/

var divAntivirus = document.getElementById('email-overview');
divAntivirus.insertAdjacentHTML('beforebegin', '<div><button class="button-a1" id="antivirus" type="button">antivirus</button></div>');
//--- Activate the newly added button.
document.getElementById('antivirus').addEventListener('click', ButtonClickAction, false);

function InsertNodeAfter(newElement, targetElement) {
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement)
  parent.appendChild(newElement);
   else
  parent.insertBefore(newElement, targetElement.nextSibling);
}

function addCustomSearchResult(jNode) {
  var links = document.querySelectorAll('a[href^="/email-quota-upgrade"]');
  for (var J = links.length - 1; J >= 0; --J) {
    var thisLink = links[J];
    var newElement = document.createElement('span');
    newURL = thisLink.href.replace('https://clients.1and1.fr/email-quota-upgrade?id=', 'https://clients.1and1.fr/Email_SingleVirusProtection?id=');
    newElement.innerHTML = '<a class="standard anker-a1" href="' + newURL + '"> | AV</a>';
    InsertNodeAfter(newElement, thisLink);
  }
}

function ButtonClickAction(zEvent) {
  /*--- For our dummy action, we'll just add a line of text to the top of the screen.
    */
  addCustomSearchResult();
}
