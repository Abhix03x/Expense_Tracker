import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from "moment";
import TransactionInfoCard from '../Card/TransactionInfoCard.jsx';

const RecentTransaction = ({transactions,onSeeMore}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5>Recent Transactions</h5>

            <button className=' flex items-center gap-3 text-[12px] font-medium text-gray-700 hover:text-purple-500 bg-gray-50 hover:bg-purple-50 px-5 py-1.5 rounded-lg border border-gray-200/50 cursor-pointer' 
            onClick={onSeeMore}>
                See All <LuArrowRight className='text-base'/>
            </button>
        </div>

        <div className='mt-6'>
            {transactions?.slice(0,5)?.map((item) =>(
                <TransactionInfoCard
                    key={item._id}
                    title={item.type =="expense" ? item.category:item.source}
                    icon={item.icon}
                    date={moment(item.date).format("Do MMM YYYY")}
                    amount={item.amount}
                    type={item.type}
                    hideDeleteBtn
                />
            ))}
        </div>
     
    </div>
  )
}

export default RecentTransaction
