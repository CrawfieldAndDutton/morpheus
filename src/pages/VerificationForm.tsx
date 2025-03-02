
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, CheckCircle, AlertCircle, FileText, CreditCard, ShieldCheck } from "lucide-react";

// Define verification types and their details
const verificationTypes = {
  pan: {
    title: "PAN Verification",
    description: "Verify Permanent Account Number",
    placeholder: "ABCDE1234F",
    icon: <FileText className="h-8 w-8" />,
    pattern: "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
    credits: 5,
    validation: (value: string) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value),
    errorMessage: "Please enter a valid 10-character PAN (e.g., ABCDE1234F)"
  },
  aadhaar: {
    title: "Aadhaar Verification",
    description: "Verify Aadhaar Number",
    placeholder: "1234 5678 9012",
    icon: <CreditCard className="h-8 w-8" />,
    pattern: "^[0-9]{12}$",
    credits: 10,
    validation: (value: string) => /^[0-9]{12}$/.test(value.replace(/\s/g, '')),
    errorMessage: "Please enter a valid 12-digit Aadhaar number"
  },
  voter: {
    title: "Voter ID Verification",
    description: "Verify Voter Identity Card",
    placeholder: "ABC1234567",
    icon: <CreditCard className="h-8 w-8" />,
    pattern: "^[A-Z]{3}[0-9]{7}$",
    credits: 7,
    validation: (value: string) => /^[A-Z]{3}[0-9]{7}$/.test(value),
    errorMessage: "Please enter a valid Voter ID (e.g., ABC1234567)"
  },
  vehicle: {
    title: "Vehicle RC Verification",
    description: "Verify Registration Certificate",
    placeholder: "MH01AB1234",
    icon: <FileText className="h-8 w-8" />,
    pattern: "^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$",
    credits: 15,
    validation: (value: string) => /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/.test(value),
    errorMessage: "Please enter a valid RC number (e.g., MH01AB1234)"
  },
  passport: {
    title: "Passport Verification",
    description: "Verify Passport Details",
    placeholder: "A1234567",
    icon: <CreditCard className="h-8 w-8" />,
    pattern: "^[A-Z][0-9]{7}$",
    credits: 20,
    validation: (value: string) => /^[A-Z][0-9]{7}$/.test(value),
    errorMessage: "Please enter a valid passport number (e.g., A1234567)"
  }
};

type VerificationType = keyof typeof verificationTypes;

const VerificationForm: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [documentNumber, setDocumentNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<null | { verified: boolean; message: string }>(null);
  
  // Check if verification type is valid
  useEffect(() => {
    if (type && !Object.keys(verificationTypes).includes(type)) {
      toast({
        title: "Invalid Verification Type",
        description: "The requested verification type does not exist.",
        variant: "destructive",
      });
      navigate("/dashboard");
    }
  }, [type, navigate, toast]);
  
  // If type is not defined or invalid, return null
  if (!type || !Object.keys(verificationTypes).includes(type)) {
    return null;
  }
  
  const verificationType = type as VerificationType;
  const { 
    title, 
    description, 
    placeholder, 
    icon, 
    pattern, 
    credits, 
    validation, 
    errorMessage 
  } = verificationTypes[verificationType];
  
  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate document number
    if (!documentNumber) {
      toast({
        title: "Input Required",
        description: "Please enter the document number to verify.",
        variant: "destructive",
      });
      return;
    }
    
    if (!validation(documentNumber)) {
      toast({
        title: "Invalid Format",
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setVerificationResult(null);
    
    // Simulate API call for verification
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes, we'll randomly determine success/failure
      const isVerified = Math.random() > 0.3; // 70% success rate
      
      setVerificationResult({
        verified: isVerified,
        message: isVerified 
          ? "The document has been successfully verified." 
          : "Verification failed. The document details could not be verified."
      });
      
      toast({
        title: isVerified ? "Verification Successful" : "Verification Failed",
        description: isVerified 
          ? `${title} completed successfully. ${credits} credits have been deducted.` 
          : `${title} could not be completed. Please check the document number and try again.`,
        variant: isVerified ? "default" : "destructive",
      });
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <Button 
            variant="outline" 
            className="mb-4" 
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              {icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Document Verification</CardTitle>
            <CardDescription>
              Enter the document details below to verify
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleVerification} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="documentNumber">Document Number</Label>
                <Input
                  id="documentNumber"
                  placeholder={placeholder}
                  value={documentNumber}
                  onChange={(e) => setDocumentNumber(e.target.value.toUpperCase())}
                  pattern={pattern}
                  className="uppercase"
                  disabled={isLoading || verificationResult !== null}
                  autoFocus
                />
                <p className="text-xs text-muted-foreground">
                  This verification will deduct {credits} credits from your account
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4" />
                <span>All verifications are secure and private</span>
              </div>
              
              <Button 
                type="submit" 
                className="w-full kyc-btn-primary"
                disabled={isLoading || verificationResult !== null}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Document"
                )}
              </Button>
            </form>
            
            {verificationResult && (
              <div className={`mt-6 p-4 rounded-lg ${
                verificationResult.verified 
                  ? "bg-green-50 border border-green-200" 
                  : "bg-red-50 border border-red-200"
              }`}>
                <div className="flex items-start gap-3">
                  {verificationResult.verified ? (
                    <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-red-600 mt-0.5" />
                  )}
                  <div>
                    <h3 className={`font-medium ${
                      verificationResult.verified ? "text-green-800" : "text-red-800"
                    }`}>
                      {verificationResult.verified ? "Verification Successful" : "Verification Failed"}
                    </h3>
                    <p className={`text-sm ${
                      verificationResult.verified ? "text-green-700" : "text-red-700"
                    }`}>
                      {verificationResult.message}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between border-t pt-6">
            <Button 
              variant="outline" 
              onClick={() => {
                setDocumentNumber("");
                setVerificationResult(null);
              }}
              disabled={isLoading}
            >
              Reset Form
            </Button>
            
            <Button 
              onClick={() => navigate("/verification-history")}
              disabled={isLoading}
            >
              View History
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default VerificationForm;
