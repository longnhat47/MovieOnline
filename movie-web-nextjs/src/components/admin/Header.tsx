"use client";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Flex, Menu, Avatar, Modal, Dropdown, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { fetchCategory } from "@/features/category/categorySlide";

import HeaderStyle from "@/styles/header.module.scss";
import LayoutStyle from "@/styles/layout.module.scss";
import { fetchCountry } from "@/features/country/countrySlide";
import { logout } from "@/features/user/userSlide";

const { Header } = Layout;

export default function HeaderComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userInfo = useSelector((state: RootState) => state.user.user);
  const isLoading = useSelector((state: RootState) => state.category.isLoading);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const countries = useSelector((state: RootState) => state.country.countries);

  const handleLogout = () => {
    dispatch(logout());
  };

  const dispatch = useDispatch<AppDispatch>();

  const items: MenuProps["items"] = [
    {
      key: "/profile",
      label: <Link href={"/profile"}>Profile</Link>,
    },
    {
      key: "/logout",
      label: (
        <Link href={"#"} onClick={handleLogout}>
          Logout
        </Link>
      ),
    },
  ];
  if (userInfo?.is_superuser) {
    items.splice(0, 0, {
      key: "/admin",
      label: <Link href={"/admin"}>Admin</Link>,
    });
  }
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
                      key: "/movie",
                      label: <Link href="/admin/movie">Phim</Link>,
                    },
                    {
                      key: "/category",
                      label: <Link href="/admin/category">Danh mục</Link>,
                    },
                    {
                      key: "/country",
                      label: <Link href="/admin/country">Quốc gia</Link>,
                    },
                    {
                      key: "/comment",
                      label: <Link href="/admin/comment">Bình luận</Link>,
                    },
                    {
                      key: "/user",
                      label: <Link href="/admin/user">Người dùng</Link>,
                    },
                  ]}
                  mode="horizontal"
                  className={HeaderStyle.lnMenu}
                ></MenuStyled>
              )}
            </div>
            <Dropdown
              menu={{ items }}
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
            >
              <Avatar size={44} icon={<UserOutlined />} />
            </Dropdown>
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
