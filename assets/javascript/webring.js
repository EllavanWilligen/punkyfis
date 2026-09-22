// Nergens aan gelinkt! //




(function () {
  const dialog = document.getElementById("cookieModal");

  if (!dialog) {
    console.log(`<dialog id="cookieModal"> niet aanwezig: Doe niets`);
  } else {
    if (testForCookie() == "false") {
      console.log(
        `<dialog id="cookieModal"> aanwezig en geen consent cookie ingesteld: Toon de modal en laat de gebruiker een keuze maken.`,
      );
      dialog.showModal();
    } else {
      console.log(
        `<dialog id="cookieModal"> aanwezig en consent cookie ingesteld. Laad de webring data in!`,
      );
      getWebringLinks();
    }
  }
})();

/**
 *
 */
function getWebringLinks() {
  const { dataset } = getDOMStringMap("script[data-page]");
  const sites = [
    {
      name: "Vasilis",
      url: "https://vasilis.nl/",
      cohort: "teacher",
      owner: "Vasilis van Gemert",
    },
    {
      name: "ju5tu5",
      url: "https://ju5tu5.nl/",
      cohort: "teacher",
      owner: "Justus Sturkenboom",
    },
    {
      name: "ulk: Bittersweet Invocations",
      url: "https://ulk.info/",
      cohort: "teacher",
      owner: "Nicky Heijmen",
    },
    {
      name: "Zichtbaar maken",
      url: "https://charleymuhren.nl/",
      cohort: "teacher",
      owner: "Charley Muhren",
    },
    {
      name: "Bera 74k",
      url: "https://bera74k.nl",
      cohort: "2026-204",
      owner: "Bera  Pinar",
    },
    {
      name: "Christina Keultjes Digital Garden",
      url: "https://christina.keultjes.net/digital-garden/",
      cohort: "2026-204",
      owner: "Christina  Keultjes",
    },
    {
      name: "Hollow Purple",
      url: "https://hollow-purple.nl/",
      cohort: "2026-204",
      owner: "Danial  Ali",
    },
    {
      name: "Dewi Schaik",
      url: "https://dewischaik.nl/",
      cohort: "2026-204",
      owner: "Dewi van Schaik",
    },
    {
      name: "Punkyfis",
      url: "https://punkyfis.nl/",
      cohort: "2026-204",
      owner: "Ella van Willigen",
    },
    {
      name: "Garden by Esmee",
      url: "https://gardenbyesmee.nl/",
      cohort: "2026-204",
      owner: "Esmée  Gravemaker",
    },
    {
      name: "F3ys Garden",
      url: "https://f3ysgarden.nl/",
      cohort: "2026-204",
      owner: "Feyza  Asma",
    },
    {
      name: "Floris Terpstra",
      url: "https://floristerpstra.nl/",
      cohort: "2026-204",
      owner: "Floris  Terpstra",
    },
    {
      name: "Giels Plekkie",
      url: "https://gielsplekkie.nl/",
      cohort: "2026-204",
      owner: "Giel  Keukens",
    },
    {
      name: "Hiba Nova",
      url: "https://hibanova.nl/",
      cohort: "2026-204",
      owner: "Hiba  Âouni",
    },
    {
      name: "Create My Idea",
      url: "https://createmyidea.nl/",
      cohort: "2026-204",
      owner: "Joëlle  Lewis",
    },
    {
      name: "Julius Terpstra",
      url: "https://juliusterpstra.nl/",
      cohort: "2026-204",
      owner: "Julius  Terpstra",
    },
    {
      name: "Larsss",
      url: "https://larsss.nl/",
      cohort: "2026-204",
      owner: "Lars  Heine",
    },
    {
      name: "Leki Boji",
      url: "https://lekiboji.nl/",
      cohort: "2026-204",
      owner: "Lejla  Alomerović",
    },
    {
      name: "MH CMD",
      url: "https://mh-cmd.nl/",
      cohort: "2026-204",
      owner: "Maurizio  Heijnneman",
    },
    {
      name: "Yana Archives",
      url: "https://yanaarchives.nl/",
      cohort: "2026-204",
      owner: "Rianne  Geilings",
    },
    {
      name: "Type SMR",
      url: "https://typesmr.nl/",
      cohort: "2026-204",
      owner: "Samir  Akalliche",
    },
    {
      name: "Teresa Archive",
      url: "https://teresaarchive.nl/",
      cohort: "2026-204",
      owner: "Teresa Smits",
    },
    {
      name: "Timmetje Brands",
      url: "https://timmetjebrands.nl/",
      cohort: "2026-204",
      owner: "Tim Brands",
    },
    {
      name: "Twanee",
      url: "https://twanee.nl/",
      cohort: "2026-204",
      owner: "Twan Eekhout",
    },
    {
      name: "Wessel de Wit",
      url: "https://wesseldewit.nl/",
      cohort: "2026-204",
      owner: "Wessel de Wit",
    },
    {
      name: "Balkan Baddie",
      url: "http://balkanbaddie.nl/",
      cohort: "2026-205",
      owner: "Ana Ivanković",
    },
    {
      name: "Shark Domain",
      url: "https://sharkdomain.nl/",
      cohort: "2026-205",
      owner: "Bryenne   Fredison",
    },
    {
      name: "Candace Mook",
      url: "https://candacemook.github.io/hwivi/",
      cohort: "2026-205",
      owner: "Candace Mook",
    },
    {
      name: "Digi Journey HvA",
      url: "https://digi-journey-hva.nl/",
      cohort: "2026-205",
      owner: "Casper de Graaff",
    },
    {
      name: "Tuintje van Eva",
      url: "https://www.tuintjevaneva.nl/",
      cohort: "2026-205",
      owner: "Eva de Ruig",
    },
    {
      name: "Frey Amsterdam",
      url: "https://freyamsterdam.nl/",
      cohort: "2026-205",
      owner: "Freya  Huijsen",
    },
    {
      name: "HKE Skin",
      url: "https://hkeskin.nl/",
      cohort: "2026-205",
      owner: "Hayriye  Keskin",
    },
    {
      name: "Lil Beau",
      url: "https://lilbeau.nl/",
      cohort: "2026-205",
      owner: "Isabeau  Cool",
    },
    {
      name: "Jia Petal",
      url: "https://jiapetal.nl/",
      cohort: "2026-205",
      owner: "Jiahui  Song",
    },
    {
      name: "Jip vd Horn",
      url: "https://jipvdhorn.nl/",
      cohort: "2026-205",
      owner: "Jip van der Horn",
    },
    {
      name: "Made by Judith",
      url: "https://madebyjudith.nl/",
      cohort: "2026-205",
      owner: "Judith Boers",
    },
    {
      name: "Katey Brinckman",
      url: "https://kateybrinckman.nl/",
      cohort: "2026-205",
      owner: "Katey  Brinckman",
    },
    {
      name: "Solo Volpe",
      url: "https://solovolpe.nl/",
      cohort: "2026-205",
      owner: "Laura de Vos",
    },
    {
      name: "Roodharige",
      url: "https://roodharige.nl/",
      cohort: "2026-205",
      owner: "Lina  Yahiaoui",
    },
    {
      name: "Lynn Poelman",
      url: "https://lynnpoelman.nl/",
      cohort: "2026-205",
      owner: "Lynn  Poelman",
    },
    {
      name: "Lysanne's Corner",
      url: "https://lysannescorner.nl/",
      cohort: "2026-205",
      owner: "Lysanne Mastenbroek",
    },
    {
      name: "Massimo Benedetti",
      url: "https://massimobenedetti.nl/",
      cohort: "2026-205",
      owner: "Massimo Benedetti",
    },
    {
      name: "Reins Empire",
      url: "https://reins-empire.nl/",
      cohort: "2026-205",
      owner: "Rein  Romkes",
    },
    {
      name: "Sebbb",
      url: "https://sebbb.nl/",
      cohort: "2026-205",
      owner: "Seb van Calsteren",
    },
    {
      name: "Syl Waltz",
      url: "https://sylwaltz.nl/",
      cohort: "2026-205",
      owner: "Susanne  Quan",
    },
    {
      name: "T-Kiela",
      url: "https://t-kiela.nl/",
      cohort: "2026-205",
      owner: "Tessa Kiela",
    },
    {
      name: "Kirazz",
      url: "http://kirazz.nl/",
      cohort: "2026-206",
      owner: "Alara Durmaz",
    },
    {
      name: "Amyvd Personal",
      url: "https://bloomingskilss.nl/",
      cohort: "2026-206",
      owner: "Amy van Duin",
    },
    {
      name: "Tuintje van Annelot",
      url: "https://tuintjevanannelot.nl/",
      cohort: "2026-206",
      owner: "Annelot de Vries",
    },
    {
      name: "Betul Space",
      url: "https://betulspace.nl/",
      cohort: "2026-206",
      owner: "Betül  Kaya",
    },
    {
      name: "Moonfim",
      url: "https://moonfim.nl/",
      cohort: "2026-206",
      owner: "Floortje  Jansson",
    },
    {
      name: "The Ingerverse",
      url: "https://www.theingerverse.nl/",
      cohort: "2026-206",
      owner: "Inger van der Sleen",
    },
    {
      name: "JJK Enterprise",
      url: "https://jjk-enterprise.nl/",
      cohort: "2026-206",
      owner: "Jesse Kruitbosch",
    },
    {
      name: "Joy Portfolio",
      url: "https://joyportfolio.nl/",
      cohort: "2026-206",
      owner: "Joy Smit",
    },
    {
      name: "Juuls Domein",
      url: "https://juulsdomein.nl/",
      cohort: "2026-206",
      owner: "Julia Mak",
    },
    {
      name: "Project Tuin Justin",
      url: "https://projecttuinjustin.nl/",
      cohort: "2026-206",
      owner: "Justin Kooy",
    },
    {
      name: "Tuintje van Leonie",
      url: "https://tuintjevanleonie.nl/",
      cohort: "2026-206",
      owner: "Leonie Koster",
    },
    {
      name: "Flexie's Tuintje",
      url: "http://flexiestuintje.nl/",
      cohort: "2026-206",
      owner: "Lex Rothgerber",
    },
    {
      name: "Nisha Prithipal - Design",
      url: "https://nishaprithipal-design.nl/",
      cohort: "2026-206",
      owner: "Nisha Prithipal",
    },
    {
      name: "Garnets Ocean",
      url: "https://garnetsocean.nl/",
      cohort: "2026-206",
      owner: "Oluwaseyi  Davies",
    },
    {
      name: "Fortuin Tuin",
      url: "https://fortuintuin.nl/",
      cohort: "2026-206",
      owner: "Poema  Teijgeler",
    },
    {
      name: "Sara Design",
      url: "https://saradesign.nl/",
      cohort: "2026-206",
      owner: "Sara  Meiboom",
    },
    {
      name: "Soophi",
      url: "https://soophi.nl/",
      cohort: "2026-206",
      owner: "Sophia  Naber",
    },
    {
      name: "Tye Geuzinge",
      url: "https://tyegeuzinge.nl/",
      cohort: "2026-206",
      owner: "Tamar  Geuzinge",
    },
    {
      name: "Tharanika",
      url: "https://tharanika.nl/",
      cohort: "2026-206",
      owner: "Tharanika  Balasingam",
    },
    {
      name: "Tuyaa",
      url: "https://tuyaa.nl/",
      cohort: "2026-206",
      owner: "Tüyanur  Okatan",
    },
  ];
  // Find the index for the current page
  const currentIndex = findWebringIndex(
    sites,
    normalizeUrl(dataset?.page) ?? undefined,
  );

  // Generate the output based on the currentIndex
  let output = getOutputByIndex(sites, currentIndex)
    .map(
      (page) =>
        `<li><a class="${Object.keys(page)[0]}" href="${page[Object.keys(page)[0]].url}" title="Digitaal tuintje van ${page[Object.keys(page)[0]].name}"><span>${Object.keys(page)[0]}</span></a></li>`,
    )
    .reduce((accumulator, current) => accumulator + current);

  document
    .querySelector("footer")
    .insertAdjacentHTML(
      "afterbegin",
      `<nav class="webring"><h2>Digitaal Tuintje Webring</h2><ul>${output}</ul></nav>`,
    );
}

/**
 *
 * @param {*} selector
 * @returns
 */
function getDOMStringMap(selector) {
  return (
    document.querySelector(selector) ?? {
      undefined,
    }
  );
}

/**
 *
 * @param {*} selector
 * @returns
 */
function findWebringIndex(sites, page) {
  return sites.findIndex((site) => {
    return site.url == page;
  });
}

/**
 * Normalizes the passed URL, strips away [ ] characters from the example and add a trailing / if not present
 * @param {*} url - the URL to be normalized
 * @returns a normalized URL
 */
function normalizeUrl(url) {
  let output = url.replace("[", "").replace("]", "");
  return output.substr(-1) === "/" ? output : output + "/";
}

/**
 *
 * @param {*} selector
 * @returns
 */
function getOutputByIndex(sites, currentIndex) {
  if (currentIndex === -1) {
    return [{ random: getRandomSite(sites, currentIndex) }];
  } else {
    return [
      { previous: getPreviousSite(sites, currentIndex) },
      { random: getRandomSite(sites, currentIndex) },
      { next: getNextSite(sites, currentIndex) },
    ];
  }
}

/**
 *
 * @param {*} selector
 * @returns
 */
function getRandomSite(sites, currentIndex) {
  let randomSite = sites[Math.floor(Math.random() * sites.length - 1)];

  if (currentIndex != -1)
    while (
      randomSite.url == sites[currentIndex].url ||
      randomSite.url == getPreviousSite(sites, currentIndex).url ||
      randomSite.url == getNextSite(sites, currentIndex).url
    ) {
      randomSite = sites[Math.floor(Math.random() * sites.length - 1)];
    }
  return randomSite;
}

/**
 *
 * @param {*} selector
 * @returns
 */
function getPreviousSite(sites, currentIndex) {
  return sites[currentIndex - 1 < 0 ? sites.length : currentIndex - 1];
}

/**
 *
 * @param {*} selector
 * @returns
 */
function getNextSite(sites, currentIndex) {
  return sites[currentIndex + 1 > sites.length - 1 ? 0 : currentIndex + 1];
}

/**
 *
 * @param {*} selector
 * @returns
 */
function testForCookie(data = undefined) {
  // test for the existence of cookie
  if (localStorage.getItem(`consent`)) {
    console.log("Waarde consent cookie: " + localStorage.getItem(`consent`));
    return localStorage.getItem(`consent`);
  }
  return false;
}

/**
 *
 * @param {*} selector
 * @returns
 */
function setCookie(data = undefined) {
  localStorage.setItem(`consent`, true);
  // test of links al bestaan
  getWebringLinks();
  return true;
}

/**
 *
 * @param {*} selector
 * @returns
 */
function unsetCookie(data = undefined) {
  localStorage.setItem(`consent`, false);
  return false;
}



	// <![CDATA[  <-- For SVG support
	if ('WebSocket' in window) {
		(function () {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
					var parent = elem.parentElement || head;
					parent.removeChild(elem);
					var rel = elem.rel;
					if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
						var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
						elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
					}
					parent.appendChild(elem);
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + window.location.pathname + '/ws';
			var socket = new WebSocket(address);
			socket.onmessage = function (msg) {
				if (msg.data == 'reload') window.location.reload();
				else if (msg.data == 'refreshcss') refreshCSS();
			};
			if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
				console.log('Live reload enabled.');
				sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
			}
		})();
	}
	else {
		console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
	}
	// ]]>
