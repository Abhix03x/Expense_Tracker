import React from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useEffect } from 'react';
import InfoCard from '../../components/Card/InfoCard';
import {IoMdCard} from "react-icons/io";
import { LuHandCoins,LuWalletMinimal } from 'react-icons/lu';
import { addThousandsSeperator } from '../../utils/Helper';
import RecentTransaction from '../../components/Dashboard/RecentTransaction';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';

const Home = () => {

  useUserAuth();

  const navigate =useNavigate();

  const [dashboardData,setDashboardData] =useState(null);
  const [loading,setLoading]  = useState(false);

  const fetchDashboardData = async () =>{
    if(loading) return;

    setLoading(false);

    try{
      const response = await axiosInstance.get(`${API_PATHS.DashBoard.Get_Data}`);
      
      if(response.data){
        setDashboardData(response.data);
      }
    }catch(error){
      console.error("something went wrong ... please try again",error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchDashboardData();
  },[])

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        {/* <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
          icon={<IoMdCard/>}
          label="Total Balance"
          value={addThousandsSeperator(dashboardData?.totalBalance)}
          color="bg-purple-600"
          />
          <InfoCard
          icon={<LuWalletMinimal/>}
          label="Total Income"
          value={addThousandsSeperator(dashboardData?.totalIncome)}
          color="bg-green-600"
          />
          <InfoCard
          icon={<LuHandCoins/>}
          label="Total Expense"
          value={addThousandsSeperator(dashboardData?.totalExpenses)}
          color="bg-red-600"
          />
        </div> */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransaction
            transactions = {dashboardData?.recentTransactions}
            onSeeMore={() =>navigate("/expense")}
          />
          <FinanceOverview
          totalBalance={dashboardData?.totalBalance}
          totalIncome={dashboardData?.totalIncome}
          totalExpense={dashboardData?.totalExpenses}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home;
