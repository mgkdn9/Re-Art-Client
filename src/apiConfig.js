let apiUrl
const apiUrls = {
	production: 'https://re-art-server.onrender.com',
	development: 'http://localhost:8000',
}

if (window.location.hostname === 'localhost') {
	apiUrl = apiUrls.development
} else {
	apiUrl = apiUrls.production
}

export const stripePaymentMethodHandler = async (data, cb) => {
	const { amount, result } = data;
	if (result.error) {
	  // show error in payment form
	  cb(result);
	} else {
	  const paymentResponse = await stripePayment({
		payment_method_id: result.paymentMethod.id,
		name: result.paymentMethod.billing_details.name,
		email: result.paymentMethod.billing_details.email,
		amount: amount
	  });
	  console.log(paymentResponse);
	  cb(paymentResponse);
	}
  }
   
  // place backend API call for payment
  const stripePayment = async data => {
	const res = await fetch(`${apiUrl}/pay`, {
	  method: 'POST',
	  headers: { 'Content-Type': 'application/json' },
	  body: JSON.stringify(data),
	})
	return await res.json();
  }

export default apiUrl
