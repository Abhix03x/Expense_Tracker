import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/Helper';
import CustomChartData from '../Charts/CustomChartData';

const Last30DaysExpenses = ({data}) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() =>{

        const result = prepareExpenseBarChartData(data);
        setChartData(result)

    },[data]);

  return (
    <div className=' card col-span-1'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Last 30 Days transactions</h5>
      </div>

      <CustomChartData data = {chartData}/>
    </div>
  )
}

export default Last30DaysExpenses
