import React, { useState } from 'react';
import { ArrowLeft, Clock } from 'lucide-react';
import { CartItem, PaymentMethod, ServiceType } from '../types';
import { usePaymentMethods } from '../hooks/usePaymentMethods';

interface CheckoutProps {
  cartItems: CartItem[];
  totalPrice: number;
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, totalPrice, onBack }) => {
  const { paymentMethods } = usePaymentMethods();
  const [step, setStep] = useState<'details' | 'payment'>('details');
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [serviceType, setServiceType] = useState<ServiceType>('delivery');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pickupTime, setPickupTime] = useState('5-10');
  const [customTime, setCustomTime] = useState('');
  // Dine-in removed
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('gcash');
  // referenceNumber is not used in this flow; kept for future expansion
  const [notes, setNotes] = useState('');

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Set default payment method when payment methods are loaded
  React.useEffect(() => {
    if (paymentMethods.length > 0 && !paymentMethod) {
      setPaymentMethod(paymentMethods[0].id as PaymentMethod);
    }
  }, [paymentMethods, paymentMethod]);

  const selectedPaymentMethod = paymentMethods.find(method => method.id === paymentMethod);

  const handleProceedToPayment = () => {
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    const timeInfo = serviceType === 'pickup' 
      ? (pickupTime === 'custom' ? customTime : `${pickupTime} minutes`)
      : '';
    
    
    
    const orderDetails = `
🛒 Marcela's Cookie Co. ORDER

👤 Customer: ${customerName}
📞 Contact: ${contactNumber}
📍 Service: ${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}
${serviceType === 'delivery' ? `🏠 Address: ${address}${landmark ? `\n🗺️ Landmark: ${landmark}` : ''}` : ''}
${serviceType === 'pickup' ? `⏰ Pickup Time: ${timeInfo}` : ''}
 


📋 ORDER DETAILS:
${cartItems.map(item => {
  let itemDetails = `• ${item.name}`;
  if (item.selectedVariation) {
    itemDetails += ` (${item.selectedVariation.name})`;
  }
  if (item.selectedAddOns && item.selectedAddOns.length > 0) {
    itemDetails += ` + ${item.selectedAddOns.map(addOn => 
      addOn.quantity && addOn.quantity > 1 
        ? `${addOn.name} x${addOn.quantity}`
        : addOn.name
    ).join(', ')}`;
  }
  itemDetails += ` x${item.quantity} - ₱${item.totalPrice * item.quantity}`;
  return itemDetails;
}).join('\n')}

💰 TOTAL: ₱${totalPrice}
${serviceType === 'delivery' ? `🛵 DELIVERY FEE:` : ''}

💳 Payment: ${selectedPaymentMethod?.name || paymentMethod}
📸 Payment Screenshot: Please attach your payment receipt screenshot

${notes ? `📝 Notes: ${notes}` : ''}

Please confirm this order to proceed. Thank you for choosing Marcela's! 🥟
    `.trim();

    const encodedMessage = encodeURIComponent(orderDetails);
    const messengerUrl = `https://m.me/427728457740377?text=${encodedMessage}`;
    
    window.open(messengerUrl, '_blank');
    
  };

  const isDetailsValid = customerName && contactNumber && address;

  if (step === 'details') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6 pb-28 sm:pb-8">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Cart</span>
          </button>
          <h1 className="text-3xl font-bakery-display font-semibold text-bakery-cocoa ml-8">Order Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-2xl font-bakery-display font-medium text-bakery-cocoa mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-bakery-caramel/30">
                  <div>
                    <h4 className="font-medium text-black">{item.name}</h4>
                    {item.selectedVariation && (
                      <p className="text-sm text-gray-600">Size: {item.selectedVariation.name}</p>
                    )}
                    {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                      <p className="text-sm text-gray-600">
                        Add-ons: {item.selectedAddOns.map(addOn => addOn.name).join(', ')}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">₱{item.totalPrice} x {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-black">₱{item.totalPrice * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-bakery-caramel/40 pt-4">
              <div className="flex items-center justify-between text-2xl font-bakery-display font-semibold text-bakery-cocoa">
                <span>Total:</span>
                <span>₱{totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Customer Details Form */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-2xl font-bakery-display font-medium text-bakery-cocoa mb-6">Customer Information</h2>
            
            <form className="space-y-6">
              {/* Customer Information */}
              <div>
                <label className="block text-sm font-medium text-bakery-cocoa mb-2">Full Name *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 border border-bakery-caramel/50 rounded-lg focus:ring-2 focus:ring-bakery-caramel focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-bakery-cocoa mb-2">Contact Number *</label>
                <input
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-bakery-caramel/50 rounded-lg focus:ring-2 focus:ring-bakery-caramel focus:border-transparent transition-all duration-200"
                  placeholder="09XX XXX XXXX"
                  required
                />
              </div>

              {/* Service Type - Delivery only */}
              <div>
                <label className="block text-sm font-medium text-bakery-cocoa mb-3">Service Type *</label>
                <div className="grid grid-cols-1">
                  <div className="p-4 rounded-lg border-2 border-bakery-caramel bg-bakery-caramel text-white">
                    <div className="text-2xl mb-1">🛵</div>
                    <div className="text-sm font-medium">Delivery</div>
                  </div>
                </div>
              </div>

              {/* Dine-in removed */}

              {/* Pickup removed */}

              {/* Delivery Address */}
              {serviceType === 'delivery' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-bakery-cocoa mb-2">Delivery Address *</label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 border border-bakery-caramel/50 rounded-lg focus:ring-2 focus:ring-bakery-caramel focus:border-transparent transition-all duration-200"
                      placeholder="Enter your complete delivery address"
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-bakery-cocoa mb-2">Landmark</label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="w-full px-4 py-3 border border-bakery-caramel/50 rounded-lg focus:ring-2 focus:ring-bakery-caramel focus:border-transparent transition-all duration-200"
                      placeholder="e.g., Near McDonald's, Beside 7-Eleven, In front of school"
                    />
                  </div>
                </>
              )}

              {/* Special Notes */}
              <div>
                <label className="block text-sm font-medium text-bakery-cocoa mb-2">Special Instructions</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 border border-bakery-caramel/50 rounded-lg focus:ring-2 focus:ring-bakery-caramel focus:border-transparent transition-all duration-200"
                  placeholder="Any special requests or notes..."
                  rows={3}
                />
              </div>

              {/* Desktop/Tablet primary button */}
              <button
                onClick={handleProceedToPayment}
                disabled={!isDetailsValid}
                className={`hidden sm:block w-full py-4 rounded-xl font-medium text-lg transition-all duration-200 transform ${
                  isDetailsValid
                    ? 'bg-gradient-to-r from-bakery-caramel to-bakery-cherry text-white hover:from-bakery-cherry hover:to-bakery-caramel hover:scale-[1.02]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Proceed to Payment
              </button>
            </form>
          </div>
        </div>

        {/* Mobile sticky footer - Details step */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-t border-bakery-caramel/30 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-bakery-display text-bakery-cocoa">Total:</span>
              <span className="text-xl font-semibold text-bakery-cocoa">₱{totalPrice}</span>
            </div>
            <button
              onClick={handleProceedToPayment}
              disabled={!isDetailsValid}
              className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-200 ${
                isDetailsValid
                  ? 'bg-gradient-to-r from-bakery-caramel to-bakery-cherry text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Payment Step
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-28 sm:pb-8">
      <div className="flex items-center mb-8">
        <button
          onClick={() => setStep('details')}
          className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Details</span>
        </button>
        <h1 className="text-3xl font-bakery-display font-semibold text-bakery-cocoa ml-8">Payment</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Method Selection */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <h2 className="text-2xl font-bakery-display font-medium text-bakery-cocoa mb-6">Choose Payment Method</h2>
          
          <div className="grid grid-cols-1 gap-4 mb-6">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 flex items-center space-x-3 ${
                  paymentMethod === method.id
                    ? 'border-bakery-caramel bg-bakery-caramel text-white'
                    : 'border-bakery-caramel/50 bg-white text-bakery-cocoa hover:border-bakery-caramel'
                }`}
              >
                <span className="text-2xl">💳</span>
                <span className="font-medium">{method.name}</span>
              </button>
            ))}
          </div>

          {/* Payment Details with QR Code */}
          {selectedPaymentMethod && (
            <div className="bg-bakery-vanilla rounded-lg p-6 mb-6 border border-bakery-caramel/40">
              <h3 className="font-medium text-black mb-4">Payment Details</h3>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">{selectedPaymentMethod.name}</p>
                  <p className="font-mono text-black font-medium">{selectedPaymentMethod.account_number}</p>
                  <p className="text-sm text-gray-600 mb-3">Account Name: {selectedPaymentMethod.account_name}</p>
                  <p className="text-xl font-semibold text-bakery-cocoa">Amount: ₱{totalPrice}</p>
                </div>
                <div className="flex-shrink-0">
                  <img 
                    src={selectedPaymentMethod.qr_code_url} 
                    alt={`${selectedPaymentMethod.name} QR Code`}
                    className="w-32 h-32 rounded-lg border-2 border-bakery-caramel/50 shadow-sm"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop';
                    }}
                  />
                  <p className="text-xs text-gray-500 text-center mt-2">Scan to pay</p>
                </div>
              </div>
            </div>
          )}

          {/* Reference Number */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-black mb-2">📸 Payment Proof Required</h4>
            <p className="text-sm text-gray-700">
              After making your payment, please take a screenshot of your payment receipt and attach it when you send your order via Messenger. This helps us verify and process your order quickly.
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <h2 className="text-2xl font-bakery-display font-medium text-bakery-cocoa mb-6">Final Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            <div className="bg-bakery-vanilla rounded-lg p-4 border border-bakery-caramel/30">
              <h4 className="font-medium text-black mb-2">Customer Details</h4>
              <p className="text-sm text-gray-600">Name: {customerName}</p>
              <p className="text-sm text-gray-600">Contact: {contactNumber}</p>
              <p className="text-sm text-gray-600">Service: {serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}</p>
              {serviceType === 'delivery' && (
                <>
                  <p className="text-sm text-gray-600">Address: {address}</p>
                  {landmark && <p className="text-sm text-gray-600">Landmark: {landmark}</p>}
                </>
              )}
              {serviceType === 'pickup' && (
                <p className="text-sm text-gray-600">
                  Pickup Time: {pickupTime === 'custom' ? customTime : `${pickupTime} minutes`}
                </p>
              )}
              {/* Dine-in removed */}
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b border-bakery-caramel/30">
                <div>
                  <h4 className="font-medium text-black">{item.name}</h4>
                  {item.selectedVariation && (
                    <p className="text-sm text-gray-600">Size: {item.selectedVariation.name}</p>
                  )}
                  {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                    <p className="text-sm text-gray-600">
                      Add-ons: {item.selectedAddOns.map(addOn => 
                        addOn.quantity && addOn.quantity > 1 
                          ? `${addOn.name} x${addOn.quantity}`
                          : addOn.name
                      ).join(', ')}
                    </p>
                  )}
                  <p className="text-sm text-gray-600">₱{item.totalPrice} x {item.quantity}</p>
                </div>
                <span className="font-semibold text-black">₱{item.totalPrice * item.quantity}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-bakery-caramel/40 pt-4 mb-6">
            <div className="flex items-center justify-between text-2xl font-bakery-display font-semibold text-bakery-cocoa">
              <span>Total:</span>
              <span>₱{totalPrice}</span>
            </div>
          </div>

          {/* Desktop/Tablet primary button */}
          <button
            onClick={handlePlaceOrder}
            className="hidden sm:block w-full py-4 rounded-xl font-medium text-lg transition-all duration-200 transform bg-gradient-to-r from-bakery-caramel to-bakery-cherry text-white hover:from-bakery-cherry hover:to-bakery-caramel hover:scale-[1.02]"
          >
            Place Order via Messenger
          </button>
          
          <p className="text-xs text-gray-500 text-center mt-3">
            You'll be redirected to Facebook Messenger to confirm your order. Don't forget to attach your payment screenshot!
          </p>
        </div>
      </div>
      {/* Mobile sticky footer - Payment step */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-t border-bakery-caramel/30 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bakery-display text-bakery-cocoa">Total:</span>
            <span className="text-xl font-semibold text-bakery-cocoa">₱{totalPrice}</span>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="w-full py-3.5 rounded-xl font-semibold transition-all duration-200 bg-gradient-to-r from-bakery-caramel to-bakery-cherry text-white"
          >
            Place Order via Messenger
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;