"use client";
import { ConfigProvider, theme } from "antd";

const themeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    fontSize: 14,
    colorLink: "#c51c41",
  },
  components: {
    Button: {
      colorPrimary: "#c51c41",
      colorPrimaryActive: "#f90036",
      colorPrimaryHover: "#c51c41",
      colorTextLightSolid: "#000",

      primaryColor: "#fff",
    },
    Spin: {
      colorPrimary: "#c51c41",
    },
    Tabs: {
      colorPrimary: "#c51c41",
    },
    Radio: {
      colorPrimary: "#c51c41",
      colorPrimaryActive: "#c51c41",
      colorPrimaryHover: "#c51c41",
      colorTextLightSolid: "#000",
    },
    Menu: {
      horizontalItemHoverColor: "#c51c41",
      horizontalItemSelectedColor: "#c51c41",
    },
  },
};

export default function AntdProvider({ children }: React.PropsWithChildren) {
  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
}
