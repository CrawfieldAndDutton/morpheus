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
import { FileText, Mail, KeyRound, Loader2, Phone, CheckCircle } from "lucide-react";
import { authApi } from "@/apis/modules/auth";

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  const startResendTimer = () => {
    setResendDisabled(true);
    setCountdown(30);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to verify.",
        variant: "destructive",
      });
      return;
    }
    
    setVerifyingEmail(true);
    
    try {
      // Send OTP to the provided email
      await authApi.sendOtp({ email });
      
      setShowOtp(true);
      setEmailVerified(false);
      toast({
        title: "OTP Sent",
        description: "A verification code has been sent to your email.",
      });
      
      startResendTimer();
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: error.response?.data?.detail || "Failed to send verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setVerifyingEmail(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast({
        title: "OTP Required",
        description: "Please enter the verification code sent to your email.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Call API to verify OTP
      await authApi.verifyOtp({
        email,
        otp
      });
      
      setEmailVerified(true);
      setShowOtp(false);
      toast({
        title: "Email Verified",
        description: "Your email has been successfully verified.",
      });
    } catch (error) {
      toast({
        title: "Invalid OTP",
        description: error.response?.data?.detail || "The verification code is incorrect. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendDisabled) return;

    setIsLoading(true);

    try {
      // Changed from resendOtp to sendOtp
      await authApi.sendOtp({ email });
      
      toast({
        title: "OTP Resent",
        description: "A new verification code has been sent to your email.",
      });

      startResendTimer();
    } catch (error) {
      toast({
        title: "Failed to Resend OTP",
        description: error.response?.data?.detail || "Failed to resend verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !contactNumber || !password || !email) {
      toast({
        title: "All Fields Required",
        description: "Please fill in all required fields to continue.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please ensure both passwords are the same.",
        variant: "destructive",
      });
      return;
    }

    if (!emailVerified) {
      toast({
        title: "Email Not Verified",
        description: "Please verify your email address before registering.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Register the user
      await authApi.register({
        username: email,
        email,
        role: "user",
        is_active: true,
        first_name: firstName,
        last_name: lastName,
        phone_number: contactNumber,
        password,
      });
      
      toast({
        title: "Registration Successful",
        description: "Welcome to KYCFabric!",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error.response?.data?.detail || "Registration failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
              Fill in your details to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="first_name"
                    type="text"
                    placeholder="Enter Your First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
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
                    onChange={(e) => setLastName(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone_number">Contact Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="contact_number"
                    type="text"
                    placeholder="Enter Your Contact Number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="pl-10"
                    maxLength={10}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailVerified(false);
                      }}
                      className="pl-10"
                      autoComplete="email"
                      disabled={emailVerified}
                    />
                    {emailVerified && (
                      <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <Button 
                    type="button" 
                    onClick={handleVerifyEmail}
                    disabled={verifyingEmail || emailVerified}
                    className="whitespace-nowrap"
                    variant={emailVerified ? "outline" : "default"}
                  >
                    {verifyingEmail ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : emailVerified ? (
                      "Verified"
                    ) : (
                      "Verify"
                    )}
                  </Button>
                </div>
              </div>

              {showOtp && !emailVerified && (
                <div className="space-y-2 bg-muted/30 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="otp">Verification Code</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleResendOTP}
                      disabled={resendDisabled || isLoading}
                      className="h-auto py-0 px-2 text-xs"
                    >
                      {resendDisabled
                        ? `Resend in ${countdown}s`
                        : "Resend Code"}
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      className="text-center tracking-widest"
                      maxLength={6}
                    />
                    <Button 
                      type="button" 
                      onClick={handleVerifyOTP}
                      disabled={isLoading || !otp || otp.length < 6}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Verify"
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    A verification code has been sent to{" "}
                    <span className="font-medium">{email}</span>
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="text"
                    placeholder="XXXXXXXX"
                    value={password}
                    onChange={(e) => setPassword(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    maxLength={10}
                    className="pl-10"
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
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full kyc-btn-primary"
                disabled={isLoading || !emailVerified}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </form>
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