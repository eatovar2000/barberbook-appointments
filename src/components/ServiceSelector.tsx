import { useState } from "react";
import { Scissors, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Service {
  id: string;
  name: string;
  duration: string;
  price: string;
  description: string;
}

const services: Service[] = [
  { id: "corte", name: "Corte Clásico", duration: "30 min", price: "$250", description: "Corte tradicional con tijera y máquina" },
  { id: "barba", name: "Arreglo de Barba", duration: "20 min", price: "$150", description: "Perfilado y afeitado con navaja" },
  { id: "combo", name: "Corte + Barba", duration: "45 min", price: "$350", description: "Combo completo de corte y barba" },
  { id: "fade", name: "Fade Premium", duration: "40 min", price: "$300", description: "Degradado de precisión con diseño" },
  { id: "kids", name: "Corte Niños", duration: "25 min", price: "$180", description: "Corte infantil (hasta 12 años)" },
  { id: "tratamiento", name: "Tratamiento Capilar", duration: "30 min", price: "$200", description: "Hidratación y masaje capilar" },
];

interface ServiceSelectorProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

export function ServiceSelector({ selected, onSelect }: ServiceSelectorProps) {
  return (
    <div className="space-y-3">
      <h2 className="font-display text-2xl font-bold text-gradient-gold">Elige tu servicio</h2>
      <p className="text-muted-foreground text-sm">Selecciona el servicio que deseas</p>
      <div className="space-y-2 mt-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onSelect(service.id)}
            className={cn(
              "w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left",
              selected === service.id
                ? "border-primary bg-primary/10 shadow-gold"
                : "border-border bg-card hover:border-primary/40"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
              selected === service.id ? "bg-gradient-gold" : "bg-secondary"
            )}>
              <Scissors className={cn("w-5 h-5", selected === service.id ? "text-primary-foreground" : "text-primary")} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground">{service.name}</p>
              <p className="text-xs text-muted-foreground">{service.description}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-bold text-primary">{service.price}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {service.duration}
              </div>
            </div>
            <ChevronRight className={cn("w-4 h-4 shrink-0", selected === service.id ? "text-primary" : "text-muted-foreground")} />
          </button>
        ))}
      </div>
    </div>
  );
}

export { services };
