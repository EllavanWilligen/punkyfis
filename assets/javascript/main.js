
// Licht en donkere modus wisselen
function lightDark() {
   const element = document.body;
   element.classList.toggle("dark-theme");
   localStorage.setItem(
      "punkyfis-theme",
      element.classList.contains("dark-theme") ? "dark" : "light"
   );
}


// Allow opslaan in localStorage zodat cookies niet elke keer gevraagd word
function saveCookieConsent(allowed) {
   localStorage.setItem("consent", String(allowed));

   if (allowed && typeof getWebringLinks === "function") {
      getWebringLinks();
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



// Event Listener
document.addEventListener('DOMContentLoaded', () => {
   updateDatumTijd();
   zetBatterijNiveau(Number(localStorage.getItem('punkyfis-battery')) || 80);
   setInterval(updateDatumTijd, 1000);

   koppelBatterijStatus();
   koppelDigituinWeBring();
   koppelContactformulier();
});




// Webring
function koppelDigituinWeBring() {
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
        if (dialog && localStorage.getItem("consent") === null && !dialog.open) {
          dialog.showModal();
        }
      });
