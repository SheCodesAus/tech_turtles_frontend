import { useParams } from 'react-router-dom';
import ListItem from '../components/ListItem.jsx';
import useList from '../hooks/use-list.js';
import postRecipient from '../api/post-recipient.js';
import Button from '../components/Button.jsx';
import { useState, useEffect, useMemo } from 'react';
import Modal from '../components/Modal';
import "../styles.css";

const ListDetailPage = () => {
  const { listId } = useParams();
  const { list, isLoading, error, refetchList } = useList(listId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipientData, setRecipientData] = useState({
    name: '',
    list: parseInt(listId)
  });
  const [metrics, setMetrics] = useState({
    totalSpent: 0,
    progressPercentage: 0,
    remainingBudget: 0,
    budget: 0
  });

  // Calculate list metrics
  useEffect(() => {
    const calculateListMetrics = () => {
      if (!list?.recipients) return;

      console.log('Calculating metrics for list:', list);

      // Calculate total spent across all recipients and their completed items
      const totalSpent = list.recipients.reduce((total, recipient) => {
        const recipientTotal = recipient.items?.reduce((sum, item) => {
          const itemCost = item.status === 'complete' ? Number(item.cost) : 0;
          console.log('Item cost:', item.name, itemCost, 'Status:', item.status);
          return sum + itemCost;
        }, 0) || 0;
        console.log('Recipient total:', recipient.name, recipientTotal);
        return total + recipientTotal;
      }, 0);

      // Get budget from list
      const budget = parseFloat(list.budget) || 0;
      console.log('Budget:', budget, 'Total spent:', totalSpent);

      // Calculate percentage spent (round to 1 decimal place)
      const progressPercentage = budget > 0 
        ? Math.min(Math.round((totalSpent / budget) * 1000) / 10, 100)
        : 0;
      
      console.log('Progress percentage:', progressPercentage);

      // Calculate remaining budget
      const remainingBudget = budget - totalSpent;

      setMetrics({
        totalSpent,
        progressPercentage,
        remainingBudget,
        budget
      });
    };

    calculateListMetrics();
  }, [list]);

  // Get progress bar color based on percentage
  const getProgressBarColor = () => {
    const percentage = metrics.progressPercentage;
    if (percentage >= 90) return 'h-4 bg-red-500 rounded-lg';
    if (percentage >= 70) return 'h-4 bg-yellow-500 rounded-lg';
    return 'h-4 bg-green-500 rounded-lg';
  };

  const handleSave = async () => {
    try {
      await postRecipient(recipientData);
      await refetchList();
      setRecipientData({ name: '', list: parseInt(listId) });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save recipient:', error);
    }
  };

  const handleInputChange = (e) => {
    setRecipientData({
      ...recipientData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contents-column bg-[#F7F5F2]">
      {isLoading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <p className="text-lg text-gray-600">Loading the contents of your list...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">Failed to load lists. Please try again later.</p>
        </div>
      )}

      {!error && !isLoading && list && (
        <>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{list.name}</h1>
            
            {/* Budget Progress Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Budget Overview</h2>
                  <p className="text-gray-600 mt-1">
                    ${metrics.totalSpent.toFixed(2)} spent of ${metrics.budget.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">Remaining</p>
                  <p className="text-2xl font-bold text-gray-800">
                    ${metrics.remainingBudget.toFixed(2)}
                  </p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="progress-container">
                <div 
                  className={`progress-bar ${
                    metrics.progressPercentage >= 90 ? 'progress-bar--red' :
                    metrics.progressPercentage >= 70 ? 'progress-bar--yellow' :
                    'progress-bar--green'
                  }`}
                  style={{ width: `${metrics.progressPercentage}%` }}
                />
              </div>
              
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>{metrics.progressPercentage.toFixed(1)}% spent</span>
                <span>{(100 - metrics.progressPercentage).toFixed(1)}% remaining</span>
              </div>
            </div>
          </div>

          {/* Recipients Section */}
          <div className="space-y-6">
            {list.recipients?.length > 0 ? (
              list.recipients.map(recipient => (
                <div 
                  key={recipient.id} 
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <ListItem 
                    recipient={recipient} 
                    refreshList={refetchList}
                    totalBudget={metrics.budget}
                  />
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12">
                <div className="flex justify-center items-center">
                  <h3 className="text-xl text-gray-500 font-medium">
                    You currently do not have any recipients
                  </h3>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end mt-8">
            <Button
              size="medium"
              variant="secondary"
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-pink-200 text-gray-800 rounded-lg font-medium hover:bg-pink-300 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              NEW RECIPIENT
            </Button>
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
          >
            <input
              type="text"
              name="name"
              placeholder="Recipient Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all"
              value={recipientData.name}
              onChange={handleInputChange}
              autoFocus
            />
          </Modal>
        </>
      )}
    </div>
  );
};

export default ListDetailPage;