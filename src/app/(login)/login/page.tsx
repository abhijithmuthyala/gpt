import { login, signup } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowUpRight, Cpu } from "lucide-react"; // Adding Cpu icon from lucide-react
import Link from "next/link";

const EMAIL_VALIDATION = {
  pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
  minLength: 5,
  maxLength: 50,
  title: "Please enter a valid email address",
};

const PASSWORD_VALIDATION = {
  pattern:
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{7,}$",
  minLength: 6,
  title:
    "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character and be at least 6 characters long",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-100 to-lime-200 px-4">
      <Card className="max-w-96">
        <CardHeader>
          <Link
            href={"/"}
            className="flex self-center items-center justify-center gap-2"
          >
            <Cpu className="h-8 w-8 text-lime-700" />
            <CardTitle className="text-3xl font-bold text-center text-lime-700">
              nanoGPT
            </CardTitle>
          </Link>
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
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="xyz@gmail.com"
                required
                pattern={EMAIL_VALIDATION.pattern}
                minLength={EMAIL_VALIDATION.minLength}
                maxLength={EMAIL_VALIDATION.maxLength}
                title={EMAIL_VALIDATION.title}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="* * * * * * * *"
                type="password"
                required
                pattern={PASSWORD_VALIDATION.pattern}
                minLength={PASSWORD_VALIDATION.minLength}
                title={PASSWORD_VALIDATION.title}
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-2 pt-4">
              <Button
                type="submit"
                formAction={login}
                className="w-full bg-lime-600 hover:bg-lime-700"
              >
                Log in
              </Button>
              <Button
                type="submit"
                formAction={signup}
                variant="outline"
                className="w-full"
              >
                Sign up
              </Button>
            </div>
          </form>
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
