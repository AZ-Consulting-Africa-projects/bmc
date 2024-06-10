import Chat from "./components/Chat";
import Navbar from "./components/Navbar";
import Sidbar from "./components/Sidbar";

export default function PagesLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <main className={""}>
          <Navbar />
          
          <div className="flex justify-between content-between ">
            <Sidbar />
            <div className="w-full md:ml-[270px] mt-10 mx-4">
                {children}
                <Chat />
            </div>
            
          </div>
              
             
        </main>
      
    );
  }
  