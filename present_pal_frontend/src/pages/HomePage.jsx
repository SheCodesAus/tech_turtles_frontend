import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ListTodo, DollarSign, Smile } from 'lucide-react';
import "../styles.css";

const Homepage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="contents-column flex">
        <div className="flex flex-col md:flex-row w-full justify-between items-center py-8">
          <div className="flex-1 max-w-xl">
            <h1 className="text-4xl font-bold mb-4">PresentPal</h1>
            <h2 className="text-2xl mb-6">Plan. Shop. Joy.</h2>
            
            <p className="text-gray-700 mb-6">
              Take the stress out of purchasing gifts for events with PresentPal. 
              PresentPal will help you organise your gift purchasing, ensuring that 
              no last-minute dash to the shops is required and you will have more time 
              to enjoy special events with your loved ones.
            </p>
            
            <p className="text-gray-700 mb-8">
              Simple and easy to use. Start planning your gift shopping with PresentPal today.
            </p>
            
            <div className="flex gap-4">
              <button className="bg-pink-300 px-6 py-2 rounded hover:bg-pink-400 transition-colors">JOIN NOW</button>
              <button className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-50 transition-colors">LOG IN</button>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center mt-8 md:mt-0">
            <img 
              src="/img/mobileapp.png"
              alt="PresentPal mobile app preview"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="contents-column py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 p-4 rounded-full bg-pink-100">
              <Clock className="h-8 w-8 text-gray-700" />
            </div>
            <h3 className="text-lg font-medium">Save time</h3>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 p-4 rounded-full bg-pink-100">
              <ListTodo className="h-8 w-8 text-gray-700" />
            </div>
            <h3 className="text-lg font-medium">Plan ahead</h3>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 p-4 rounded-full bg-pink-100">
              <DollarSign className="h-8 w-8 text-gray-700" />
            </div>
            <h3 className="text-lg font-medium">Monitor your budget</h3>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 p-4 rounded-full bg-pink-100">
              <Smile className="h-8 w-8 text-gray-700" />
            </div>
            <h3 className="text-lg font-medium">Eliminate stress</h3>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="contents-column py-16">
        <p className="text-primary font-medium mb-2">LEARN MORE</p>
        <h2 className="text-3xl font-bold mb-6">About Us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-gray-700 mb-6">
              PresentPal is a web application designed to streamline gift planning 
              and purchasing, starting with a focus on Christmas shopping and with 
              the potential to expand into birthday and other event planning. The 
              platform aims to eliminate the stress of last-minute shopping and 
              provide a more organized and thoughtful approach to gift-giving.
            </p>
            <p className="text-gray-700">
              PresentPal's mission is to simplify holiday/event gift shopping by 
              providing a seamless platform where users can create organized lists 
              for special events and gifts. Whether for personal use or to help 
              find the perfect gift for loved ones, PresentPal makes easy tracking 
              of items and their sources, making gift-giving more thoughtful, 
              efficient and enjoyable.
            </p>
          </div>
          <div className="flex justify-center">
            <img 
              src="/img/homepagelady.png"
              alt="Person using PresentPal"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;