import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_AgabJg0pYedvGqFRmLP3JPkL006WgdgKUb';
  const onToken = token => {
    console.log(token);
    alert('Payment successful')
  }
  return(
    <StripeCheckout
      label='Pay now'
      name='ecommerce'
      billingAdress
      shippingAdress
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panellabel='Pay now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
}; 

export default StripeCheckoutButton;