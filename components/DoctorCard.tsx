import Image from "next/image";
import { Doctor } from "@/data/hospitals";
import { avatar } from "@/lib/utils";

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-colors duration-300 hover:border-primary dark:border-white/10 dark:bg-surface dark:hover:border-primary-light">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-sky dark:bg-sky-dark">
        <Image
          src={avatar(doctor.photoSeed)}
          alt={`Portrait of ${doctor.name}`}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>
      <div>
        <h4 className="text-lg font-bold leading-tight text-ink dark:text-white">{doctor.name}</h4>
        <p className="text-sm font-medium text-primary dark:text-primary-light">{doctor.specialty}</p>
        <p className="text-sm font-medium text-ink/60 dark:text-white/60">
          {doctor.yearsExperience} years experience
        </p>
      </div>
    </div>
  );
}
