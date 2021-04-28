import { Box } from "@theme-ui/components"
import React from "react"
import LanguageSwitcher from "./languageSwitcher"
import Nav from "./nav"

const Header = () => {
  return (
    <Box as="header">
      <Nav />
      <LanguageSwitcher />
    </Box>
  )
}

export default Header
