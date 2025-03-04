"use client";
import Image from "next/image";
import { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter(); // Initialize Next.js router

  // Save user input during the session (start)
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState(""); // Store input
  const [phoneNumber, setPhoneNumber] = useState(""); // Store input
  const [sessionData, setSessionData] = useState({}); // Store all session data

  // Handle input changes
  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhoneNumber(value);
  };

  // Save data
  const handleSave = async () => {
    if (!userName.trim()) {
      setError("Name is required!");
      return;
    }
    setError(null); // Clear errors before making request

    try {
      const response = await fetch("/api/saveUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          phoneNumber: phoneNumber || "Not provided",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Backend Response:", data);
        setSessionData({ userName, phoneNumber });
        router.push(`/chat?name=${encodeURIComponent(userName)}`); // Navigate to /chat with userName
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Failed to send data:", error);
      setError("Something went wrong. Please try again.");
    }
  };
  //  Save user input during the session (end)

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <Card className="">
            <div className="">
              <CardHeader>
                <CardTitle className="text-3xl text-center">
                  We are here for you!
                </CardTitle>
                <CardDescription className="text-center">
                  Enter the fields and chat away!
                </CardDescription>
              </CardHeader>
            </div>
            <CardContent className="flex flex-col gap-4">
              <p>We would like to know you better</p>
              <Input
                className="focus:outline-none focus:ring-2 focus:border-indigo-600 hover:border-indigo-600"
                placeholder="Enter your name"
                value={userName}
                onChange={handleUserNameChange}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <p>
                In case you need help, enter the phone number of someone you
                trust (Optional)
              </p>
              <Input
                className="focus:outline-none focus:ring-2 focus:border-indigo-600 hover:border-indigo-600"
                type="tel"
                placeholder="(123) 456-7890"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                maxLength={10}
              />
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white hover:text-white"
                variant="outline"
                onClick={handleSave}
              >
                Start
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
function setError(arg0: string) {
  throw new Error("Function not implemented.");
}
