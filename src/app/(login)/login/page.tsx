import AuthForm from "@/app/components/AuthForm";
import Logo from "@/app/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react"; // Adding Cpu icon from lucide-react
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-100 to-lime-200 px-4">
      <Card className="max-w-96">
        <CardHeader>
          <Logo />
          <CardDescription className="text-center font-medium text-balance">
            Your personal AI assistant, powered by{" "}
            <Button asChild variant={"link"} className="px-0">
              <Link
                href="https://gemini.google.com/"
                target="_blank"
                className="gap-0"
              >
                Gemini{<ArrowUpRight />}
              </Link>
            </Button>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm />
        </CardContent>
        <CardFooter className="text-sm text-center font-medium text-muted-foreground">
          <p>
            Use responsibly. This is just a practice project. AI will make
            things up, be sure to verify.{" "}
            <strong className="text-destructive">
              Do not share sensitive info.
            </strong>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
