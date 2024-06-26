import React from "react"
import { Box, Container, Flex, Heading, Text } from "@theme-ui/components"

// Begin swiper
import SwiperCore, { Pagination, Mousewheel, A11y } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.min.css"
import { InboundLink } from "../link"
import { getPagePath } from "../../utils/path"
import { LanguageSwitcherContext } from "../../context/languageSwitcherContext"
SwiperCore.use([Mousewheel, Pagination, A11y])
// End swiper

const PageCarousel = ({ title, pages }) => {
  const locale = React.useContext(LanguageSwitcherContext).activeLocale
  // console.log(pages)
  return (
    <Box>
      <Container>
        <Heading variant="h3" sx={{ mb: [2, 2, 4], mt: 0 }}>
          {title}
        </Heading>
        <Swiper
          spaceBetween={32}
          slidesPerView={4}
          pagination={{ clickable: true }}
          grabCursor={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            896: {
              slidesPerView: 3,
            },
          }}
        >
          {pages.map(page => (
            <SwiperSlide key={page.originalId}>
              <PageThumb page={page} locale={locale} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  )
}

const PageThumb = ({ page, locale }) => (
  <InboundLink to={getPagePath(page, locale)} sx={{ textDecoration: "none" }}>
    <Flex sx={{ height: ["24rem"], backgroundColor: "primary", padding: 4 }}>
      <Text sx={{ margin: 0, color: "light" }}>{page.title}</Text>
    </Flex>
  </InboundLink>
)

export default PageCarousel
