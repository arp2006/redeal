import React from "react";
import SettingsSidebar from "../components/settings/SettingsSidebar";
import Settings from "../components/settings/Settings";
import { useParams } from "react-router-dom";

function SettingsPage(){
  const { page } = useParams();
  return(
    <div className="mx-auto w-full max-w-7xl py-2">
      <div className="flex flex-col gap-8 md:flex-row">
        <SettingsSidebar />
        <Settings pg={page}/>
      </div>
    </div>
  );
}

export default SettingsPage;
