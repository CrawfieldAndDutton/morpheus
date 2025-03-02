
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, CreditCard, Shield, ArrowRight, Check, Loader2 } from "lucide-react";

const CreditPurchase: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Simulated data - in a real app, this would come from your API
  const creditPackages = [
    {
      id: "basic",
      name: "Basic",
      credits: 100,
      price: 499,
      perCredit: 4.99,
      popular: false
    },
    {
      id: "standard",
      name: "Standard",
      credits: 500,
      price: 1999,
      perCredit: 3.99,
      popular: true
    },
    {
      id: "premium",
      name: "Premium",
      credits: 1000,
      price: 3499,
      perCredit: 3.49,
      popular: false
    },
    {
      id: "enterprise",
      name: "Enterprise",
      credits: 5000,
      price: 14999,
      perCredit: 2.99,
      popular: false
    }
  ];
  
  const handlePurchase = () => {
    if (!selectedPlan) {
      toast({
        title: "No Plan Selected",
        description: "Please select a credit package to continue.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Purchase Successful",
        description: "Your credits have been added to your account.",
      });
      
      navigate("/dashboard");
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Purchase Credits</h1>
          <p className="text-muted-foreground">
            Buy verification credits to use for your KYC processes
          </p>
        </div>
        
        <Tabs defaultValue="packages" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="packages">Credit Packages</TabsTrigger>
            <TabsTrigger value="subscription">Subscription Plans</TabsTrigger>
          </TabsList>
          
          <TabsContent value="packages" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {creditPackages.map((pkg) => (
                <Card 
                  key={pkg.id}
                  className={`relative overflow-hidden ${
                    selectedPlan === pkg.id 
                      ? "border-primary ring-1 ring-primary" 
                      : "hover:border-primary/50"
                  } cursor-pointer transition-all`}
                  onClick={() => setSelectedPlan(pkg.id)}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-md">
                        POPULAR
                      </div>
                    </div>
                  )}
                  
                  <CardHeader className="pb-4">
                    <CardTitle>{pkg.name}</CardTitle>
                    <CardDescription>
                      {pkg.credits} verification credits
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pb-4">
                    <div className="flex items-baseline mb-1">
                      <span className="text-3xl font-bold">₹{pkg.price}</span>
                      <span className="text-muted-foreground ml-1">one-time</span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-4">
                      (₹{pkg.perCredit} per credit)
                    </div>
                    
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span>{pkg.credits} verification credits</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span>Never expires</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span>All verification methods</span>
                      </li>
                    </ul>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className={`w-full ${selectedPlan === pkg.id ? "kyc-btn-primary" : "variant-outline"}`}
                      variant={selectedPlan === pkg.id ? "default" : "outline"}
                    >
                      {selectedPlan === pkg.id ? "Selected" : "Select Package"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <Card className="mt-8">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Payment Information</CardTitle>
                <CardDescription>
                  Secure payment processing by our payment gateway
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center mb-6">
                  <Shield className="h-6 w-6 text-green-600 mr-2" />
                  <span className="text-sm text-muted-foreground">
                    Your payment information is encrypted and secure
                  </span>
                </div>
                
                <div className="p-4 bg-muted rounded-lg mb-4">
                  <h3 className="font-medium mb-2">Order Summary</h3>
                  {selectedPlan ? (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>{creditPackages.find(p => p.id === selectedPlan)?.name} Package</span>
                        <span>₹{creditPackages.find(p => p.id === selectedPlan)?.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Credits</span>
                        <span>{creditPackages.find(p => p.id === selectedPlan)?.credits} credits</span>
                      </div>
                      <div className="flex justify-between font-medium pt-2 border-t">
                        <span>Total</span>
                        <span>₹{creditPackages.find(p => p.id === selectedPlan)?.price}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-muted-foreground">
                      Please select a package to see the order summary
                    </div>
                  )}
                </div>
                
                {/* Payment form would go here in a real application */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button disabled className="bg-gray-200 text-gray-400 cursor-not-allowed">Credit Card</Button>
                    <Button disabled className="bg-gray-200 text-gray-400 cursor-not-allowed">UPI</Button>
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    This is a demo application. In a real application, this would be connected to a payment gateway.
                  </p>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full kyc-btn-primary"
                  onClick={handlePurchase}
                  disabled={!selectedPlan || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Complete Purchase <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="subscription" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plans</CardTitle>
                <CardDescription>
                  Coming soon! Subscribe to get a regular allocation of credits each month.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center py-8">
                <CreditCard className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Subscription Plans Coming Soon</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  We're working on monthly subscription plans that will provide you with a 
                  regular allocation of credits at a discounted rate.
                </p>
                <Button variant="outline" disabled>
                  Notify me when available
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreditPurchase;
