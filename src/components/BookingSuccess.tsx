import { CheckCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingSuccessProps {
  onReset: () => void;
}

export function BookingSuccess({ onReset }: BookingSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 py-12">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold animate-in zoom-in duration-500">
          <CheckCircle className="w-12 h-12 text-primary-foreground" />
        </div>
        <div className="absolute inset-0 w-24 h-24 rounded-full bg-primary/20 animate-ping" />
      </div>

      <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
        <h2 className="font-display text-3xl font-bold text-gradient-gold">¡Cita Confirmada!</h2>
        <p className="text-muted-foreground max-w-xs mx-auto">
          Tu reserva ha sido registrada exitosamente. Te esperamos en la barbería.
        </p>
      </div>

      <Button variant="gold" size="lg" onClick={onReset} className="mt-4 animate-in fade-in duration-500 delay-500 gap-2">
        <Home className="w-4 h-4" />
        Volver al inicio
      </Button>
    </div>
  );
}
