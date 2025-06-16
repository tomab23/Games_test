import {
  Card,
//   CardAction,
  CardContent,
//   CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import cover  from "../assets/Cover.jpg"

const CardGame = () => {
  return (
    <div>
      <Card className="xl:w-52 w-44 max-sm:w-28 hover:scale-105 hover:cursor-pointer py-5">
        <CardHeader className="max-sm:px-3">
          <CardTitle className="max-sm:text-xs">Fallout 4</CardTitle>
        </CardHeader>
        <CardContent className="max-sm:px-3 px-5">
          <img src={cover} alt="image cover game" />
        </CardContent>
        <CardFooter className="max-sm:px-3">
          <p className="text-sm max-sm:text-xs">Bethesda</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardGame;
