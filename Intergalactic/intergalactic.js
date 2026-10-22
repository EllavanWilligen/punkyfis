const muziek = document.getElementById("audioFile");
const knop = document.getElementById("playButton");
const stilleKnop = document.getElementById("silentButton");

function maakTijdlijn() {
  document.querySelectorAll("article p, article span, article h2, article h3, article > section").forEach((el) => {
    const stijl = getComputedStyle(el);
    const animatie = stijl.animationName.split(",")[0].trim();
    const isSectie = el.matches("article > section");
    const isTekstAnimatie = ["showTekst", "growTekst", "typing"].includes(animatie);

    if (isSectie ? animatie !== "weg" : !isTekstAnimatie) return;

    const vertraging = stijl.animationDelay.split(",")[0].trim();
    const tijd = Number.parseFloat(vertraging) * (vertraging.endsWith("ms") ? 0.001 : 1);
    if (!Number.isFinite(tijd)) return;

    if (isSectie) {
      el.dataset.audioHideAt = tijd;
    } else {
      el.dataset.audioAt = tijd;
      el.dataset.audioEffect = animatie;
      el.style.setProperty("--audio-duration", stijl.animationDuration.split(",")[0].trim());
    }
  });
}

function syncTekst() {
  document.querySelectorAll("[data-audio-at], [data-audio-hide-at]").forEach((el) => {
    const verbergVanaf = el.dataset.audioHideAt;
    const tijd = Number(verbergVanaf ?? el.dataset.audioAt);

    el.classList.toggle(verbergVanaf ? "is-audio-hidden" : "is-audio-visible", muziek.currentTime >= tijd);
  });
}

function volgMuziek() {
  syncTekst();
  if (!muziek.paused && !muziek.ended) requestAnimationFrame(volgMuziek);
}

stilleKnop.addEventListener("click", () => {
  muziek.pause();
  muziek.muted = true;
  document.body.classList.remove("audio-synced", "is-locked");
});

knop.addEventListener("click", async () => {
  knop.disabled = true;

  try {
    muziek.muted = false;
    await muziek.play();
    document.body.classList.remove("is-locked");
    maakTijdlijn();
    document.body.classList.add("audio-synced");
    volgMuziek();
  } catch (fout) {
    console.error("Audio playback failed:", fout);
    knop.disabled = false;
  }
});

["seeked", "pause", "ended"].forEach((gebeurtenis) => muziek.addEventListener(gebeurtenis, syncTekst));
