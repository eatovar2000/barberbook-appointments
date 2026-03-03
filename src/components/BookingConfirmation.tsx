import { CheckCircle, Calendar, Clock, User, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { services } from "./ServiceSelector";
import { barbers } from "./BarberSelector";

interface BookingConfirmationProps {
  serviceId: string;
  barberId: string;
  date: Date;
  time: string;
  onConfirm: () => void;
  onBack: () => void;
}

export function BookingConfirmation({ serviceId, barberId, date, time, onConfirm, onBack }: BookingConfirmationProps) {
  const service = services.find((s) => s.id === serviceId);
  const barber = barbers.find((b) => b.id === barberId);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-3 shadow-gold">
          <CheckCircle className="w-8 h-8 text-primary-foreground" />
        </div>
        <h2 className="font-display text-2xl font-bold text-gradient-gold">Confirmar cita</h2>
        <p className="text-muted-foreground text-sm mt-1">Revisa los detalles de tu reserva</p>
      </div>

      <div className="bg-card rounded-xl border border-border p-4 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
            <Scissors className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Servicio</p>
            <p className="font-semibold text-foreground">{service?.name}</p>
          </div>
          <p className="ml-auto font-bold text-primary">{service?.price}</p>
        </div>

        <div className="h-px bg-border" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Barbero</p>
            <p className="font-semibold text-foreground">{barber?.name}</p>
          </div>
        </div>

        <div className="h-px bg-border" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Fecha</p>
            <p className="font-semibold text-foreground capitalize">
              {format(date, "EEEE d 'de' MMMM", { locale: es })}
            </p>
          </div>
        </div>

        <div className="h-px bg-border" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Hora</p>
            <p className="font-semibold text-foreground">{time} hrs</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="gold-outline" className="flex-1" onClick={onBack}>
          Modificar
        </Button>
        <Button variant="gold" className="flex-1" onClick={onConfirm}>
          Confirmar
        </Button>
      </div>
    </div>
  );
}
