<template>
  <div>
    <div class="text-left mt-5">
      <form action="/charge" method="post" id="payment-form" >
        <div class="form-group">
          <label for="card-element">Credit or debit card</label>
          <div id="card-element" class="form-control">
            <!-- A Stripe Element will be inserted here. -->
          </div>
          <!-- Used to display form errors. -->
          <div id="card-errors" role="alert"></div>
        </div>
        <button class="btn btn-success">Submit Payment</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    // Create a Stripe client.
    var stripe = Stripe('pk_test_iC94Y6vgJ1I26BDCal0jqFxs');

    // Create an instance of Elements.
    var elements = stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '18px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    // Create an instance of the card Element.
    var card = elements.create('card', {style: style});

    // Add an instance of the card Element into the `card-element` <div>.
    card.mount('#card-element');

    // Handle real-time validation errors from the card Element.
    card.addEventListener('change', function(event) {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    // Handle form submission.
    var form = document.getElementById('payment-form');
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      stripe.createToken(card).then(function(result) {
        if (result.error) {
          // Inform the user if there was an error.
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          // Send the token to your server.
          console.log(result.token);
        }
      });
    });
  }
}
</script>
