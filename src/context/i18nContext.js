import React from "react"

export const languages = {
  en: {
    locale: "en",
    discoverMore: "Discover more",
  },
  it: {
    locale: "it",
    discoverMore: "Scopri di più",
  },
}

export const i18nContext = React.createContext(languages.it)
