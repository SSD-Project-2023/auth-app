import React from "react";
import { Tabs } from "antd";
import { QuestionCircleFilled, ToolFilled } from "@ant-design/icons";
import "../styles/TabContainer.css";
import Actions from "./Actions";
import EvaluationHistory from "./EvaluationHistory";
import { useNavigate } from "react-router-dom";
const { TabPane } = Tabs;

const EvaluateDocuments = () => {
  const history = useNavigate();

  const handleTabClick = (key) => history(`${location.pathname}?tab=${key}`);
  return (
    <div className="card-container">
      <Tabs type="card" onChange={handleTabClick} >
        <TabPane
          tab={
            <>
              <ToolFilled /> Actions
            </>
          }
          key="actions"
        >
          <Actions />
        </TabPane>
        <TabPane
          tab={
            <>
              <QuestionCircleFilled /> Evaluation History
            </>
          }
          key="history"
        >
          <EvaluationHistory />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default EvaluateDocuments;
