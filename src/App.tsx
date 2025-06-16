import { Search } from "lucide-react";
import HeaderApp from "./components/layout/HeaderApp";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import CardGame from "./components/CardGame";

function App() {
  return (
    <div className="flex flex-col">
      <HeaderApp />

      <p className="text-center text-3xl mt-5 max-sm:mt-10">Information about video games</p>

      <div className="mt-10 self-center flex w-full max-w-sm items-center gap-2">
        <Input type="email" placeholder="Search game" />
        <Button type="submit" variant="outline" className="cursor-pointer">
          <Search />
        </Button>
      </div>

      <div className="mt-20 self-center">
        <p>Popular games</p>
        <div className="mt-2 mb-20 grid grid-cols-4 gap-4 max-sm:grid-cols-3 max-sm:gap-2">
          <CardGame />
          <CardGame />
          <CardGame />
          <CardGame />
          <CardGame />
          <CardGame />
          <CardGame />
          <CardGame />
        </div>
      </div>
    </div>
  );
}

export default App;
