import React from "react";
import Header from "../../components/header";
import CaughtUp from "../../components/caughtUp";

import NotificationTab from "../../components/notificationTab";
const ActivityPage = () => {
  return (
    <div>
      <Header headerTitle="Activity" />
      <CaughtUp />
      <div className="notification-container">
        <div className="flex flex-col mx-3 my-6">
          <div>Done for now</div>
          <NotificationTab />
          <NotificationTab />
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;
