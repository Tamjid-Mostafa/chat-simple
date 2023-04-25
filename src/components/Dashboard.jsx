import React, { useEffect } from 'react'
import HomePageV2 from './HomePage/HomePageV2'

const DashboardC = ({ user: userData }) => {
  const [dashboardTab, setDashboardTab] = React.useState(2)
  // const { loading, user: userData} = useSelector((state)=> {
  //   return state.auth
  // })
  // useEffect(()=> {
  //   if(!loading && !userData) {
  //     // window.alert("Please login to continue")
  //   } else{
  //   }
  // }, [userData, loading])
  const changeDashboardTab = (tab) => {
    setDashboardTab(tab)
  }
  //
  return (
    <>

      {dashboardTab === 2 && <HomePageV2 changeDashboardTab={changeDashboardTab} user={userData} />}

    </>
  )
}

export default DashboardC