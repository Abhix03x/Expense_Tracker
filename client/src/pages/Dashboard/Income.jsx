import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import IncomeOverview from '../../components/Income/IncomeOverview.jsx';
import Modal from '../../components/Modal.jsx';
import AddIncomeForm from '../../components/Income/AddIncomeForm.jsx';
import IncomeList from '../../components/Income/IncomeList.jsx';
import toast from "react-hot-toast";
import DeleteAlert from '../../components/DeleteAlert.jsx';
import { useUserAuth } from '../../hooks/useUserAuth.jsx';

const Income = () => {

    useUserAuth();

  const [incomeData,setIncomeData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [openDeleteAlert,setOpenDeleteAlert] = useState({
    show:false,
    data:null,
  });

  const [openAddIncomeModal,setOpenAddIncomeModal] = useState(false);

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
  const HandleAddIncome =async (income) =>{
    const {source,amount,date,icon} = income;

    if(!source.trim()){
      toast.error("source is required");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <=0){
      toast.error("Amount should be a valid number");
      return;
    }

    if(!date){
      toast.error("date is required");
      return;
    }

    try{
      await axiosInstance.post(API_PATHS.INCOME.Add_Income,{
        source,
        amount,
        date,
        icon,
      });
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();
    }catch(error){
      console.error("Error adding Income",
        error.response?.data?.message ||error.message
      );
    }
  };

  //Delete Income
  const deleteIncome = async (id) =>{

    try{
      await axiosInstance.delete(API_PATHS.INCOME.Delete_Income(id));
      setOpenDeleteAlert({show:false,data:null});
      toast.success("Income Deleted successfully");
      fetchIncomeDetails();
    }catch(error){
      console.error("Error Deleting income",
        error.response?.data?.message|| error.message
      );
    }

  };

  //handle income download details
  const handleDownloadIncomeDetails = async () =>{
      try{
        const response = await axiosInstance.get(API_PATHS.INCOME.Download_Income,{
          responseType:"blob",
          timeout:30000,
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download","income_details.xlsx");
        document.body.appendChild(link);
        link.click()
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      }catch(error){
        console.error("Error downloading income details",error);
        toast.error("failed to download income details..Please try again");
      }
  };

  useEffect(() =>{
    fetchIncomeDetails();
  },[]);

  return (
    <div>
      <DashboardLayout activeMenu="Income">
        <div className='my-5 mx-auto'>
          <div className='grid grid-cols-1 gap-6'>
            <div className=''>
              <IncomeOverview
                transaction = {incomeData}
                onAddIncome={()=>setOpenAddIncomeModal(true)}
              />
            </div>
            <IncomeList
              transactions ={incomeData}
              onDelete ={(id) =>{
                setOpenDeleteAlert({show:true,data:id});
              }}
              onDownload={handleDownloadIncomeDetails}
            />
          </div>
          <Modal 
            isOpen={openAddIncomeModal}
            onClose={()=> setOpenAddIncomeModal(false)}
            title="Add Income"
          >
            <AddIncomeForm onAddIncome={HandleAddIncome}/>
          </Modal>

          <Modal
            isOpen={openDeleteAlert.show}
            onClose={()=>setOpenDeleteAlert({show:false,data:null})}
            title="Delete Income"
          >
            <DeleteAlert
              content="Are you sure you want to delete this income detail"
              onDelete={()=>deleteIncome(openDeleteAlert.data)}
            />
          </Modal>
        </div>
      </DashboardLayout>
    </div>
  )
}

export default Income;
