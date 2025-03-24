import { useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { changePasswordViaOTP, ChangePasswordResponse } from "../../api/LoginApi";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface OtpFormProps {
  userId: string;
  onSuccess: () => void;
  onBack: () => void;
}

export default function OtpForm({ userId, onSuccess, onBack }: OtpFormProps) {
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateOtpForm = () => {
    if (!otpCode.trim()) {
      toast.error("Please enter the OTP code", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return false;
    }
    if (!newPassword.trim()) {
      toast.error("Please enter your new password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return false;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return false;
    }
    if (!confirmPassword.trim()) {
      toast.error("Please confirm your new password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return false;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!validateOtpForm()) {
      setLoading(false);
      return;
    }

    try {
      const response: ChangePasswordResponse = await changePasswordViaOTP({
        UserId: userId,
        OTPCode: otpCode,
        Password: newPassword,
        ConfirmPassword: confirmPassword,
      });

      if (response.success) {
        toast.success("Password set successfully! 🎉", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        onSuccess();
      } else {
        throw new Error(response.data || "Failed to change password");
      }
    } catch (err: any) {
      console.error("Error in ChangePasswordViaOTP:", err);
      toast.error(err.response?.data?.data || err.message || "An error occurred while changing the password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center w-full h-full max-w-md mx-auto lg:w-1/2 p-6 sm:p-8">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <div className="relative">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Complete Registration
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter the OTP sent to your email and set your password.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <Label>
                OTP Code <span className="text-error-500">*</span>
              </Label>
              <Input
                placeholder="Enter the OTP"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
              />
            </div>
            <div>
              <Label>
                New Password <span className="text-error-500">*</span>
              </Label>
              <Input
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <Label>
                Confirm Password <span className="text-error-500">*</span>
              </Label>
              <Input
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div>
              <Button className="w-full" size="sm" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
            <div>
              <Button
                className="w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                size="sm"
                onClick={onBack}
                disabled={loading}
              >
                Back to Sign In
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}