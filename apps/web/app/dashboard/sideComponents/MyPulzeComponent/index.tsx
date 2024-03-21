import React from "react";
import Header from "../../components/header";
import CaughtUp from "../../components/caughtUp";
import NotificationTab from "../../components/notificationTab";

const ActivityPage = () => {
  return (
    <div>
      <Header headerTitle="My Pulzes" />
      <div className="notification-container">
        <div className="flex flex-col mx-3 my-6">
          <div>Open</div>
          <NotificationTab />
          <NotificationTab />
        </div>
      </div>
      <div className="notification-container">
        <div className="flex flex-col mx-3 my-6">
          <div>Closed</div>
          <NotificationTab />
          <NotificationTab />
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;
