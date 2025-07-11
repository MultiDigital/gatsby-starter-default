import React from "react"
import { graphql } from "gatsby"
import { Box, Container, Grid, Heading, Text } from "@theme-ui/components"
import Layout from "../components/layout"
import { getProductPath } from "../utils/path"
import { HelmetDatoCms } from "gatsby-source-datocms"
import PageHero from "./pageHero"
import { GatsbyImage } from "gatsby-plugin-image"

const Page = ({
  data: { page, site, footer, menu },
  location,
  pageContext,
}) => {
  const locale = pageContext.locale

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

  return (
    <Layout
      locale={locale}
      i18nPaths={i18nPaths}
      menuData={menu.nodes}
      footerData={footer.nodes}
    >
      <HelmetDatoCms seo={page.seoMetaTags}>
        <html lang={page.locale} />
      </HelmetDatoCms>
      {/* <PageHero
        page={page}
        image={pageCategory.categoryImageHero}
        productCategory={pageCategory}
      /> */}
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
                    <GatsbyImage alt="" image={image.gatsbyImageData} />
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

    menu: allDatoCmsMenu(
      locale: $locale
      filter: { root: { eq: true }, locales: { eq: $locale } }
      sort: { position: ASC }
    ) {
      nodes {
        ...MenuDetails
      }
    }

    footer: allDatoCmsFooter(
      locale: $locale
      filter: { root: { eq: true }, locales: { eq: $locale } }
      sort: { position: ASC }
    ) {
      nodes {
        ...FooterDetails
      }
    }
    page: datoCmsProduct(id: { eq: $id }, locale: $locale) {
      id
      _allSlugLocales {
        value
        locale
      }
      title
      slug
      description
      locales
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      category {
        id
        title
        locales
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
      locale: $locale
      filter: { category: { id: { eq: $categoryId } } }
      sort: { position: ASC }
    ) {
      nodes {
        id
        slug
        locales
        _allSlugLocales {
          value
          locale
        }
        title
        category {
          id
          title
          locales
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
    model {
      apiKey
    }
    _allSlugLocales {
      value
      locale
    }
    slug
    description
    locales
    model {
      apiKey
    }
  }
`
