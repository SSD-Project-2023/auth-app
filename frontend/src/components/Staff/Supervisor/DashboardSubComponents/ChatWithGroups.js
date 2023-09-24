import { Button, Input, Space, Table, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import { BACKEND_BASE_URL } from "../../../constant";

const ChatWithGroups = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <>
          <Highlighter
            highlightStyle={{
              backgroundColor: "#ffc069",
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
          <span>
            <Link
              to={`/v1/${localStorage.getItem("type")}/${localStorage.getItem(
                "username"
              )}/chat/${text}`}
            >
              Click To View
            </Link>
          </span>
        </>
      ) : (
        <Link
          to={`/v1/${localStorage.getItem("type")}/${localStorage.getItem(
            "username"
          )}/chat/${text}`}
        >
          {text}
        </Link>
      ),
  });

  useEffect(() => {
    (async () =>
      await axios
        .get(`${BACKEND_BASE_URL}/student-group/getGroups`)
        .then((res) => {
          setData(res?.data);
          setLoading(false);
        }))();
  }, []);

  const columns = [
    {
      title: "Group Name",
      dataIndex: "group_name",
      key: "name",
      defaultSortOrder: "descend",
      ...getColumnSearchProps("group_name"),
    },
    {
      title: "Student 01",
      dataIndex: "member1_Name",
      key: "s1",
      render: (_, record) => (
        <>
          <span>{record?.member1_Name}</span>
          <br />
          <span style={{ color: "gray" }}>
            <u>
              <i>{record?.member1_Email}</i>
            </u>
          </span>
        </>
      ),
    },
    {
      title: "Student 02",
      dataIndex: "member2_Name",
      key: "s2",
      render: (_, record) => (
        <>
          <span>{record?.member2_Name}</span>
          <br />
          <span style={{ color: "gray" }}>
            <u>
              <i>{record?.member2_Email}</i>
            </u>
          </span>
        </>
      ),
    },
    {
      title: "Student 03",
      dataIndex: "member3_Name",
      key: "s3",
      render: (_, record) => (
        <>
          <span>{record?.member3_Name}</span>
          <br />
          <span style={{ color: "gray" }}>
            <u>
              <i>{record?.member3_Email}</i>
            </u>
          </span>
        </>
      ),
    },
    {
      title: "Student 04",
      dataIndex: "member4_Name",
      key: "s4",
      render: (_, record) => (
        <>
          <span>{record?.member4_Name}</span>
          <br />
          <span style={{ color: "gray" }}>
            <u>
              <i>{record?.member4_Email}</i>
            </u>
          </span>
        </>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{ x: "max-content" }}
      loading={loading}
    />
  );
};

export default ChatWithGroups;
