"use client";

import styled from "styled-components";
import Title from "antd/es/typography/Title";
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
import StyleLayout from "@/styles/layout.module.scss";
import {
  addCountry,
  removeCountry,
  updateCountry,
} from "@/features/country/countrySlide";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { CountryType } from "@/types/countryType";
import { fetchCountry } from "@/features/country/countrySlide";

const { Meta } = Card;
const { Column } = Table;

export default function CountryManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataInput, setDataInput] = useState<CountryType>({});
  const [controlName, setControlName] = useState("");

  const isLoading = useSelector((state: RootState) => state.country.isLoading);
  const countries = useSelector((state: RootState) => state.country.countries);
  const dispatch = useDispatch<AppDispatch>();
  const data: CountryType[] = countries;

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
  const updateData = (data?: CountryType) => {
    showModal();
    setControlName("UPDATE");
    if (data) setDataInput(data);
  };
  const deleteData = (data?: CountryType) => {
    if (data) setDataInput(data);
  };

  const handleAddData = () => {
    dispatch(addCountry({ name: dataInput.name }));
    setIsModalOpen(false);
  };
  const handleUpdate = () => {
    dispatch(updateCountry(dataInput));
    setIsModalOpen(false);
  };
  const handleDelete = () => {
    dispatch(removeCountry({ id: dataInput.id }));
  };

  useEffect(() => {
    dispatch(fetchCountry());
  }, [dispatch]);

  return (
    <>
      <Content>
        <Flex className={StyleLayout.lnDefaultLayout}>
          <Row className={StyleLayout.lnSection}>
            <Col span={24}>
              <TitleDividerStyled orientation="left" orientationMargin="0">
                Quản lý quốc gia
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
                        render={(_: any, record: CountryType) => (
                          <Space size="middle">
                            <Button onClick={() => updateData(record)}>
                              <EditOutlined />
                              Edit
                            </Button>
                            <Popconfirm
                              placement="topRight"
                              title={`Are you sure to delete this country: ${record.name}?`}
                              description={"Delete this country"}
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
              placeholder="Tên quốc gia"
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
