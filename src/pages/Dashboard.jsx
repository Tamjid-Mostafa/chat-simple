import { useEffect, useState } from "react"
import Chatbot from "../components/Chatbot"
import DashboardC from "../components/Dashboard"
import "../styles/dashboard.css"
import { useSelector } from "react-redux"
import Sidebar from "../components/Sidebar/Sidebar"

const Dashboard = () => {
  const [dashboardTab, setDashboardTab] = useState(1)
  const [isExpand, setIsExpand] = useState(true);

  const changeDashboardTab = (tab) => {
    setDashboardTab(tab)
  }
  // const { loading, user } = useSelector((state) => {
  //   return state.user
  // })
  let user = {
    active_chatbot_count: 0,
    email: "admin@localhost5.com",
    first_name: "John1",
    last_name: "Smith",
    login_type: "LoginType.GOOGLE",
    plan: "none",
    timezone: "UTC",
    user_fb_id: "none",
    user_id: "1124",
    user_type: "UserType.USER"
  }


  return (
    <div className="flex w-[100vw] relative">
      <div className={`fixed bg-surface_dark h-full z-50 transition-all duration-700 ${!isExpand ? 'w-20' : 'w-[300px]'}`}>
        <Sidebar
          setIsExpand={setIsExpand}
          isExpand={isExpand}
          changeDashboardTab={changeDashboardTab} />
      </div>
      <div className={`${!isExpand ? 'pl-20' : 'ml-[300px]'} transition-all duration-700 w-full relative`}>
        {dashboardTab === 1 && <div className="dashboard_tab_container"><DashboardC user={user} /></div>}
        {dashboardTab === 2 && <div className="dashboard_tab_container"><Chatbot user={user} /></div>}
      </div>
    </div>
  )
}

export default Dashboard