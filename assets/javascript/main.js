
// Light en dark mode toggle
function lightDark() {
   var element = document.body;
   element.classList.toggle("dark-theme");
}


// Huidige dag en maand
function updateDateTime() {
   const dateEl = document.getElementById('currentDate');
   const timeEl = document.getElementById('currentTime');

   if (!dateEl || !timeEl) return;

   const now = new Date();

   const dateText = now.toLocaleDateString('nl-NL', {
      day: '2-digit',
      month: '2-digit'
   });

   const timeText = now.toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit'
   });

   dateEl.textContent = dateText;
   timeEl.textContent = timeText;
}



// Batterij
function setBatteryLevel(level) {
   const safeLevel = Math.min(100, Math.max(0, level));
   localStorage.setItem('punkyfis-battery', String(safeLevel));

   const segments = document.querySelectorAll('.battery-segment');
   let segmentsToFill = 0;

   if (safeLevel <= 10) {
      segmentsToFill = 1;
   } else if (safeLevel <= 33) {
      segmentsToFill = 1;
   } else if (safeLevel <= 66) {
      segmentsToFill = 2;
   } else {
      segmentsToFill = 3;
   }

   segments.forEach((segment, index) => {
      const isFilled = index < segmentsToFill;
      segment.classList.toggle('is-full', isFilled);
      segment.classList.toggle('is-low', safeLevel <= 10 && isFilled);
   });

   const batteryShell = document.querySelector('.battery-shell');
   if (batteryShell) {
      batteryShell.classList.toggle('is-low', safeLevel <= 10); // Als betterij minder dan 10% is
   }

   const batteryEl = document.querySelector('.battery');
   if (batteryEl) {
      batteryEl.setAttribute('title', `Batterij ${safeLevel}%`);
   }
}


async function bindBatteryStatus() {
   if (navigator.getBattery) {
      try {
         const battery = await navigator.getBattery();
         const update = () => setBatteryLevel(Math.round(battery.level * 100));
         update();
         battery.addEventListener('levelchange', update);
         battery.addEventListener('chargingchange', update);
         return;
      } catch (error) {
         console.warn('Battery API unavailable:', error);
      }
   }

   const storedLevel = Number(localStorage.getItem('punkyfis-battery'));
   setBatteryLevel(Number.isFinite(storedLevel) ? storedLevel : 80);
}



// Event Listener
document.addEventListener('DOMContentLoaded', () => {
   updateDateTime();
   setBatteryLevel(Number(localStorage.getItem('punkyfis-battery')) || 80);
   setInterval(updateDateTime, 1000);

   bindBatteryStatus();
   bindDigituinWeBring();
});




// Webring //
function bindDigituinWeBring() {
   const link = document.querySelector('a.digituin');
   if (!link) return;

   const target = document.querySelector('#webringTarget');
   if (!target) return;

   const updateLink = () => {
      const randomLink = target.querySelector('a.random');
      const firstLink = target.querySelector('a');
      const chosen = randomLink || firstLink;

      if (chosen && chosen.href) {
         link.href = chosen.href;
         link.title = chosen.title || 'Digitaal tuintje';
      }
   };

   const observer = new MutationObserver(() => {
      if (target.querySelector('a')) {
         updateLink();
         observer.disconnect();
      }
   });

   observer.observe(target, { childList: true, subtree: true });
   updateLink();
}

