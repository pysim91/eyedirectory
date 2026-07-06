export type Specialty =
  | "Cataract Surgery"
  | "LASIK"
  | "Pediatric Ophthalmology"
  | "Retina Care"
  | "Glaucoma Treatment"
  | "Corneal Transplant"
  | "Oculoplastics"
  | "Neuro-Ophthalmology";

export type Doctor = {
  name: string;
  specialty: Specialty;
  yearsExperience: number;
  photoSeed: string;
};

export type Review = {
  author: string;
  rating: number;
  quote: string;
};

export type Hospital = {
  slug: string;
  name: string;
  city: string;
  state: string;
  specialties: Specialty[];
  rating: number;
  reviewCount: number;
  accreditation: string;
  insuranceAccepted: string[];
  founded: number;
  description: string;
  photoSeed: string;
  gallerySeeds: string[];
  doctors: Doctor[];
  reviews: Review[];
};

export const specialtiesList: Specialty[] = [
  "Cataract Surgery",
  "LASIK",
  "Pediatric Ophthalmology",
  "Retina Care",
  "Glaucoma Treatment",
  "Corneal Transplant",
  "Oculoplastics",
  "Neuro-Ophthalmology",
];

export const specialtyCopy: Record<
  Specialty,
  { tagline: string; description: string }
> = {
  "Cataract Surgery": {
    tagline: "Clear lenses, restored in under an hour.",
    description:
      "A cataract clouds the eye's natural lens until light can't pass through cleanly. Surgeons remove the clouded lens and replace it with a clear artificial one. The procedure takes about 15 minutes per eye, uses only numbing drops, and most patients see improved vision within a day. It's the most commonly performed surgery in the world for good reason: it works, and it works fast.",
  },
  LASIK: {
    tagline: "Reshape the cornea, drop the glasses.",
    description:
      "LASIK uses a precision laser to reshape the cornea so light focuses correctly on the retina, correcting nearsightedness, farsightedness, and astigmatism in a single outpatient visit. The procedure itself takes about 10 minutes for both eyes. Most patients notice sharper vision within 24 hours and return to normal activity the next day.",
  },
  "Pediatric Ophthalmology": {
    tagline: "Vision care built for growing eyes.",
    description:
      "Children's eyes change fast, and problems like lazy eye, crossed eyes, or uncorrected refractive errors can quietly shape how a child learns and sees the world. Pediatric ophthalmologists specialize in diagnosing and treating these conditions early, using child-specific exam techniques and treatments ranging from glasses and patching to surgery when needed.",
  },
  "Retina Care": {
    tagline: "Protecting the eye's most sensitive tissue.",
    description:
      "The retina converts light into the signals your brain reads as sight, and it's vulnerable to conditions like macular degeneration, diabetic retinopathy, and retinal detachment. Retina specialists diagnose these with advanced imaging and treat them with injections, laser therapy, or microsurgery to preserve as much vision as possible.",
  },
  "Glaucoma Treatment": {
    tagline: "Managing pressure before it steals sight.",
    description:
      "Glaucoma damages the optic nerve gradually, usually from elevated pressure inside the eye, and it rarely causes symptoms until vision is already lost. Treatment focuses on lowering that pressure through prescription eye drops, laser therapy, or surgery, with the goal of stopping further damage rather than reversing it.",
  },
  "Corneal Transplant": {
    tagline: "Replacing damaged tissue with healthy grafts.",
    description:
      "When the cornea becomes scarred, swollen, or misshapen from disease or injury, a transplant replaces the damaged tissue with a donor graft. Modern techniques allow surgeons to replace only the affected layer of the cornea, which speeds healing and lowers rejection risk compared to older full-thickness procedures.",
  },
  Oculoplastics: {
    tagline: "Surgery where the eye meets the face.",
    description:
      "Oculoplastic surgeons treat the eyelids, tear ducts, and the bone and tissue surrounding the eye, correcting both functional problems like droopy eyelids that block vision and reconstructive needs after injury or tumor removal.",
  },
  "Neuro-Ophthalmology": {
    tagline: "Where vision problems start in the brain.",
    description:
      "Some vision issues, like double vision, unexplained vision loss, or abnormal eye movements, originate in the nervous system rather than the eye itself. Neuro-ophthalmologists sit at the intersection of neurology and ophthalmology to diagnose and manage these complex cases.",
  },
};

export const hospitals: Hospital[] = [
  {
    slug: "meridian-eye-institute",
    name: "Meridian Eye Institute",
    city: "Boston",
    state: "MA",
    specialties: ["Cataract Surgery", "LASIK", "Retina Care"],
    rating: 4.9,
    reviewCount: 812,
    accreditation: "Joint Commission Accredited",
    insuranceAccepted: ["Aetna", "Blue Cross", "Cigna", "Medicare"],
    founded: 1988,
    description:
      "Meridian Eye Institute has anchored vision care in Boston for over three decades, combining a high-volume surgical practice with a research arm focused on retinal disease. Its cataract program performs more procedures annually than any other center in New England.",
    photoSeed: "meridian-1",
    gallerySeeds: ["meridian-2", "meridian-3", "meridian-4"],
    doctors: [
      { name: "Dr. Elena Kovacs", specialty: "Cataract Surgery", yearsExperience: 22, photoSeed: "elena-kovacs" },
      { name: "Dr. Marcus Whitfield", specialty: "Retina Care", yearsExperience: 18, photoSeed: "marcus-whitfield" },
      { name: "Dr. Priya Anand", specialty: "LASIK", yearsExperience: 11, photoSeed: "priya-anand" },
    ],
    reviews: [
      { author: "Janet R.", rating: 5, quote: "Cataract surgery took fifteen minutes and my vision was sharper by the next morning." },
      { author: "Tom D.", rating: 5, quote: "Dr. Whitfield caught a retinal tear before it became a detachment. Grateful doesn't cover it." },
      { author: "Sasha L.", rating: 4, quote: "Efficient front desk, short wait times, clear explanations at every step." },
    ],
  },
  {
    slug: "clearview-vision-center",
    name: "Clearview Vision Center",
    city: "Austin",
    state: "TX",
    specialties: ["LASIK", "Glaucoma Treatment", "Corneal Transplant"],
    rating: 4.8,
    reviewCount: 634,
    accreditation: "AAAHC Accredited",
    insuranceAccepted: ["United Healthcare", "Blue Cross", "Humana"],
    founded: 2001,
    description:
      "Clearview built its reputation on refractive surgery, running one of the highest-volume LASIK practices in Texas. Its glaucoma unit has since grown around a shared belief in aggressive early detection.",
    photoSeed: "clearview-1",
    gallerySeeds: ["clearview-2", "clearview-3", "clearview-4"],
    doctors: [
      { name: "Dr. Hannah Osei", specialty: "LASIK", yearsExperience: 14, photoSeed: "hannah-osei" },
      { name: "Dr. Raymond Chu", specialty: "Glaucoma Treatment", yearsExperience: 25, photoSeed: "raymond-chu" },
      { name: "Dr. Isabel Franco", specialty: "Corneal Transplant", yearsExperience: 9, photoSeed: "isabel-franco" },
    ],
    reviews: [
      { author: "Marcus P.", rating: 5, quote: "Ditched glasses after twenty years. The consult alone was more thorough than any eye exam I'd had before." },
      { author: "Grace H.", rating: 5, quote: "Dr. Chu explained my glaucoma treatment options without any pressure to pick the expensive one." },
    ],
  },
  {
    slug: "harborlight-eye-associates",
    name: "Harborlight Eye Associates",
    city: "Seattle",
    state: "WA",
    specialties: ["Pediatric Ophthalmology", "Cataract Surgery", "Neuro-Ophthalmology"],
    rating: 4.7,
    reviewCount: 401,
    accreditation: "Joint Commission Accredited",
    insuranceAccepted: ["Premera", "Aetna", "Kaiser Permanente", "Medicaid"],
    founded: 1995,
    description:
      "Harborlight runs the largest pediatric ophthalmology practice in the Pacific Northwest, with exam rooms and staff trained specifically for young patients. Its neuro-ophthalmology clinic handles regional referrals for complex cases.",
    photoSeed: "harborlight-1",
    gallerySeeds: ["harborlight-2", "harborlight-3", "harborlight-4"],
    doctors: [
      { name: "Dr. Wei Zhang", specialty: "Pediatric Ophthalmology", yearsExperience: 16, photoSeed: "wei-zhang" },
      { name: "Dr. Naomi Bricks", specialty: "Neuro-Ophthalmology", yearsExperience: 20, photoSeed: "naomi-bricks" },
      { name: "Dr. Felix Amara", specialty: "Cataract Surgery", yearsExperience: 13, photoSeed: "felix-amara" },
    ],
    reviews: [
      { author: "Dana K.", rating: 5, quote: "My daughter was terrified of eye exams until we found Dr. Zhang. He's a natural with kids." },
      { author: "Oliver S.", rating: 4, quote: "Took my double vision seriously when three other doctors shrugged it off." },
    ],
  },
  {
    slug: "prairie-vision-surgical",
    name: "Prairie Vision Surgical",
    city: "Chicago",
    state: "IL",
    specialties: ["Retina Care", "Glaucoma Treatment", "Cataract Surgery"],
    rating: 4.6,
    reviewCount: 528,
    accreditation: "AAAHC Accredited",
    insuranceAccepted: ["Blue Cross", "Cigna", "Medicare", "Medicaid"],
    founded: 1979,
    description:
      "One of the Midwest's oldest surgical eye practices, Prairie Vision has treated three generations of families in Chicago. Its retina program was among the first in the region to offer same-day injection therapy.",
    photoSeed: "prairie-1",
    gallerySeeds: ["prairie-2", "prairie-3", "prairie-4"],
    doctors: [
      { name: "Dr. Samuel Okafor", specialty: "Retina Care", yearsExperience: 27, photoSeed: "samuel-okafor" },
      { name: "Dr. Lucia Moreno", specialty: "Glaucoma Treatment", yearsExperience: 15, photoSeed: "lucia-moreno" },
    ],
    reviews: [
      { author: "Ellen F.", rating: 5, quote: "Same-day injection appointment saved me weeks of worrying. Staff moved fast without feeling rushed." },
      { author: "Victor N.", rating: 4, quote: "Old-school practice with modern equipment. Dr. Okafor doesn't waste your time." },
    ],
  },
  {
    slug: "summit-ophthalmology-group",
    name: "Summit Ophthalmology Group",
    city: "Denver",
    state: "CO",
    specialties: ["LASIK", "Oculoplastics", "Cataract Surgery"],
    rating: 4.8,
    reviewCount: 359,
    accreditation: "Joint Commission Accredited",
    insuranceAccepted: ["United Healthcare", "Aetna", "Blue Cross"],
    founded: 2008,
    description:
      "Summit combines a high-altitude LASIK specialty, tuned for patients with outdoor and high-UV lifestyles, with a well-regarded oculoplastics team handling both reconstructive and cosmetic eyelid surgery.",
    photoSeed: "summit-1",
    gallerySeeds: ["summit-2", "summit-3", "summit-4"],
    doctors: [
      { name: "Dr. Claire Bennett", specialty: "Oculoplastics", yearsExperience: 12, photoSeed: "claire-bennett" },
      { name: "Dr. Aaron Voss", specialty: "LASIK", yearsExperience: 10, photoSeed: "aaron-voss" },
      { name: "Dr. Renee Castillo", specialty: "Cataract Surgery", yearsExperience: 19, photoSeed: "renee-castillo" },
    ],
    reviews: [
      { author: "Peter M.", rating: 5, quote: "Droopy eyelid surgery gave me back my peripheral vision. Should have done it years ago." },
      { author: "Ana W.", rating: 5, quote: "LASIK consult factored in how much time I spend hiking and skiing. Felt genuinely personalized." },
    ],
  },
  {
    slug: "coastal-eye-partners",
    name: "Coastal Eye Partners",
    city: "Miami",
    state: "FL",
    specialties: ["Retina Care", "Corneal Transplant", "Neuro-Ophthalmology"],
    rating: 4.5,
    reviewCount: 287,
    accreditation: "AAAHC Accredited",
    insuranceAccepted: ["Humana", "Blue Cross", "Medicare"],
    founded: 1992,
    description:
      "Coastal Eye Partners runs South Florida's busiest corneal transplant program, supported by a tissue bank partnership that keeps wait times well below the national average.",
    photoSeed: "coastal-1",
    gallerySeeds: ["coastal-2", "coastal-3", "coastal-4"],
    doctors: [
      { name: "Dr. Miguel Santos", specialty: "Corneal Transplant", yearsExperience: 21, photoSeed: "miguel-santos" },
      { name: "Dr. Alicia Ferrer", specialty: "Retina Care", yearsExperience: 14, photoSeed: "alicia-ferrer" },
    ],
    reviews: [
      { author: "Rosa T.", rating: 5, quote: "Waited two months for a corneal transplant when I'd been quoted a year everywhere else." },
      { author: "Big D.", rating: 4, quote: "Clean facility, direct answers, no unnecessary upselling." },
    ],
  },
  {
    slug: "northgate-vision-clinic",
    name: "Northgate Vision Clinic",
    city: "Minneapolis",
    state: "MN",
    specialties: ["Pediatric Ophthalmology", "Glaucoma Treatment", "LASIK"],
    rating: 4.7,
    reviewCount: 245,
    accreditation: "Joint Commission Accredited",
    insuranceAccepted: ["Blue Cross", "Medica", "Medicare", "Medicaid"],
    founded: 2004,
    description:
      "Northgate pairs a family-focused pediatric practice with an adult glaucoma clinic, making it a common choice for households that want to keep vision care under one roof across generations.",
    photoSeed: "northgate-1",
    gallerySeeds: ["northgate-2", "northgate-3", "northgate-4"],
    doctors: [
      { name: "Dr. Ingrid Solberg", specialty: "Pediatric Ophthalmology", yearsExperience: 17, photoSeed: "ingrid-solberg" },
      { name: "Dr. Jamal Reed", specialty: "Glaucoma Treatment", yearsExperience: 23, photoSeed: "jamal-reed" },
    ],
    reviews: [
      { author: "Kayla B.", rating: 5, quote: "Both my kids and my dad are patients here now. Scheduling everyone together is a relief." },
      { author: "Owen G.", rating: 4, quote: "Dr. Reed has managed my glaucoma for six years without a single surprise." },
    ],
  },
  {
    slug: "lakeside-eye-surgeons",
    name: "Lakeside Eye Surgeons",
    city: "Cleveland",
    state: "OH",
    specialties: ["Cataract Surgery", "Retina Care", "Oculoplastics"],
    rating: 4.6,
    reviewCount: 198,
    accreditation: "AAAHC Accredited",
    insuranceAccepted: ["Medical Mutual", "Aetna", "Medicare"],
    founded: 1985,
    description:
      "Lakeside built its practice around cataract volume, and its surgeons now train visiting physicians from across the Midwest on refractive lens techniques.",
    photoSeed: "lakeside-1",
    gallerySeeds: ["lakeside-2", "lakeside-3", "lakeside-4"],
    doctors: [
      { name: "Dr. Patrick Doyle", specialty: "Cataract Surgery", yearsExperience: 29, photoSeed: "patrick-doyle" },
      { name: "Dr. Yuki Tanaka", specialty: "Retina Care", yearsExperience: 12, photoSeed: "yuki-tanaka" },
    ],
    reviews: [
      { author: "Martha C.", rating: 5, quote: "Dr. Doyle has done thousands of these surgeries and it shows in how calm the whole visit feels." },
      { author: "Leon V.", rating: 4, quote: "Straightforward retina follow-up care, no long waits." },
    ],
  },
];

export function getHospitalBySlug(slug: string) {
  return hospitals.find((h) => h.slug === slug);
}

export function getHospitalsBySpecialty(specialty: Specialty) {
  return hospitals.filter((h) => h.specialties.includes(specialty));
}

export const cities = Array.from(new Set(hospitals.map((h) => h.city))).sort();
export const allInsurances = Array.from(
  new Set(hospitals.flatMap((h) => h.insuranceAccepted))
).sort();
