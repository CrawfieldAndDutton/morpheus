import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  FileText,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import { verifyApi } from "@/apis/modules/verify";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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
    errorMessage: "Please enter a valid 10-character PAN (e.g., ABCDE1234F)",
  },
  aadhaar: {
    title: "Aadhaar Verification",
    description: "Verify Aadhaar Number",
    placeholder: "1234 5678 9012",
    icon: <CreditCard className="h-8 w-8" />,
    pattern: "^[0-9]{12}$",
    credits: 10,
    validation: (value: string) => /^[0-9]{12}$/.test(value.replace(/\s/g, "")),
    errorMessage: "Please enter a valid 12-digit Aadhaar number",
  },
  voter: {
    title: "Voter ID Verification",
    description: "Verify Voter Identity Card",
    placeholder: "ABC1234567",
    icon: <CreditCard className="h-8 w-8" />,
    pattern: "^[A-Z]{3}[0-9]{7}$",
    credits: 7,
    validation: (value: string) => /^[A-Z]{3}[0-9]{7}$/.test(value),
    errorMessage: "Please enter a valid Voter ID (e.g., ABC1234567)",
  },
  vehicle: {
    title: "Vehicle RC Verification",
    description: "Verify Registration Certificate",
    placeholder: "MH01AB1234/21BH0000A",
    icon: <FileText className="h-8 w-8" />,
    pattern:
      "^(?:[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}||[0-9]{2}[A-Z]{2}[0-9]{4}[A-Z]{1})$",
    credits: 15,
    validation: (value: string) =>
      /^(?:[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}||[0-9]{2}[A-Z]{2}[0-9]{4}[A-Z]{1})$/.test(
        value
      ),
    errorMessage:
      "Please enter a valid RC number (e.g., MH01AB1234, 21BH0000A)",
  },
  passport: {
    title: "Passport Verification",
    description: "Verify Passport Details",
    placeholder: "",
    fileNumberPlaceholder: "File Number",
    dobPlaceholder: "DD/MM/YYYY",
    namePlaceholder: "Full Name",
    icon: <CreditCard className="h-8 w-8" />,
    pattern: "^[A-Z]{1}[0-9]{7}$",
    fileNumberPattern: "^[A-Z0-9]+$",
    dobPattern: "^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/[0-9]{4}$",
    namePattern: "^[a-zA-Z ]+$",
    credits: 20,
    validation: (value: string) => /^[A-Z]{1}[0-9]{7}$/.test(value),
    fileNumberValidation: (value: string) => /^[A-Z]{2}\d{13}$/.test(value),
    dobValidation: (value: string) => /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/[0-9]{4}$/.test(value),
    nameValidation: (value: string) => /^[a-zA-Z ]+$/.test(value),
    errorMessage: "Please enter a valid passport number (e.g., A1234567)",
    fileNumberErrorMessage: "Please enter a valid file number",
    dobErrorMessage: "Please enter a valid date of birth (e.g., 01/01/2000)",
    nameErrorMessage: "Please enter a valid name",
  },
  dl: {
    title: "Driving Licence Verification",
    description: "Verify Driving Licence Details",
    placeholder: "AB1122334455667",
    dobPlaceholder: "DD/MM/YYYY",
    icon: <FileText className="h-8 w-8" />,
    pattern: "^(?:[A-Z]{2}[0-9]{13})$",
    dobPattern: "^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/[0-9]{4}$",
    credits: 15,
    validation: (value: string) => /^(?:[A-Z]{2}[0-9]{13})$/.test(value),
    dobValidation: (value: string) => 
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/[0-9]{4}$/.test(value),
    errorMessage: "Please enter a valid Driving Licence number (e.g., MH0320080022135)",
    dobErrorMessage: "Please enter a valid date of birth (e.g., 01/01/2000)",
  },
};

type VerificationType = keyof typeof verificationTypes;

const VerificationForm: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dob, setDob] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [fileNumber, setFileNumber] = useState("");
  const [name, setName] = useState("");

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

  useEffect(() => {
    console.log(verificationResult, "Verification Result");
  }, [verificationResult]);

  // If type is not defined or invalid, return null
  if (!type || !Object.keys(verificationTypes).includes(type)) {
    return null;
  }

  const verificationType = type as VerificationType;
  const verificationConfig = verificationTypes[verificationType];
  
  // Destructure common properties
  const {
    title,
    description,
    placeholder,
    icon,
    pattern,
    credits,
    validation,
    errorMessage,
  } = verificationConfig;
  
  // Get dob-related properties only if they exist (for driving license,passport)
  const dobPlaceholder = verificationType === 'dl' || verificationType === 'passport' ? verificationTypes[verificationType].dobPlaceholder : undefined;
  const dobPattern = verificationType === 'dl' || verificationType === 'passport' ? verificationTypes[verificationType].dobPattern : undefined;
  const dobValidation = verificationType === 'dl' || verificationType === 'passport' ? verificationTypes[verificationType].dobValidation : undefined;
  const dobErrorMessage = verificationType === 'dl' || verificationType === 'passport' ? verificationTypes[verificationType].dobErrorMessage : undefined;

  //Get passport-related properties only if they exist (for passport)
  const fileNumberPlaceholder = verificationType === 'passport' ? verificationTypes.passport.fileNumberPlaceholder : undefined;
  const fileNumberPattern = verificationType === 'passport' ? verificationTypes.passport.fileNumberPattern : undefined;
  const namePlaceholder = verificationType === 'passport' ? verificationTypes.passport.namePlaceholder : undefined;
  const fileNumberValidation = verificationType === 'passport' ? verificationTypes.passport.fileNumberValidation : undefined;
  const fileNumberErrorMessage = verificationType === 'passport' ? verificationTypes.passport.fileNumberErrorMessage : undefined;
  const nameValidation = verificationType === 'passport' ? verificationTypes.passport.nameValidation : undefined;
  const nameErrorMessage = verificationType === 'passport' ? verificationTypes.passport.nameErrorMessage : undefined;
  const namePattern = verificationType === 'passport' ? verificationTypes.passport.namePattern : undefined;


  const handleVerification = async (e: React.FormEvent) => {
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
    
    // Check DOB validation for DL verification
    if (verificationType === "dl") {
      if (!dob) {
        toast({
          title: "Date of Birth Required",
          description: "Please enter your date of birth for DL verification.",
          variant: "destructive",
        });
        return;
      }
      
      if (!dobValidation(dob)) {
        toast({
          title: "Invalid Date of Birth",
          description: dobErrorMessage,
          variant: "destructive",
        });
        return;
      }
    }
    // Check file number, dob, name for passport verification
    if (verificationType === "passport") {
      if (!fileNumber) {
        toast({
          title: "File Number Required",
          description: "Please enter your file number for passport verification.",
          variant: "destructive",
        });
        return;
      }
    
      if (!fileNumberValidation(fileNumber)) {
        toast({
          title: "Invalid File Number",
          description: fileNumberErrorMessage,
          variant: "destructive",
        });
        return;
      }
    
      if (!dob) {
        toast({
          title: "Date of Birth Required",
          description: "Please enter your date of birth for passport verification.",
          variant: "destructive",
        });
        return;
      }
    
      if (!dobValidation(dob)) {
        toast({
          title: "Invalid Date of Birth",
          description: dobErrorMessage,
          variant: "destructive",
        });
        return;
      }
    
      if (!name) {
        toast({
          title: "Name Required",
          description: "Please enter your name for passport verification.",
          variant: "destructive",
        });
        return;
      }
    
      if (!nameValidation(name)) {
        toast({
          title: "Invalid Name",
          description: nameErrorMessage,
          variant: "destructive",
        });
        return;
      }
    }

    setIsLoading(true);
    setVerificationResult(null);
    
    try {
      let response;
      switch (verificationType) {
        case "pan":
          response = await verifyApi.pan({ pan: documentNumber });
          break;

        case "vehicle":
          response = await verifyApi.vehicle({ reg_no: documentNumber });
          break;

        case "voter":
          response = await verifyApi.voter({ epic_no: documentNumber });
          break;

        case "dl":
          response = await verifyApi.dl({ dl_no: documentNumber, dob });
          break;

        case "aadhaar":
          // Add implementation for Aadhaar verification
          throw new Error("Aadhaar verification not implemented yet");
          break;

        case "passport":
          response = await verifyApi.passport({ file_number: fileNumber, dob, name });
          break;

        default:
          throw new Error("Unsupported verification type");
      }

      setVerificationResult(response.data);
      toast({
        title: response.data.status === "success" ? "Verified" : "Verification Failed",
        description: response.data.status === "success"
          ? "The Document is successfully verified."
          : "The provided Document could not be verified.",
        variant: response.data.status === "success" ? "default" : "destructive",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message ||
          "An error occurred during verification.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <Button
            variant="outline"
            className="mb-4"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
          </Button>

          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">{icon}</div>
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
      {verificationType !== "passport" && (
        <>
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
        </>
      )}

      {verificationType === "dl" && (
        <div className="mt-4 space-y-1">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            id="dob"
            placeholder={dobPlaceholder}
            type="text"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            pattern={dobPattern}
            disabled={isLoading || verificationResult !== null}
          />
        </div>
      )}

      {verificationType === "passport" && (
        <>
          <div className="mt-4 space-y-1">
            <Label htmlFor="fileNumber">File Number</Label>
            <Input
              id="fileNumber"
              placeholder={fileNumberPlaceholder}
              type="text"
              value={fileNumber}
              onChange={(e) => setFileNumber(e.target.value)}
              pattern={fileNumberPattern}
              disabled={isLoading || verificationResult !== null}
            />
          </div>
          <div className="mt-4 space-y-1">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              placeholder={dobPlaceholder}
              type="text"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              pattern={dobPattern}
              disabled={isLoading || verificationResult !== null}
            />
          </div>
          <div className="mt-4 space-y-1">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder={namePlaceholder}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              pattern={namePattern}
              disabled={isLoading || verificationResult !== null}
            />
          </div>
        </>
      )}

      <p className="text-xs text-muted-foreground mt-2">
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
    <Card className="mt-4">
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">Document Details</h1>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/2 shadow-md rounded-lg p-4 bg-white">
            <h2 className="text-lg font-semibold mb-2">Details Response</h2>
            <table className="w-full border border-gray-300">
              {(() => {
                switch (verificationType) {
                  case "pan":
                    return (
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-medium bg-gray-100">Name</td>
                          <td className="p-2">

                            {verificationResult?.result?.full_name || "N/A"}
                            {console.log("hi"+verificationResult?.result)}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium bg-gray-100">Pan</td>
                          <td className="p-2">
                            {verificationResult?.result?.pan || "N/A"}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium bg-gray-100">Type</td>
                          <td className="p-2">
                            {verificationResult?.result?.pan_type || "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium bg-gray-100">Status</td>
                          <td className="p-2">
                            {verificationResult?.result?.pan_status || "N/A"}
                          </td>
                        </tr>
                      </tbody>
                    );
                  case "voter":
                    return (
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-medium bg-gray-100">Name</td>
                          <td className="p-2">
                            {verificationResult?.result?.full_name || "N/A"}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium bg-gray-100">Age</td>
                          <td className="p-2">
                            {verificationResult?.result?.age || "N/A"}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium bg-gray-100">State Name</td>
                          <td className="p-2">
                            {verificationResult?.result?.address?.state_name || "N/A"}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium bg-gray-100">District Name</td>
                          <td className="p-2">
                            {verificationResult?.result?.address?.district_name || "N/A"}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium bg-gray-100">Gender</td>
                          <td className="p-2">
                            {verificationResult?.result?.gender || "N/A"}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium bg-gray-100">Parliamentary Name</td>
                          <td className="p-2">
                            {verificationResult?.result?.parliamentary_name || "N/A"}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium bg-gray-100">Assembly Name</td>
                          <td className="p-2">
                            {verificationResult?.result?.assembly_name || "N/A"}
                          </td>
                        </tr>
                      </tbody>
                    );
                  case "vehicle":
                    return (
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-medium bg-gray-100">Name</td>
                          <td className="p-2">
                            {verificationResult?.result?.owner_name || "N/A"}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium bg-gray-100">State Name</td>
                          <td className="p-2">
                            {verificationResult?.result?.current_state_name || "N/A"}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium bg-gray-100">District Name</td>
                          <td className="p-2">
                            {verificationResult?.result?.permanent_district_name || "N/A"}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium bg-gray-100">RTO Name</td>
                          <td className="p-2">
                            {verificationResult?.result?.office_name || "N/A"}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium bg-gray-100">Vehicle Class</td>
                          <td className="p-2">
                            {verificationResult?.result?.vehicle_class_desc || "N/A"}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium bg-gray-100">Model</td>
                          <td className="p-2">
                            {verificationResult?.result?.model || "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium bg-gray-100">Color</td>
                          <td className="p-2">
                            {verificationResult?.result?.color || "N/A"}
                          </td>
                        </tr>
                      </tbody>
                    );
                  case "passport":
                    return (
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-medium bg-gray-100">Name</td>
                          <td className="p-2">
                            {verificationResult?.result?.name || "N/A"}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium bg-gray-100">Date of Birth</td>
                          <td className="p-2">
                            {verificationResult?.result?.dob || "N/A"}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium bg-gray-100">Passport Number</td>
                          <td className="p-2">
                            {verificationResult?.result?.dl_number || "N/A"}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium bg-gray-100">Issue Date</td>
                          <td className="p-2">
                            {verificationResult?.result?.issue_date || "N/A"}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium bg-gray-100">Expiry Date</td>
                          <td className="p-2">
                            {verificationResult?.result?.expiry_date || "N/A"}
                          </td>
                        </tr>
                      </tbody>
                    );
                  default:
                    return (
                      <tbody>
                        <tr>
                          <td className="p-2">No data available</td>
                        </tr>
                      </tbody>
                    );
                }
              })()}
            </table>
          </div>

          <div className="w-full md:w-1/2 shadow-md rounded-lg p-4 bg-gray-50">
            <h2 className="text-lg font-semibold mb-2">Full API Response</h2>
            <SyntaxHighlighter
              language="json"
              style={atomDark}
              className="rounded-md p-2"
            >
              {JSON.stringify(verificationResult, null, 2)}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </Card>
  )}

  {verificationResult && (
    <div
      className={`mt-6 p-4 rounded-lg ${
        verificationResult.status === "success"
          ? "bg-green-50 border border-green-200"
          : "bg-red-50 border border-red-200"
      }`}
    >
      <div className="flex items-start gap-3">
        {verificationResult.status === "success" ? (
          <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
        ) : (
          <AlertCircle className="h-6 w-6 text-red-600 mt-0.5" />
        )}
        <div>
          <h3
            className={`font-medium ${
              verificationResult.status === "success"
                ? "text-green-800"
                : "text-red-800"
            }`}
          >
            {verificationResult.status === "success"
              ? "Verification Successful"
              : "Verification Failed"}
          </h3>
          <p
            className={`text-sm ${
              verificationResult.status === "success"
                ? "text-green-700"
                : "text-red-700"
            }`}
          >
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
                setDob("");
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