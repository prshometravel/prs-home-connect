import Image from "next/image";

export default function Home() {
  return (
  

      <div className="text-center p-6">
       <Image
         src="/next.svg"
         alt="PRS Home Connect logo"
         width={120}
         height={120}
         priority
       />
       <h1 className="mt-6 text-3xl
font-bold text-gray-900">
          PRS Home Connect LIVE
        </h1>
         
        <p className="mt-2 text-gray-600">
          Connecting homeowners with 
trusted professionals 
        </p>
      </div>
    
   );
 }              
