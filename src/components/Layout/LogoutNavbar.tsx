import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { authApi } from "@/apis/modules/auth";
import { useDispatch } from "react-redux";
import { logout } from "@/store/userSlice";

const LogoutNavbar: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch();

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await authApi.logout({refresh_token: localStorage.getItem("refreshToken")});
      dispatch(logout());
      toast({
        title: "Logged Out",
        description: "You have successfully logged out.",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Logout Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 py-4 bg-background/80 backdrop-blur-md border-b shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <Avatar>
              <AvatarImage src="/path-to-user-image.jpg" alt="User" />
              <AvatarFallback className="bg-gray-500 text-white">U</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default LogoutNavbar;