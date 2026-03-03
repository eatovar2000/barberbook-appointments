import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface Barber {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  avatar: string;
}

const barbers: Barber[] = [
  { id: "carlos", name: "Carlos López", specialty: "Fade & Diseño", rating: 4.9, avatar: "CL" },
  { id: "miguel", name: "Miguel Torres", specialty: "Corte Clásico", rating: 4.8, avatar: "MT" },
  { id: "andres", name: "Andrés García", specialty: "Barba & Afeitado", rating: 4.7, avatar: "AG" },
  { id: "david", name: "David Ruiz", specialty: "Freestyle", rating: 4.9, avatar: "DR" },
];

interface BarberSelectorProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

export function BarberSelector({ selected, onSelect }: BarberSelectorProps) {
  return (
    <div className="space-y-3">
      <h2 className="font-display text-2xl font-bold text-gradient-gold">Elige tu barbero</h2>
      <p className="text-muted-foreground text-sm">Selecciona al profesional de tu preferencia</p>
      <div className="grid grid-cols-2 gap-3 mt-4">
        {barbers.map((barber) => (
          <button
            key={barber.id}
            onClick={() => onSelect(barber.id)}
            className={cn(
              "flex flex-col items-center gap-3 p-5 rounded-xl border transition-all duration-200",
              selected === barber.id
                ? "border-primary bg-primary/10 shadow-gold"
                : "border-border bg-card hover:border-primary/40"
            )}
          >
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center font-display text-xl font-bold",
              selected === barber.id ? "bg-gradient-gold text-primary-foreground" : "bg-secondary text-primary"
            )}>
              {barber.avatar}
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground text-sm">{barber.name}</p>
              <p className="text-xs text-muted-foreground">{barber.specialty}</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Star className="w-3 h-3 fill-primary text-primary" />
                <span className="text-xs font-medium text-primary">{barber.rating}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export { barbers };
