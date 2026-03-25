import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import IncomeOverview from '../../components/Income/IncomeOverview.jsx';
import Modal from '../../components/Modal.jsx';

const Income = () => {

  const [incomeData,setIncomeData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [openDeleteAlert,setOpenDeleteAlert] = useState({
    show:false,
    data:null,
  });

  const [openAddIncomeModal,setOpenAddIncomeModal] = useState(true);

  //Get All Income Detail
  const fetchIncomeDetails = async () =>{
    if(loading) return;

    setLoading(true);
    try{
      const response = await axiosInstance.get(`${API_PATHS.INCOME.Get_All_Income}`);
      // console.log("income response:", response.data);

      if(response.data){
        setIncomeData(response.data);
      }
    }catch(error){
      console.log("something went wrong...please try again",error);
    }
    finally{
      setLoading(false);
    }
  };

  //handle add income
  const HandleAddIncome =async (income) =>{};

  //Delete Income
  const deleteIncome = async (id) =>{};

  //handle income download details
  const handleDownloadIncomeDetails = async () =>{};

  useEffect(() =>{
    fetchIncomeDetails();
  },[]);

  return (
    <div>
      <DashboardLayout activeMenu="Dashboard">
        <div className='my-5 mx-auto'>
          <div className='grid grid-cols-1 gap-6'>
            <div className=''>
              <IncomeOverview
                transaction = {incomeData}
                onAddIncome={()=>setOpenAddIncomeModal(true)}
              />
            </div>
          </div>
          <Modal 
            isOpen={openAddIncomeModal}
            onClose={()=> setOpenAddIncomeModal(false)}
            title="Add Income"
          >
            <div>Add Income </div>
          </Modal>
        </div>
      </DashboardLayout>
    </div>
  )
}

export default Income;
