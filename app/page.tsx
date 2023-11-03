import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import { LogInIcon } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
            <UserButton afterSignOutUrl="/" />
          </div>

          <p className="max-w-xl mt-1 text-lg text-slate-600">
            Join millions of students, teachers, and researchers to understand
            your PDF better with AI.
          </p>

          <div className="flex mt-2">
            {isAuth && <Button>Go to Chats</Button>}
          </div>
          <div className="flex mt-2">
            {isAuth && (
              <Button>
                Join Million of Students who want to make the world a much
                better place
              </Button>
            )}
          </div>
          <div className="flex mt-2">
            {isAuth && (
              <Button>
                You can even go to chats a try to build something incredible
                that you just absoltuely love.
              </Button>
            )}
          </div>
          <div className="flex mt-2">
            {isAuth && (
              <Button>
                You can even go to chats a try to build something incredible
                that you just absoltuely love.
              </Button>
            )}
          </div>
          <div className="flex mt-2">
            {isAuth && (
              <Button>
                This is day 0 of Porject goggins where I iwll go ahgea dand ada build a;ba <a href=""></a>
              </Button>
            )}
          </div>

          <div className="w-full mt-4">
            {isAuth ? (
              <h1>File Upload</h1>
            ) : (
              <Link href="/sign-in">
                <Button>
                  {" "}
                  <LogInIcon className="mr-2 w-4 h-4" />
                  Login to Get Started!
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
