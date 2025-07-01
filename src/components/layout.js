/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Box, Flex } from "@theme-ui/components"
import { i18nContext, languages } from "../context/i18nContext"
import Header from "./header"
import { LanguageSwitcherContext } from "../context/languageSwitcherContext"
import Hreflang from "./hreflang"
import Footer from "./footer"
import Canonical from "./canonical"
import { FooterContext } from "../context/footerContext"

import { MenuContext } from "../context/menuContext"

const Layout = ({
  children,
  locale,
  i18nPaths,
  footerData,
  menuData,
  dark = false,
}) => {
  const data = useStaticQuery(graphql`
    query SiteQuery {
      datoCmsSite: datoCmsSite {
        locales
      }
      gatsbySite: site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `)

  return (
    <i18nContext.Provider value={languages[locale]}>
      <LanguageSwitcherContext.Provider
        value={{ activeLocale: locale, paths: i18nPaths || [] }}
      >
        <FooterContext.Provider value={footerData}>
          <MenuContext.Provider value={menuData}>
            <Hreflang
              paths={i18nPaths}
              siteUrl={data.gatsbySite.siteMetadata.siteUrl}
            />
            <Canonical
              siteUrl={data.gatsbySite.siteMetadata.siteUrl}
              paths={i18nPaths}
            />
            <Flex
              sx={{
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "100vh",
              }}
            >
              <Header locale={locale} dark={dark} />
              <Box as="main" sx={{ pt: "var(--navbar-height)" }}>
                {children}
              </Box>
              <Footer />
            </Flex>
          </MenuContext.Provider>
        </FooterContext.Provider>
      </LanguageSwitcherContext.Provider>
    </i18nContext.Provider>
  )
}

export default Layout
