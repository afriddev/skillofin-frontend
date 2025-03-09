import { useAppContext } from "@/utiles/AppContext";
import { CiBank } from "react-icons/ci";
function LoansPage() {
  const { userRole } = useAppContext();

  return (
    <div>
      <div className="w-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center gap-3 text-black rounded-t-xl text-xl font-semibold px-6 py-3">
        <CiBank className="text-2xl" />
        {userRole === "FREELANCER" ? "Loans for you" : "Recent loans"}
      </div>

      {/* Body */}
      <div className="text-foreground px-6 py-4">
        <p className="mb-3 text-lg font-medium ">
          Explore our exclusive loan options:
        </p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-md   ">
          <li>Personal Loan – Low interest rates</li>
          <li>Home Loan – Flexible repayment plans</li>
          <li>Education Loan – Empower your future</li>
        </ul>

        {/* <div className="mt-6 flex justify-center">
               <Button
                 onClick={() => {
                   // e.g., router.push("/loans");
                 }}
                 variant="default"
               >
                 View All Loans
               </Button>
             </div> */}
      </div>
    </div>
  );
}

export default LoansPage;
