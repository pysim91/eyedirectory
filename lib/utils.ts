export function picsum(seed: string, width: number, height: number) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
}

export function avatar(seed: string) {
  return `https://i.pravatar.cc/150?u=${encodeURIComponent(seed)}`;
}

export function slugifySpecialty(specialty: string) {
  return specialty
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
