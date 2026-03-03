import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Calendar, Clock, User, Scissors, Trash2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { services } from "./ServiceSelector";
import { barbers } from "./BarberSelector";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Appointment {
  id: string;
  service_id: string;
  barber_id: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  created_at: string;
}

interface MyAppointmentsProps {
  onBack: () => void;
}

export function MyAppointments({ onBack }: MyAppointmentsProps) {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("appointment_date", { ascending: true });

    if (!error && data) setAppointments(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const cancelAppointment = async (id: string) => {
    const { error } = await supabase
      .from("appointments")
      .update({ status: "cancelled" })
      .eq("id", id);

    if (error) {
      toast.error("Error al cancelar");
    } else {
      toast.success("Cita cancelada");
      fetchAppointments();
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-lg mx-auto">
      <div className="flex items-center gap-3 p-4 glass-dark sticky top-0 z-10 border-b border-border">
        <button onClick={onBack} className="p-2 rounded-lg hover:bg-secondary">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="font-display font-bold text-foreground text-lg">Mis Citas</h1>
      </div>

      <div className="flex-1 p-5 space-y-3">
        {loading ? (
          <div className="text-center text-muted-foreground py-12">Cargando...</div>
        ) : appointments.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>No tienes citas aún</p>
          </div>
        ) : (
          appointments.map((apt) => {
            const service = services.find((s) => s.id === apt.service_id);
            const barber = barbers.find((b) => b.id === apt.barber_id);
            const isCancelled = apt.status === "cancelled";

            return (
              <div
                key={apt.id}
                className={cn(
                  "bg-card rounded-xl border border-border p-4 space-y-3",
                  isCancelled && "opacity-50"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-foreground">{service?.name || apt.service_id}</span>
                  </div>
                  <span className={cn(
                    "text-xs font-medium px-2 py-1 rounded-full",
                    isCancelled ? "bg-destructive/20 text-destructive" : "bg-primary/20 text-primary"
                  )}>
                    {isCancelled ? "Cancelada" : "Confirmada"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="w-3 h-3" />
                    {barber?.name || apt.barber_id}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {format(parseISO(apt.appointment_date), "d MMM", { locale: es })}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {apt.appointment_time.slice(0, 5)} hrs
                  </div>
                </div>

                {!isCancelled && (
                  <button
                    onClick={() => cancelAppointment(apt.id)}
                    className="flex items-center gap-1 text-xs text-destructive hover:underline"
                  >
                    <Trash2 className="w-3 h-3" />
                    Cancelar cita
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
