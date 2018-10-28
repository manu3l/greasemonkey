// ==UserScript==
// @name      1and1 Ionos - Antivirus of emails
// @namespace https://github.com/manu3l/greasemonkey
// @description Disable antivirus of mail on the 1&1 Ionos Customer Area
// @include     https://my.ionos.fr/email-overview*
// @include     https://my.ionos.fr/email-virus-protection/mailbox/*
// @version     3.3
// @icon        https://contact.ionos.fr/img/components/header/favicon.ico
// @run-at      document-end
// ==/UserScript==/

/* open url in tabs for antivirus switch */
function openAntiVirusTab() {
  var links = document.querySelectorAll('td.address > a[href*=\'mailbox\'].email-address');
  var antiviruslink = document.querySelectorAll('td.column-3 > a, td.column-3 > span');
  for (var J = links.length - 1; J >= 0; --J) {
    var thisLink = links[J];
    var antivirusornot = antiviruslink[J];
    if (antivirusornot.className == 'markup-before icon-font checked') {
      newURL = thisLink.href.replace(RegExp('https://my.ionos.fr\\/email-account-details\\/mailbox\\/(.*)'), 'https://my.ionos.fr/email-virus-protection/mailbox/$1');
      window.open(newURL);
    }
  }
}

/* open from the opened tab, switch the button and close the tabs*/
function clickAV() {
  var avButton = document.getElementById('email-edit-virus-activate');
  if (avButton && avButton.value == 'true') {
    avButton.click();
    setTimeout(function () {
      window.close();
    }, 4000);
  }
}
var divAntivirus = document.getElementById('email-overview-table');
if (divAntivirus) {
  divAntivirus.insertAdjacentHTML('beforebegin', //'<button class="button-a1" id="antivirus" type="button">antivirus</button> ' +
  '<button class="button-secondary" id="Allantivirus" type="button" title="Désactive tous les antivirus activé sur l\'affichage courant">Antivirus</button>');
  /* no more used
    document.getElementById('antivirus').addEventListener('click', ButtonClickAction, false);*/
  document.getElementById('Allantivirus').addEventListener('click', openAntiVirusTab, false);
}
clickAV();
