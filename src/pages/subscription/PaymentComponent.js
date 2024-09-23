import { useGetPaymentLinksQuery } from "store/api/PaymentStatusApiSlice";
import { Button, Grid } from "@mui/material";
import axiosInstance from "utils/axiosInstance";
import { useState, useEffect } from "react";
import PayPalPage from "./payPalPage"; // PayPal component

const PaymentComponent = () => {
  const { data: link, isSuccess, isLoading } = useGetPaymentLinksQuery();
  const [country, setCountry] = useState(null);

  // This function redirects the user to the Paymob URL
  const handlePurchase = (url) => {
    window.location.href = url;
  };

  useEffect(() => {
    const getGeoInfo = () => {
      axiosInstance.get('https://ipapi.co/json/')
        .then((response) => {
          let data = response.data;
          setCountry(data.country);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getGeoInfo();
  }, []);

  const additionalText = (
    <>
      <p style={{ marginTop: '8px', color: '#6b7280' }}>10,000+ Preclinical & Clinical SBAs.</p>
      <p style={{ color: '#6b7280' }}>Comprehensive Revision & Analytics System.</p>
      <p style={{ color: '#6b7280' }}>Gamification Features To Aid Studying.</p>
    </>
  );

  const cardStyle = {
    width: '100%',
    maxWidth: '300px',
    padding: '24px',
    backgroundColor: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '16px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    margin: '16px',
    textAlign: 'center',
  };

  const imageStyle = {
    marginTop: '16px',
    width: '100%',
    height: 'auto',
    maxHeight: '150px',
    objectFit: 'contain',
    borderRadius: '16px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const buttonStyle = {
    marginTop: '16px',
    background: 'linear-gradient(to right, #0886bf, #f59e0b)',
    color: '#ffffff',
    fontWeight: 'bold',
    borderRadius: '9999px',
    padding: '12px 32px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  };

  // Single Paymob URL to be used for all plans
  const singlePaymobUrl = link?.data?.url || '';  // Assuming link.data.url is the correct single Paymob URL

  const renderPaymentOption = (plan, price, imageSrc) => {
    return (
      <Grid item>
        <div style={cardStyle}>
          <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#15aaed' }}>{plan}</h3>
          <p style={{ marginTop: '16px', color: '#4b5563' }}>{price}</p>
          {additionalText}
          <img src={imageSrc} alt={`${plan} Plan`} style={imageStyle} />
          {country === "EG" ? (
            <Button
              variant="contained"
              onClick={() => handlePurchase(singlePaymobUrl)}  // Use the same Paymob URL for all plans
              style={buttonStyle}
            >
              Purchase
            </Button>
          ) : (
            <PayPalPage plan={plan} price={price} />  // Render PayPal buttons for other countries
          )}
        </div>
      </Grid>
    );
  };

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center" style={{ backgroundColor: '#ffffff', padding: '32px' }}>
      <div style={{ marginBottom: '16px', fontSize: '36px', fontWeight: 'bold', textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)', color: '#4387f6', letterSpacing: '1px', textAlign: 'center' }}>
        Level Up Your Learning
      </div>
      <div style={{ marginBottom: '32px', fontSize: '18px', color: '#4b5563', textAlign: 'center', maxWidth: '600px' }}>
        Enhance your medical knowledge and achieve your goals with our comprehensive plans. Select the subscription that best fits your needs and start your journey towards success today.
      </div>
      <Grid item alignItems="center" justifyContent="space-around" style={{ display: 'flex', gap: '16px', marginTop: '24px' }} xs={12}>
        {isLoading && !country && "Loading..."}
        {isSuccess && (
          <Grid container spacing={2} justifyContent="center">
            {renderPaymentOption('1 Month', country === "EG" ? '200 EGP' : '$5.00', '/cardioasset.svg')}
            {renderPaymentOption('3 Months', country === "EG" ? '360 EGP (Save 40%)' : '$9.00 (Save 40%)', '/nephroasset.svg')}
            {renderPaymentOption('6 Months', country === "EG" ? '600 EGP (Save 50%)' : '$15.00 (Save 50%)', '/respiratoryasset.svg')}
            {renderPaymentOption('12 Months', country === "EG" ? '960 EGP (Save 60%)' : '$24.00 (Save 60%)', '/neuroasset.svg')}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default PaymentComponent;
