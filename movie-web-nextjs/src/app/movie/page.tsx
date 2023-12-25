"use client";

import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Col, Divider, Flex, Row, Card } from "antd";
import { Content } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { fecthAllMovie } from "@/features/movie/movieSlide";
import { AppDispatch, RootState } from "@/lib/store";

import StyleLayout from "@/styles/layout.module.scss";
import HeaderComponent from "@/components/HeaderComponent";

const { Meta } = Card;
export default function MovieComponent() {
  const movies = useSelector((state: RootState) => state.movie.movies);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fecthAllMovie());
  }, [dispatch]);

  return (
    <>
      <HeaderComponent />
      <Content>
        <Flex className={StyleLayout.lnDefaultLayout}>
          <Row className={StyleLayout.lnSection}>
            <Col span={24}>
              <TitleDividerStyled orientation="left" orientationMargin="0">
                Tất cả phim
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
