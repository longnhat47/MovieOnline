"use client";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import Title from "antd/es/typography/Title";
import { UserOutlined } from "@ant-design/icons";
import {
  Layout,
  Flex,
  Menu,
  Avatar,
  Modal,
  Input,
  Form,
  Button,
  Dropdown,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { fetchCategory } from "@/features/category/categorySlide";
import { fetchCountry } from "@/features/country/countrySlide";
import { login, logout } from "@/features/user/userSlide";
import type { MenuProps } from "antd";
import HeaderStyle from "@/styles/header.module.scss";
import LayoutStyle from "@/styles/layout.module.scss";

const { Header } = Layout;

type FieldType = {
  username?: string;
  password?: string;
};

export default function HeaderComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const userInfo = useSelector((state: RootState) => state.user.user);
  const countries = useSelector((state: RootState) => state.country.countries);
  const isLoading = useSelector((state: RootState) => state.category.isLoading);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const dispatch = useDispatch<AppDispatch>();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    dispatch(
      login({
        email: emailLogin,
        password: passwordLogin,
      })
    );
    setIsModalOpen(false);
  };
  const handleLogout = () => {
    dispatch(logout());
  };

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
            {userInfo?.id ? (
              <Dropdown
                menu={{ items }}
                placement="bottomRight"
                arrow={{ pointAtCenter: true }}
              >
                <Avatar size={44} icon={<UserOutlined />} />
              </Dropdown>
            ) : (
              <Button type="primary" shape="round" onClick={showModal}>
                Login
              </Button>
            )}
          </Flex>
        </Flex>
      </HeaderStyled>
      <Modal open={isModalOpen} footer={null} onCancel={hideModal}>
        <Title>LOGIN</Title>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              type="email"
              placeholder="Email của bạn"
              onChange={(e) => setEmailLogin(e.target.value)}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              onChange={(e) => setPasswordLogin(e.target.value)}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" onClick={handleLogin}>
              Login
            </Button>
          </Form.Item>
        </Form>
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
