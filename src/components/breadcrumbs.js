import React from "react"
import { Box, Flex } from "@theme-ui/components"
import { InboundLink } from "./link"
import {
  getArticleCategoryPath,
  getBlogPath,
  getHomePath,
  getCategoryPath,
  getPagePath,
} from "../utils/path"
import { LanguageSwitcherContext } from "../context/languageSwitcherContext"
const Breadcrumbs = ({ page, productCategory = undefined }) => {
  const locale = React.useContext(LanguageSwitcherContext).activeLocale

  function renderSwitch(page) {
    switch (page.model.apiKey) {
      case "product":
        return <ProductBreadcrumbs page={page} />
      case "product_category":
        return <CategoryBreadcrumbs page={page} />
      case "article":
        return <ArticleBreadcrumbs page={page} />
      default:
        return <PageBreadcrumbs page={page} />
    }
  }

  const ProductBreadcrumbs = ({ page }) => (
    <List>
      <Item>
        <InboundLink color="secondary" to={getHomePath(locale)}>
          Home
        </InboundLink>
      </Item>
      {page.category && (
        <Item>
          <InboundLink
            color="secondary"
            to={getCategoryPath(page.category, locale)}
          >
            {page.category.title}
          </InboundLink>
        </Item>
      )}
      <Item color="light">{page.title}</Item>
    </List>
  )

  const CategoryBreadcrumbs = ({ page }) => (
    <List>
      <Item>
        <InboundLink color="secondary" to={getHomePath(locale)}>
          Home
        </InboundLink>
      </Item>
      {page.treeParent && page.treeParent.treeParent && (
        <Item>
          <InboundLink to={getCategoryPath(page.treeParent.treeParent, locale)}>
            {page.treeParent.treeParent.title}
          </InboundLink>
        </Item>
      )}
      {page.treeParent && (
        <Item>
          <InboundLink to={getCategoryPath(page.treeParent, locale)}>
            {page.treeParent.title}
          </InboundLink>
        </Item>
      )}
      <Item color="light">{page.title}</Item>
    </List>
  )

  const PageBreadcrumbs = ({ page }) => (
    <List>
      <Item>
        <InboundLink color="light" to={getHomePath(locale)}>
          Home
        </InboundLink>
      </Item>
      {page.treeParent && page.treeParent.treeParent && (
        <Item>
          <InboundLink to={getPagePath(page.treeParent.treeParent, locale)}>
            {page.treeParent.treeParent.title ||
              page.treeParent.treeParent.name}
          </InboundLink>
        </Item>
      )}
      {page.treeParent && (
        <Item>
          <InboundLink to={getPagePath(page.treeParent, locale)}>
            {page.treeParent.title}
          </InboundLink>
        </Item>
      )}
      <Item>{page.title}</Item>
    </List>
  )

  const ArticleBreadcrumbs = ({ page }) => (
    <List>
      <Item>
        <InboundLink to={getHomePath(locale)}>Home</InboundLink>
      </Item>
      <Item>
        <InboundLink to={getBlogPath(locale)}>Blog</InboundLink>
      </Item>
      {page.category && (
        <Item>
          <InboundLink to={getArticleCategoryPath(page.category, locale)}>
            {page.category.title}
          </InboundLink>
        </Item>
      )}
    </List>
  )

  return renderSwitch(page)
}

const List = props => {
  return (
    <Flex
      {...props}
      sx={{
        flexDirection: "row",
        margin: 0,
        padding: 0,
        listStyle: "none",
        a: {
          textDecoration: "none",
          color: "#dedede",
          "&:hover": {
            textDecoration: "underline",
          },
        },
      }}
      as="ul"
    />
  )
}

const Item = props => {
  return (
    <Box
      {...props}
      sx={{
        marginRight: 2,
        "&::after": {
          content: '"|"',
          color: "dedede",
          marginLeft: 2,
          display: ["inline"],
        },
        "&:last-child": {
          marginRight: 0,
          "&::after": {
            display: "none",
          },
        },
      }}
      as="li"
    />
  )
}

export default Breadcrumbs
