import React from "react";
import { Table } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../constant";
import moment from "moment";
const columns = [
  {
    title: "Documant Name",
    dataIndex: "docName",
    key: "1",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Submitted By",
    dataIndex: "submittedBy",
    key: "2",
  },
  {
    title: "Evaluated By",
    dataIndex: "evaluatedBy",
    key: "3",
    render: (_, record) => (
      <span>
        {localStorage.getItem("email") === record?.evaluatedBy
          ? "You"
          : record?.evaluatedBy}
      </span>
    ),
  },
  {
    title: "Date Evaluated",
    key: "4",
    dataIndex: "date",
    render: (_, record) => (
      <span>{moment(record?.date).format("DD MMMM, YYYY")}</span>
    ),
  },
  {
    title: "Comment",
    key: "5",
    dataIndex: "comment",
  },
  {
    title: "Rating",
    key: "6",
    dataIndex: "rate",
    render: (_, record) => <span>{record?.rate}/10</span>,
  },
  {
    title: "Status",
    key: "status",
    key: "7",
    render: (_, record) => <span className="status">{record?.status}</span>,
  },
];
const EvaluationHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const search = window.location.search;

  useEffect(() => {
    (async () =>
      await axios
        .get(`${BACKEND_BASE_URL}/evaluation-history/getHistory`)
        .then((res) => {
          setData(res?.data);
          setLoading(false);
        }))();
  }, [search]);
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        scroll={{ x: "max-content" }}
      />
    </>
  );
};

export default EvaluationHistory;
