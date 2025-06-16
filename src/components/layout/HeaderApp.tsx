import { Gamepad } from "lucide-react"
import { ModeToggle } from "../mode-toggle"
// import { Button } from "../ui/button"

const HeaderApp = () => {
  return (
    <div className="flex justify-between 3xl:justify-around">
        <div className="flex justify-center items-center gap-2 p-2">
            <h1 className="text-3xl">Games</h1>
            <Gamepad />
        </div>

        <div className="flex justify-center items-center gap-4 p-2">
            {/* <Button>Click me</Button>
            <Button>Click me</Button> */}
            <ModeToggle />
        </div>
    </div>
  )
}

export default HeaderApp