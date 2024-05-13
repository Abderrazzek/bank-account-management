import React from "react";

import SidebarWithHeader from "./components/sidebar";
import AccountDetails from "layouts/accountDetails";

const App = () => {
  return (
    <div className="App">
      <SidebarWithHeader>
        {/* <Accounts /> */}
        <AccountDetails />
      </SidebarWithHeader>
    </div>
  );
};

export default App;
