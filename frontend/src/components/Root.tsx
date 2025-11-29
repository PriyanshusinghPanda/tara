import { Outlet } from "react-router";

export default function Root() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-background">
      <div className="w-full max-w-[360px] h-[800px] bg-white relative overflow-hidden shadow-2xl">
        <Outlet />
      </div>
    </div>
  );
}
