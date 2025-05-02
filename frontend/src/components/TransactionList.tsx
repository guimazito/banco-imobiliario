import React from "react";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';

export default function TransactionList({ transactions }: { transactions: any[] }) {
    // console.log('bateu aqui:', transactions);
    const cardColor = (type: string) => {
        switch (type) {
            case 'betweenPlayers':
                return "bg-yellow-800";
            case 'receiveFromBank':
                return "bg-green-800";
            case 'payToBank':
                return "bg-red-800";
            default:
                return "bg-gray-700";
        }
    }

    const cardIcon = (type: string) => {
        switch (type) {
            case 'betweenPlayers':
                return <CompareArrowsOutlinedIcon fontSize="large" />
            case 'receiveFromBank':
                return <TrendingUpIcon fontSize="large" />
            case 'payToBank':
                return <TrendingDownIcon fontSize="large" />
            default:
                return <QuestionMarkOutlinedIcon fontSize="large" />
        }
    }

    return (
        <div
            style={{ userSelect: 'none' }}
        >
            <h2 className="text-lg font-bold text-white text-center">Últimas<br/>Transações</h2>
            <div
                className="overflow-y-auto max-h-[67vh]"
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#4B5563 #1F2937' }}
            >
                {transactions.map((transaction, index) => (
                <div
                    key={transaction.id || index}
                    className={`flex items-center justify-between mb-2 text-white ${cardColor(transaction.type)} p-2 rounded text-lg text-left`}
                >
                    {transaction.description}
                    {cardIcon(transaction.type)}
                </div>               
                ))}
            </div>
        </div>
    );
}