import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Hero from "@/components/hero";
import TeamCard from "@/components/team-card";

interface TeamPageProps {
  params: Promise<{
    team: string;
  }>;
}

const teamsData: Record<string, {
  name: string;
  description: string;
  responsibilities: string[];
  members: { name: string; role: string; photoUrl?: string }[];
}> = {
  council: {
    name: "Church Council",
    description: "The Church Council serves as the spiritual and administrative leadership of Chapel of Redemption. Comprised of dedicated elders and leaders, the council provides vision, direction, and oversight to ensure the church fulfills its mission of spreading the Gospel and serving the community.",
    responsibilities: [
      "Spiritual oversight and pastoral care",
      "Strategic planning and vision casting",
      "Policy and doctrine guidance",
      "Conflict resolution and counseling",
      "Leadership development and mentoring",
    ],
    members: [
      { name: "Rev. Dr. John Smith", role: "Senior Pastor & Council Chairman" },
      { name: "Elder Michael Adeyemi", role: "Associate Pastor" },
      { name: "Elder Sarah Johnson", role: "Council Secretary" },
      { name: "Elder David Okonkwo", role: "Finance Committee Head" },
      { name: "Elder Grace Ibrahim", role: "Women's Ministry Representative" },
      { name: "Elder James Peters", role: "Youth Ministry Representative" },
    ],
  },
  deacons: {
    name: "Team of Deacons",
    description: "Our Deacons are servant-hearted individuals dedicated to meeting the practical and spiritual needs of our congregation. They serve as the bridge between the leadership and the church body, ensuring that no member is overlooked or in need.",
    responsibilities: [
      "Visiting sick and shut-in members",
      "Assisting with communion preparation",
      "Supporting families during bereavement",
      "Coordinating benevolence and outreach",
      "Facility maintenance oversight",
    ],
    members: [
      { name: "Bro. Emmanuel Adeleke", role: "Head Deacon" },
      { name: "Sis. Maryam Abdullahi", role: "Assistant Head Deaconess" },
      { name: "Bro. Samuel Chukwu", role: "Deacon" },
      { name: "Sis. Rebecca Ojo", role: "Deaconess" },
      { name: "Bro. Daniel Musa", role: "Deacon" },
      { name: "Sis. Patience Eze", role: "Deaconess" },
      { name: "Bro. Thomas Ibrahim", role: "Deacon" },
      { name: "Sis. Esther Nnamdi", role: "Deaconess" },
    ],
  },
  ushers: {
    name: "Team of Ushers",
    description: "The Ushers Team creates a warm, welcoming environment for everyone who enters our doors. They ensure that our services run smoothly and that every worshipper feels at home from the moment they arrive.",
    responsibilities: [
      "Greeting and welcoming worshippers",
      "Distributing bulletins and materials",
      "Seating assistance and crowd management",
      "Collecting offerings",
      "Maintaining order during services",
    ],
    members: [
      { name: "Bro. Victor Nwosu", role: "Chief Usher" },
      { name: "Sis. Blessing Adeyemi", role: "Assistant Chief Usher" },
      { name: "Bro. Monday Okafor", role: "Senior Usher" },
      { name: "Sis. Joy Etim", role: "Senior Usher" },
      { name: "Bro. Peter Lawal", role: "Usher" },
      { name: "Sis. Faith Obi", role: "Usher" },
      { name: "Bro. Joseph Umar", role: "Usher" },
      { name: "Sis. Peace Johnson", role: "Usher" },
    ],
  },
  band: {
    name: "Chapel Band",
    description: "The Chapel Band leads our congregation in dynamic, spirit-filled worship. With a blend of contemporary Christian music and original compositions, they create an atmosphere where hearts are lifted in praise and adoration.",
    responsibilities: [
      "Leading worship during Sunday services",
      "Special musical presentations",
      "Youth service worship leading",
      "Recording and producing music",
      "Training new musicians",
    ],
    members: [
      { name: "David Akpan", role: "Band Director & Lead Guitar" },
      { name: "Sarah Bello", role: "Lead Vocalist" },
      { name: "Michael Chidi", role: "Keyboardist" },
      { name: "Grace Udo", role: "Vocalist" },
      { name: "John Paul", role: "Drummer" },
      { name: "Ruth Daniel", role: "Bassist" },
      { name: "Timothy Elechi", role: "Vocalist" },
      { name: "Deborah Femi", role: "Percussionist" },
    ],
  },
  choir: {
    name: "Choir",
    description: "Our Choir brings together voices in beautiful harmony to glorify God through traditional hymns and contemporary worship songs. They minister to the congregation through music that touches hearts and draws people closer to God.",
    responsibilities: [
      "Anthem singing during services",
      "Special musical presentations",
      "Funeral and wedding music",
      "Holiday and event performances",
      "Community outreach singing",
    ],
    members: [
      { name: "Helen Okafor", role: "Choirmaster" },
      { name: "Pastor Mark Adeyemi", role: "Assistant Choirmaster" },
      { name: "Cynthia Okonkwo", role: "Soprano Section Leader" },
      { name: "Mercy Ibrahim", role: "Alto Section Leader" },
      { name: "Gabriel Nnamdi", role: "Tenor Section Leader" },
      { name: "Solomon Eze", role: "Bass Section Leader" },
      { name: "Abigail Musa", role: "Choir Secretary" },
      { name: "Daniel Peters", role: "Choir Treasurer" },
    ],
  },
  technical: {
    name: "Technical Team",
    description: "The Technical Team works behind the scenes to ensure every service is seen and heard clearly. From sound mixing to live streaming, they use technology to extend the reach of our ministry beyond the church walls.",
    responsibilities: [
      "Sound system operation and mixing",
      "Live streaming and video production",
      "Lighting design and control",
      "Projection and presentation management",
      "Equipment maintenance and upgrades",
    ],
    members: [
      { name: "Engr. Paul Adeyemi", role: "Technical Director" },
      { name: "James Okafor", role: "Sound Engineer" },
      { name: "Blessing Nwachukwu", role: "Video Director" },
      { name: "Emmanuel John", role: "Lighting Technician" },
      { name: "Faith Ibrahim", role: "Media Operator" },
      { name: "Victor Ojo", role: "Camera Operator" },
      { name: "Esther Bello", role: "Stream Technician" },
    ],
  },
  mis: {
    name: "MIS Team",
    description: "The Management Information Systems Team manages the digital infrastructure of the church. They ensure our data is secure, our websites are running, and technology serves the mission of the church effectively.",
    responsibilities: [
      "Church database management",
      "Website and app development",
      "Network and IT support",
      "Digital security and backups",
      "Technology training and support",
    ],
    members: [
      { name: "Samuel Chukwuemeka", role: "MIS Director" },
      { name: "Precious Adeleke", role: "Database Administrator" },
      { name: "David Olayemi", role: "Web Developer" },
      { name: "Gift Okonkwo", role: "Systems Analyst" },
      { name: "Knowledge Musa", role: "IT Support Specialist" },
      { name: "Wisdom Peters", role: "Network Administrator" },
    ],
  },
  brigade: {
    name: "Boys & Girls Brigade",
    description: "The Boys and Girls Brigade is a youth organization that develops character, discipline, and spiritual growth in young people. Through structured programs, outdoor activities, and mentorship, we raise the next generation of Christian leaders.",
    responsibilities: [
      "Weekly parade and drill sessions",
      "Bible study and devotions",
      "Skills training and badges",
      "Camping and outdoor activities",
      "Community service projects",
    ],
    members: [
      { name: "Capt. Robert Adeyemi", role: "Company Captain" },
      { name: "Lt. Jennifer Okafor", role: "Girls Brigade Officer" },
      { name: "Lt. Michael Eze", role: "Boys Brigade Officer" },
      { name: "Sis. Hannah Bello", role: "Junior Section Leader" },
      { name: "Bro. Samuel Johnson", role: "Senior Section Leader" },
      { name: "Sis. Dorcas Ibrahim", role: "Treasurer" },
      { name: "Bro. Timothy Nnamdi", role: "Secretary" },
    ],
  },
};

const validTeams = ["council", "deacons", "ushers", "band", "choir", "technical", "mis", "brigade"];

export async function generateStaticParams() {
  return validTeams.map((team) => ({
    team: team,
  }));
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { team } = await params;
  
  if (!validTeams.includes(team)) {
    notFound();
  }

  const teamData = teamsData[team];

  return (
    <div className="flex flex-col">
      <Hero
        title={teamData.name}
        subtitle={teamData.description}
        backgroundColor="bg-stone-800"
        align="center"
        size="lg"
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/missions"
            className="mb-8 inline-flex items-center text-sm font-medium text-stone-600 hover:text-stone-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Teams
          </Link>

          <div className="mb-16">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Responsibilities</h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {teamData.responsibilities.map((responsibility) => (
                <li key={responsibility} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-stone-800" />
                  <span className="text-stone-700">{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-stone-900 mb-8">Team Members</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {teamData.members.map((member) => (
                <TeamCard
                  key={member.name}
                  name={member.name}
                  role={member.role}
                  photoUrl={member.photoUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
