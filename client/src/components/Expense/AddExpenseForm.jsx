import React, { useState } from 'react'
import Input from '../inputs/Input';
import EmojiPickerPopUp from '../EmojiPickerPopUp';

const AddExpenseForm = ({onAddExpense}) => {

    const [expense,setExpense] = useState({
        category:"",
        amount:"",
        date:"",
        icon:"",
    });

    const handleChange = (key,value) => setExpense({...expense,[key]:value});
    
  return (
    <div className=''>

        <EmojiPickerPopUp
            icon ={expense.icon}
            onSelect={(selectedIcon) => handleChange("icon",selectedIcon)}
        />

        <Input 
            value={expense.category}
            onChange={({target}) => handleChange("category",target.value)}
            label="expense Category"
            placeholder="Recharge,Fuel,Rent etc.."
            type="text"
        />
        <Input 
            value={expense.amount}
            onChange={({target}) => handleChange("amount",target.value)}
            label="Amount"
            placeholder=""
            type="number"
        />
        <Input 
            value={expense.date}
            onChange={({target}) => handleChange("date",target.value)}
            label="Date"
            placeholder=""
            type="date"
        />

        <div className=''>
            <button 
                type='button'
                className='add-btn add-btn-fill'
                onClick={() => onAddExpense(expense)}
            >
                Add expense
            </button>
        </div>

    </div>
  )
}

export default AddExpenseForm
