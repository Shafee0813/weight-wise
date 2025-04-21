import { AddWeightDialog } from "@/components/AddWeightDialog";
import { WeightChart } from "@/components/WeightChart";
import WeightTable from "@/components/WeightTable";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";


const page = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <section className="font-">
      <div className="p-8 heading-text font-semibold bg-[#F5F5F5] text-black dark:bg-[#101010] dark:text-white border-b flex justify-between items-center flex-wrap">
        <h1 className="pr-4 max-sm:pb-4"> Hello {user.firstName} 👋</h1>
        <div className="flex max-sm:w-full max-sm:justify-end">
          <AddWeightDialog />
        </div>
      </div>
      <WeightTable />
      
      <h1 className="heading-text font-bold p-4 pb-8 max-md:p-2 max-md:pb-4"> Your weight graph</h1>
      <WeightChart/>
    </section>
  )
}
export default page