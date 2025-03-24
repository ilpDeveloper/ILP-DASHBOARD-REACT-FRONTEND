import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import OtpForm from "./OtpForm";
import { signInUser, SignInResponse, LoginCredentials } from "../../api/LoginApi";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOtpForm, setIsOtpForm] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!userId.trim()) {
      toast.error("Please enter your user ID or email", {
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
    if (!password.trim()) {
      toast.error("Please enter your password", {
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

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response: SignInResponse = await signInUser(userId, password);

      if (response.success) {
        if (typeof response.data === "string") {
          // This means we need to show OTP form
          setIsOtpForm(true);
        } else {
          // This means login was successful
          const credentials = response.data as LoginCredentials;
          // Store all necessary data in localStorage
          localStorage.setItem("authToken", credentials.AppToken);
          localStorage.setItem("userId", credentials.UserId);
          localStorage.setItem("companyId", credentials.CompanyId?.toString() || "");
          localStorage.setItem("companyName", credentials.CompanyName || "");
          localStorage.setItem("userRole", credentials.UserRole || "");
          localStorage.setItem("locations", JSON.stringify(credentials.locations || []));
          
          toast.success("Login successful! 🎉", {
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
          
          // Navigate after a short delay
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } else {
        throw new Error(response.data as string || "Failed to sign in");
      }
    } catch (err: any) {
      console.error("Error in SignInUser:", err);
      // Handle different types of errors
      if (err.response?.status === 400) {
        toast.error(err.response?.data?.data || "Invalid credentials. Please try again.", {
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
      } else if (err.response?.status === 404) {
        toast.error("User not found. Please check your credentials.", {
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
      } else if (err.response?.status === 401) {
        toast.error("Unauthorized. Please check your credentials.", {
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
      } else {
        toast.error(err.response?.data?.data || err.message || "An error occurred during sign in", {
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
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSuccess = () => {
    setIsOtpForm(false);
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
    setUserId("");
    setPassword("");
  };

  const handleBackToSignIn = () => {
    setIsOtpForm(false);
    setUserId("");
    setPassword("");
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
      {isOtpForm ? (
        <OtpForm
          userId={userId}
          onSuccess={handleOtpSuccess}
          onBack={handleBackToSignIn}
        />
      ) : (
        <div className="relative">
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your user ID or email and password to sign in!
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label>
                  User ID or Email <span className="text-error-500">*</span>
                </Label>
                <Input
                  placeholder="Enter your user ID or email"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              <div>
                <Label>
                  Password <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2 transition-all duration-200 ease-in-out"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5 transition-opacity duration-200 ease-in-out" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5 transition-opacity duration-200 ease-in-out" />
                    )}
                  </span>
                </div>
              </div>
              <div>
                <Button className="w-full" size="sm" disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </div>
          </form>

          <div className="mt-5 text-center sm:text-start">
            <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}