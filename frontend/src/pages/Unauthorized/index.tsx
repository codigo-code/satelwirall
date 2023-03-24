import NavBar from "../../components/NavBar";
export const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full h-screen">
      <NavBar />
      <p className="text-3xl text-black">Unauthorized</p>
    </div>
  );
};

