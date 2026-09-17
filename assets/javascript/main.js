
// Licht en donkere modus wisselen
function lightDark() {
   const element = document.body;
   element.classList.toggle("dark-theme");
}


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

