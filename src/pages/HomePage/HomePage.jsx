import React from "react";
import { useSelector } from "react-redux";
import AuthTabsPage from "../AuthTabsPage/AuthTabsPage";
import ReferralsPage from "../ReferralsPage/ReferralsPage";

export default function HomePage() {
  const user = useSelector((state) => state.user);
  const pageToRender = user.email ? <ReferralsPage /> : <AuthTabsPage />;

  return <>{pageToRender}</>;
}
