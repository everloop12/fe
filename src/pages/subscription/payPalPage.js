import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axiosInstance from 'utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/reducers/user';
import { useGetSubscriptionStatusQuery } from 'store/api/PaymentStatusApiSlice';

// Renders errors or successful transactions on the screen.
function Message({ content }) {
  return <p>{content}</p>;
}

const PayPalPage = ({ plan, price }) => {
    const initialOptions = {
        'client-id': 'AcVuEEpcbvJn5uRntKFdkw7ZilfsCOLc8datCusTsvExpNQfuWadJdh8qY4hlV9Za-pJkQfTDEczwrGQ',
        'data-sdk-integration-source': 'integrationbuilder_sc',
    };
  const { refetch } = useGetSubscriptionStatusQuery();
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);
  const [message, setMessage] = useState('');

  return (
    <div>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          createOrder={async () => {
            try {
              // Make sure you send the correct plan and price with the API call
              const response = await axiosInstance.post("/paypal/orders", {
                plan,
                price,
              });
              return response.data.data.id;
            } catch (error) {
              console.error(error);
              // Handle the error or display an appropriate error message to the user
            }
          }}
          onApprove={async (data, actions) => {
            try {
              const response = await axiosInstance.post(`/paypal/orders/${data.orderID}/capture`);
              const orderData = await response.data.data;
              const errorDetail = orderData?.details?.[0];

              if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
                return actions.restart(); // Retry payment
              } else if (errorDetail) {
                throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
              } else {
                const transaction = orderData.purchase_units[0].payments.captures[0];
                setMessage(`Transaction ${transaction.status}: ${transaction.id}.`);
                console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                
                // Update subscription status and navigate to the main page
                axiosInstance.get(`/paypal/orders/${data.orderID}/approve`, { 
                  headers: { Authorization: `Bearer ${currentUser.token}` }
                }).then(async () => {
                  await refetch();
                  navigate('/main');
                });
              }
            } catch (error) {
              console.error(error);
              setMessage(`Sorry, your transaction could not be processed: ${error}`);
            }
          }}
        />
      </PayPalScriptProvider>
      <Message content={message} />
    </div>
  );
};

export default PayPalPage;
