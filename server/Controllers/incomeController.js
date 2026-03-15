import Income from "../models/Income.js";
import User from "../models/User.js";


export const addIncome = async (req,res) =>{
    const userId = req.user.id;
    try{
        const{icon,source,amount,date}=req.body;
        if(!source||!amount||!date){
            return res.status(400).json({message:"all fields are required"});
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date:new Date(date)
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    }catch(err){
        res.status(500).json({message:"server error"});
    }
};

export const getAllIncome = async (req,res) =>{

}

export const deleteIncome = async (req,res) =>{

}

export const downloadIncomeExcel = async (req,res) =>{

}