

// Licht en donkere modus wisselen
function lightDark() {
   const element = document.body;
   element.classList.toggle("dark-theme");
   sterretjesKleur();
   localStorage.setItem(
      "punkyfis-theme",
      element.classList.contains("dark-theme") ? "dark" : "light"
   );
}



// Allow opslaan in localStorage zodat cookies niet elke keer gevraagd word
// Allow klikken laad de Webring.js in, deny klikken laat de site de cookies verwijderen
function saveCookieConsent(allowed) {
   localStorage.setItem("consent", allowed ? "true" : "false");

   if (allowed) {
      setIframeAvailability(true);
      cookieAllow();
   } else {
      setIframeAvailability(false);
      cookieDeny();
   }
}

// Externe embeds laden pas nadat de bezoeker toestemming heeft gegeven
function setIframeAvailability(allowed) {
   document.querySelectorAll("iframe[data-consent-src]").forEach((iframe) => {
      if (allowed) {
         iframe.src = iframe.dataset.consentSrc;
      } else {
         iframe.removeAttribute("src");
      }
   });
}

function openCookieSettings() {
   const dialog = document.getElementById("cookieModal");
   if (dialog && !dialog.open) {
      dialog.show();
   }
}

// De digitaal tuintje webring pas laten werken als er op allow word gedrukt (code voor if (allowed) statement hierboven)
function cookieAllow() {
   if (localStorage.getItem("consent") !== "true") return;
   if (document.querySelector('script[data-page="https://punkyfis.nl"]')) return;

   const script = document.createElement("script");
   script.dataset.page = "https://punkyfis.nl";
   script.src = "assets/javascript/webring.js";
   script.addEventListener("load", koppelWebring, { once: true });
   document.head.appendChild(script);
}

// Verwijder de webring en cookies wanneer iemand deny kiest
function cookieDeny() {
   const webringScript = document.querySelector('script[data-page="https://punkyfis.nl"]');
   if (webringScript) {
      webringScript.remove();
   }

   const webring = document.querySelector(".webring");
   if (webring) {
      webring.remove();
   }

   const cookies = document.cookie.split(";");
   for (const cookie of cookies) {
      const name = cookie.split("=")[0].trim();
      if (name) {
         document.cookie = `${name}=; expires=Thu, 03 Jan 1970 00:00:00 UTC; path=/`;
      }
   }
}

// Kijkt of apparaat in light of dark mode staat
const systemColorScheme = window.matchMedia("(prefers-color-scheme: dark)");

function applySystemColorScheme() {
   const savedTheme = localStorage.getItem("punkyfis-theme");
   const useDarkTheme = savedTheme
      ? savedTheme === "dark"
      : systemColorScheme.matches;
   document.body.classList.toggle("dark-theme", useDarkTheme);
   sterretjesKleur();
}

if (document.readyState === "loading") {
   document.addEventListener("DOMContentLoaded", applySystemColorScheme, { once: true });
} else {
   applySystemColorScheme();
}

systemColorScheme.addEventListener("change", applySystemColorScheme);



// Huidige datum en tijd
function updateDatumTijd() {
   const datumElement = document.getElementById('currentDate');
   const tijdElement = document.getElementById('currentTime');

   if (!datumElement || !tijdElement) return;

   const nu = new Date();

   datumElement.textContent = nu.toLocaleDateString('nl-NL', {
      day: '2-digit',
      month: '2-digit'
   });

   tijdElement.textContent = nu.toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit'
   });
}



// Batterij
function zetBatterijNiveau(niveau) {
   const veiligNiveau = Math.min(100, Math.max(0, niveau));
   localStorage.setItem('punkyfis-battery', String(veiligNiveau));

   const segmenten = document.querySelectorAll('.battery-segment');
   let aantalSegmentenVol = 0;

   if (veiligNiveau <= 10) {
      aantalSegmentenVol = 1;
   } else if (veiligNiveau <= 33) {
      aantalSegmentenVol = 1;
   } else if (veiligNiveau <= 66) {
      aantalSegmentenVol = 2;
   } else {
      aantalSegmentenVol = 3;
   }

   segmenten.forEach((segment, index) => {
      const isVol = index < aantalSegmentenVol;
      segment.classList.toggle('is-full', isVol);
      segment.classList.toggle('is-low', veiligNiveau <= 10 && isVol);
   });

   const batterijShell = document.querySelector('.battery-shell');
   if (batterijShell) {
      batterijShell.classList.toggle('is-low', veiligNiveau <= 10);
   }

   const batterijElement = document.querySelector('.battery');
   if (batterijElement) {
      batterijElement.setAttribute('title', `Batterij ${veiligNiveau}%`);
   }
}

async function koppelBatterijStatus() {
   if (navigator.getBattery) {
      try {
         const batterij = await navigator.getBattery();
         const werkBij = () => zetBatterijNiveau(Math.round(batterij.level * 100));
         werkBij();
         batterij.addEventListener('levelchange', werkBij);
         batterij.addEventListener('chargingchange', werkBij);
         return;
      } catch (error) {
         console.warn('Batterij-API niet beschikbaar:', error);
      }
   }

   const opgeslagenNiveau = Number(localStorage.getItem('punkyfis-battery'));
   zetBatterijNiveau(Number.isFinite(opgeslagenNiveau) ? opgeslagenNiveau : 80);
}




// Webring in de site, deze wil ik in bovenste bar in header
// De ingebouwde werkte niet meer? Ik weet niet waarom, het werkt niet meer sinds ik cookieAllow en cookieDeny heb gemaakt
function koppelWebring() {
   const link = document.querySelector('#menu a.digituin');
   if (!link) return;

   const doel = document.querySelector('#webringTarget');
   if (!doel) return;

   const werkBij = () => {
      const willekeurigeLink = doel.querySelector('a.random');
      const eersteLink = doel.querySelector('a');
      const gekozen = willekeurigeLink || eersteLink;

      if (gekozen && gekozen.href) {
         link.href = gekozen.href;
         link.title = gekozen.title || 'Digitaal tuintje';
      }
   };

   const observer = new MutationObserver(() => {
      if (doel.querySelector('a')) {
         werkBij();
         observer.disconnect();
      }
   });

   observer.observe(doel, { childList: true, subtree: true });
   werkBij();
}

// Contact formulier sturen naar mijn mail
function koppelContactformulier() {
   const formulier = document.querySelector('#contactForm');
   if (!formulier) return;

   formulier.addEventListener('submit', async (event) => {
      event.preventDefault();

      const knop = formulier.querySelector('button[type="submit"]');
      const status = formulier.querySelector('#contactStatus');
      knop.disabled = true;
      status.textContent = 'Versturen...';

      try {
         const antwoord = await fetch(formulier.action, {
            method: 'POST',
            body: new FormData(formulier),
            headers: { Accept: 'application/json' }
         });

         if (!antwoord.ok) throw new Error('Versturen mislukt');

         formulier.reset();
         status.textContent = 'Bericht verstuurd.';
      } catch (error) {
         status.textContent = 'Versturen mislukt. Probeer het opnieuw.';
      } finally {
         knop.disabled = false;
      }
   });
}

      document.addEventListener("DOMContentLoaded", () => {
        const dialog = document.getElementById("cookieModal");
        const consent = localStorage.getItem("consent");

        if (consent === "true") {
          setIframeAvailability(true);
          cookieAllow();
        } else {
          setIframeAvailability(false);
          if (dialog && consent === null && !dialog.open) {
            dialog.show();
          }
        }
      });


// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
   sterretjesKleur();
   updateDatumTijd();
   zetBatterijNiveau(Number(localStorage.getItem('punkyfis-battery')) || 80);
   setInterval(updateDatumTijd, 1000);

   koppelBatterijStatus();
   koppelWebring();
   koppelContactformulier();
});



// Scrollen met + knop
document.addEventListener('DOMContentLoaded', () => {
   const omhoog = document.getElementById('omhoog');
   const omlaag = document.getElementById('omlaag');

   if (!omhoog || !omlaag) return;

   const krijgScrollDoel = () => document.querySelector('aside:not([hidden])') || document.querySelector('main');

   omhoog.addEventListener('click', () => {
      const scrollDoel = krijgScrollDoel();
      if (!scrollDoel) return;
      scrollDoel.scrollBy({ top: -scrollDoel.clientHeight * 0.2, behavior: 'smooth' });
   });
   omlaag.addEventListener('click', () => {
      const scrollDoel = krijgScrollDoel();
      if (!scrollDoel) return;
      scrollDoel.scrollBy({ top: scrollDoel.clientHeight * 0.2, behavior: 'smooth' });
   });
});


document.addEventListener('DOMContentLoaded', () => {
   const knoppen = document.querySelectorAll('[data-show-album]');
   const paginaOnderdelen = document.querySelectorAll('.album[data-page], .spelTekst[data-page]');

   knoppen.forEach((knop) => {
      knop.addEventListener('click', () => {
         const gewenstePagina = knop.dataset.showAlbum;

         paginaOnderdelen.forEach((onderdeel) => {
            onderdeel.hidden = onderdeel.dataset.page !== gewenstePagina;
         });
      });
   });
});

document.addEventListener('DOMContentLoaded', () => {
   const knoppen = document.querySelectorAll('[data-show-album]');
   const paginaOnderdelen = document.querySelectorAll('ul[data-page], aside[data-page]');
   const knopNaarNummers = document.querySelector('aside[data-page="1"] [data-show-album]');
   const mobieleWeergave = window.matchMedia('(max-width: 800px)');

   const toonPagina = (pagina) => {
      paginaOnderdelen.forEach((onderdeel) => {
         onderdeel.hidden = onderdeel.dataset.page !== pagina;
      });
   };

   knoppen.forEach((knop) => {
      knop.addEventListener('click', () => {
         toonPagina(knop.dataset.showAlbum);
      });
   });

   const mobiel = () => {
      if (!knopNaarNummers) return;

      const paginaNummers = mobieleWeergave.matches ? '3' : '2';
      const huidig = mobieleWeergave.matches ? '2' : '3';
      const paginaIsOpen = document.querySelector(
         `ul[data-page="${huidig}"]:not([hidden]), aside[data-page="${huidig}"]:not([hidden])`
      );

      knopNaarNummers.dataset.showAlbum = paginaNummers;
      if (paginaIsOpen) toonPagina(paginaNummers);
   };

   mobiel();
   mobieleWeergave.addEventListener('change', mobiel);
});




// Sterretjes



const sterLight = "#f199c2";
const sterDark = "#8dbaf5";
var colour = sterLight;

function sterretjesKleur() {
   colour = document.body.classList.contains("dark-theme")
      ? sterDark
      : sterLight;
   document.body.style.setProperty("--sterretjes-schaduw", colour);
}
var sparkles=50;

/****************************
*  Tinkerbell Magic Sparkle *
*(c)2005-13 mf2fm web-design*
*  http://www.mf2fm.com/rv  *
* DON'T EDIT BELOW THIS BOX *  // wel gedaan om drop shadow toe te voegen
****************************/
var x=ox=400;
var y=oy=300;
var swide=800;
var shigh=600;
var sleft=sdown=0;
var tiny=new Array();
var star=new Array();
var starv=new Array();
var starx=new Array();
var stary=new Array();
var tinyx=new Array();
var tinyy=new Array();
var tinyv=new Array();

window.onload=function() { if (document.getElementById) {
  var i, rats, rlef, rdow;
  for (var i=0; i<sparkles; i++) {
    var rats=createDiv(3, 3);
    rats.className="sparkle-tiny";
    rats.style.visibility="hidden";
    rats.style.zIndex="999";
    document.body.appendChild(tiny[i]=rats);
    starv[i]=0;
    tinyv[i]=0;
    var rats=createDiv(5, 5);
    rats.className="sparkle-star";
    rats.style.backgroundColor="transparent";
    rats.style.visibility="hidden";
    rats.style.zIndex="999";
    var rlef=createDiv(1, 5);
    var rdow=createDiv(5, 1);
    rats.appendChild(rlef);
    rats.appendChild(rdow);
    rlef.style.top="2px";
    rlef.style.left="0px";
    rdow.style.top="0px";
    rdow.style.left="2px";
    document.body.appendChild(star[i]=rats);
  }
  set_width();
  sparkle();
}}

function sparkle() {
  var c;
  if (Math.abs(x-ox)>1 || Math.abs(y-oy)>1) {
    ox=x;
    oy=y;
    for (c=0; c<sparkles; c++) if (!starv[c]) {
      star[c].style.left=(starx[c]=x)+"px";
      star[c].style.top=(stary[c]=y+1)+"px";
      star[c].style.clip="rect(0px, 5px, 5px, 0px)";
      star[c].childNodes[0].style.backgroundColor=star[c].childNodes[1].style.backgroundColor=(colour=="random")?newColour():colour;
      star[c].style.visibility="visible";
      starv[c]=50;
      break;
    }
  }
  for (c=0; c<sparkles; c++) {
    if (starv[c]) update_star(c);
    if (tinyv[c]) update_tiny(c);
  }
  setTimeout("sparkle()", 40);
}

function update_star(i) {
  if (--starv[i]==25) star[i].style.clip="rect(1px, 4px, 4px, 1px)";
  if (starv[i]) {
    stary[i]+=1+Math.random()*3;
    starx[i]+=(i%5-2)/5;
    if (stary[i]<shigh+sdown) {
      star[i].style.top=stary[i]+"px";
      star[i].style.left=starx[i]+"px";
    }
    else {
      star[i].style.visibility="hidden";
      starv[i]=0;
      return;
    }
  }
  else {
    tinyv[i]=50;
    tiny[i].style.top=(tinyy[i]=stary[i])+"px";
    tiny[i].style.left=(tinyx[i]=starx[i])+"px";
    tiny[i].style.width="2px";
    tiny[i].style.height="2px";
    tiny[i].style.backgroundColor=star[i].childNodes[0].style.backgroundColor;
    star[i].style.visibility="hidden";
    tiny[i].style.visibility="visible"
  }
}

function update_tiny(i) {
  if (--tinyv[i]==25) {
    tiny[i].style.width="1px";
    tiny[i].style.height="1px";
  }
  if (tinyv[i]) {
    tinyy[i]+=1+Math.random()*3;
    tinyx[i]+=(i%5-2)/5;
    if (tinyy[i]<shigh+sdown) {
      tiny[i].style.top=tinyy[i]+"px";
      tiny[i].style.left=tinyx[i]+"px";
    }
    else {
      tiny[i].style.visibility="hidden";
      tinyv[i]=0;
      return;
    }
  }
  else tiny[i].style.visibility="hidden";
}

document.onmousemove=mouse;
function mouse(e) {
  if (e) {
    y=e.pageY;
    x=e.pageX;
  }
  else {
    set_scroll();
    y=event.y+sdown;
    x=event.x+sleft;
  }
}

window.onscroll=set_scroll;
function set_scroll() {
  if (typeof(self.pageYOffset)=='number') {
    sdown=self.pageYOffset;
    sleft=self.pageXOffset;
  }
  else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
    sdown=document.body.scrollTop;
    sleft=document.body.scrollLeft;
  }
  else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
    sleft=document.documentElement.scrollLeft;
    sdown=document.documentElement.scrollTop;
  }
  else {
    sdown=0;
    sleft=0;
  }
}

window.onresize=set_width;
function set_width() {
  var sw_min=999999;
  var sh_min=999999;
  if (document.documentElement && document.documentElement.clientWidth) {
    if (document.documentElement.clientWidth>0) sw_min=document.documentElement.clientWidth;
    if (document.documentElement.clientHeight>0) sh_min=document.documentElement.clientHeight;
  }
  if (typeof(self.innerWidth)=='number' && self.innerWidth) {
    if (self.innerWidth>0 && self.innerWidth<sw_min) sw_min=self.innerWidth;
    if (self.innerHeight>0 && self.innerHeight<sh_min) sh_min=self.innerHeight;
  }
  if (document.body.clientWidth) {
    if (document.body.clientWidth>0 && document.body.clientWidth<sw_min) sw_min=document.body.clientWidth;
    if (document.body.clientHeight>0 && document.body.clientHeight<sh_min) sh_min=document.body.clientHeight;
  }
  if (sw_min==999999 || sh_min==999999) {
    sw_min=800;
    sh_min=600;
  }
  swide=sw_min;
  shigh=sh_min;
}

function createDiv(height, width) {
  var div=document.createElement("div");
  div.style.position="absolute";
  div.style.height=height+"px";
  div.style.width=width+"px";
  div.style.overflow="hidden";
  return (div);
}

function newColour() {
  var c=new Array();
  c[0]=255;
  c[1]=Math.floor(Math.random()*256);
  c[2]=Math.floor(Math.random()*(256-c[1]/2));
  c.sort(function(){return (0.5 - Math.random());});
  return ("rgb("+c[0]+", "+c[1]+", "+c[2]+")");
}
