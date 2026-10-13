export type Marketplace = 'olx' | 'allegro' | 'amazon' | 'vinted' | 'ebay'
export type MatchMode = 'all-words' | 'exact-phrase'
export type MarketplaceListing = {
  id: string
  marketplace: Marketplace
  title: string
  url: string
  image: string
  price?: string
}

export type Locale = 'en' | 'pl' | 'de' | 'fr' | 'es'
export const LOCALES: Record<Locale, { label: string; flag: string; translations: Record<string, string> }> = {
  en: {
    label: 'English',
    flag: 'EN',
    translations: {
      'header_note': 'FREE / NO ACCOUNT',
      'find_exact': 'Find the exact thing.',
      'intro_subtitle': 'One query. Your chosen marketplaces. No fuzzy guessing.',
      'search_query': 'SEARCH QUERY',
      'search_placeholder': 'What are you looking for?',
      'search_button': 'SEARCH',
      'region_portals': 'REGION / PORTALS',
      'query_format': 'QUERY FORMAT',
      'keywords': 'KEYWORDS',
      'exact_phrase': 'EXACT PHRASE',
      'no_matches': 'No title matches.',
      'open_listing': 'OPEN LISTING'
    }
  },
  pl: {
    label: 'Polski',
    flag: 'PL',
    translations: {
      'header_note': 'DARMOWE / BEZ KONTA',
      'find_exact': 'Znajdź dokładnie to, czego szukasz.',
      'intro_subtitle': 'Jedno zapytanie. Wybrane rynki. Bez zgadywania.',
      'search_query': 'ZAPYTANIE',
      'search_placeholder': 'Czego szukasz?',
      'search_button': 'SZUKAJ',
      'region_portals': 'REGION / PORTALE',
      'query_format': 'FORMAT ZAPYTANIA',
      'keywords': 'SŁOWA KLUCZOWE',
      'exact_phrase': 'DOKŁADNA FRAZA',
      'no_matches': 'Brak dopasowań.',
      'open_listing': 'OTWÓRZ OFERTĘ'
    }
  },
  de: {
    label: 'Deutsch',
    flag: 'DE',
    translations: {
      'header_note': 'KOSTENLOS / OHNE KONTO',
      'find_exact': 'Finde genau das Richtige.',
      'intro_subtitle': 'Eine Suche. Deine Marktplätze. Kein Raten.',
      'search_query': 'SUCHBEGRIFF',
      'search_placeholder': 'Wonach suchst du?',
      'search_button': 'SUCHE',
      'region_portals': 'REGION / PORTE',
      'query_format': 'SUCHFORMAT',
      'keywords': 'SCHLÜSSELWÖRTER',
      'exact_phrase': 'EXAKTE PHRASE',
      'no_matches': 'Keine Treffer.',
      'open_listing': 'ANGEBOT ÖFFNEN'
    }
  },
  fr: {
    label: 'Français',
    flag: 'FR',
    translations: {
      'header_note': 'GRATUIT / SANS COMPTE',
      'find_exact': 'Trouvez exactement ce que vous cherchez.',
      'intro_subtitle': 'Une recherche. Vos marchés. Sans deviner.',
      'search_query': 'RECHERCHE',
      'search_placeholder': 'Que cherchez-vous ?',
      'search_button': 'RECHERCHER',
      'region_portals': 'RÉGION / SITES',
      'query_format': 'FORMAT',
      'keywords': 'MOTS-CLÉS',
      'exact_phrase': 'PHRASE EXACTE',
      'no_matches': 'Aucun résultat.',
      'open_listing': 'VOIR L\'ANNONCE'
    }
  },
  es: {
    label: 'Español',
    flag: 'ES',
    translations: {
      'header_note': 'GRATIS / SIN CUENTA',
      'find_exact': 'Encuentra exactamente lo que buscas.',
      'intro_subtitle': 'Una búsqueda. Tus mercados. Sin adivinar.',
      'search_query': 'BÚSQUEDA',
      'search_placeholder': '¿Qué buscas?',
      'search_button': 'BUSCAR',
      'region_portals': 'REGIÓN / PORTALES',
      'query_format': 'FORMATO',
      'keywords': 'PALABRAS CLAVE',
      'exact_phrase': 'FRASE EXACTA',
      'no_matches': 'Sin resultados.',
      'open_listing': 'ABRIR ANUNCIO'
    }
  }
}

export const COUNTRY_LOCALE: Record<string, Locale> = {
  pl: 'pl',
  de: 'de',
  fr: 'fr',
  es: 'es',
}

export const COUNTRY_MARKETPLACES: Record<string, Marketplace[]> = {
  pl: ['olx', 'allegro', 'amazon', 'vinted', 'ebay'],
  de: ['ebay', 'amazon', 'vinted'],
  fr: ['vinted', 'ebay', 'amazon'],
  es: ['vinted', 'ebay', 'amazon'],
}

export const MARKETPLACES: Record<Marketplace, { label: string; icon: string }> = {
  olx: { label: 'OLX', icon: 'https://www.olx.pl/favicon.ico' },
  allegro: { label: 'Allegro', icon: 'https://allegro.pl/favicon.ico' },
  amazon: { label: 'Amazon', icon: 'https://www.amazon.pl/favicon.ico' },
  vinted: { label: 'Vinted', icon: 'https://www.vinted.pl/favicon.ico' },
  ebay: { label: 'eBay', icon: 'https://www.ebay.pl/favicon.ico' },
}

export type TranslationKeys =
  | 'eyebrow' | 'heroTitle' | 'heroSubtitle' | 'searchLabel'
  | 'searchPlaceholder' | 'searchBtn' | 'searchBtnLoading'
  | 'sourcesLabel' | 'allBtn' | 'clearBtn' | 'formatLabel'
  | 'keywordsBtn' | 'exactBtn' | 'hint' | 'resultsReady'
  | 'resultsFiltered' | 'titleMatches' | 'portalsSelected'
  | 'noticeText' | 'noticeReady' | 'clearResultsBtn'
  | 'errorSelectSource' | 'errorSearchFailed' | 'importedFound'
  | 'importedNone' | 'noMatches' | 'noMatchesHint'
  | 'emptyReady' | 'emptySelectSource' | 'emptyReadyHint'
  | 'emptySelectSourceHint' | 'footerIndex' | 'footerLauncher'
  | 'header_note' | 'open_listing'

export const TRANSLATIONS: Record<Locale, Record<TranslationKeys, string>> = {
  en: {
    eyebrow: 'MARKETPLACE SEARCH',
    heroTitle: 'Find the exact thing.',
    heroSubtitle: 'One query. Your chosen marketplaces. No fuzzy guessing.',
    searchLabel: 'SEARCH QUERY',
    searchPlaceholder: 'What are you looking for?',
    searchBtn: 'SEARCH',
    searchBtnLoading: 'SEARCHING...',
    sourcesLabel: 'SEARCH ON',
    allBtn: 'ALL',
    clearBtn: 'CLEAR',
    formatLabel: 'QUERY FORMAT',
    keywordsBtn: 'KEYWORDS',
    exactBtn: 'EXACT PHRASE',
    hint: 'Results are fetched live and filtered by title matching.',
    resultsReady: 'LIVE SEARCH / READY',
    resultsFiltered: 'LIVE / FILTERED BY TITLE',
    titleMatches: 'Title matches for “{{query}}”',
    portalsSelected: 'PORTALS SELECTED',
    noticeText: 'Results were fetched from the selected marketplaces.',
    noticeReady: 'Enter a query and click SEARCH to fetch live results.',
    clearResultsBtn: 'CLEAR RESULTS',
    errorSelectSource: 'Select at least one marketplace.',
    errorSearchFailed: 'Search failed.',
    importedFound: 'Found {{count}} listings.',
    importedNone: 'No results found.',
    noMatches: 'No title matches.',
    noMatchesHint: 'Fetched {{count}} listings; none contain the selected title match.',
    emptyReady: 'Ready when you are.',
    emptySelectSource: 'Select a marketplace.',
    emptyReadyHint: 'Enter a query to fetch live results.',
    emptySelectSourceHint: 'Choose one or more portals above.',
    footerIndex: 'INDEX / PERSONAL TOOL / NOT AFFILIATED WITH MARKETPLACES',
    footerLauncher: 'LIVE FETCH LAUNCHER',
    header_note: 'FREE / NO ACCOUNT',
    open_listing: 'OPEN LISTING',
  },
  pl: {
    eyebrow: 'WYSZIWARKA MARKETPLACE',
    heroTitle: 'Wyszukaj konkretną rzecz.',
    heroSubtitle: 'Jedno zapytanie. Wybrane serwisy. Bez domyślania się.',
    searchLabel: 'ZAPYTANIE',
    searchPlaceholder: 'Czego szukasz?',
    searchBtn: 'SZUKAJ',
    searchBtnLoading: 'SZUKANIE...',
    sourcesLabel: 'SZUKAJ W',
    allBtn: 'WSZYSTKIE',
    clearBtn: 'WYCZYŚĆ',
    formatLabel: 'FORMAT ZAPYTANIA',
    keywordsBtn: 'SŁOWA KLUCZOWE',
    exactBtn: 'DOKŁADNA FRAZA',
    hint: 'Wyniki są pobierane na żywo i filtrowane po tytule.',
    resultsReady: 'WYSZUKIWANIE NA ŻYWO / GOTOWE',
    resultsFiltered: 'NA ŻYWO / FILTROWANE PO TYTULE',
    titleMatches: 'Trafienia w tytule dla „{{query}}”',
    portalsSelected: 'PORTALE WYBRANE',
    noticeText: 'Wyniki zostały pobrane z wybranych serwisów.',
    noticeReady: 'Wpisz zapytanie i kliknij SZUKAJ, aby pobrać wyniki.',
    clearResultsBtn: 'WYCZYŚĆ WYNIKI',
    errorSelectSource: 'Wybierz przynajmniej jeden serwis.',
    errorSearchFailed: 'Wyszukiwanie nie powiodło się.',
    importedFound: 'Znaleziono {{count}} ogłoszeń.',
    importedNone: 'Nie znaleziono wyników.',
    noMatches: 'Brak dopasowań w tytule.',
    noMatchesHint: 'Pobrano {{count}} ogłoszeń; żadne nie pasuje do tytułu.',
    emptyReady: 'Gotowe do startu.',
    emptySelectSource: 'Wybierz serwis.',
    emptyReadyHint: 'Wpisz zapytanie, aby pobrać wyniki.',
    emptySelectSourceHint: 'Wybierz jeden lub więcej portali powyżej.',
    footerIndex: 'INDEX / NARZĘDZIE OSOBISTE / BRAK POWIĄZAŃ Z SERWISAMI',
    footerLauncher: 'URUCHOMIENIE POBIERANIA',
    header_note: 'DARMOWE / BEZ KONTA',
    open_listing: 'OTWÓRZ OFERTĘ',
  },
  de: {
    eyebrow: 'MARKETPLACE-SUCHE',
    heroTitle: 'Finden Sie genau das.',
    heroSubtitle: 'Eine Abfrage. Ihre gewählten Marktplätze. Kein Raten.',
    searchLabel: 'SUCHANFRAGE',
    searchPlaceholder: 'Wonach suchen Sie?',
    searchBtn: 'SUCHEN',
    searchBtnLoading: 'SUCHE läuft...',
    sourcesLabel: 'SUCHEN AUF',
    allBtn: 'ALLE',
    clearBtn: 'LEEREN',
    formatLabel: 'ABFRAGEFORMAT',
    keywordsBtn: 'SCHLÜSSELWÖRTER',
    exactBtn: 'GENAUE PHRASE',
    hint: 'Ergebnisse werden live abgerufen und nach Titel gefiltert.',
    resultsReady: 'LIVE-SUCHE / BEREIT',
    resultsFiltered: 'LIVE / NACH TITEL GEFILTERT',
    titleMatches: 'Titelübereinstimmungen für „{{query}}”',
    portalsSelected: 'PORTALE AUSGEWÄHLT',
    noticeText: 'Ergebnisse wurden von den ausgewählten Marktplätzen abgerufen.',
    noticeReady: 'Geben Sie eine Abfrage ein und klicken Sie auf SUCHEN.',
    clearResultsBtn: 'ERGEBNISSE LÖSCHEN',
    errorSelectSource: 'Wählen Sie mindestens einen Marktplatz aus.',
    errorSearchFailed: 'Suche fehlgeschlagen.',
    importedFound: '{{count}} Angebote gefunden.',
    importedNone: 'Keine Ergebnisse gefunden.',
    noMatches: 'Keine Titelübereinstimmungen.',
    noMatchesHint: '{{count}} Angebote abgerufen; keine passen zum Titel.',
    emptyReady: 'Bereit wenn Sie es sind.',
    emptySelectSource: 'Marktplatz auswählen.',
    emptyReadyHint: 'Geben Sie eine Abfrage ein, um Ergebnisse zu laden.',
    emptySelectSourceHint: 'Wählen Sie oben einen oder mehrere Portale aus.',
    footerIndex: 'INDEX / PRIVATES TOOL / KEINE VERBINDUNG ZU MARKTPLÄTZEN',
    footerLauncher: 'LIVE-ABRUF-STARTER',
    header_note: 'KOSTENLOS / OHNE KONTO',
    open_listing: 'ANGEBOT ÖFFNEN',
  },
  fr: {
    eyebrow: 'RECHERCHE MARKETPLACE',
    heroTitle: 'Trouvez exactement l\'objet.',
    heroSubtitle: 'Une requête. Vos places de marché. Pas de devinettes.',
    searchLabel: 'REQUÊTE DE RECHERCHE',
    searchPlaceholder: 'Que recherchez-vous ?',
    searchBtn: 'RECHERCHER',
    searchBtnLoading: 'RECHERCHE EN COURS...',
    sourcesLabel: 'RECHERCHER SUR',
    allBtn: 'TOUS',
    clearBtn: 'EFFACER',
    formatLabel: 'FORMAT DE REQUÊTE',
    keywordsBtn: 'MOTS-CLÉS',
    exactBtn: 'PHRASE EXACTE',
    hint: 'Les résultats sont récupérés en direct et filtrés par titre.',
    resultsReady: 'RECHERCHE LIVE / PRÊT',
    resultsFiltered: 'LIVE / FILTRÉ PAR TITRE',
    titleMatches: 'Correspondances de titre pour « {{query}} »',
    portalsSelected: 'PORTAILS SÉLECTIONNÉS',
    noticeText: 'Les résultats ont été récupérés depuis les places de marché sélectionnées.',
    noticeReady: 'Saisissez une requête et cliquez sur RECHERCHER.',
    clearResultsBtn: 'EFFACER LES RÉSULTATS',
    errorSelectSource: 'Sélectionnez au moins une place de marché.',
    errorSearchFailed: 'La recherche a échoué.',
    importedFound: '{{count}} annonces trouvées.',
    importedNone: 'Aucun résultat trouvé.',
    noMatches: 'Aucune correspondance de titre.',
    noMatchesHint: '{{count}} annonces récupérées ; aucune ne correspond au titre.',
    emptyReady: 'Prêt quand vous l\'êtes.',
    emptySelectSource: 'Sélectionnez une place de marché.',
    emptyReadyHint: 'Saisissez une requête pour récupérer les résultats.',
    emptySelectSourceHint: 'Choisissez un ou plusieurs portails ci-dessus.',
    footerIndex: 'INDEX / OUTIL PERSONNEL / NON AFFILIÉ AUX MARKETPLACES',
    footerLauncher: 'LANCEUR DE RÉCUPÉRATION LIVE',
    header_note: 'GRATUIT / SANS COMPTE',
    open_listing: 'VOIR L\'ANNONCE',
  },
  es: {
    eyebrow: 'BÚSQUEDA DE MARKETPLACE',
    heroTitle: 'Encuentra exactamente lo que buscas.',
    heroSubtitle: 'Una consulta. Tus mercados elegidos. Sin adivinanzas.',
    searchLabel: 'CONSULTA DE BÚSQUEDA',
    searchPlaceholder: '¿Qué estás buscando?',
    searchBtn: 'BUSCAR',
    searchBtnLoading: 'BUSCANDO...',
    sourcesLabel: 'BUSCAR EN',
    allBtn: 'TODOS',
    clearBtn: 'LIMPIAR',
    formatLabel: 'FORMATO DE CONSULTA',
    keywordsBtn: 'PALABRAS CLAVE',
    exactBtn: 'FRASE EXACTA',
    hint: 'Los resultados se obtienen en vivo y se filtran por título.',
    resultsReady: 'BÚSQUEDA EN VIVO / LISTO',
    resultsFiltered: 'EN VIVO / FILTRADO POR TÍTULO',
    titleMatches: 'Coincidencias de título para “{{query}}”',
    portalsSelected: 'PORTALES SELECCIONADOS',
    noticeText: 'Los resultados se obtuvieron de los mercados seleccionados.',
    noticeReady: 'Introduce una consulta y haz clic en BUSCAR.',
    clearResultsBtn: 'LIMPIAR RESULTADOS',
    errorSelectSource: 'Selecciona al menos un mercado.',
    errorSearchFailed: 'La búsqueda falló.',
    importedFound: 'Se encontraron {{count}} anuncios.',
    importedNone: 'No se encontraron resultados.',
    noMatches: 'Sin coincidencias de título.',
    noMatchesHint: 'Se obtuvieron {{count}} anuncios; ninguno coincide con el título.',
    emptyReady: 'Listo cuando tú lo estés.',
    emptySelectSource: 'Selecciona un mercado.',
    emptyReadyHint: 'Introduce una consulta para obtener resultados.',
    emptySelectSourceHint: 'Elige uno o más portales arriba.',
    footerIndex: 'INDEX / HERRAMIENTA PERSONAL / NO AFILIADO A MARKETPLACES',
    footerLauncher: 'INICIADOR DE OBTENCIÓN EN VIVO',
    header_note: 'GRATIS / SIN CUENTA',
    open_listing: 'ABRIR ANUNCIO',
  },
}

export async function fetchLiveResults(query: string, sources: Marketplace[]): Promise<MarketplaceListing[]> {
  const url = `/api/search?query=${encodeURIComponent(query)}&sources=${sources.join(',')}`
  const response = await fetch(url)
  if (!response.ok) return []
  return response.json()
}

export function marketSearchUrl(marketplace: Marketplace, query: string, mode: MatchMode = 'all-words') {
  const searchText = mode === 'exact-phrase' ? `"${query}"` : query
  const encodedQuery = encodeURIComponent(searchText)
  const searchUrls: Record<Marketplace, string> = {
    olx: `https://www.olx.pl/oferty/q-${encodedQuery}/`,
    allegro: `https://allegro.pl/listing?string=${encodedQuery}`,
    amazon: `https://www.amazon.pl/s?k=${encodedQuery}`,
    vinted: `https://www.vinted.pl/catalog?search_text=${encodedQuery}`,
    ebay: `https://www.ebay.pl/sch/i.html?_nkw=${encodedQuery}`,
  }

  if (marketplace !== 'olx') return searchUrls[marketplace]

  const metadata = encodeURIComponent(JSON.stringify({ query, mode }))
  return `${searchUrls.olx}#__index=${metadata}`
}

function normalizeTitle(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pl-PL')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
}

export function filterListings(listings: MarketplaceListing[], query: string, mode: MatchMode) {
  const normalizedQuery = normalizeTitle(query)
  if (!normalizedQuery) return []

  return listings.filter((listing) => {
    const normalizedTitle = normalizeTitle(listing.title)
    if (mode === 'exact-phrase') {
      return ` ${normalizedTitle} `.includes(` ${normalizedQuery} `)
    }

    const titleWords = new Set(normalizedTitle.split(' '))
    return normalizedQuery.split(' ').every((word) => titleWords.has(word))
  })
}

export function createOlxBookmarklet(appOrigin: string) {
  const script = `(async () => {
    const source = new URL(location.href)
    if (source.hostname !== 'www.olx.pl') {
      alert('Open an OLX search page first.')
      return
    }

    let metadata = {}
    try {
      const raw = source.hash.match(/^#__index=(.+)$/)
      if (raw) metadata = JSON.parse(decodeURIComponent(raw[1]))
    } catch {}

    const input = document.querySelector('input[aria-label="Znajdź coś dla siebie"]')
    const rawQuery = String(metadata.query || input?.value || '').trim()
    const query = rawQuery.replace(/^"|"$/g, '')
    const mode = metadata.mode === 'exact-phrase' || /^".*"$/.test(input?.value || '')
      ? 'exact-phrase'
      : 'all-words'
    if (!query) {
      alert('Could not read the search query.')
      return
    }

    const unique = new Map()
    const harvest = () => {
      for (const anchor of document.querySelectorAll('a[href*="/d/oferta/"]')) {
        let url
        try {
          url = new URL(anchor.href)
        } catch {
          continue
        }
        if (url.hostname !== 'www.olx.pl') continue
        url.search = ''
        const item = unique.get(url.href) || { title: '', url: url.href, image: '' }
        const title = (anchor.innerText || '').replace(/\\s+/g, ' ').trim()
        if (title.length > item.title.length) item.title = title

        for (const image of anchor.querySelectorAll('img')) {
          const candidates = [image.currentSrc, image.src, image.getAttribute('data-src'), image.getAttribute('srcset')]
            .filter(Boolean)
            .flatMap((value) => value.split(/\\s*,\\s*/))
            .map((value) => value.trim().split(/\\s+/)[0])
          const candidate = candidates.find((value) => {
            try { return new URL(value, location.href).hostname.endsWith('.olxcdn.com') } catch { return false }
          })
          if (candidate) item.image = new URL(candidate, location.href).href
        }
        unique.set(url.href, item)
      }
    }

    harvest()
    const imageAnchors = [...document.querySelectorAll('a[href*="/d/oferta/"]')]
      .filter((anchor) => anchor.querySelector('img'))
    for (const anchor of imageAnchors) {
      anchor.scrollIntoView({ block: 'center', behavior: 'instant' })
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
      harvest()
    }

    window.scrollTo({ top: 0, behavior: 'instant' })
    const listings = [...unique.values()]
      .filter((item) => item.title)
      .map((item) => ({ id: item.url, marketplace: 'olx', title: item.title, url: item.url, image: item.image }))
    const payload = JSON.stringify({ source: 'olx', query, mode, listings })
    const bytes = Array.from(new TextEncoder().encode(payload), (byte) => String.fromCharCode(byte)).join('')
    const encoded = btoa(bytes).replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/g, '')
    location.href = ${JSON.stringify(`${appOrigin}/`)} + '#olx-import=' + encoded
  })()`
  return `javascript:${encodeURIComponent(script)}`
}