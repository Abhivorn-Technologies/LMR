export interface ProductImages {
  hero: string;
  rightForMe: string;
  features: string[]; // Legacy
}

export function getProductImages(title: string): ProductImages {
  const t = title.toLowerCase();
  
  if (t.includes('car') || t.includes('motor')) {
    return {
      hero: "https://d2h44aw7l5xdvz.cloudfront.net/assets/car%20front-01-1.svg",
      rightForMe: "https://d2h44aw7l5xdvz.cloudfront.net/assets/img/car-full-circle-chart.svg",
      features: []
    };
  }
  
  if (t.includes('bike') || t.includes('two wheeler') || t.includes('scooter')) {
    return {
      hero: "https://d2h44aw7l5xdvz.cloudfront.net/assets/img/motorcycle.svg",
      rightForMe: "https://api.iconify.design/noto/motor-scooter.svg",
      features: []
    };
  }

  if (t.includes('health') || t.includes('medical') || t.includes('mediclaim')) {
    return {
      hero: "https://d2h44aw7l5xdvz.cloudfront.net/assets/icons/health.svg",
      rightForMe: "https://api.iconify.design/noto/hospital.svg",
      features: []
    };
  }

  if (t.includes('home') || t.includes('property')) {
    return {
      hero: "https://d2h44aw7l5xdvz.cloudfront.net/assets/img/home-insurance.svg",
      rightForMe: "https://d2h44aw7l5xdvz.cloudfront.net/assets/lock.svg",
      features: []
    };
  }

  if (t.includes('travel') || t.includes('trip') || t.includes('flight')) {
    return {
      hero: "https://d2h44aw7l5xdvz.cloudfront.net/assets/img/flight.svg",
      rightForMe: "https://api.iconify.design/noto/airplane.svg",
      features: []
    };
  }

  if (t.includes('life') || t.includes('family') || t.includes('retirement')) {
    return {
      hero: "https://d2h44aw7l5xdvz.cloudfront.net/assets/img/family.svg",
      rightForMe: "https://api.iconify.design/noto/family.svg",
      features: []
    };
  }

  // Generic fallback using vector illustrations
  return {
    hero: "https://d2h44aw7l5xdvz.cloudfront.net/assets/icons/shield.svg",
    rightForMe: "https://api.iconify.design/noto/shield.svg",
    features: []
  };
}

export function getFeatureSvg(text: string, productTitle: string = '', isExclusion: boolean = false): string {
  const t = text.toLowerCase();
  const p = productTitle.toLowerCase();
  
  const isCar = p.includes('car') || p.includes('motor') || p.includes('vehicle') || p.includes('bike');
  const isHealth = p.includes('health') || p.includes('medical');
  
  // Specific vehicle matching
  if (isCar) {
    if (t.includes('fire') || t.includes('explosion') || t.includes('burn')) return "https://d2h44aw7l5xdvz.cloudfront.net/direct-portal/homepage/care-got-fire.svg";
    if (t.includes('theft') || t.includes('stolen') || t.includes('burglary')) return "https://d2h44aw7l5xdvz.cloudfront.net/assets/img/getaway-car.svg";
    if (t.includes('damage') || t.includes('collision') || t.includes('own')) return "https://d2h44aw7l5xdvz.cloudfront.net/assets/img/hatchback-damaged-driving.svg";
    if (t.includes('third party') || t.includes('liability')) return "https://d2h44aw7l5xdvz.cloudfront.net/assets/img/banged-cars.svg";
    if (t.includes('natural') || t.includes('flood') || t.includes('earthquake')) return "https://d2h44aw7l5xdvz.cloudfront.net/direct-portal/homepage/natural_disaster.svg";
    if (t.includes('cashless') || t.includes('network') || t.includes('garage')) return "https://d2h44aw7l5xdvz.cloudfront.net/assets/icons/1_cashless%20garage.svg";
  }

  // Global feature matching
  if (t.includes('health') || t.includes('medical') || t.includes('illness')) return "https://d2h44aw7l5xdvz.cloudfront.net/assets/icons/health.svg";
  if (t.includes('hospital') || t.includes('treatment')) return "https://d2h44aw7l5xdvz.cloudfront.net/assets/img/hospital.svg";
  if (t.includes('doctor') || t.includes('consultation')) return "https://d2h44aw7l5xdvz.cloudfront.net/assets/icons/doctor.svg";
  if (t.includes('injury') || t.includes('accident')) return "https://d2h44aw7l5xdvz.cloudfront.net/assets/img/man-with-hand-injured.svg";
  if (t.includes('family') || t.includes('dependent') || t.includes('death')) return "https://d2h44aw7l5xdvz.cloudfront.net/assets/img/family.svg";
  
  if (t.includes('home') || t.includes('house') || t.includes('property')) return "https://d2h44aw7l5xdvz.cloudfront.net/assets/img/home-insurance.svg";
  if (t.includes('fire') || t.includes('explosion') || t.includes('burn')) return "https://api.iconify.design/noto/fire.svg"; 
  if (t.includes('natural') || t.includes('flood') || t.includes('earthquake')) return "https://api.iconify.design/noto/water-wave.svg"; 
  
  if (t.includes('travel') || t.includes('flight') || t.includes('trip') || t.includes('baggage')) return "https://d2h44aw7l5xdvz.cloudfront.net/assets/img/flight.svg";
  if (t.includes('global') || t.includes('international') || t.includes('world')) return "https://d2h44aw7l5xdvz.cloudfront.net/assets/img/globe.svg";

  if (t.includes('fast') || t.includes('quick') || t.includes('instant') || t.includes('speed') || t.includes('claim')) return "https://api.iconify.design/noto/rocket.svg";
  if (t.includes('time') || t.includes('clock') || t.includes('hours')) return "https://d2h44aw7l5xdvz.cloudfront.net/assets/img/clock.svg";
  if (t.includes('support') || t.includes('help') || t.includes('24x7') || t.includes('assistance')) return "https://d2h44aw7l5xdvz.cloudfront.net/assets/icons/headset.svg";
  if (t.includes('document') || t.includes('process') || t.includes('paperless') || t.includes('easy')) return "https://api.iconify.design/noto/page-facing-up.svg";
  if (t.includes('tax') || t.includes('save') || t.includes('saving') || t.includes('money') || t.includes('cashless') || t.includes('sum assured')) return "https://api.iconify.design/noto/money-bag.svg";
  if (t.includes('custom') || t.includes('tailor') || t.includes('settings')) return "https://api.iconify.design/noto/gear.svg";

  if (t.includes('discount') || t.includes('bonus') || t.includes('ncb') || t.includes('reward')) return "https://d2h44aw7l5xdvz.cloudfront.net/assets/icons/discount.svg";
  if (t.includes('add-on') || t.includes('extra') || t.includes('gift') || t.includes('benefit')) return "https://d2h44aw7l5xdvz.cloudfront.net/assets/icons/happy-giftbox.svg";
  
  if (t.includes('theft') || t.includes('stolen') || t.includes('burglary') || t.includes('lock') || t.includes('illegal') || t.includes('intoxication')) return "https://d2h44aw7l5xdvz.cloudfront.net/assets/lock.svg";
  
  if (t.includes('protection') || t.includes('secure') || t.includes('safe') || t.includes('cover') || t.includes('zero dep')) return "https://d2h44aw7l5xdvz.cloudfront.net/assets/icons/shield.svg";

  if (isExclusion) return "https://api.iconify.design/noto/cross-mark.svg";

  // Generic fallback
  return "https://api.iconify.design/noto/check-mark-button.svg";
}
