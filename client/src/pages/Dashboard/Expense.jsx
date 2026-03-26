import React, { useEffect, useState } from 'react'
import DashboardLayout from "../../components/layout/DashboardLayout"
import { API_PATHS } from '../../utils/apiPaths';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import axiosInstance from "../../utils/axiosInstance"
import ExpenseList from '../../components/Expense/ExpenseList';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import toast from 'react-hot-toast';
import DeleteAlert from '../../components/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';

const Expense = () => {

    useUserAuth();

   const [expenseData,setExpenseData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [openDeleteAlert,setOpenDeleteAlert] = useState({
      show:false,
      data:null,
    });
  
    const [openAddExpenseModal,setOpenAddExpenseModal] = useState(false);
  
     const fetchExpenseDetails = async () =>{
    if(loading) return;

    setLoading(true);
    try{
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.Get_All_Expense}`);
      // console.log("income response:", response.data);

      if(response.data){
        setExpenseData(response.data);
      }
    }catch(error){
      console.log("something went wrong...please try again",error);
    }
    finally{
      setLoading(false);
    }
  };

  //handle add income
  const HandleAddExpense =async (expense) =>{
    const {category,amount,date,icon} = expense;

    if(!category.trim()){
      toast.error("category is required");
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
      await axiosInstance.post(API_PATHS.EXPENSE.Add_Expense,{
        category,
        amount,
        date,
        icon,
      });
      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    }catch(error){
      console.error("Error adding Expense",
        error.response?.data?.message ||error.message
      );
    }
  };


  const deleteExpense = async (id) =>{

    try{
      await axiosInstance.delete(API_PATHS.EXPENSE.Delete_Expense(id));
      setOpenDeleteAlert({show:false,data:null});
      toast.success("Expense Deleted successfully");
      fetchExpenseDetails();
    }catch(error){
      console.error("Error Deleting expense",
        error.response?.data?.message|| error.message
      );
    }

  };
    const handleDownloadExpenseDetails = async () =>{
      try{
        const token = localStorage.getItem("token");
        console.log("token:", token);
        const response = await axiosInstance.get(API_PATHS.EXPENSE.Download_Expense,{
          responseType:"blob",
          timeout:30000,
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download","expense_details.xlsx");
        document.body.appendChild(link);
        link.click()
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      }catch(error){
        console.error("Error downloading expense details",error);
        toast.error("failed to download expense details..Please try again");
      }
    };

  
    useEffect(() =>{
      fetchExpenseDetails();
    },[]);


  return (
    <div>
      <DashboardLayout activeMenu="Expense" >
        <div className='my-5 mx-auto'>
          <div className='grid grid-cols-1 gap-6'>
            <div className=''>
              <ExpenseOverview
                transaction = {expenseData}
                onAddExpense={()=>setOpenAddExpenseModal(true)}
              />
            </div>
            <ExpenseList
              transactions ={expenseData}
              onDelete ={(id) =>{
                setOpenDeleteAlert({show:true,data:id});
              }}
              onDownload={handleDownloadExpenseDetails}
            />
          </div>
          <Modal 
            isOpen={openAddExpenseModal}
            onClose={()=> setOpenAddExpenseModal(false)}
            title="Add Expense"
          >
            <AddExpenseForm onAddExpense={HandleAddExpense}/>
          </Modal>
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={()=>setOpenDeleteAlert({show:false,data:null})}
            title="Delete Expense"
          >
            <DeleteAlert
              content="Are you sure you want to delete this expense detail"
              onDelete={()=>deleteExpense(openDeleteAlert.data)}
            />
          </Modal>
        </div>
      </DashboardLayout>
    </div>
  )
}

export default Expense;
