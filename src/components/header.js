import * as React from "react"
import { Box } from "@theme-ui/components"
import Nav from "./nav"
import MobileNav from "./mobileNav"
import FixedNav from "./fixedNav"
import FixedMobileNav from "./fixedMobileNav"
const Header = ({ locale, dark = false }) => {
  React.useEffect(() => {
    const updateNavbarHeight = () => {
      const headerElement = document.querySelector("header")
      const navbarHeight = headerElement.offsetHeight
      document.documentElement.style.setProperty(
        "--navbar-height",
        `${navbarHeight}px`
      )
    }

    updateNavbarHeight()

    window.addEventListener("resize", updateNavbarHeight)

    return () => {
      window.removeEventListener("resize", updateNavbarHeight)
    }
  }, [])

  const fixed = false

  return (
    <Box
      as="header"
      sx={{
        backgroundColor: "light",
        borderBottom: "1px solid",
        borderColor: "lightGray",
        position: "fixed",
        width: "100%",
        zIndex: "9999",
      }}
    >
      <Box
        sx={{
          display: ["none", "none", "none", "block"],
          zIndex: 4,
        }}
      >
        {fixed === true ? (
          <FixedNav dark={dark} />
        ) : (
          <Nav locale={locale} dark={dark} />
        )}
      </Box>
      <Box sx={{ display: ["block", "block", "block", "none"], zIndex: 4 }}>
        {fixed === true ? (
          <FixedMobileNav dark={dark} />
        ) : (
          <MobileNav locale={locale} isAtTop={fixed} dark={dark} />
        )}
      </Box>
    </Box>
  )
}

export default Header
