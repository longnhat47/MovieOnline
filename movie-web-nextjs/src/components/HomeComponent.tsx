"use client";

import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Col, Divider, Flex, Row, Card } from "antd";
import { Content } from "antd/es/layout/layout";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import StyleLayout from "@/styles/layout.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fecthAllMovie } from "@/features/movie/movieSlide";
import { AppDispatch, RootState } from "@/lib/store";

const { Meta } = Card;
export default function HomeComponent() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const movies = useSelector((state: RootState) => state.movie.movies);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fecthAllMovie());
  }, [dispatch]);

  return (
    <>
      <Content>
        <Flex className={StyleLayout.lnDefaultLayout}>
          <Row className={StyleLayout.lnSection}>
            {/* <Col span={24}>
              <SwiperStyled
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                <SwiperSlide>
                  <Image
                    src="https://swiperjs.com/demos/images/nature-1.jpg"
                    alt="slide"
                    fill
                    sizes="100%"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://swiperjs.com/demos/images/nature-2.jpg"
                    alt="slide"
                    fill
                    sizes="100%"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://swiperjs.com/demos/images/nature-3.jpg"
                    alt="slide"
                    fill
                    sizes="100%"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://swiperjs.com/demos/images/nature-4.jpg"
                    alt="slide"
                    fill
                    sizes="100%"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://swiperjs.com/demos/images/nature-5.jpg"
                    alt="slide"
                    fill
                    sizes="100%"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://swiperjs.com/demos/images/nature-6.jpg"
                    alt="slide"
                    fill
                    sizes="100%"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://swiperjs.com/demos/images/nature-7.jpg"
                    alt="slide"
                    fill
                    sizes="100%"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://swiperjs.com/demos/images/nature-8.jpg"
                    alt="slide"
                    fill
                    sizes="100%"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://swiperjs.com/demos/images/nature-9.jpg"
                    alt="slide"
                    fill
                    sizes="100%"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://swiperjs.com/demos/images/nature-10.jpg"
                    alt="slide"
                    fill
                    sizes="100%"
                  />
                </SwiperSlide>
              </SwiperStyled>
              <SwiperThumbStyled
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <Image
                    src="https://swiperjs.com/demos/images/nature-1.jpg"
                    alt="slide"
                    fill
                    sizes="100%"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://swiperjs.com/demos/images/nature-2.jpg"
                    alt="slide"
                    fill
                    sizes="100%"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://swiperjs.com/demos/images/nature-3.jpg"
                    alt="slide"
                    fill
                    sizes="100%"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://swiperjs.com/demos/images/nature-4.jpg"
                    alt="slide"
                    fill
                    sizes="100%"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://swiperjs.com/demos/images/nature-5.jpg"
                    alt="slide"
                    fill
                    sizes="100%"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://swiperjs.com/demos/images/nature-6.jpg"
                    alt="slide"
                    fill
                    sizes="100%"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://swiperjs.com/demos/images/nature-7.jpg"
                    alt="slide"
                    fill
                    sizes="100%"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://swiperjs.com/demos/images/nature-8.jpg"
                    alt="slide"
                    fill
                    sizes="100%"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://swiperjs.com/demos/images/nature-9.jpg"
                    alt="slide"
                    fill
                    sizes="100%"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src="https://swiperjs.com/demos/images/nature-10.jpg"
                    alt="slide"
                    fill
                    sizes="100%"
                  />
                </SwiperSlide>
              </SwiperThumbStyled>
            </Col> */}
            <Col span={24}>
              <TitleDividerStyled orientation="left" orientationMargin="0">
                Phim mới
              </TitleDividerStyled>
              <Row gutter={[16, 24]}>
                {movies.map((item, key) => (
                  <Col xs={24} sm={12} md={8} lg={8} key={key}>
                    <CardStyled
                      hoverable
                      style={{ width: "100%" }}
                      cover={
                        <>
                          <Image
                            alt={`${item.name} thumbnail`}
                            src={item.thumbnail}
                            fill
                            sizes="100%"
                          />
                          <PlayBtnStyled
                            href={`/movie/${item.slug}`}
                            className="lnBtnPlay"
                          ></PlayBtnStyled>
                        </>
                      }
                    >
                      <Meta title={item.name} />
                    </CardStyled>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col span={24}>
              <TitleDividerStyled orientation="left" orientationMargin="0">
                Phim Hoạt Hình
              </TitleDividerStyled>
              <Row gutter={[16, 24]}>
                {movies.map((item, key) => (
                  <Col xs={24} sm={12} md={8} lg={8} key={key}>
                    <CardStyled
                      hoverable
                      style={{ width: "100%" }}
                      cover={
                        <>
                          <Image
                            alt={`${item.name} thumbnail`}
                            src={item.thumbnail}
                            fill
                            sizes="100%"
                          />
                          <PlayBtnStyled
                            href={`/movie/${item.slug}`}
                            className="lnBtnPlay"
                          ></PlayBtnStyled>
                        </>
                      }
                    >
                      <Meta title={item.name} />
                    </CardStyled>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Flex>
      </Content>
    </>
  );
}

const SwiperStyled = styled(Swiper)`
  max-height: 600px;

  Image {
    display: block;
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
  }
`;

const SwiperThumbStyled = styled(Swiper)`
  max-height: 200px;
  margin-top: 8px;

  img {
    display: block;
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
  }
`;

const TitleDividerStyled = styled(Divider)`
  .ant-divider-inner-text {
    font-size: 24px;
    font-weight: 600;
  }
`;
const CardStyled = styled(Card)`
  .ant-card-cover {
    position: relative;
    img {
      position: relative !important;
      aspect-ratio: 4/3;
      object-fit: cover;
    }
  }
  &:hover .lnBtnPlay {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;
const PlayBtnStyled = styled(Link)`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 60px !important;
  height: 60px;
  background: #c51c41;
  border-radius: 100%;
  opacity: 0;
  transition: all 0.3s ease-out;

  &::before {
    content: "";
    display: block;
    position: relative;
    top: 15px;
    left: 52%;
    transform: translateX(-50%);
    width: 1px;
    height: 1px;
    border-style: solid;
    border-width: 14px 0 14px 24px;
    border-color: transparent transparent transparent #fff;
  }
`;
