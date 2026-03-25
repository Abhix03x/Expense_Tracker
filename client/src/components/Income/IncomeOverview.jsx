import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu';
import { prepareIncomeBarChartData } from '../../utils/Helper.js';
import CustomChartData from '../Charts/CustomChartData';

const IncomeOverview = ({transaction,onAddIncome}) => {
    // console.log("transaction prop:", transaction);

    const [chartData,setChartData] = useState([]);

    useEffect(() =>{
        const result = prepareIncomeBarChartData(transaction);
        setChartData(result);
    },[transaction]);

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <div className=''>
            <h5 className='text-lg'>Income Overview</h5>
            <p className='text-xs text-gray-400 mt-0.5'>Track Your income Over time and Analyze your Income trends</p>
        </div>

        <button className='add-btn' onClick={onAddIncome}>
            <LuPlus className='text-lg'/>
            Add Income
        </button>
      </div>

      <div className='mt-10'>
        <CustomChartData
         data={chartData}/>
      </div>
    </div>
  );
}

export default IncomeOverview
