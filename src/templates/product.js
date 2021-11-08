import React from "react"
import { graphql } from "gatsby"
import { Box, Container, Grid, Heading, Flex, Text } from "@theme-ui/components"
import { Link } from "../components/link"
import { ChevronLeft, ChevronRight, Plus, Minus } from "react-feather"
import loadable from "@loadable/component"
import Layout from "../components/layout"
import { getPagePath, getProductPath } from "../utils/path"
import { HelmetDatoCms } from "gatsby-source-datocms"
import PageHero from "./pageHero"
import { GatsbyImage } from "gatsby-plugin-image"
import { getColor } from "@theme-ui/color"
import {
  Accordion as AccordionWrapper,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion"
import themeUiTheme from "../gatsby-plugin-theme-ui"
import { i18nContext } from "../context/i18nContext"
import { Link as ProductLink } from "gatsby"
import { useFavicon } from "../hooks/useFavicon"

// const LocationsMap = loadable(
//   () => import("../components/blocks/locationMap"),
//   { ssr: false }
// )

const Page = ({ data: { page, site, products }, location }) => {
const favicon = useFavicon().site.faviconMetaTags

  const pageCategory =
    location.state && location.state.category
      ? page.category[
          page.category.findIndex(({ title }) => {
            return title === location.state.category
          })
        ]
      : page.category

  const pageAllSlugLocales = page._allSlugLocales.sort(function (a, b) {
    return site.locales.indexOf(a.locale) - site.locales.indexOf(b.locale)
  })

  const i18nPaths = pageAllSlugLocales.map(locale => {
    return {
      locale: locale.locale,
      value: getProductPath(page, locale.locale),
    }
  })

  const primary = getColor(themeUiTheme, "primary")
  const dark = getColor(themeUiTheme, "dark")
  const light = getColor(themeUiTheme, "light")

  return (
    <Layout locale={page.locale} i18nPaths={i18nPaths}>
      <HelmetDatoCms seo={page.seoMetaTags} favicon={favicon}>
        <html lang={page.locale} />
      </HelmetDatoCms>
      <PageHero
        page={page}
        image={pageCategory.categoryImageHero}
        productCategory={pageCategory}
      />
      <Container>
        <Grid columns={[1, 2]} gap={[5]} sx={{ pt: [7] }}>
          {page.images && page.images.length > 0 && (
            <Grid
              columns={[1]}
              sx={{ gridTemplateRows: `repeat(` + page.images.length + `}` }}
            >
              {page.images.map(image => {
                return (
                  <Box>
                    <GatsbyImage alt="" image={image.gatsbyImageData} alt="" />
                  </Box>
                )
              })}
            </Grid>
          )}

          <Box>
            <Box>
              <Heading as="h3" variant="h3" sx={{ mt: [5], mb: [0] }}>
                {page.name}
              </Heading>
            </Box>
            <Text
              as="div"
              variant="sectionTitle"
              sx={{ py: [5] }}
              dangerouslySetInnerHTML={{ __html: page.description }}
            />
          </Box>
        </Grid>
      </Container>
    </Layout>
  )
}

export default Page

export const query = graphql`
  query ProductQuery($categoryId: String!, $id: String!, $locale: String!) {
    site: datoCmsSite {
      locales
    }
    page: datoCmsProduct(id: { eq: $id }) {
      id
      ...AllProductSlugLocales
      title
      slug
      description
      locale
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      category {
        id
        title
        locale
        ...ProductCategoryPageDetails

        categoryImageHero: heroImage {
          desktop: gatsbyImageData(
            placeholder: NONE
            forceBlurhash: false
            imgixParams: {
              blendColor: "#212C30"
              blendMode: "multiply"
              blendAlpha: 30
            }
          )
          mobile: gatsbyImageData(
            placeholder: NONE
            forceBlurhash: false
            imgixParams: {
              fit: "crop"
              ar: "16:10"
              h: "800"
              blendColor: "#212C30"
              blendMode: "multiply"
              blendAlpha: 30
            }
          )
        }
        model {
          apiKey
        }
      }
      images {
        gatsbyImageData(width: 1920, placeholder: NONE, forceBlurhash: false)
      }
      model {
        apiKey
      }
    }
    products: allDatoCmsProduct(
      filter: { category: { id: { eq: $categoryId } }, locale: { eq: $locale } }
      sort: { fields: position, order: ASC }
    ) {
      nodes {
        id
        slug
        locale
        ...AllProductSlugLocales
        title
        category {
          id
          title
          locale
          ...ProductCategoryPageDetails

          model {
            apiKey
          }
        }
      }
    }
  }

  fragment ProductPageDetails on DatoCmsProduct {
    id
    title
    slug
    description
    locale
    model {
      apiKey
    }
  }

  fragment AllProductSlugLocales on DatoCmsProduct {
    _allSlugLocales {
      value
      locale
    }
  }
`
