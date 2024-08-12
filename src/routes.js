import React from "react";
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import Doctors from "examples/Icons/Doctors";
import Receptions from "examples/Icons/Receptions";
import Patients from "examples/Icons/Patients";
import { useLocation } from "react-router-dom";
import Patient from "layouts/patient";
import CreatePatient from "layouts/patient/CreatePatient";
import ChatBot from "layouts/interaction";
import CalendarComponent from "layouts/interaction/calender";
import Package from "layouts/package";
import CallHistory from "layouts/CallHistory";

const useRoutes = () => {
  const location = useLocation();
  const { pathname } = location;
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const collapseName = pathname;

  return [
    {
      type: "collapse",
      name: "Dashboard",
      key: "dashboard",
      route: "/dashboard",
      icon: <Shop size="12px" />,
      component: <Dashboard />,
      noCollapse: true,
      isProtected: true,
      isActive: collapseName === "/dashboard",
      isShow: userInfo?.role == "Carehome",
    },
    {
      type: "collapse",
      name: "Patients Management",
      key: "patients",
      noCollapse: true,
      isProtected: true,
      icon: <Patients size="12px" />,
      isActive: collapseName === "/patients" || collapseName === "/create-patients",
      collapse: [
        {
          name: "Patient List",
          key: "patient-list",
          route: "/patients",
          component: <Patient />,
          noCollapse: true,
          isProtected: true,
          isActive: collapseName === "/patients",
        },
        {
          name: "Create Patient",
          key: "create-patient",
          route: "/create-patients",
          component: <CreatePatient />,
          noCollapse: true,
          isProtected: true,
          isActive: collapseName === "/create-patients",
        },
      ],
      isShow: userInfo?.role == "Carehome",
    },
    {
      type: "collapse",
      name: "Patient Interaction",
      key: "chatbot",
      noCollapse: true,
      isProtected: true,
      icon: <Patients size="12px" />,
      isActive: collapseName === "/chatbot" || collapseName === "/call-calender",
      collapse: [
        {
          name: "Chatbot",
          key: "chatbot",
          route: "/chatbot",
          component: <ChatBot />,
          noCollapse: true,
          isProtected: true,
          isActive: collapseName === "/chatbot",
        },
        {
          name: "Call Calender",
          key: "call-calender",
          route: "/call-calender",
          component: <CalendarComponent />,
          noCollapse: true,
          isProtected: true,
          isActive: collapseName === "/call-calender",
        },
      ],
      isShow: userInfo?.role == "Carehome",
    },

    {
      type: "collapse",
      name: "Package",
      key: "package",
      route: "/package",
      icon: <Receptions size="12px" />,
      component: <Package />,
      noCollapse: true,
      isProtected: true,
      isActive: collapseName === "/package",
      isShow: userInfo?.role == "Carehome",
    },
    // {
    //   type: "collapse",
    //   name: "Doctors",
    //   key: "doctors",
    //   route: "/doctors",
    //   icon: <Doctors size="12px" />,
    //   component: <Tables />,
    //   noCollapse: true,
    //   isProtected: true,
    //   isActive: collapseName === "/doctors",
    // },
    // {
    //   type: "collapse",
    //   name: "Appointments",
    //   key: "appointments",
    //   route: "/appointments",
    //   icon: <Cube size="12px" />,
    //   component: <Calender />,
    //   noCollapse: true,
    //   isProtected: true,
    //   isActive: collapseName === "/appointments",
    // },
    // {
    //   type: "collapse",
    //   name: "Payments",
    //   key: "payments",
    //   route: "/payments",
    //   icon: <CreditCard size="12px" />,
    //   component: <Billing />,
    //   noCollapse: true,
    //   isProtected: true,
    //   isActive: collapseName === "/payments",
    // },
    {
      type: "collapse",
      name: "Profile",
      key: "profile",
      route: "/profile",
      icon: <CustomerSupport size="12px" />,
      component: <Profile />,
      noCollapse: true,
      isProtected: true,
      isActive: collapseName === "/profile",
      isShow: userInfo?.role == "Carehome",
    },
    {
      type: "collapse",
      name: "Bot Interaction",
      key: "chatbot",
      route: "/chatbot",
      component: <ChatBot />,
      noCollapse: true,
      isProtected: true,
      icon: <Patients size="12px" />,
      isActive: collapseName === "/chatbot",
      isShow: userInfo?.role == "Patient",
    },
    {
      type: "collapse",
      name: "Call Calender",
      key: "call-history",
      noCollapse: true,
      isProtected: true,
      icon: <Patients size="12px" />,
      isActive: collapseName === "/call-history" || collapseName === "/call-calender",
      collapse: [
        {
          name: "Call History",
          key: "call-history",
          route: "/call-history",
          component: <CallHistory />,
          noCollapse: true,
          isProtected: true,
          isActive: collapseName === "/call-history",
        },
        {
          name: "Call Calender",
          key: "call-calender",
          route: "/call-calender",
          component: <CalendarComponent />,
          noCollapse: true,
          isProtected: true,
          isActive: collapseName === "/call-calender",
        },
      ],
      isShow: userInfo?.role == "Patient" || userInfo?.role == "Family",
    },
    {
      type: "collapse",
      name: "Sign In",
      key: "sign-in",
      route: "/authentication/sign-in",
      icon: <Document size="12px" />,
      component: <SignIn />,
      noCollapse: true,
      isProtected: false,
    },
    {
      type: "collapse",
      name: "Sign Up",
      key: "sign-up",
      route: "/authentication/sign-up",
      icon: <SpaceShip size="12px" />,
      component: <SignUp />,
      noCollapse: true,
      isProtected: false,
    },
  ];
};

export default useRoutes;
