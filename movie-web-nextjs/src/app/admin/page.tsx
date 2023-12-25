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
export default function AdminPage() {
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
            <Col span={24}>
              <TitleDividerStyled orientation="left" orientationMargin="0">
                Quản lý
              </TitleDividerStyled>
              <Row gutter={[16, 24]}>
                <Col xs={24} sm={12} md={8} lg={8}>
                  <LinkStyled href={"/admin/movie"}>
                    <Image
                      src="/images/cinema.png"
                      alt="movie"
                      fill
                      sizes="100%"
                    />
                    <span>PHIM</span>
                  </LinkStyled>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8}>
                  <LinkStyled href={"/admin/category"}>
                    <Image
                      src="/images/options.png"
                      alt="category"
                      fill
                      sizes="100%"
                    />
                    <span>DANH MỤC</span>
                  </LinkStyled>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8}>
                  <LinkStyled href={"/admin/country"}>
                    <Image
                      src="/images/coronavirus.png"
                      alt="country"
                      fill
                      sizes="100%"
                    />
                    <span>QUỐC GIA</span>
                  </LinkStyled>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8}>
                  <LinkStyled href={"/admin/comment"}>
                    <Image
                      src="/images/comments.png"
                      alt="comment"
                      fill
                      sizes="100%"
                    />
                    <span>BÌNH LUẬN</span>
                  </LinkStyled>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8}>
                  <LinkStyled href={"/admin/user"}>
                    <Image
                      src="/images/group.png"
                      alt="user"
                      fill
                      sizes="100%"
                    />
                    <span>USER</span>
                  </LinkStyled>
                </Col>
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
const LinkStyled = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background-color: #c51c41;
  border-radius: 10px;

  img {
    position: relative !important;
    max-width: 64px;
  }
  span {
    font-size: 24px;
  }
`;
