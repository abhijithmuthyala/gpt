import { CardTitle } from "@/components/ui/card";
import { Cpu } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href={"/"}
      className="flex self-center items-center justify-center gap-2"
    >
      <Cpu className="h-8 w-8 text-lime-700" />
      <CardTitle className="text-3xl font-bold text-center text-lime-700">
        nanoGPT
      </CardTitle>
    </Link>
  );
}
