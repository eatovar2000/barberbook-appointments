import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ServiceSelector } from "@/components/ServiceSelector";
import { BarberSelector } from "@/components/BarberSelector";
import { DateTimeSelector } from "@/components/DateTimeSelector";
import { BookingConfirmation } from "@/components/BookingConfirmation";
import { BookingSuccess } from "@/components/BookingSuccess";
import { ArrowLeft, ArrowRight } from "lucide-react";
import barberHero from "@/assets/barber-hero.jpg";

type Step = "home" | "service" | "barber" | "datetime" | "confirm" | "success";

const Index = () => {
  const [step, setStep] = useState<Step>("home");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const reset = () => {
    setStep("home");
    setSelectedService(null);
    setSelectedBarber(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const canProceed = () => {
    switch (step) {
      case "service": return !!selectedService;
      case "barber": return !!selectedBarber;
      case "datetime": return !!selectedDate && !!selectedTime;
      default: return true;
    }
  };

  const nextStep = () => {
    const flow: Step[] = ["home", "service", "barber", "datetime", "confirm"];
    const idx = flow.indexOf(step);
    if (idx < flow.length - 1) setStep(flow[idx + 1]);
  };

  const prevStep = () => {
    const flow: Step[] = ["home", "service", "barber", "datetime", "confirm"];
    const idx = flow.indexOf(step);
    if (idx > 0) setStep(flow[idx - 1]);
  };

  if (step === "home") {
    return (
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* Hero image */}
        <div className="absolute inset-0">
          <img src={barberHero} alt="Barbería premium" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
        </div>

        {/* Content */}
        <div className="relative flex-1 flex flex-col justify-end p-6 pb-12 max-w-lg mx-auto w-full">
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="space-y-1">
              <p className="text-primary font-medium text-sm tracking-widest uppercase">Barbería Premium</p>
              <h1 className="font-display text-5xl font-bold leading-tight text-foreground">
                The <span className="text-gradient-gold">King's</span> Cut
              </h1>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Experimenta el arte del corte clásico con un toque moderno. Reserva tu cita en segundos.
            </p>
            <Button
              variant="gold"
              size="lg"
              className="w-full text-base h-14 rounded-xl mt-4"
              onClick={() => setStep("service")}
            >
              Agendar Cita
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <BookingSuccess onReset={reset} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 glass-dark sticky top-0 z-10 border-b border-border">
        <button onClick={prevStep} className="p-2 rounded-lg hover:bg-secondary transition-colors">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <p className="font-display font-bold text-foreground">The King's Cut</p>
          <p className="text-xs text-muted-foreground">
            {step === "service" && "Paso 1 de 4"}
            {step === "barber" && "Paso 2 de 4"}
            {step === "datetime" && "Paso 3 de 4"}
            {step === "confirm" && "Paso 4 de 4"}
          </p>
        </div>
        {/* Progress dots */}
        <div className="flex gap-1.5">
          {["service", "barber", "datetime", "confirm"].map((s, i) => (
            <div
              key={s}
              className={`w-2 h-2 rounded-full transition-all ${
                ["service", "barber", "datetime", "confirm"].indexOf(step) >= i
                  ? "bg-primary w-4"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 p-5 animate-in fade-in slide-in-from-right-4 duration-300">
        {step === "service" && (
          <ServiceSelector selected={selectedService} onSelect={setSelectedService} />
        )}
        {step === "barber" && (
          <BarberSelector selected={selectedBarber} onSelect={setSelectedBarber} />
        )}
        {step === "datetime" && (
          <DateTimeSelector
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSelectDate={setSelectedDate}
            onSelectTime={setSelectedTime}
          />
        )}
        {step === "confirm" && selectedService && selectedBarber && selectedDate && selectedTime && (
          <BookingConfirmation
            serviceId={selectedService}
            barberId={selectedBarber}
            date={selectedDate}
            time={selectedTime}
            onConfirm={() => setStep("success")}
            onBack={prevStep}
          />
        )}
      </div>

      {/* Bottom action */}
      {step !== "confirm" && (
        <div className="p-5 glass-dark border-t border-border">
          <Button
            variant="gold"
            size="lg"
            className="w-full h-14 rounded-xl text-base"
            disabled={!canProceed()}
            onClick={nextStep}
          >
            Continuar
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;
