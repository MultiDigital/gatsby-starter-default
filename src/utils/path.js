const defaultLocale = "it" //cambiare in base al default del site

const i18nPath = {
  it: {
    category: "categoria",
    search: "cerca",
    products: "prodotti",
  },
  en: {
    category: "category",
    search: "search",
    products: "products",
  },
  "en-US": {
    category: "category",
    search: "search",
    products: "products",
  },
}

export function getPagePath(page, locale) {
  const pageLocale = locale || page.locale
  let lang =
    pageLocale === defaultLocale ? "/" : `/${pageLocale.toLowerCase()}/`
  let path = `${page._allSlugLocales.find(x => x.locale === pageLocale).value}`
  if (page.root) {
    return lang + `${path}/`
  }

  path = `${
    page.treeParent._allSlugLocales.find(x => x.locale === pageLocale).value
  }/${path}`
  if (page.treeParent.root) {
    return lang + `${path}/`
  }
  path = `${
    page.treeParent.treeParent._allSlugLocales.find(
      x => x.locale === pageLocale
    ).value
  }${path}`
  return lang + `${path}/`
}
export function getCategoryPath(page, locale) {
  const pageLocale = locale || page.locale
  let lang =
    pageLocale === defaultLocale ? "/" : `/${pageLocale.toLowerCase()}/`
  let path = `${page._allSlugLocales.find(x => x.locale === pageLocale).value}`
  let categoryPath = i18nPath[pageLocale].category.toLowerCase()

  if (page.root) {
    return lang + `${categoryPath}/${path}/`
  }

  path = `${
    page.treeParent._allSlugLocales.find(x => x.locale === pageLocale).value
  }/${path}`
  if (page.treeParent.root) {
    return lang + `${categoryPath}/${path}/`
  }

  path = `${
    page.treeParent.treeParent._allSlugLocales.find(
      x => x.locale === pageLocale
    ).value
  }${path}`
  return lang + `${categoryPath}/${path}/`
}
export function getHomePath(locale) {
  console.log("Locale:", locale)
  return locale === defaultLocale ? "/" : `/${locale.toLowerCase()}/`
}

export function getSearchPath(locale) {
  console.log("Locale:", locale)
  if (typeof locale !== "string") {
    console.error(new Error(`Stack trace:`).stack)
    throw new Error(
      `Expected string but received ${typeof locale}: ${JSON.stringify(locale)}`
    )
  }
  return `/${locale.toLowerCase()}/search/`
}
export function getBlogPath(locale) {
  return locale === defaultLocale ? `/blog/` : `/${locale.toLowerCase()}/blog/`
}

export function getArticleCategoryPath(page, locale) {
  return locale === defaultLocale
    ? `/blog/${i18nPath[locale].category}/${
        page._allSlugLocales.find(x => x.locale === locale).value
      }/`
    : `/${locale.toLowerCase()}/blog/${i18nPath[locale].category}/${
        page._allSlugLocales.find(x => x.locale === locale).value
      }/`
}

export function getProductPath(page, locale) {
  return locale === defaultLocale
    ? `/${i18nPath[locale].products}/${page.slug}/`
    : `/${locale.toLowerCase()}/${i18nPath[page.locale].products}/${page.slug}/`
}
