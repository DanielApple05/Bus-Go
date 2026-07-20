import { ShieldCheck, Armchair, Tag, Headphones } from 'lucide-react';

const features = [
  { icon: ShieldCheck, title: 'Safe & Reliable', desc: 'Your safety is our top priority' },
  { icon: Armchair, title: 'Comfortable Rides', desc: 'Modern buses with great amenities' },
  { icon: Tag, title: 'Affordable Prices', desc: 'Best value for your money' },
  { icon: Headphones, title: '24/7 Support', desc: "We're here to help anytime" },
];

const Features = () => {
  return (
    <section className="bg-orange-50 pt-28 pb-14 px-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
              <Icon size={20} className="text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">{title}</h3>
              <p className="text-sm text-slate-500 mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;