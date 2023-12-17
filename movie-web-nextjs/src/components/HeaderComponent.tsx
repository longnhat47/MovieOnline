"use client";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Flex, Menu, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { fetchCategory } from "@/features/category/categorySlide";

import HeaderStyle from "@/styles/header.module.scss";
import LayoutStyle from "@/styles/layout.module.scss";
import { fetchCountry } from "@/features/country/countrySlide";

const { Header } = Layout;

export default function HeaderComponent() {
  const isLoading = useSelector((state: RootState) => state.category.isLoading);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const countries = useSelector((state: RootState) => state.country.countries);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchCountry());
  }, [dispatch]);

  return (
    <>
      <HeaderStyled className={HeaderStyle.lnHeader}>
        <Flex className={LayoutStyle.lnDefaultLayout}>
          <Flex align="center" className={HeaderStyle.lnHeaderInner}>
            <LogoStyled>
              <Link href={"/"}>
                <Image src="/next.svg" alt="logo" width={200} height={70} />
              </Link>
            </LogoStyled>
            <div className={HeaderStyle.lnMenuWrapper}>
              {!isLoading && (
                <MenuStyled
                  items={[
                    {
                      key: "/",
                      label: <Link href="/">Home</Link>,
                    },
                    {
                      key: "/danh-muc",
                      label: <Link href="/danh-muc">Thể loại</Link>,
                      children: categories.map((item, index) => {
                        return {
                          label: (
                            <Link href={`/${item.slug}`}>{item.name}</Link>
                          ),
                          key: item.slug,
                        };
                      }),
                    },
                    {
                      key: "/quoc-gia",
                      label: <Link href="/quoc-gia">Quốc gia</Link>,
                      children: countries.map((item, index) => {
                        return {
                          label: (
                            <Link href={`/${item.slug}`}>{item.name}</Link>
                          ),
                          key: item.slug,
                        };
                      }),
                    },
                  ]}
                  mode="horizontal"
                  className={HeaderStyle.lnMenu}
                ></MenuStyled>
              )}
            </div>
            <Link href={"/login"}>
              <Avatar size={44} icon={<UserOutlined />} />
            </Link>
          </Flex>
        </Flex>
      </HeaderStyled>
    </>
  );
}

const HeaderStyled = styled(Header)`
  padding: 0;
`;

const LogoStyled = styled.div`
  max-width: 200px;
  margin-right: 24px;
  a {
    display: flex;
    align-items: center;
    img {
      height: 100%;
      width: 100%;
    }
  }
`;
const MenuStyled = styled(Menu)`
  flex: 1;
`;
