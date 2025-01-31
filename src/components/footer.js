import {
  Box,
  Container,
  Flex,
  Grid,
  Text,
  Image,
  Heading,
} from "@theme-ui/components"
import React, { useContext } from "react"
import { useCompany } from "../hooks/useCompany"
import { MagicLink } from "../utils/magicLink"
import { useSocial } from "../hooks/useSocial"
import { useLocation } from "../hooks/useLocation"
import { i18nContext } from "../context/i18nContext"
import { Facebook, Instagram, Youtube, Linkedin } from "react-feather"
import Logo from "../images/logo.svg"
import { MapPin, Mail } from "react-feather"
import { LanguageSwitcherContext } from "../context/languageSwitcherContext"
import { FooterContext } from "../context/footerContext"

const FooterColumn = ({ column, locale }) => {
  if (!column.treeChildren || column.treeChildren.length === 0) return null

  return (
    <Flex
      sx={{
        flexDirection: "column",
        margin: 0,
        padding: 0,
      }}
    >
      <Text
        as="h3"
        sx={{
          fontSize: 2,
          fontWeight: "bold",
          mb: 3,
          color: "light",
        }}
      >
        {column.anchor}
      </Text>
      <Flex
        as="ul"
        sx={{
          flexDirection: "column",
          margin: 0,
          padding: 0,
          listStyle: "none",
          a: {
            color: "light",
            textDecoration: "none",
            fontSize: 1,
            "&:hover": {
              textDecoration: "underline",
            },
          },
        }}
      >
        {column.treeChildren.map(link => (
          <Box as="li" key={link.id} sx={{ mb: 2 }}>
            {link.link ? (
              <MagicLink item={link.link} locale={locale} />
            ) : (
              <>
                {link.treeChildren && link.treeChildren.length > 0 && (
                  <>
                    {link.anchor}
                    <Flex
                      as="ul"
                      sx={{
                        flexDirection: "column",
                        margin: 0,
                        padding: 0,
                        mt: 2,
                        listStyle: "none",
                      }}
                    >
                      {link.treeChildren.map(subLink => (
                        <Box as="li" key={subLink.id} sx={{ mb: 2 }}>
                          {subLink.link ? (
                            <MagicLink item={subLink.link} locale={locale} />
                          ) : (
                            subLink.anchor
                          )}
                        </Box>
                      ))}
                    </Flex>
                  </>
                )}
              </>
            )}
          </Box>
        ))}
      </Flex>
    </Flex>
  )
}

const Footer = () => {
  const footer = useContext(FooterContext)
  const company = useCompany()
  const social = useSocial()
  const locations = useLocation()
  const locale = useContext(LanguageSwitcherContext).activeLocale

  footer.map(footerItem => {
    footerItem.treeChildren.sort((a, b) => a.position - b.position)
    footerItem.treeChildren.map(footerItem => {
      if (footerItem.treeChildren.length > 0) {
        footerItem.treeChildren.sort((a, b) => a.position - b.position)
      }
    })
  })

  return (
    <Box as="footer" sx={{ backgroundColor: "dark", py: 5, color: "light" }}>
      <i18nContext.Consumer>
        {t => (
          <>
            <Container>
              <Grid
                columns={[1, 1, `.8fr repeat(${footer.length},1fr)`]}
                gap={[4]}
              >
                <Flex
                  sx={{
                    flexDirection: "column",
                    p: { fontSize: 1 },
                    "*:first-child": { mt: 0 },
                  }}
                >
                  <Image src={Logo} sx={{ maxWidth: "150px" }} />
                  {company.description && (
                    <Box sx={{ mt: [4, 4] }}>
                      <Heading variant="h4" as="h4">
                        {company.legalName}
                      </Heading>
                      <Text as="p"> {company.city}</Text>
                      <Text
                        dangerouslySetInnerHTML={{
                          __html: company.description,
                        }}
                      />
                    </Box>
                  )}
                </Flex>

                {footer.map(column => (
                  <FooterColumn
                    key={column.id}
                    column={column}
                    locale={locale}
                  />
                ))}
              </Grid>
            </Container>
            <Container sx={{ py: 0 }}>
              <Flex
                sx={{
                  display: "flex",
                  py: 1,
                  justifyContent: "space-between",
                  alignContent: "center",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Grid columns={[4]} gap={[4]} sx={{ mt: [2, 0] }}>
                    {social.facebook && (
                      <Box>
                        <MagicLink target="_blank" href={social.facebook}>
                          <Facebook color="#FFF" />
                        </MagicLink>
                      </Box>
                    )}
                    {social.instagram && (
                      <Box>
                        <MagicLink target="_blank" href={social.instagram}>
                          <Instagram color="#FFF" />
                        </MagicLink>
                      </Box>
                    )}
                    {social.linkedin && (
                      <Box>
                        <MagicLink target="_blank" href={social.linkedin}>
                          <Linkedin color="#FFF" />
                        </MagicLink>
                      </Box>
                    )}
                    {social.youtube && (
                      <Box>
                        <MagicLink target="_blank" href={social.youtube}>
                          <Youtube color="#FFF" />
                        </MagicLink>
                      </Box>
                    )}
                  </Grid>
                </Box>
                <Box
                  sx={{
                    span: { color: "primary" },
                    fontWeight: "400",
                    fontSize: [1],
                    pt: [3, 0],
                    fontFamily: "Teko",
                  }}
                  dangerouslySetInnerHTML={{ __html: t.copyright }}
                ></Box>
              </Flex>
              {company && (
                <Box sx={{ mt: [4, 6] }}>
                  <Text sx={{ fontSize: [0] }}>
                    © {new Date().getFullYear()} {company.legalName} |
                    {company.vatId && " P.IVA " + company.vatId}{" "}
                    {company.shareCapital &&
                      " C.S. " + company.shareCapital + "€"}
                    {company.registrationNumber &&
                      "- REA " + company.registrationNumber}{" "}
                    {company.addresses[0] &&
                      company.addresses[0].streetAddress &&
                      "- Sede legale: " + company.addresses[0].streetAddress}
                    {company.addresses[0] &&
                      company.addresses[0].postalCode &&
                      ", " + company.addresses[0].postalCode}{" "}
                    {company.addresses[0] &&
                      company.addresses[0].addressLocality &&
                      ", " + company.addresses[0].addressLocality}{" "}
                    {company.addresses[0] &&
                      company.addresses[0].addressRegion &&
                      ", " + company.addresses[0].addressRegion}{" "}
                    {company.addresses[0] &&
                      company.addresses[0].addressCountry &&
                      "- " + company.addresses[0].addressCountry}{" "}
                    - Tutti i Diritti Riservati / All rights reserved
                  </Text>
                </Box>
              )}
            </Container>
          </>
        )}
      </i18nContext.Consumer>
    </Box>
  )
}

export default Footer
