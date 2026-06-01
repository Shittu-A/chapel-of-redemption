import { Metadata } from "next";
import Hero from "@/components/hero";
import StaffCard from "@/components/staff-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Our Staff | Chapel of Redemption ABU Samaru",
  description: "Meet the dedicated staff and leadership team of Chapel of Redemption ABU Samaru. Current staff, chaplaincy, and honored past members.",
  keywords: ["Chapel of Redemption", "staff", "leadership", "pastors", "chaplaincy", "ABU Samaru"],
};

const currentStaff = [
  { id: "1", name: "Rev. Dr. John Smith", role: "Senior Pastor", yearsOfService: "15 years" },
  { id: "2", name: "Rev. Mary Johnson", role: "Associate Pastor", yearsOfService: "8 years" },
  { id: "3", name: "Deacon David Williams", role: "Youth Coordinator", yearsOfService: "5 years" },
  { id: "4", name: "Sister Sarah Brown", role: "Choir Director", yearsOfService: "12 years" },
  { id: "5", name: "Brother Michael Davis", role: "Sunday School Superintendent", yearsOfService: "7 years" },
  { id: "6", name: "Sister Grace Okonkwo", role: "Women's Fellowship Leader", yearsOfService: "6 years" },
];

const chaplaincy = [
  { id: "c1", name: "Chaplain Emmanuel Adeyemi", role: "University Chaplain", yearsOfService: "10 years" },
  { id: "c2", name: "Rev. Dr. Patricia Okafor", role: "Assistant Chaplain", yearsOfService: "4 years" },
  { id: "c3", name: "Brother James Ibrahim", role: "Student Ministries Coordinator", yearsOfService: "3 years" },
];

const pastMembers = [
  { id: "p1", name: "Rev. Dr. Samuel Adeleke", role: "Former Senior Pastor", yearsOfService: "1985 - 2010" },
  { id: "p2", name: "Rev. Elizabeth Nwosu", role: "Former Associate Pastor", yearsOfService: "1992 - 2015" },
  { id: "p3", name: "Deacon Thomas Adeyemi", role: "Former Church Administrator", yearsOfService: "1988 - 2018" },
  { id: "p4", name: "Sister Margaret Johnson", role: "Former Women's Leader", yearsOfService: "1995 - 2020" },
];

export default function StaffPage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero
        title="Our Staff"
        subtitle="Meet the dedicated team serving our church community with faith, passion, and commitment."
        backgroundColor="bg-stone-800"
        align="center"
        size="md"
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="mb-12 grid w-full max-w-lg mx-auto grid-cols-3 bg-stone-100 p-1 rounded-xl">
              <TabsTrigger
                value="current"
                className="rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-stone-900 data-[state=active]:shadow-sm transition-all"
              >
                Current Staff
              </TabsTrigger>
              <TabsTrigger
                value="chaplaincy"
                className="rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-stone-900 data-[state=active]:shadow-sm transition-all"
              >
                Chaplaincy
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-stone-900 data-[state=active]:shadow-sm transition-all"
              >
                Past Members
              </TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="mt-0">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-3">
                  Current Staff
                </h2>
                <p className="text-stone-600 max-w-2xl mx-auto">
                  Our dedicated team of ministers and workers serving the church community.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {currentStaff.map((staff) => (
                  <StaffCard key={staff.id} staff={staff} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="chaplaincy" className="mt-0">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-3">
                  Chaplaincy
                </h2>
                <p className="text-stone-600 max-w-2xl mx-auto">
                  Spiritual leaders serving the university community at ABU Samaru.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {chaplaincy.map((staff) => (
                  <StaffCard key={staff.id} staff={staff} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="past" className="mt-0">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-3">
                  Past Members
                </h2>
                <p className="text-stone-600 max-w-2xl mx-auto">
                  Honoring those who have faithfully served and laid the foundation for our ministry.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {pastMembers.map((staff) => (
                  <StaffCard key={staff.id} staff={staff} isPast />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
