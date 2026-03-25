import Income from "../models/Income.js";
import Expense from "../models/Expense.js";
import { isValidObjectId, Types } from "mongoose";

export const getDashboardData = async (req,res) =>{
    try{
        const userId = req.user.id;
        const userObtId = new Types.ObjectId(String(userId));

        //fetch total income
        const totalIncome = await Income.aggregate([
            {$match:{userId : userObtId}},
            {$group: {_id:null,total:{$sum:"$amount"}}},
        ]);

        console.log("total income",{totalIncome,userId:isValidObjectId(userId)});

          const totalExpense = await Expense.aggregate([
            {$match:{userId : userObtId}},
            {$group: {_id:null,total:{$sum:"$amount"}}},
        ]);

        //income Transaction in last 60 days

        const last60DaysIncomeTransaction = await Income.find({
            userId,
            date:{$gte:new Date(Date.now()-60*24*60*60*1000)},
        }).sort({date:-1});

        //last 60 days total income

        const incomeLast60Days = last60DaysIncomeTransaction.reduce(
            (sum,transaction) => sum+transaction.amount,0
        );

        //get expense transaction last 30 days

        const last30DaysExpenseTransaction = await Expense.find({
            userId,
            date:{$gte:new Date(Date.now()-30*24*60*60*1000)},
        }).sort({date:-1});

        // total expense last 30 days
        const expenseLast30Days = last30DaysExpenseTransaction.reduce(
            (sum,transaction) => sum+transaction.amount,0
        );

        //fetch last 5 transaction

        const lastTransaction = [
            ...(await Income.find({userId}).sort({date:-1}).limit(5)).map(
                (txt) =>({
                    ...txt.toObject(),
                    type:"income",
                })
            ),
            ...(await Expense.find({userId}).sort({date:-1}).limit(5)).map(
                (txt) =>({
                    ...txt.toObject(),
                    type:"expense",
                })
            ),
        ].sort((a,b) =>b.date-a.date);

        res.json({
            totalBalance :
            (totalIncome[0]?.total || 0)-(totalExpense[0]?.total || 0),
            totalIncome:totalIncome[0]?.total || 0,
            totalExpenses: totalExpense[0]?.total || 0,
            Last30DaysExpense:{
                total:expenseLast30Days,
                transactions:last30DaysExpenseTransaction,
            },
            Last60DaysIncome:{
                total:incomeLast60Days,
                transactions:last60DaysIncomeTransaction,
            },
            recentTransactions: lastTransaction,

        });
    }catch(err){
        res.status(500).json({message:"server error",error:err.message});
    }
}