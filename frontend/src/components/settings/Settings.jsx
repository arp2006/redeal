import React from "react";
// import { AuthContext } from "../../AuthContext";
import Contact from "../../pages/Contact";
import AccountSettings from "./AccountSettings";
import SecuritySettings from "./SecuritySettings";
import AppearanceSettings from "./AppearanceSettings";
import { useNavigate } from "react-router-dom";
import NotFound from "../../pages/NotFound"

function Settings({ pg }) {
  const navigate = useNavigate();
  // const [darkMode, setDarkMode] = useState(false);
  // const toggleDarkMode = () => {
  //   document.documentElement.classList.toggle("dark");
  //   setDarkMode(!darkMode);
  // };
  const allowed = ["account", "security", "support", "appearance"];
  if (!allowed.includes(pg)) {
    return <NotFound />;
  }

  if (pg === "account") {
    return (<AccountSettings />);
  }
  else if (pg === "security") {
    return (<SecuritySettings />);
  }
  else if (pg == "appearance") {
    return (<AppearanceSettings />);
  }
  else if (pg === "support") {
    return (<div className="flex-1 flex flex-col gap-8 min-w-0"><Contact /></div>);
  }
  else {
    navigate("/settings/account");
  }
}

export default Settings;
