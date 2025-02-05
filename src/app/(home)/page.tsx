import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center px-6 relative">
      <div
        className="absolute inset-0 animate-grid-fade"
        style={{
          backgroundImage: `url("/grid.svg")`,
        }}
      />
      <div className="mb-8 max-w-xl text-center text-balance">
        <h1 className="text-4xl font-bold mb-2 text-lime-900">
          Experience Gemini's Intelligence
        </h1>
        <p className="text-lg text-lime-700">
          Unlock powerful conversations with Google's most advanced AI. Code,
          create, analyze and learn - all in one place.
        </p>
      </div>
      <Button className="relative bg-lime-600 hover:bg-lime-700 scale-125">
        Start a new chat
      </Button>
    </main>
  );
}
