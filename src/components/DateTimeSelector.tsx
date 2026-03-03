import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, startOfToday, isSameDay, isAfter } from "date-fns";
import { es } from "date-fns/locale";

const timeSlots = [
  "9:00", "9:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
];

interface DateTimeSelectorProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onSelectDate: (date: Date) => void;
  onSelectTime: (time: string) => void;
}

export function DateTimeSelector({ selectedDate, selectedTime, onSelectDate, onSelectTime }: DateTimeSelectorProps) {
  const today = startOfToday();
  const [weekOffset, setWeekOffset] = useState(0);
  const days = Array.from({ length: 7 }, (_, i) => addDays(today, i + weekOffset * 7));

  // Simulate some taken slots
  const takenSlots = ["10:00", "14:30", "16:00"];

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-bold text-gradient-gold">Fecha y hora</h2>
      <p className="text-muted-foreground text-sm">Selecciona cuándo quieres tu cita</p>

      {/* Date selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))}
            disabled={weekOffset === 0}
            className="p-1 rounded-lg hover:bg-secondary disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <span className="text-sm font-medium text-foreground capitalize">
            {format(days[0], "MMMM yyyy", { locale: es })}
          </span>
          <button
            onClick={() => setWeekOffset(weekOffset + 1)}
            className="p-1 rounded-lg hover:bg-secondary"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => (
            <button
              key={day.toISOString()}
              onClick={() => onSelectDate(day)}
              className={cn(
                "flex flex-col items-center py-2 px-1 rounded-lg text-xs transition-all",
                selectedDate && isSameDay(day, selectedDate)
                  ? "bg-gradient-gold text-primary-foreground shadow-gold"
                  : "hover:bg-secondary text-foreground",
                isSameDay(day, today) && "ring-1 ring-primary/50"
              )}
            >
              <span className="text-[10px] uppercase text-inherit opacity-70">
                {format(day, "EEE", { locale: es })}
              </span>
              <span className="font-semibold text-sm">{format(day, "d")}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="text-sm font-medium text-foreground">Horarios disponibles</p>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((time) => {
              const taken = takenSlots.includes(time);
              return (
                <button
                  key={time}
                  onClick={() => !taken && onSelectTime(time)}
                  disabled={taken}
                  className={cn(
                    "py-2.5 px-2 rounded-lg text-sm font-medium transition-all",
                    selectedTime === time
                      ? "bg-gradient-gold text-primary-foreground shadow-gold"
                      : taken
                      ? "bg-secondary/50 text-muted-foreground line-through opacity-40 cursor-not-allowed"
                      : "bg-secondary text-foreground hover:border-primary hover:bg-primary/10 border border-transparent"
                  )}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
