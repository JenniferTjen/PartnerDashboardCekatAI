import React from 'react';
import IconUsers from '@/components/Icon/IconUsers';
import IconDollarSign from '@/components/Icon/IconDollarSign';
import IconEye from '@/components/Icon/IconEye';
import { Button } from '@mantine/core';

const Dashboard = () => {
  const dummyPartnerData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    referral_code: 'JOHNDOE123',
    tier_1_commission: 10,
    tier_2_commission: 5
  };

  const dummyBusinessData = {
    signUpsCount: 150,
    customersCount: 75,
    clicksCount: 1000,
    unpaidEarnings: 5000000
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center gap-6 px-4 sm:px-6 md:px-12 lg:px-24 py-6 sm:py-8 md:py-10 lg:py-14">
      
      <div className="text-center text-xl sm:text-2xl md:text-3xl font-semibold">
            Welcome Back {dummyPartnerData.name} 👋🏻
      </div>

      <div className="flex flex-col w-full h-auto shadow-md rounded-3xl bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
          <div className="flex flex-row items-center justify-start gap-3 border-b md:border-r border-stone-200 p-5">
            <div className="flex bg-warning-light justify-center items-center w-12 h-12 lg:w-16 lg:h-16 bg-yellowGradient rounded-full">
              <IconUsers className="text-warning w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm md:text-base">Sign-Ups</h2>
              <p className="mt-2 text-lg sm:text-xl md:text-2xl lg:text-2xl font-semibold">{dummyBusinessData.signUpsCount}</p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-3 border-b border-stone-200 p-5">
            <div className="flex bg-success-light justify-center items-center w-12 h-12 lg:w-16 lg:h-16 bg-yellowGradient rounded-full">
              <IconUsers className="text-success w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm md:text-base">Customers</h2>
              <p className="mt-2 text-lg sm:text-xl md:text-2xl lg:text-2xl font-semibold">{dummyBusinessData.customersCount}</p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-3 md:border-r border-stone-200 p-5">
            <div className="flex bg-primary-light justify-center items-center w-12 h-12 lg:w-16 lg:h-16 bg-yellowGradient rounded-full">
              <IconEye className="text-primary w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm md:text-base">Link Views</h2>
              <p className="mt-2 text-lg sm:text-xl md:text-2xl lg:text-2xl font-semibold">{dummyBusinessData.clicksCount}</p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-3 p-5">
            <div className="flex bg-danger-light justify-center items-center w-12 h-12 lg:w-16 lg:h-16 bg-yellowGradient rounded-full">
              <IconDollarSign className="text-danger w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm md:text-base">Unpaid Earnings</h2>
              <p className="mt-2 text-lg sm:text-xl md:text-2xl lg:text-2xl font-semibold">IDR {dummyBusinessData.unpaidEarnings}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full h-auto shadow-md rounded-3xl bg-white p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Your reward for referring new customers 💸</h2>
        <p className="text-base mb-2">You get a <strong>{dummyPartnerData.tier_1_commission}% recurring commission</strong> for each referred customer</p>
        <p className="text-base">You get a <strong>{dummyPartnerData.tier_2_commission}% recurring commission</strong> for each referred tier 2 customer</p>
      </div>

      <div className="flex flex-col w-full h-auto shadow-md rounded-3xl bg-white p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Your referral link 🔗</h2>
        <p className="text-base mb-2">Share this link with your friends and earn rewards</p>
        <div className="bg-gray-100 rounded-lg p-3 mb-4">
          <p className="text-sm break-all">{`www.cekat.ai/?ref=${dummyPartnerData.referral_code}`}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            className="bg-primary text-white rounded-full px-4 py-2 flex items-center"
            onClick={() => {}}
          >
            <span className="mr-2">📋</span> Copy Link
          </Button>
          <Button
            className="bg-green-500 text-white rounded-full px-4 py-2 flex items-center"
            onClick={() => {}}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5 mr-2" /> Share on WhatsApp
          </Button>
          <Button
            className="bg-blue-600 text-white rounded-full px-4 py-2 flex items-center"
            onClick={() => {}}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="w-5 h-5 mr-2" /> Share on Facebook
          </Button>
          <Button
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-full px-4 py-2 flex items-center"
            onClick={() => {}}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram" className="w-5 h-5 mr-2" /> Share on Instagram
          </Button>
          <Button
            className="bg-black text-white rounded-full px-4 py-2 flex items-center"
            onClick={() => {}}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png" alt="X" className="w-5 h-5 mr-2" /> Share on X
          </Button>
        </div>
      </div>

    </main>
  );
};
export default Dashboard;
