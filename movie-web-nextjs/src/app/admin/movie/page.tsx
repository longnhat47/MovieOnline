"use client";

import styled from "styled-components";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import moment from "moment";
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
  addMovie,
  removeMovie,
  updateMovie,
} from "@/features/movie/movieSlide";
import {
  CheckCircleOutlined,
  CheckCircleTwoTone,
  CloseCircleOutlined,
  CloseCircleTwoTone,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { fecthAllMovie } from "@/features/movie/movieSlide";
import { MovieType } from "@/types/movieTypes";
import { fetchCategory } from "@/features/category/categorySlide";
import { fetchCountry } from "@/features/country/countrySlide";

const { Meta } = Card;
const { Column } = Table;

export default function MovieManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataInput, setDataInput] = useState<MovieType>({});
  const [controlName, setControlName] = useState("");

  const isLoading = useSelector((state: RootState) => state.movie.isLoading);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const countries = useSelector((state: RootState) => state.country.countries);
  const movies = useSelector((state: RootState) => state.movie.movies);
  const dispatch = useDispatch<AppDispatch>();
  const data: MovieType[] = movies;

  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };
  const getCatName = (id: any) => {
    let catName: any = "T";
    categories.forEach((item) => {
      if (item.id == id) catName = item.name;
    });

    return catName;
  };
  const getCountryName = (id: any) => {
    let counName: any = "T";
    countries.forEach((item) => {
      if (item.id == id) counName = item.name;
    });

    return counName;
  };
  const addData = () => {
    showModal();
    setControlName("ADD");
  };
  const updateData = (data?: MovieType) => {
    showModal();
    setControlName("UPDATE");
    if (data) setDataInput(data);
  };
  const deleteData = (data?: MovieType) => {
    if (data) setDataInput(data);
  };

  const handleAddData = () => {
    dispatch(addMovie({ name: dataInput.name }));
    setIsModalOpen(false);
  };
  const handleUpdate = () => {
    dispatch(updateMovie(dataInput));
    setIsModalOpen(false);
  };
  const handleDelete = () => {
    dispatch(removeMovie({ id: dataInput.id }));
  };

  useEffect(() => {
    dispatch(fecthAllMovie());
    dispatch(fetchCategory());
    dispatch(fetchCountry());
  }, [dispatch]);

  return (
    <>
      <Content>
        <Flex className={StyleLayout.lnDefaultLayout}>
          <Row className={StyleLayout.lnSection}>
            <Col span={24}>
              <TitleDividerStyled orientation="left" orientationMargin="0">
                Quản lý phim
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
                      <Column
                        title="Thumnail"
                        key="thumbnail"
                        render={(_: any, record: MovieType) => (
                          <Image
                            src={record.thumbnail}
                            alt={record.name}
                            fill
                            sizes="100%"
                          />
                        )}
                      />
                      <Column title="Name" dataIndex="name" key="name" />
                      <Column
                        title="Category"
                        key="category"
                        render={(_: any, record: MovieType) => (
                          <div>{getCatName(record.category)}</div>
                        )}
                      />
                      <Column
                        title="Country"
                        key="country"
                        render={(_: any, record: MovieType) => (
                          <div>{getCountryName(record.country)}</div>
                        )}
                      />
                      <Column
                        title="Create at"
                        key="created_at"
                        render={(_: any, record: MovieType) =>
                          moment(record.created_at).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )
                        }
                      />
                      <Column title="View" dataIndex="views" key="views" />
                      <Column
                        title="Status"
                        key="status"
                        render={(_: any, record: MovieType) =>
                          record.status ? (
                            <CheckCircleTwoTone twoToneColor="#52c41a" />
                          ) : (
                            <CloseCircleTwoTone twoToneColor="#c41a1a" />
                          )
                        }
                      />
                      <Column
                        title="Action"
                        key="action"
                        render={(_: any, record: MovieType) => (
                          <Space size="middle">
                            <Button onClick={() => updateData(record)}>
                              <EditOutlined />
                              Edit
                            </Button>
                            <Popconfirm
                              placement="topRight"
                              title={`Are you sure to delete this Movie: ${record.name}?`}
                              description={"Delete this Movie"}
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
