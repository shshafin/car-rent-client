"use client"

import type React from "react"

import { useState } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@heroui/button"
import { Spinner } from "@heroui/spinner"

interface StripePaymentFormProps {
  amount: number
  onSuccess: () => void
  isProcessing: boolean
}

export default function StripePaymentForm({ amount, onSuccess, isProcessing }: StripePaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return
    }

    setLoading(true)
    setError(null)

    // In a real implementation, you would create a payment intent on your server
    // and pass the client secret to the frontend

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false)
      onSuccess()
    }, 2000)

    // Real implementation would look something like this:
    /*
    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      setError("Card element not found");
      setLoading(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message || "Payment failed");
      setLoading(false);
    } else {
      // Send paymentMethod.id to your server for processing
      try {
        const response = await fetch('/api/process-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            paymentMethodId: paymentMethod.id,
            amount: amount * 100 // Stripe uses cents
          }),
        });
        
        const result = await response.json();
        
        if (result.success) {
          onSuccess();
        } else {
          setError(result.error || "Payment failed");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      }
      setLoading(false);
    }
    */
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Card Information</label>
          <div className="p-3 border rounded-lg bg-white">
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="bg-gray-50 p-3 rounded-lg text-sm">
          <div className="flex justify-between mb-1">
            <span>Amount to pay:</span>
            <span className="font-medium">${amount.toLocaleString()}</span>
          </div>
          <div className="text-xs text-gray-500">Your card will be charged immediately.</div>
        </div>
      </div>

      <Button
        type="submit"
        color="primary"
        className="w-full h-12 bg-blue-600 hover:bg-blue-700"
        disabled={!stripe || loading || isProcessing}
      >
        {loading || isProcessing ? (
          <div className="flex items-center justify-center">
            <Spinner size="sm" color="white" className="mr-2" />
            Processing...
          </div>
        ) : (
          `Pay $${amount.toLocaleString()}`
        )}
      </Button>
    </form>
  )
}
