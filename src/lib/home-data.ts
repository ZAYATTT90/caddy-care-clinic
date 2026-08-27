import doc1 from "@/assets/doc-1.jpg";
import doc2 from "@/assets/doc-2.jpg";
import doc3 from "@/assets/doc-3.jpg";
import doc4 from "@/assets/doc-4.jpg";

export type Specialization = {
  id: string;
  label: string;
  icon: string;
  tint: "care" | "ember" | "gold";
};

export const SPECIALIZATIONS: Specialization[] = [
  { id: "dentist", label: "Dentist", icon: "🦷", tint: "care" },
  { id: "physician", label: "General Physician", icon: "🩺", tint: "ember" },
  { id: "skin", label: "Skin Specialist", icon: "✨", tint: "gold" },
  { id: "pediatric", label: "Pediatrics", icon: "🧒", tint: "care" },
  { id: "cardio", label: "Cardiology", icon: "❤️", tint: "ember" },
  { id: "eye", label: "Eye Care", icon: "👁️", tint: "gold" },
];

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  clinic: string;
  rating: number;
  fee: string;
  next: string;
  photo: string;
};

export const DOCTORS: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Aisha Rahman",
    specialty: "Dentist",
    clinic: "Caddy Smile Studio",
    rating: 4.9,
    fee: "$28",
    next: "Today 4:30 PM",
    photo: doc1,
  },
  {
    id: "d2",
    name: "Dr. Omar Shafiq",
    specialty: "General Physician",
    clinic: "Northside Care Clinic",
    rating: 4.8,
    fee: "$22",
    next: "Today 6:00 PM",
    photo: doc2,
  },
  {
    id: "d3",
    name: "Dr. Lena Haq",
    specialty: "Dermatologist",
    clinic: "Glow Skin Lab",
    rating: 4.7,
    fee: "$34",
    next: "Tomorrow 11:00 AM",
    photo: doc3,
  },
  {
    id: "d4",
    name: "Dr. Imran Qadri",
    specialty: "Pediatrician",
    clinic: "Little Hearts Clinic",
    rating: 5.0,
    fee: "$26",
    next: "Tomorrow 9:15 AM",
    photo: doc4,
  },
];
