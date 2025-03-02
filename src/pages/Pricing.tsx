
import React from "react";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 md:pt-28">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Simple, Transparent Pricing
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Purchase credits in advance and use them as needed for different verification types. 
                No hidden fees, no contracts, just pay for what you use.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`relative rounded-xl overflow-hidden border transition-all ${
                    plan.popular ? 'shadow-lg border-primary' : 'shadow-sm'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-xs font-medium px-3 py-1 text-primary-foreground">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline mb-4">
                      <span className="text-3xl font-bold">₹{plan.price}</span>
                      <span className="text-muted-foreground ml-2">one-time</span>
                    </div>
                    <p className="text-muted-foreground mb-6">{plan.description}</p>
                    
                    <Link to="/register">
                      <Button 
                        className="w-full mb-6" 
                        variant={plan.popular ? "default" : "outline"}
                      >
                        Get Started
                      </Button>
                    </Link>
                    
                    <div className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-primary shrink-0 mr-3" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-muted p-6 border-t">
                    <h4 className="font-medium mb-3">Credit Consumption:</h4>
                    <div className="space-y-2 text-sm">
                      {creditConsumption.map((item, i) => (
                        <div key={i} className="flex justify-between">
                          <span className="text-muted-foreground">{item.type}</span>
                          <span>{item.credits} credits</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 bg-card rounded-xl p-8 border shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b pb-6 last:border-b-0">
                    <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const pricingPlans = [
  {
    name: "Starter",
    price: "2,999",
    description: "Perfect for small businesses just starting with KYC verification.",
    popular: false,
    features: [
      "500 Verification Credits",
      "All Verification Types",
      "API Access",
      "24/7 Email Support",
      "CSV/PDF Verification Reports",
      "30-Day History"
    ]
  },
  {
    name: "Business",
    price: "9,999",
    description: "Ideal for growing businesses with regular verification needs.",
    popular: true,
    features: [
      "2,000 Verification Credits",
      "All Verification Types",
      "API Access",
      "Priority Support",
      "CSV/PDF Verification Reports",
      "90-Day History",
      "Batch Verification Upload"
    ]
  },
  {
    name: "Enterprise",
    price: "24,999",
    description: "For businesses with high-volume verification requirements.",
    popular: false,
    features: [
      "6,000 Verification Credits",
      "All Verification Types",
      "Advanced API Access",
      "Dedicated Account Manager",
      "CSV/PDF Verification Reports",
      "1-Year History",
      "Batch Verification Upload",
      "Custom Integration Support"
    ]
  }
];

const creditConsumption = [
  { type: "PAN Verification", credits: 5 },
  { type: "Aadhaar Verification", credits: 10 },
  { type: "Voter ID Verification", credits: 8 },
  { type: "Vehicle RC Verification", credits: 12 },
  { type: "Passport Verification", credits: 15 }
];

const faqs = [
  {
    question: "Do credits expire?",
    answer: "No, your purchased credits never expire. You can use them at your own pace."
  },
  {
    question: "Can I upgrade my plan later?",
    answer: "Yes, you can purchase additional credits or upgrade to a higher plan at any time."
  },
  {
    question: "How secure is the verification process?",
    answer: "We use industry-standard encryption and security protocols to ensure all verification data is protected. We are compliant with all relevant regulations."
  },
  {
    question: "Do you offer volume discounts?",
    answer: "Yes, for businesses requiring more than 6,000 credits, please contact our sales team for custom enterprise pricing."
  },
  {
    question: "How quickly will I get verification results?",
    answer: "Most verifications are completed within seconds. Complex cases might take up to a few minutes."
  }
];

export default Pricing;
