"use client"

import { PayPalButtons } from "@paypal/react-paypal-js"
import { Spinner } from "@heroui/spinner"

interface PayPalPaymentButtonProps {
  amount: number
  onSuccess: () => void
  isProcessing: boolean
}

export default function PayPalPaymentButton({ amount, onSuccess, isProcessing }: PayPalPaymentButtonProps) {
  // Create order function - in a real app, this would communicate with your server
  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount.toString(),
            currency_code: "USD",
          },
        },
      ],
    })
  }

  // Approve order function - in a real app, this would verify the payment on your server
  const onApprove = (data: any, actions: any) => {
    // Capture the funds from the transaction
    return actions.order.capture().then((details: any) => {
      // Call your server to save the transaction
      onSuccess()
    })
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-3 rounded-lg text-sm">
        <div className="flex justify-between mb-1">
          <span>Amount to pay:</span>
          <span className="font-medium">${amount.toLocaleString()}</span>
        </div>
      </div>

      {isProcessing ? (
        <div className="flex justify-center py-6">
          <Spinner size="lg" color="primary" />
          <span className="ml-3">Processing your payment...</span>
        </div>
      ) : (
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          style={{ layout: "vertical", color: "blue", shape: "rect", label: "pay" }}
          disabled={isProcessing}
        />
      )}

      <div className="text-xs text-gray-500 text-center">
        By clicking the PayPal button, you'll be redirected to PayPal to complete your payment securely.
      </div>
    </div>
  )
}
