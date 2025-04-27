"use client"

import { PayPalButtons } from "@paypal/react-paypal-js"
import { Spinner } from "@heroui/spinner"
import { v4 as uuidv4 } from "uuid"
import { useCreateBooking } from "@/src/hooks/booking.hook"
import { useCreatePayment } from "@/src/hooks/payment.hook"
import { useState } from "react"

interface PayPalPaymentButtonProps {
  amount: number
  onSuccess: () => void
  isProcessing: boolean
  bookingData: any
}

export default function PayPalPaymentButton({ amount, onSuccess, isProcessing, bookingData }: PayPalPaymentButtonProps) {
  const [transactionId, setTransactionId] = useState<string | null>(null)

  const { mutate: handleCreateBooking } = useCreateBooking({
    onSuccess: (data: any) => {
      // Booking created, now wait for PayPal payment approval
      setTransactionId(data?.data?.transactionId)
    },
  })

  const { mutate: handleCreatePayment } = useCreatePayment({
    onSuccess: (data: any) => {
      // Payment saved successfully
      onSuccess()
    },
  })

  // Create order (PayPal will call this)
  const createOrder = (data: any, actions: any) => {
    const trId = 'txn_' + uuidv4()

    // First create booking on your server
    handleCreateBooking({
      ...bookingData,
      transactionId: trId,
    })

    setTransactionId(trId) // Save for later payment saving

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount.toString(),
            currency_code: "USD",
          },
          custom_id: trId, // Pass transaction ID inside PayPal if you want
        },
      ],
    })
  }

  // Approve order (after user approves payment on PayPal)
  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      // After capture success, now save the payment
      handleCreatePayment({
        user: bookingData?.user,
        booking: bookingData?._id, // In your backend make sure booking id returned correctly
        transactionId: transactionId,
        paymentMethodId: details.id, // PayPal Payment ID
        paymentMethod: 'paypal',
        amount: amount * 100, // if you store in cents like Stripe
      })
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
