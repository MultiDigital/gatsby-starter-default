import React from "react"

export const languages = {
  en: {
    locale: "en",
    discoverMore: "Discover more",
    all: "All",
    search: "Search",
    results: "Results",
    noResults: "No results",
    download: "Download",
    latestArticles: "Latest news",
  },
  "en-US": {
    locale: "en-US",
    discoverMore: "Discover more",
    all: "All",
    search: "Search",
    results: "Results",
    noResults: "No results",
    download: "Download",
    latestArticles: "Latest news",
  },
  it: {
    locale: "it",
    discoverMore: "Scopri di più",
    all: "Tutti",
    search: "Cerca",
    results: "risultati",
    noResults: "Nessun risultato",
    download: "Scarica",
    latestArticles: "Ultime news",
  },
}

export const i18nContext = React.createContext(languages.it)
