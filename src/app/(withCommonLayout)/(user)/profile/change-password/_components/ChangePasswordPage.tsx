"use client"

import type React from "react"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card"
import { Input } from "@heroui/input"
import { Button } from "@heroui/button"
import { Spinner } from "@heroui/spinner"
import { EyeIcon, EyeOffIcon, LockIcon, CheckCircleIcon, XCircleIcon } from "lucide-react"
import { useChangePassword } from "@/src/hooks/auth.hook"
import { toast } from "sonner"

export default function ChangePasswordPage() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState("")
  const { mutate: changePasswordMutation, isPending } = useChangePassword({
    onSuccess: (data: any) => {
      toast.success("Password changed successfully!");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    },
  })


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear specific field error when user starts typing again
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required"
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password"
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Clear any previous success message
    setSuccessMessage("")

    if (validateForm()) {
      changePasswordMutation({
        oldPassword: formData.currentPassword,
        newPassword: formData.newPassword
      })
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-md mx-auto">
        <CardHeader className="flex gap-3">
          <LockIcon className="text-primary" />
          <div className="flex flex-col">
            <p className="text-xl font-bold">Change Password</p>
            <p className="text-small text-default-500">Update your account password</p>
          </div>
        </CardHeader>
        <CardBody>
          {successMessage && (
            <div className="bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded-lg mb-6 flex items-center">
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              {successMessage}
            </div>
          )}

          {errors.api && (
            <div className="bg-danger-50 border border-danger-200 text-danger-700 px-4 py-3 rounded-lg mb-6 flex items-center">
              <XCircleIcon className="h-5 w-5 mr-2" />
              {errors.api}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
                Current Password
              </label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter your current password"
                className={errors.currentPassword ? "border-danger" : ""}
                endContent={
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="focus:outline-none"
                  >
                    {showCurrentPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-default-400" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-default-400" />
                    )}
                  </button>
                }
              />
              {errors.currentPassword && <p className="text-danger text-xs mt-1">{errors.currentPassword}</p>}
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                New Password
              </label>
              <Input
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter your new password"
                className={errors.newPassword ? "border-danger" : ""}
                endContent={
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="focus:outline-none"
                  >
                    {showNewPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-default-400" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-default-400" />
                    )}
                  </button>
                }
              />
              {errors.newPassword && <p className="text-danger text-xs mt-1">{errors.newPassword}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Confirm New Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your new password"
                className={errors.confirmPassword ? "border-danger" : ""}
                endContent={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-default-400" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-default-400" />
                    )}
                  </button>
                }
              />
              {errors.confirmPassword && <p className="text-danger text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          </form>
        </CardBody>
        <CardFooter>
          <div className="flex justify-end gap-2 w-full">
            <Button color="default" variant="flat">
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={handleSubmit}
              isDisabled={isPending}
              className="bg-gradient-to-r from-orange-400 to-red-600 text-white font-semibold"
            >
              {isPending ? (
                <>
                  <Spinner size="sm" color="white" className="mr-2" />
                  Updating...
                </>
              ) : (
                "Change Password"
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
