"use client"
import { UserOutlined } from '@ant-design/icons';
import { Layout, Flex, Menu, Button, Avatar } from 'antd';
import styled from 'styled-components';
const { Header } = Layout;

import HeaderStyle from '@/styles/header.module.scss'
import LayoutStyle from '@/styles/layout.module.scss'
import Link from 'next/link';


type MenuType = {
    key: string,
    label: any,
    icon?: string
    children?: MenuType[]
}

const menuItem: MenuType[] = [
    {
        key: '/',
        label: <Link href='/'>Home</Link>,
    },
    {
        key: '/danh-muc',
        label: <Link href="/danh-muc">Thể loại</Link>,
        children: [
            {
                label: 'Option 1',
                key: 'danh-muc-1',
            },
            {
                label: 'Option 2',
                key: 'danh-muc-2',
            }
        ]
    },
    {
        key: '/quoc-gia',
        label: <Link href="/quoc-gia">Quốc gia</Link>,
        children: [
            {
                label: 'Option 1',
                key: 'my',
            },
            {
                label: 'Option 2',
                key: 'viet-nam',
            }
        ]
    }
]



export default function HeaderComponent() {
    return (
        <>
            <HeaderStyled className={HeaderStyle.lnHeader}>
                <Flex className={LayoutStyle.lnDefaultLayout}>
                    <Flex align='center' className={HeaderStyle.lnHeaderInner}>
                        <LogoStyled>
                            <Link href={'/'}>
                                <img src="/next.svg" alt="logo" />
                            </Link>
                        </LogoStyled>
                        <div className={HeaderStyle.lnMenuWrapper}>
                            <MenuStyled
                                items={menuItem}
                                mode="horizontal"
                                className={HeaderStyle.lnMenu}
                            ></MenuStyled>
                        </div>
                        <Link href={'/login'}><Avatar size={44} icon={<UserOutlined />} /></Link>
                    </Flex>
                </Flex>
            </HeaderStyled>
        </>
    );
}

const HeaderStyled = styled(Header)`
    padding: 0;
`

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
`
const MenuStyled = styled(Menu)`
    flex: 1;
`