// 

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { FaTasks, FaBolt, FaSmile } from 'react-icons/fa';

const LandingPage: FC = () => {

 return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex flex-col md:flex-row items-center justify-center text-center md:text-left py-32 px-4 md:px-16 gap-8">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl font-bold animate-fadeIn">Manage Your Daily Tasks Effortlessly</h1>
          <p className="text-xl max-w-md animate-fadeIn delay-150">
            Stay organized, boost productivity, and never miss a task again. Log in to start managing your day!
          </p>
          <Link href="/login">
            <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition animate-fadeIn delay-300">
              Login to Get Started
            </button>
          </Link>
        </div>
        <div className="md:w-1/2 animate-fadeIn delay-500">
          <Image
  src="/hero-img.png"
  alt="Hero Illustration"
  width={1200}
  height={800}
  className="w-full h-auto"
/>

        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 text-center bg-gray-50">
        <h2 className="text-3xl font-bold mb-12">Why Choose Our App?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300">
            <FaTasks className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-4">Track Tasks Easily</h3>
            <p>Add, edit, and complete your daily tasks in one place.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300">
            <FaBolt className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-4">Boost Productivity</h3>
            <p>Get reminders and organize tasks by priority to stay on top of your day.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300">
            <FaSmile className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-4">Simple & Intuitive</h3>
            <p>Minimal design that helps you focus on what matters the most.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <Link href="/login">
          <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition">
            Login Now
          </button>
        </Link>
      </section>
    </main>
  );
};

export default LandingPage;
