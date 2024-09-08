import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="sticky flex justify-center w-full pb-4 top-4">
      <div className="flex items-center justify-between w-full max-w-sm gap-4 p-1 border rounded-full backdrop-blur-sm">
        <a
          href="https://github.com/Dhruv-Kapoor-1202/serving-md"
          target="_blank"
        >
          <Button variant={"outline"} size={"icon"} className="rounded-full">
            <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </a>
        <h1 className="font-mono text-lg ">Serve Markdown</h1>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
