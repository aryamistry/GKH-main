import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, CreditCard, Smartphone, Building2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total } = useCart();
  const [step, setStep] = useState(1); // 1: Summary, 2: Payment, 3: Processing
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);

  const tax = Math.round(total * 0.18);
  const finalTotal = total + tax;

  const handleProcessPayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setProcessingComplete(true);
    
    // Redirect to success after 2 seconds
    setTimeout(() => {
      navigate('/order-success');
    }, 2000);
  };

  if (items.length === 0 && !processingComplete) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Your cart is empty</h1>
        <button
          onClick={() => navigate('/explore')}
          className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:shadow-lg transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => step > 1 ? setStep(step - 1) : navigate('/cart')}
          className="p-2 rounded-full hover:bg-orange-50 transition"
        >
          <ArrowLeft className="text-slate-700" size={24} />
        </button>
        <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-between mb-12 max-w-2xl">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-col items-center flex-1">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: step >= s ? 1 : 0.8 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition ${
                step >= s ? 'bg-primary text-white' : 'bg-slate-200 text-slate-600'
              }`}
            >
              {s}
            </motion.div>
            <p className={`text-xs font-semibold ${step >= s ? 'text-primary' : 'text-slate-500'}`}>
              {s === 1 ? 'Summary' : s === 2 ? 'Payment' : 'Processing'}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {/* Step 1: Order Summary */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl shadow-card p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
                  
                  <div className="divide-y">
                    {items.map((item) => (
                      <div key={item.id} className="py-4 flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">{item.name}</p>
                          <p className="text-sm text-slate-600">Qty: {item.quantity} × ₹{item.price}</p>
                        </div>
                        <p className="font-semibold text-slate-900">₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-2 pt-6 border-t border-slate-200">
                    <div className="flex justify-between">
                      <p className="text-slate-600">Subtotal</p>
                      <p className="font-semibold">₹{total}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-slate-600">Delivery Fee</p>
                      <p className="font-semibold">₹0</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-slate-600">GST (18%)</p>
                      <p className="font-semibold">₹{tax}</p>
                    </div>
                    <div className="flex justify-between pt-4 border-t-2 border-slate-200">
                      <p className="font-bold text-lg">Total Amount</p>
                      <p className="font-bold text-lg text-primary">₹{finalTotal}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full py-3 rounded-full bg-primary text-white font-semibold hover:shadow-lg transition"
                >
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {/* Step 2: Payment Selection */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl shadow-card p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Select Payment Method</h2>

                  <div className="space-y-3">
                    {/* UPI */}
                    <label
                      className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition ${
                        selectedPayment === 'upi'
                          ? 'border-primary bg-orange-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={selectedPayment === 'upi'}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="hidden"
                      />
                      <Smartphone className={`${selectedPayment === 'upi' ? 'text-primary' : 'text-slate-400'}`} size={24} />
                      <div className="ml-4 flex-1">
                        <p className="font-semibold text-slate-900">UPI (Google Pay, PhonePe, Paytm)</p>
                        <p className="text-sm text-slate-600">Fast and secure</p>
                      </div>
                      {selectedPayment === 'upi' && <CheckCircle className="text-primary" size={24} />}
                    </label>

                    {/* Cards */}
                    <label
                      className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition ${
                        selectedPayment === 'card'
                          ? 'border-primary bg-orange-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={selectedPayment === 'card'}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="hidden"
                      />
                      <CreditCard className={`${selectedPayment === 'card' ? 'text-primary' : 'text-slate-400'}`} size={24} />
                      <div className="ml-4 flex-1">
                        <p className="font-semibold text-slate-900">Credit/Debit Card</p>
                        <p className="text-sm text-slate-600">Visa, Mastercard, American Express</p>
                      </div>
                      {selectedPayment === 'card' && <CheckCircle className="text-primary" size={24} />}
                    </label>

                    {/* Net Banking */}
                    <label
                      className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition ${
                        selectedPayment === 'netbanking'
                          ? 'border-primary bg-orange-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="netbanking"
                        checked={selectedPayment === 'netbanking'}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="hidden"
                      />
                      <Building2 className={`${selectedPayment === 'netbanking' ? 'text-primary' : 'text-slate-400'}`} size={24} />
                      <div className="ml-4 flex-1">
                        <p className="font-semibold text-slate-900">Net Banking</p>
                        <p className="text-sm text-slate-600">Direct bank transfer</p>
                      </div>
                      {selectedPayment === 'netbanking' && <CheckCircle className="text-primary" size={24} />}
                    </label>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-xl flex gap-3">
                    <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
                    <p className="text-sm text-blue-700">Your payment is 100% secure and encrypted</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 rounded-full border border-primary text-primary font-semibold hover:bg-orange-50 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 py-3 rounded-full bg-primary text-white font-semibold hover:shadow-lg transition"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Processing */}
            {step === 3 && !isProcessing && !processingComplete && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl shadow-card p-8 text-center space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900">Review & Confirm</h2>

                  <div className="space-y-3">
                    <p className="text-slate-600">Payment Method:</p>
                    <p className="text-lg font-bold text-primary capitalize">
                      {selectedPayment === 'upi' && 'UPI Payment'}
                      {selectedPayment === 'card' && 'Credit/Debit Card'}
                      {selectedPayment === 'netbanking' && 'Net Banking'}
                    </p>
                  </div>

                  <div className="border-t-2 border-slate-200 pt-4">
                    <p className="text-slate-600 mb-2">Total Amount to Pay</p>
                    <p className="text-3xl font-bold text-slate-900">₹{finalTotal}</p>
                  </div>

                  <button
                    onClick={handleProcessPayment}
                    disabled={isProcessing}
                    className="w-full py-3 rounded-full bg-primary text-white font-semibold hover:shadow-lg transition disabled:opacity-70"
                  >
                    {isProcessing ? 'Processing...' : 'Pay Now'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Processing State */}
            {isProcessing && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl shadow-card p-12 text-center space-y-6"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="inline-block"
                >
                  <div className="w-16 h-16 border-4 border-orange-100 border-t-primary rounded-full" />
                </motion.div>

                <div>
                  <p className="text-xl font-bold text-slate-900">Processing Secure Payment...</p>
                  <p className="text-slate-600 mt-2">Please don't close this page</p>
                </div>

                <div className="inline-block px-4 py-2 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">Amount: ₹{finalTotal}</p>
                </div>
              </motion.div>
            )}

            {/* Success State */}
            {processingComplete && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-card p-12 text-center space-y-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                >
                  <CheckCircle className="w-20 h-20 text-green-600 mx-auto" />
                </motion.div>

                <div>
                  <p className="text-2xl font-bold text-slate-900">Payment Successful!</p>
                  <p className="text-slate-600 mt-2">Redirecting to order confirmation...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order Summary Sidebar */}
        <motion.div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-2xl shadow-card p-6">
            <h3 className="font-bold text-slate-900 mb-4">Order Details</h3>

            <div className="space-y-3 mb-4 pb-4 border-b border-slate-200">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-semibold">₹{total}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Tax (18%)</span>
                <span className="font-semibold">₹{tax}</span>
              </div>
            </div>

            <div className="flex justify-between mb-6 pb-6 border-b-2 border-slate-200">
              <span className="font-bold text-slate-900">Total</span>
              <span className="font-bold text-lg text-primary">₹{finalTotal}</span>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-slate-500">Items: {items.reduce((sum, item) => sum + item.quantity, 0)}</p>
              <p className="text-xs text-slate-500">Delivery: Free</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
