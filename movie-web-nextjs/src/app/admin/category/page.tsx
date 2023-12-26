"use client";

import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Col,
  Divider,
  Flex,
  Row,
  Card,
  Table,
  Button,
  Modal,
  Input,
  Space,
  Spin,
  Popconfirm,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import type { ColumnsType } from "antd/es/table";
import StyleLayout from "@/styles/layout.module.scss";
import {
  addCategory,
  fetchCategory,
  removeCategory,
  updateCategory,
} from "@/features/category/categorySlide";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { CategoryType } from "@/types/categoryType";

const { Meta } = Card;
const { Column } = Table;

export default function CategoryManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataInput, setDataInput] = useState<CategoryType>({});
  const [controlName, setControlName] = useState("");

  const isLoading = useSelector((state: RootState) => state.category.isLoading);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const dispatch = useDispatch<AppDispatch>();
  const data: CategoryType[] = categories;

  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };
  const addData = () => {
    showModal();
    setControlName("ADD");
  };
  const updateData = (data?: CategoryType) => {
    showModal();
    setControlName("UPDATE");
    if (data) setDataInput(data);
  };
  const deleteData = (data?: CategoryType) => {
    if (data) setDataInput(data);
  };

  const handleAddData = () => {
    dispatch(addCategory({ name: dataInput.name }));
    setIsModalOpen(false);
  };
  const handleUpdate = () => {
    dispatch(updateCategory(dataInput));
    setIsModalOpen(false);
  };
  const handleDelete = () => {
    dispatch(removeCategory({ id: dataInput.id }));
  };

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  return (
    <>
      <Content>
        <Flex className={StyleLayout.lnDefaultLayout}>
          <Row className={StyleLayout.lnSection}>
            <Col span={24}>
              <TitleDividerStyled orientation="left" orientationMargin="0">
                Quản lý danh mục
              </TitleDividerStyled>

              <Row gutter={[16, 12]}>
                <Col span={24}>
                  <Button type="primary" onClick={addData}>
                    <PlusCircleOutlined />
                    Thêm mới
                  </Button>
                </Col>
                <Col span={24}>
                  <Spin spinning={isLoading} tip={"Loading"}>
                    <Table dataSource={data} rowKey={"id"}>
                      <Column title="ID" dataIndex="id" key="id" />
                      <Column title="Name" dataIndex="name" key="name" />
                      <Column title="Slug" dataIndex="slug" key="slug" />
                      <Column
                        title="Action"
                        key="action"
                        render={(_: any, record: CategoryType) => (
                          <Space size="middle">
                            <Button onClick={() => updateData(record)}>
                              <EditOutlined />
                              Edit
                            </Button>
                            <Popconfirm
                              placement="topRight"
                              title={`Are you sure to delete this category: ${record.name}?`}
                              description={"Delete this category"}
                              okText="Yes"
                              cancelText="No"
                              icon={
                                <QuestionCircleOutlined
                                  style={{ color: "red" }}
                                />
                              }
                              onConfirm={() => {
                                handleDelete();
                              }}
                            >
                              <Button danger onClick={() => deleteData(record)}>
                                <DeleteOutlined />
                                Delete
                              </Button>
                            </Popconfirm>
                          </Space>
                        )}
                      />
                    </Table>
                  </Spin>
                </Col>
              </Row>
            </Col>
          </Row>
        </Flex>
      </Content>
      <Modal open={isModalOpen} footer={null} onCancel={hideModal}>
        <Title>{controlName}</Title>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Spin spinning={isLoading} tip={"Loading"}>
            <Input
              type="text"
              placeholder="Tên danh mục"
              onChange={(e) =>
                setDataInput({ ...dataInput, name: e.target.value })
              }
              value={dataInput.name}
            />
          </Spin>
          {controlName == "ADD" ? (
            <Button type="primary" onClick={handleAddData}>
              Add
            </Button>
          ) : (
            <Button type="primary" onClick={handleUpdate}>
              Update
            </Button>
          )}
        </Space>
      </Modal>
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
