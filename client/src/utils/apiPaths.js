export const BASE_URL ="http://localhost:8000";

export const API_PATHS = {
    AUTH : {
        LOGIN :"/api/v1/auth/login",
        REGISTER : "/api/v1/auth/register",
        GET_USER_INFO : "/api/v1/auth/getUser",
    },
    DashBoard : {
        Get_Data : "/api/v1/dashboard",
    },
    INCOME : {
        Add_Income : "/api/v1/income/add",
        Get_All_Income : "/api/v1/income/get",
        Delete_Income : (incomeId) => `/api/v1/income/${incomeId}`,
        Download_Income : "/api/v1/income/downloadexcel",
    },
     EXPENSE : {
        Add_Expense : "/api/v1/expense/add",
        Get_All_Expense : "/api/v1/expense/get",
        Delete_Expense : (expenseId) => `/api/v1/expense/${expenseId}`,
        Download_Expense : "/api/v1/expense/downloadexcel",
    },
    IMAGE : {
        Upload_Image :"/api/v1/auth/upload-image"
    },
};