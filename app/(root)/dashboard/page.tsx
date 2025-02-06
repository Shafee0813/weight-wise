import { AddWeightDialog } from "@/components/AddWeightDialog";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";


const page = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <section className="">
      <div className="p-8 heading-text font-semibold bg-[#101010] border-b flex justify-between items-center flex-wrap">
        <h1 className="pr-4 max-sm:pb-4"> Hello {user.firstName} 👋</h1>
        <div className="flex max-sm:w-full max-sm:justify-end">
          <AddWeightDialog />
        </div>
      </div>
    </section>
  )
}
export default page