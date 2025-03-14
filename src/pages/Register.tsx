import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Mail, KeyRound, Loader2 } from "lucide-react";
import { authApi } from "@/apis/modules/auth";

const Register: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    last_name: "",
    password: "",
    confirm_password: "",
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => {
      const temp = prev;
      temp[field] = value;
      return temp;
    });
  };
  
  const handleregister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !password || !email) {
      toast({
        title: "FullName, Email and Password Required",
        description:
          "Please enter your FullName, email and password to continue.",
        variant: "destructive",
      });
      return;
    }
  if (password !== confirmPassword) {
    toast({
      title: " Password Required",
      description:
        "Please enter your same password to continue.",
      variant: "destructive",
    });
    return;}

    setIsLoading(true);

    try {
      const response = await authApi.register({
        username: email,
        email,
        role: "user",
        is_active: true,
        first_name: firstName,
        last_name: lastName,
        password,
      });
      // localStorage.setItem("token", response.data.access_token);
      toast({
        title: "Registration Successful",
        description: "Welcome to KYCFabric!",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Registration fail",
        description: error.details[0].msg,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  // const handleSubmitBasicInfo = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // Validate form data
  //   if (!formData.companyName.trim()) {
  //     toast({
  //       title: "Company Name Required",
  //       description: "Please enter your company name to continue.",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   if (!formData.email.trim()) {
  //     toast({
  //       title: "Email Required",
  //       description: "Please enter your email address to continue.",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   // Email validation
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(formData.email)) {
  //     toast({
  //       title: "Invalid Email",
  //       description: "Please enter a valid email address.",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   if (!formData.companyPAN.trim()) {
  //     toast({
  //       title: "Company PAN Required",
  //       description: "Please enter your company PAN to continue.",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   // PAN validation (simple format check)
  //   const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  //   if (!panRegex.test(formData.companyPAN)) {
  //     toast({
  //       title: "Invalid PAN Format",
  //       description: "Please enter a valid PAN in the format ABCDE1234F.",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   setIsLoading(true);

  //   // Simulate API call to send OTP
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     setStep(2);
  //     toast({
  //       title: "OTP Sent",
  //       description: "A verification code has been sent to your email.",
  //     });

  //     // Start countdown for resend
  //     setResendDisabled(true);
  //     setCountdown(30);
  //     const timer = setInterval(() => {
  //       setCountdown((prev) => {
  //         if (prev <= 1) {
  //           clearInterval(timer);
  //           setResendDisabled(false);
  //           return 0;
  //         }
  //         return prev - 1;
  //       });
  //     }, 1000);
  //   }, 1500);
  // };

  // const handleVerifyOTP = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!otp) {
  //     toast({
  //       title: "OTP Required",
  //       description: "Please enter the verification code sent to your email.",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   setIsLoading(true);

  //   // Simulate API call to verify OTP and complete registration
  //   setTimeout(() => {
  //     setIsLoading(false);

  //     // For demo purposes, any 6-digit OTP is considered valid
  //     if (otp.length === 6) {
  //       toast({
  //         title: "Registration Successful",
  //         description: "Your application is now under review.",
  //       });
  //       navigate("/application-progress");
  //     } else {
  //       toast({
  //         title: "Invalid OTP",
  //         description: "The verification code you entered is incorrect. Please try again.",
  //         variant: "destructive",
  //       });
  //     }
  //   }, 1500);
  // };

  // const handleResendOTP = () => {
  //   if (resendDisabled) return;

  //   setIsLoading(true);

  //   // Simulate API call to resend OTP
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     toast({
  //       title: "OTP Resent",
  //       description: "A new verification code has been sent to your email.",
  //     });

  //     // Reset countdown for resend
  //     setResendDisabled(true);
  //     setCountdown(30);
  //     const timer = setInterval(() => {
  //       setCountdown((prev) => {
  //         if (prev <= 1) {
  //           clearInterval(timer);
  //           setResendDisabled(false);
  //           return 0;
  //         }
  //         return prev - 1;
  //       });
  //     }, 1000);
  //   }, 1500);
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold kyc-gradient-text">KYCFabric</h2>
          <p className="text-muted-foreground mt-2">
            Create your business account
          </p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              {step === 1
                ? "Fill in your company details to get started"
                : "Verify your email address to continue"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 ? (
              <form onSubmit={handleregister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="first_name"
                      type="text"
                      placeholder=" Enter Your First Name"
                      value={firstName}
                      onChange={(e) =>
                        setFirstName( e.target.value)
                      }
                      className="pl-10"
                      autoFocus
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="last_name"
                      type="text"
                      placeholder="Enter Your Last Name"
                      value={lastName}
                      onChange={(e) =>
                        setLastName(e.target.value)
                      }
                      className="pl-10"
                      autoFocus
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="text"
                      placeholder="XXXXXXXXXX"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      className="pl-10 uppercase"
                      maxLength={10}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm_password">Confirm Password</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirm_password"
                      type="password"
                      placeholder="XXXXXXXXXX"
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                      className="pl-10 uppercase"
                      maxLength={10}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full kyc-btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </form>
            ) : (<></>
              // <form onSubmit={handleVerifyOTP} className="space-y-4">
              //   <div className="space-y-2">
              //     <div className="flex justify-between items-center">
              //       <Label htmlFor="otp">Verification Code</Label>
              //       <Button
              //         type="button"
              //         variant="ghost"
              //         size="sm"
              //         onClick={handleResendOTP}
              //         disabled={resendDisabled || isLoading}
              //         className="h-auto py-0 px-2 text-xs"
              //       >
              //         {resendDisabled
              //           ? `Resend in ${countdown}s`
              //           : "Resend Code"}
              //       </Button>
              //     </div>
              //     <Input
              //       id="otp"
              //       type="text"
              //       placeholder="Enter 6-digit code"
              //       value={otp}
              //       onChange={(e) =>
              //         setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              //       }
              //       className="text-center tracking-widest"
              //       maxLength={6}
              //       autoFocus
              //     />
              //     <p className="text-xs text-muted-foreground">
              //       A verification code has been sent to{" "}
              //       <span className="font-medium">{formData.email}</span>
              //     </p>
              //   </div>

              //   <Button
              //     type="submit"
              //     className="w-full kyc-btn-primary"
              //     disabled={isLoading}
              //   >
              //     {isLoading ? (
              //       <>
              //         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              //         Verifying...
              //       </>
              //     ) : (
              //       "Complete Registration"
              //     )}
              //   </Button>

              //   <div className="text-center">
              //     <Button
              //       type="button"
              //       variant="link"
              //       className="text-sm text-muted-foreground"
              //       onClick={() => setStep(1)}
              //     >
              //       Go back and edit details
              //     </Button>
              //   </div>
              // </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-center w-full">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
