import { useEffect, useState, type FormEvent } from 'react'
import {
  fetchLiveResults,
  filterListings,
  MARKETPLACES,
  COUNTRY_MARKETPLACES,
  LOCALES,
  type MarketplaceListing,
  type MatchMode,
  type Marketplace,
  type Locale,
  type TranslationKeys,
  TRANSLATIONS,
} from './search'
import './App.css'

const marketplaceIds = Object.keys(MARKETPLACES) as Marketplace[]
const localeIds = Object.keys(LOCALES) as Locale[]

function readOlxImport() {
  const encodedImport = new URLSearchParams(window.location.hash.slice(1)).get('olx-import')

  try {
    const payloadData = encodedImport
      ? (() => {
          const base64 = encodedImport.replace(/-/g, '+').replace(/_/g, '/')
          const binary = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '='))
          const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))
          return new TextDecoder().decode(bytes)
        })()
      : localStorage.getItem('index.olx-import')
    if (!payloadData) return null

    const payload = JSON.parse(payloadData) as {
      source?: string
      query?: string
      mode?: MatchMode
      listings?: MarketplaceListing[]
    }
    if (payload.source !== 'olx' || !payload.query || !Array.isArray(payload.listings)) return null

    const listings = payload.listings.filter((listing) => {
      try {
        const adUrl = new URL(listing.url)
        const validImage = !listing.image || (() => {
          const imageUrl = new URL(listing.image)
          return imageUrl.protocol === 'https:' && imageUrl.hostname.endsWith('.olxcdn.com')
        })()
        return adUrl.protocol === 'https:'
          && adUrl.hostname === 'www.olx.pl'
          && adUrl.pathname.includes('/d/oferta/')
          && validImage
          && Boolean(listing.title)
      } catch {
        return false
      }
    })

    return {
      query: payload.query,
      mode: payload.mode === 'exact-phrase' ? 'exact-phrase' as const : 'all-words' as const,
      listings,
    }
  } catch {
    return null
  }
}

function App() {
  const [initialImport] = useState(readOlxImport)
  const [isDarkMode, setIsDarkMode] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches)
  const [locale, setLocale] = useState<Locale>('en')
  const t = (key: TranslationKeys) => TRANSLATIONS[locale][key]
  const [query, setQuery] = useState(initialImport?.query ?? '')
  const [submittedQuery, setSubmittedQuery] = useState(initialImport?.query ?? '')
  const [selectedCountry, setSelectedCountry] = useState('pl')
  const [selectedSources, setSelectedSources] = useState<Marketplace[]>(COUNTRY_MARKETPLACES['pl'])
  const [matchMode, setMatchMode] = useState<MatchMode>(initialImport?.mode ?? 'all-words')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [importedListings, setImportedListings] = useState<MarketplaceListing[]>(initialImport?.listings ?? [])
  const [importMessage, setImportMessage] = useState(initialImport ? `Imported ${initialImport.listings.length} listings.` : '')

  const matchingListings = filterListings(importedListings, submittedQuery, matchMode)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  useEffect(() => {
    setSelectedSources(COUNTRY_MARKETPLACES[selectedCountry])
  }, [selectedCountry])
  useEffect(() => {
    if (initialImport) {
      localStorage.setItem('index.olx-import', JSON.stringify({ source: 'olx', ...initialImport }))
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [initialImport])

  useEffect(() => {
    function syncImportedListings(event: StorageEvent) {
      if (event.key === 'index.olx-import') window.location.reload()
    }

    window.addEventListener('storage', syncImportedListings)
    return () => window.removeEventListener('storage', syncImportedListings)
  }, [])

  async function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextQuery = query.trim()
    setMessage('')
    if (!nextQuery) return
    if (!selectedSources.length) {
      setMessage('Select at least one marketplace.')
      return
    }

    setLoading(true)
    setSubmittedQuery(nextQuery)
    try {
      const results = await fetchLiveResults(nextQuery, selectedSources)
      setImportedListings(results)
      setImportMessage(results.length ? `Found ${results.length} listings.` : 'No results found.')
    } catch (err) {
      setMessage('Search failed.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function clearImportedListings() {
    localStorage.removeItem('index.olx-import')
    setImportedListings([])
    setSubmittedQuery('')
    setQuery('')
    setMatchMode('all-words')
    setSelectedSources(COUNTRY_MARKETPLACES[selectedCountry])
    setImportMessage('Imported listings cleared from this browser.')
  }

  function toggleSource(source: Marketplace) {
    setSelectedSources((selected) =>
      selected.includes(source)
        ? selected.filter((item) => item !== source)
        : [...selected, source],
    )
  }

  function toggleAllSources() {
    setSelectedSources(selectedSources.length === marketplaceIds.length ? [] : marketplaceIds)
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Index, home">
          <span className="wordmark-icon" aria-hidden="true">^..^</span>
          <span>LYNX_SEARCH<span className="wordmark-dot">.</span></span>
        </a>
        <div className="topbar-right">
          <div className="locale-options">
            {localeIds.map((l) => (
              <button
                key={l}
                className={`locale-btn ${locale === l ? 'active' : ''}`}
                onClick={() => setLocale(l)}
              >
                {LOCALES[l].flag}
              </button>
            ))}
          </div>
          <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? 'LIGHT MODE' : 'DARK MODE'}
            </button>
          <span className="topbar-note"><span className="status-light" /> {t('header_note')}</span>
          </div>
      </header>

      <section className="intro" id="top">
        <div className="intro-copy">
          <p className="eyebrow">{t('eyebrow')}</p>
          <h1>{t('heroTitle')}</h1>
          <p className="intro-subtitle">{t('heroSubtitle')}</p>
        </div>
        <div className="intro-aside" aria-label="Search status">
          <span className="aside-index">01 / 04</span>
          <span>LIVE SEARCH<br />RESULTS FETCHED</span>
        </div>
      </section>

      <section className="search-panel" aria-label="Search controls">
        <form className="query-form" onSubmit={submitSearch}>
          <label className="control-label" htmlFor="query">{t('searchLabel')}</label>
          <div className="query-row">
            <span className="prompt-mark" aria-hidden="true">&gt;_</span>
            <input
              id="query"
              type="search"
              value={query}
              maxLength={160}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('searchPlaceholder')}
              autoComplete="off"
            />
            <button className="search-button" type="submit" disabled={loading || !query.trim() || !selectedSources.length}>
              {loading ? t('searchBtnLoading') : t('searchBtn')} <span aria-hidden="true">🔎</span>
            </button>
          </div>
        </form>

        <div className="filters-grid">
          <fieldset className="source-fieldset">
            <legend className="control-label">{t('sourcesLabel')}</legend>
            <div className="source-options">
              <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                {Object.keys(COUNTRY_MARKETPLACES).map((code) => (
                  <option key={code} value={code}>{code.toUpperCase()}</option>
                ))}
              </select>
              {marketplaceIds.map((source) => (
                <label className={`source-option ${selectedSources.includes(source) ? '' : 'hidden'}`} key={source}>
                  <input
                    type="checkbox"
                    checked={selectedSources.includes(source)}
                    onChange={() => toggleSource(source)}
                  />
                  <span className={`checkbox-mark ${source}`} aria-hidden="true" />
                  <span>{MARKETPLACES[source].label}</span>
                </label>
              ))}
              <button className="select-all" type="button" onClick={toggleAllSources}>
                {selectedSources.length === marketplaceIds.length ? t('clearBtn') : t('allBtn')}
              </button>
            </div>
          </fieldset>
          <fieldset className="match-fieldset">
            <legend className="control-label">{t('formatLabel')}</legend>
            <div className="segmented-control" role="radiogroup" aria-label="Query format">
              <button
                type="button"
                role="radio"
                aria-checked={matchMode === 'all-words'}
                className={matchMode === 'all-words' ? 'segment active' : 'segment'}
                onClick={() => setMatchMode('all-words')}
              >
                {t('keywordsBtn')}
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={matchMode === 'exact-phrase'}
                className={matchMode === 'exact-phrase' ? 'segment active' : 'segment'}
                onClick={() => setMatchMode('exact-phrase')}
              >
                {t('exactBtn')}
              </button>
            </div>
          </fieldset>
          </div>
        <p className="snippet-hint">{t('hint')}</p>
      </section>

      <section className="results-section" aria-live="polite">
        <div className="results-heading">
          <div>
            <p className="eyebrow">{importedListings.length ? t('resultsFiltered') : t('resultsReady')}</p>
            <h2>{importedListings.length ? t('titleMatches').replace('{{query}}', submittedQuery) : submittedQuery ? `Prepared searches for “${submittedQuery}”` : 'Choose where to search'}</h2>
          </div>
          <div className="results-count">
            <span className="count-number">{(importedListings.length ? matchingListings.length : selectedSources.length).toString().padStart(2, '0')}</span>
            <span>{importedListings.length ? 'TITLE MATCHES' : t('portalsSelected')}</span>
          </div>
        </div>

        <div className="preview-notice" role="note">
          <span className="notice-symbol" aria-hidden="true">i</span>
          <p>{importedListings.length ? t('noticeText') : t('noticeReady')}</p>
          {importedListings.length > 0 && <button className="bookmarklet-button" type="button" onClick={clearImportedListings}>{t('clearResultsBtn')}</button>}
        </div>

        {message && <p className="search-error" role="alert">{message}</p>}
        {importMessage && <p className="import-message" role="status">{importMessage}</p>}

        {importedListings.length > 0 ? (
          matchingListings.length > 0 ? (
            <div className="imported-listing-grid">
              {matchingListings.map((listing, index) => (
                <article className="imported-listing" key={listing.id} style={{ animationDelay: `${index * 35}ms` }}>
                  <a className="imported-image-link" href={listing.url} target="_blank" rel="noreferrer">
                    {listing.image ? (
                      <img className="imported-image" src={listing.image} alt={listing.title} loading="lazy" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="no-thumbnail">
                        <span aria-hidden="true">^..^</span>
                      </div>
                    )}
                    <span className="image-index">{String(index + 1).padStart(2, '0')}</span>
                  </a>
                  <div className="imported-listing-info">
                    <span className={`market-tag ${listing.marketplace}`}><span className="market-dot" />{MARKETPLACES[listing.marketplace].label} / TITLE MATCH</span>
                    <h3>{listing.title}</h3>
                    <a className="open-link" href={listing.url} target="_blank" rel="noreferrer">{t('open_listing')} <span aria-hidden="true">↗</span></a>
                    <div className="listing-footer">
                      {listing.price && <span className="listing-price">{listing.price}</span>}
                      <div className="portal-badge">
                        <img src={MARKETPLACES[listing.marketplace].icon} alt="" width="16" height="16" />
                        <span>{MARKETPLACES[listing.marketplace].label}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
          <div className="empty-state">
            <span className="empty-cursor" aria-hidden="true">_</span>
              <h3>{t('noMatches')}</h3>
              <p>Fetched {importedListings.length} listings; none contain the selected title match.</p>
            </div>
          )
        ) : (
          <div className="empty-state">
            <span className="empty-cursor" aria-hidden="true">_</span>
            <h3>{selectedSources.length ? 'Ready when you are.' : 'Select a marketplace.'}</h3>
            <p>{selectedSources.length ? 'Enter a query to fetch live results.' : 'Choose one or more portals above.'}</p>
          </div>
        )}
      </section>

      <footer className="page-footer">
        <span>INDEX / PERSONAL TOOL / NOT AFFILIATED WITH MARKETPLACES</span>
        <span>LIVE FETCH LAUNCHER <span className="footer-separator">/</span> {selectedSources.length} PORTALS</span>
      </footer>
    </main>
  )
}

export default App