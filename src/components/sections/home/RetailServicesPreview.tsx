import Link from "next/link";
import { 
  Car, Bike, ShieldCheck, Truck, Bus, 
  Stethoscope, Activity, HeartPulse, ShieldPlus, Repeat, Users, 
  Briefcase, Building2, HardHat, UserCog, Ship, Factory, 
  Plane, GraduationCap, Building, Home, Store, Flame 
} from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { SplitText } from "@/components/ui/SplitText";

const motorInsurance = [
  { title: "Car", icon: Car, href: "/services/general-insurance/car", banner: "Pay as you Drive" },
  { title: "Bike", icon: Bike, href: "/services/general-insurance/two-wheeler/bike", banner: "Starting ₹714" },
  { title: "OD for Car", icon: ShieldCheck, href: "/services/general-insurance/car/own-damage", banner: "Standalone OD Cover" },
  { title: "Rickshaw", icon: Truck, href: "/services/general-insurance/commercial/auto-rickshaw", banner: "Auto & e-Rickshaws" },
  { title: "Taxi/Cab", icon: Bus, href: "/services/general-insurance/commercial/taxi", banner: "" },
  { title: "Truck", icon: Truck, href: "/services/general-insurance/commercial/truck", banner: "" },
];

const healthInsurance = [
  { title: "Health", icon: Stethoscope, href: "/services/general-insurance/health", banner: "Infinity Wallet" },
  { title: "OPD Health Insurance", icon: Activity, href: "/services/general-insurance/health", banner: "" },
  { title: "Super Top-up", icon: HeartPulse, href: "/services/general-insurance/health/super-top-up", banner: "" },
  { title: "Arogya Sanjeevani Policy", icon: ShieldPlus, href: "/services/general-insurance/health", banner: "₹1 Cr SI starting ₹640/m" },
  { title: "Port Health Policy", icon: Repeat, href: "/services/general-insurance/health/portability", banner: "Switch to Digit" },
  { title: "Employee Health", icon: Users, href: "/services/general-insurance/health/group-medical", banner: "" },
];

const businessInsurance = [
  { title: "D&O Insurance", icon: Briefcase, href: "/services/general-insurance/business", banner: "" },
  { title: "Erection All Risk Insurance", icon: Building2, href: "/services/general-insurance/business", banner: "" },
  { title: "Contractors All Risk", icon: HardHat, href: "/services/general-insurance/business/contractors-all-risk", banner: "" },
  { title: "Workmen Compensation", icon: UserCog, href: "/services/general-insurance/business/workmen-compensation", banner: "" },
  { title: "Marine Cargo Insurance", icon: Ship, href: "/services/general-insurance/business", banner: "" },
  { title: "CPM Insurance", icon: Factory, href: "/services/general-insurance/business/contractors-plant-machinery", banner: "" },
];

const travelProperty = [
  { title: "International Travel", icon: Plane, href: "/services/general-insurance/travel/international", banner: "Starting ₹225" },
  { title: "Student Travel", icon: GraduationCap, href: "/services/general-insurance/travel", banner: "Up to $1M SI" },
  { title: "Property", icon: Building, href: "/services/general-insurance/home/bharat-griha-raksha", banner: "" },
  { title: "Home", icon: Home, href: "/services/general-insurance/home", banner: "Starting ₹150/year*" },
  { title: "Shop", icon: Store, href: "/services/general-insurance/business", banner: "" },
  { title: "Fire", icon: Flame, href: "/services/general-insurance/home/bharat-griha-raksha", banner: "" },
];

const ServiceCategory = ({ title, items, delayOffset = 0 }: { title: string, items: any[], delayOffset?: number }) => (
  <div className="mb-12 flex flex-col items-center">
    <h3 className="text-[18px] font-bold text-slate-800 mb-6 text-center">{title}</h3>
    <div className="flex flex-wrap justify-center gap-3 sm:gap-5 w-full max-w-5xl">
      {items.map((item, i) => (
        <FadeIn key={item.title} delay={delayOffset + (i * 0.05)} className="w-[calc(50%-0.375rem)] sm:w-auto">
          <Link href={item.href} className="group block w-full sm:w-[150px] h-[145px]">
            <div className="relative h-full flex flex-col items-center justify-start bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:border-[#ffb800] pt-6 pb-2">
              
              {/* Icon Container */}
              <div className="relative mb-3 flex items-center justify-center h-12">
                <item.icon 
                  className="w-8 h-8 text-slate-700 group-hover:text-[#ffb800] transition-colors duration-300" 
                  strokeWidth={1.5}
                />
              </div>
              
              <span className="text-[13px] font-semibold text-slate-700 text-center px-2 leading-tight group-hover:text-[#ffb800] transition-colors">
                {item.title}
              </span>

              {item.banner && (
                <div className="absolute bottom-0 left-0 w-full bg-[#fff4d1] py-1.5 text-center">
                  <span className="text-[10px] font-bold text-slate-800 tracking-wide block truncate px-1">
                    {item.banner}
                  </span>
                </div>
              )}
            </div>
          </Link>
        </FadeIn>
      ))}
    </div>
  </div>
);

export function RetailServicesPreview() {
  return (
    <section id="general-insurance" className="relative py-20 bg-white border-t border-slate-100">
      <div className="mx-auto max-w-[1400px] px-6">
        
        {/* Header Section */}
        <div className="mb-12 hidden">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              <SplitText 
                text="Insurance for every need" 
                delay={30}
                animationFrom={{ opacity: 0, transform: 'translate3d(0,30px,0)' }}
                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              />
            </h2>
          </FadeIn>
        </div>

        {/* Services Grid Categories */}
        <ServiceCategory title="Motor Insurance" items={motorInsurance} delayOffset={0} />
        <ServiceCategory title="Health Insurance" items={healthInsurance} delayOffset={0.2} />
        <ServiceCategory title="Business Insurance" items={businessInsurance} delayOffset={0.4} />
        <ServiceCategory title="Travel & Property" items={travelProperty} delayOffset={0.6} />

      </div>
    </section>
  );
}
