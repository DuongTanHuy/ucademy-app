import { connectDB } from "@/lib/mongoose";

export default async function Home() {
  connectDB();

  return <div className="h-[200vh]">Homepage</div>;
}
