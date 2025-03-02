
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, CreditCard, FileText, Search, Clock, Plus, BarChart } from "lucide-react";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // Simulated data - in a real app, this would come from your API
  const creditBalance = 1250;
  
  const verificationMethods = [
    {
      id: "pan",
      name: "PAN Verification",
      description: "Verify Permanent Account Number",
      icon: <FileText className="h-8 w-8 text-kycfabric-gold" />,
      credits: 5
    },
    {
      id: "aadhaar",
      name: "Aadhaar Verification",
      description: "Verify Aadhaar Number",
      icon: <CreditCard className="h-8 w-8 text-kycfabric-gold" />,
      credits: 10
    },
    {
      id: "voter",
      name: "Voter ID Verification",
      description: "Verify Voter Identity Card",
      icon: <CreditCard className="h-8 w-8 text-kycfabric-gold" />,
      credits: 7
    },
    {
      id: "vehicle",
      name: "Vehicle RC Verification",
      description: "Verify Registration Certificate",
      icon: <FileText className="h-8 w-8 text-kycfabric-gold" />,
      credits: 15
    },
    {
      id: "passport",
      name: "Passport Verification",
      description: "Verify Passport Details",
      icon: <CreditCard className="h-8 w-8 text-kycfabric-gold" />,
      credits: 20
    }
  ];
  
  const recentVerifications = [
    {
      id: "v1",
      type: "PAN",
      documentNumber: "ABCDE1234F",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      status: "Verified"
    },
    {
      id: "v2",
      type: "Aadhaar",
      documentNumber: "XXXX XXXX 5678",
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
      status: "Verified"
    },
    {
      id: "v3",
      type: "Passport",
      documentNumber: "J123456",
      timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000), // 3 days ago
      status: "Failed"
    }
  ];
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Manage your KYC verifications and credits</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => navigate("/verification-history")} 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Verification</span> History
            </Button>
            <Button
              onClick={() => navigate("/credit-purchase")}
              className="kyc-btn-primary flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Buy Credits
            </Button>
          </div>
        </div>
        
        {/* Credit Balance Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Credit Balance</CardTitle>
            <CardDescription>
              Your available verification credits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-10 w-10 text-kycfabric-gold mr-4" />
              <div>
                <div className="text-3xl font-bold">{creditBalance}</div>
                <div className="text-sm text-muted-foreground">Available Credits</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button 
              onClick={() => navigate("/credit-purchase")}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Purchase more credits
            </Button>
          </CardFooter>
        </Card>
        
        {/* Verification Methods Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Verification Methods</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {verificationMethods.map((method) => (
              <Card 
                key={method.id} 
                className="hover:border-primary transition-all cursor-pointer" 
                onClick={() => navigate(`/verification/${method.id}`)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    {method.icon}
                    <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                      {method.credits} credits
                    </div>
                  </div>
                  <CardTitle className="text-lg mt-2">{method.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {method.description}
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start p-0 text-primary hover:text-primary hover:bg-transparent"
                  >
                    Start verification →
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Recent Verifications */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Recent Verifications</h2>
            <Button 
              variant="link" 
              className="text-primary" 
              onClick={() => navigate("/verification-history")}
            >
              View all →
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">Type</th>
                      <th className="text-left p-4 font-medium">Document</th>
                      <th className="text-left p-4 font-medium">Date & Time</th>
                      <th className="text-left p-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentVerifications.map((verification) => (
                      <tr key={verification.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">{verification.type}</td>
                        <td className="p-4">{verification.documentNumber}</td>
                        <td className="p-4">{formatDate(verification.timestamp)}</td>
                        <td className="p-4">
                          <span 
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              verification.status === "Verified" 
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {verification.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {recentVerifications.length === 0 && (
                <div className="p-8 text-center">
                  <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <h3 className="font-medium text-lg mb-1">No verifications yet</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't performed any verifications yet.
                  </p>
                  <Button 
                    onClick={() => navigate("/verification/pan")} 
                    className="kyc-btn-primary"
                  >
                    Start your first verification
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
