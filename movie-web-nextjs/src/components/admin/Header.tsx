"use client";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Flex, Menu, Avatar, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { fetchCategory } from "@/features/category/categorySlide";

import HeaderStyle from "@/styles/header.module.scss";
import LayoutStyle from "@/styles/layout.module.scss";
import { fetchCountry } from "@/features/country/countrySlide";

const { Header } = Layout;

export default function HeaderComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
                      key: "/movie",
                      label: <Link href="/">Phim</Link>,
                    },
                    {
                      key: "/category",
                      label: <Link href="/admin/category">Danh mục</Link>,
                    },
                    {
                      key: "/country",
                      label: <Link href="/">Quốc gia</Link>,
                    },
                    {
                      key: "/comment",
                      label: <Link href="/">Bình luận</Link>,
                    },
                    {
                      key: "/user",
                      label: <Link href="/">Người dùng</Link>,
                    },
                  ]}
                  mode="horizontal"
                  className={HeaderStyle.lnMenu}
                ></MenuStyled>
              )}
            </div>
            <Avatar size={44} icon={<UserOutlined />} onClick={showModal} />
          </Flex>
        </Flex>
      </HeaderStyled>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
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
