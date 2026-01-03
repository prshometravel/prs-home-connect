import Link from "next/link";
export default function HomeownersPage() {
 return (
   <div className="p-8 text-center">
     <h1 className="text-3xl font-bold 
text-gray-900">
        Homeowners
      </h1>

       <p className="mt-4 text-gray-600">
         Request trusted professionals for 
your home projects.
      </p>
  
       
    <div className="mt-8"> 
      <Link
        href="/post-job"
        className="px-6 py-3 bg-black
    text-white rounded-md inline-block"
      >
        Post a Job
      </Link>
          
    </div>
   </div>
   );
 }


    
