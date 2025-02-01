// import ToggleSwitch from './ToggleSwitch';
// import { Square, SquareCheckBig, Trash2, CirclePlus } from 'lucide-react';
// import './ListItem.css';
// import React, { useState } from 'react';
// import postItem from '../api/post-item.js'
// import putItem from '../api/put-item.js'
// import putRecipient from '../api/put-recipient.js';
// import deleteRecipient from '../api/delete-recipient.js';
// import deleteItem from '../api/delete-item.js';
// import Modal from '../components/Modal.jsx';



import React, { useState, useEffect } from 'react';
import { Square, SquareCheckBig, Trash2, CirclePlus } from 'lucide-react';
import Modal from '../components/Modal.jsx';
import putItem from '../api/put-item.js';
import putRecipient from '../api/put-recipient.js';
import deleteRecipient from '../api/delete-recipient.js';
import deleteItem from '../api/delete-item.js';
import postItem from '../api/post-item.js';

const ListItem = ({ recipient, refreshList, totalBudget }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemData, setItemData] = useState({
    name: '',
    cost: 0,
    recipient: parseInt(recipient.id),
    where_to_buy: '',
    notes: ''
  });
  const [recipientTotal, setRecipientTotal] = useState(0);

  // Calculate total spent for this recipient whenever items change
  useEffect(() => {
    const total = recipient.items.reduce((sum, item) => 
      sum + (item.status === 'complete' ? Number(item.cost) || 0 : 0), 0
    );
    setRecipientTotal(total);
  }, [recipient.items]);

  const handleItemClick = async (itemId) => {
    try {
      const item = recipient.items.find(i => i.id === itemId);
      if (!item) return;

      const newStatus = item.status === 'complete' ? 'incomplete' : 'complete';
      await putItem(itemId, newStatus);
      
      // Immediately update the UI through refreshList
      await refreshList();
    } catch (error) {
      console.error('Error updating item status', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteItem(itemId);
      await refreshList();
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const handleDeleteRecipient = async () => {
    try {
      await deleteRecipient(recipient.id);
      await refreshList();
    } catch (error) {
      console.error('Failed to delete recipient:', error);
    }
  };

  const handleSave = async () => {
    try {
      await postItem({
        ...itemData,
        status: 'incomplete' // Ensure new items start as incomplete
      });
      await refreshList();
      setItemData({
        name: '',
        cost: 0,
        recipient: parseInt(recipient.id),
        where_to_buy: '',
        notes: ''
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save an item:', error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.name === 'cost' 
      ? parseFloat(e.target.value) || 0
      : e.target.value;

    setItemData({
      ...itemData,
      [e.target.name]: value
    });
  };

  return (
    <div className="list-item--container mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-950">{recipient.name}</h3>
        <div className="text-right">
          <p className="text-sm text-gray-600">Spent</p>
          <p className="font-semibold">${recipientTotal.toFixed(2)}</p>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:grid md:grid-cols-4 gap-4 mb-4">
        <div className="text-base font-semibold text-gray-950">Product name</div>
        <div className="text-base font-semibold text-gray-950">Store</div>
        <div className="text-base font-semibold text-gray-950">Price</div>
        <div className="text-base font-semibold text-gray-950">Notes</div>
        
        {recipient.items.map(gift => (
          <React.Fragment key={gift.id}>
            <div 
              className="p-3 rounded flex items-center gap-2 cursor-pointer" 
              onClick={() => handleItemClick(gift.id)}
            >
              {gift.status === 'complete' ? <SquareCheckBig /> : <Square />}
              <span className={gift.status === 'complete' ? 'line-through text-gray-500' : ''}>
                {gift.name}
              </span>
            </div>
            <div className={`p-3 rounded ${gift.status === 'complete' ? 'text-gray-500' : ''}`}>
              {gift.where_to_buy}
            </div>
            <div className={`p-3 rounded ${gift.status === 'complete' ? 'text-gray-500' : ''}`}>
              ${Number(gift.cost).toFixed(2)}
            </div>
            <div className="p-3 rounded flex justify-between items-center">
              <span className={gift.status === 'complete' ? 'text-gray-500' : ''}>
                {gift.notes}
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteItem(gift.id);
                }}
                className="text-gray-600 hover:text-red-600 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {recipient.items.map(gift => (
          <div 
            key={gift.id} 
            className={`bg-white rounded-lg shadow-sm p-4 ${
              gift.status === 'complete' ? 'opacity-75' : ''
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <div 
                className="font-medium flex items-center gap-2 cursor-pointer" 
                onClick={() => handleItemClick(gift.id)}
              >
                {gift.status === 'complete' ? <SquareCheckBig /> : <Square />}
                <span className={gift.status === 'complete' ? 'line-through text-gray-500' : ''}>
                  {gift.name}
                </span>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteItem(gift.id);
                }}
                className="text-gray-600 hover:text-red-600 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Store:</span>
                <span className={gift.status === 'complete' ? 'text-gray-500' : ''}>
                  {gift.where_to_buy}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className={gift.status === 'complete' ? 'text-gray-500' : ''}>
                  ${Number(gift.cost).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Notes:</span>
                <span className={gift.status === 'complete' ? 'text-gray-500' : ''}>
                  {gift.notes}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <div className="flex flex-col gap-2">
          <button 
            className="flex items-center gap-2 text-purple-700 hover:text-purple-800 transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            <span>Add more item</span>
            <CirclePlus size={24} />
          </button>
          <button 
            className="flex items-center gap-2 text-purple-700 hover:text-purple-800 transition-colors"
            onClick={handleDeleteRecipient}
          >
            <span>Remove recipient</span>
            <Trash2 size={24} />
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      >
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          className="w-full p-3 border border-gray-300 rounded-lg mb-3"
          value={itemData.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="cost"
          placeholder="Cost"
          className="w-full p-3 border border-gray-300 rounded-lg mb-3"
          value={itemData.cost}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="where_to_buy"
          placeholder="Where to Buy"
          className="w-full p-3 border border-gray-300 rounded-lg mb-3"
          value={itemData.where_to_buy}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="notes"
          placeholder="Notes"
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={itemData.notes}
          onChange={handleInputChange}
        />
      </Modal>
    </div>
  );
};

export default ListItem;