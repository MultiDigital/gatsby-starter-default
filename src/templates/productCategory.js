import React, { useState } from "react"
import { graphql } from "gatsby"
import { Box, Container, Grid, Heading, Text, Flex } from "@theme-ui/components"
import Layout from "../components/layout"
import { getCategoryPath } from "../utils/path"
import { HelmetDatoCms } from "gatsby-source-datocms"
import PageHero from "./pageHero"
import ProductThumb from "../components/productThumb.js"
import { InboundLink } from "../components/link"
import { useFavicon } from "../hooks/useFavicon"

// const LocationsMap = loadable(
//   () => import("../components/blocks/locationMap"),
//   { ssr: false }
// )

const Page = ({
  data: { page, categories, products, site, articles, contactFooter },
}) => {
  const favicon = useFavicon().site.faviconMetaTags
  const pageAllSlugLocales = page._allSlugLocales.sort(function (a, b) {
    return site.locales.indexOf(a.locale) - site.locales.indexOf(b.locale)
  })

  const [hasProducts, setHasProducts] = useState(
    products.nodes.find(product => page.title == product.category.title) ? 1 : 0
  )
  const i18nPaths = pageAllSlugLocales.map(locale => {
    return {
      locale: locale.locale,
      value: getCategoryPath(page, locale.locale),
    }
  })

  return (
    <Layout locale={page.locale} i18nPaths={i18nPaths}>
      <HelmetDatoCms seo={page.seoMetaTags} favicon={favicon}>
        <html lang={page.locale} />
      </HelmetDatoCms>
      <PageHero page={page} image={page.heroImage} />
      <Box>{page.content && page.content.map(block => <Box>22</Box>)}</Box>
      <Box>
        <Container>
          <Box>
            <Box sx={{ pt: [0], pb: [6] }}>
              <Heading as="h3" variant="h3" sx={{ textAlign: "center" }}>
                {page.title}
              </Heading>
              <Text
                as="div"
                variant="sectionTitle"
                sx={{ px: [3, 3, 6, 10], p: { textAlign: "center" } }}
                dangerouslySetInnerHTML={{ __html: page.description }}
              />
            </Box>
            <Grid columns={[1, 1, 1, ".2fr .8fr"]} gap={[2, 2, 2, 6]}>
              <Box sx={{ display: ["none", "none", "none", "block"] }}>
                {categories.nodes.map(category => {
                  return (
                    <Box>
                      <Box>
                        <Heading
                          as="h4"
                          variant="h4"
                          sx={{
                            my: [3],
                            mb: [hasProducts && 2],
                            color:
                              category.title == page.title ? "primary" : "dark",
                          }}
                        >
                          {category.title != page.title ? (
                            <InboundLink
                              variant="normalDarkLink"
                              sx={{ fontSize: "body" }}
                              to={getCategoryPath(category, page.locale)}
                            >
                              {category.title}
                            </InboundLink>
                          ) : (
                            category.title
                          )}
                        </Heading>
                      </Box>
                    </Box>
                  )
                })}
              </Box>
              <Grid columns={[1, 2, 3, 3]} gap={[2, 2, 2, 4]}>
                {products.nodes.map(product => {
                  page.title == product.category.title && (
                    <ProductThumb product={product} category={page.title} />
                  )
                })}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Layout>
  )
}

export default Page

export const query = graphql`
  query ProductCategoryQuery($id: String!, $locale: String!) {
    site: datoCmsSite {
      locales
    }
    page: datoCmsProductCategory(id: { eq: $id }) {
      id
      locale
      title
      slug
      description
      model {
        apiKey
      }
      ...AllProductCategorySlugLocales
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      image {
        gatsbyImageData(
          width: 1920
          placeholder: NONE
          forceBlurhash: false
          imgixParams: {
            blendColor: "#212C30"
            blendMode: "multiply"
            blendAlpha: 30
          }
        )
      }
      heroImage {
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
    categories: allDatoCmsProductCategory(
      filter: { slug: { ne: null }, locale: { eq: $locale } }
      sort: { fields: position, order: ASC }
    ) {
      nodes {
        id
        title
        locale
        ...ProductCategoryPageDetails
        model {
          apiKey
        }
      }
    }
    products: allDatoCmsProduct(
      filter: { category: { id: { eq: $id } }, locale: { eq: $locale } }
      sort: { fields: position, order: ASC }
    ) {
      nodes {
        id
        ...AllProductSlugLocales
        title
        slug
        position
        description
        locale
        category {
          id
          title
          locale
          ...ProductCategoryPageDetails

          model {
            apiKey
          }
        }
        images {
          gatsbyImageData(width: 1920, placeholder: NONE, forceBlurhash: false)
        }
      }
    }
  }

  fragment ProductCategoryPageDetails on DatoCmsProductCategory {
    id
    locale
    title
    slug
    description
    model {
      apiKey
    }
    image {
      gatsbyImageData(
        width: 1920
        placeholder: NONE
        forceBlurhash: false
        imgixParams: {
          blendColor: "#212C30"
          blendMode: "multiply"
          blendAlpha: 30
        }
      )
    }
    heroImage {
      gatsbyImageData(
        width: 1920
        placeholder: NONE
        forceBlurhash: false
        imgixParams: {
          blendColor: "#212C30"
          blendMode: "multiply"
          blendAlpha: 30
        }
      )
    }
  }

  fragment AllProductCategorySlugLocales on DatoCmsProductCategory {
    _allSlugLocales {
      value
      locale
    }
  }
`