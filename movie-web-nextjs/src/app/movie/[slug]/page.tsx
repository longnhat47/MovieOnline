"use client";
import { fetchMovieDetail } from "@/features/movie/movieApi";
import { fecthMovieBySlug } from "@/features/movie/movieSlide";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Flex, Row, Spin, Typography, Layout, Breadcrumb } from "antd";

import StyleLayout from "@/styles/layout.module.scss";
import Link from "next/link";
import { HomeOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Content } = Layout;

export default function MovieDetail({ params }: { params: { slug: string } }) {
  const isLoading = useSelector((state: RootState) => state.movie.isLoading);
  const movie = useSelector((state: RootState) => state.movie.movieDetail);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fecthMovieBySlug(params.slug));
  }, [params.slug, dispatch]);
  return (
    <>
      <Spin spinning={isLoading} tip="Loading...">
        <Content>
          <Flex className={StyleLayout.lnDefaultLayout}>
            <Row className={StyleLayout.lnSection}>
              <Col span={24}>
                {!isLoading && (
                  <>
                    <Breadcrumb
                      items={[
                        {
                          title: (
                            <Link href={"/"}>
                              <HomeOutlined />
                            </Link>
                          ),
                        },
                        {
                          title: (
                            <Link href={`/${movie.category[0].slug}`}>
                              {movie.category[0].name}
                            </Link>
                          ),
                        },
                        {
                          title: movie.name,
                        },
                      ]}
                    />
                    <video width="100%" height="100%" autoPlay controls>
                      <source src={movie.video} type="video/mp4" />
                    </video>
                  </>
                )}
              </Col>
            </Row>
          </Flex>
        </Content>
      </Spin>
    </>
  );
}
