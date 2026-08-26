import React from 'react';

// ==========================================
// 📍 EDIT YOUR ITINERARY DATA HERE
// ==========================================
const itineraryPlaces = [
  {
  id: 1,
  title: "Taboga Island",
  subtitle: "Island of Flowers & Coastal Escape",
  description: "Located just a 30-minute ferry ride from Panama City, Taboga offers quiet sandy beaches, rich history, and scenic hiking trails like Cerro Vigía. Ideal for a quick tropical getaway with easy ocean access.",
  recommendedStay: "1 Day",
  link: "https://www.google.com/maps/search/?api=1&query=taboga+panama",
  tags: ["Beaches", "Hiking", "Day Trip"],
  imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
  },
  {
  id: 2,
  title: "Amador Causeway",
  subtitle: "Skyline Views & Ocean Breeze",
  description: "A scenic 6-kilometer road connecting Panama City to four small islands in the Pacific. It features wide multi-use trails, waterfront restaurants, the Frank Gehry-designed BioMuseo, and panoramic views of the Panama Canal entrance.",
  recommendedStay: "Half Day",
  link: "https://www.google.com/maps/search/?api=1&query=causeway+panama",
  tags: ["Cycling", "Sightseeing", "Museums"],
  imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
  },
  {
  id: 3,
  title: "Gamboa",
  subtitle: "Rainforest Exploration & Wildlife",
  description: "Situated in the heart of Soberanía National Park along the Panama Canal, Gamboa is a haven for biodiversity. It is home to famous birding routes like Pipeline Road, boat tours along Gatun Lake, and sloth sanctuaries.",
  recommendedStay: "1-2 Days",
  link: "https://www.google.com/maps/search/?api=1&query=gamboa+panama",
  tags: ["Nature", "Wildlife", "Eco-Tourism"],
  imageUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80"
  },
  {
  id: 4,
  title: "Cerro Ancón",
  subtitle: "Panoramic Views & Jungle Hike",
  description: "A 654-foot hill rising above Panama City, topped by a massive Panamanian flag. A short road hike through lush vegetation offers sweeping 360-degree views of the modern skyline, Casco Viejo, and the Panama Canal.",
  recommendedStay: "2-3 Hours",
  link: "https://www.google.com/maps/search/?api=1&query=cerroancon+panama",
  tags: ["Views", "Hiking", "Nature"],
  imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
  },
  {
  id: 5,
  title: "Parque Omar",
  subtitle: "City Greenery & Local Vibe",
  description: "Panama City's primary public park, equivalent to its own Central Park. It features expansive green fields, walking and running tracks, outdoor gym equipment, and frequent cultural events, making it ideal for a relaxed afternoon.",
  recommendedStay: "1-2 Hours",
  link: "https://www.google.com/maps/search/?api=1&query=parqueomar+panama",
  tags: ["Parks", "Fitness", "Outdoors"],
  imageUrl: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80"
  },
  {
  id: 6,
  title: "Cinta Costera",
  subtitle: "Waterfront Promenade & City Views",
  description: "A sprawling coastal highway and parkway wrapping around the Bay of Panama. Perfect for sunset walks, bicycling, and visiting street food vendors, while connecting directly to the local Mercado de Mariscos.",
  recommendedStay: "2-4 Hours",
  link: "https://www.google.com/maps/search/?api=1&query=cintacostera+panama",
  tags: ["Waterfront", "Walking", "Street Food"],
  imageUrl: "https://images.unsplash.com/photo-1477959858617-67f30ac4ce78?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    title: "Casco Viejo (Panama City)",
    subtitle: "Historic Charm & Rooftops",
    description: "The historic district of Panama City, blending colorful colonial architecture with modern rooftop bars and incredible dining. This is the perfect starting point when you land.",
    recommendedStay: "1-3 Days",
    link: "https://goo.gl/maps/y1zF2wN3G2v",
    tags: ["History", "Dining", "Nightlife"],
    imageUrl: "https://images.unsplash.com/photo-1580216743906-817812f65ac1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    title: "San Blas Islands (Guna Yala)",
    subtitle: "Untouched Caribbean Paradise",
    description: "An archipelago of 360+ tiny islands governed by the indigenous Guna people. Expect white sand beaches, crystal-clear water, and a true digital disconnect. Best reached via a 4x4 and boat from the city.",
    recommendedStay: "2-3 Days",
    link: "https://sanblasdreams.com/",
    tags: ["Beaches", "Culture", "Off-grid"],
    imageUrl: "https://images.unsplash.com/photo-1549001358-868bf64bd2b9?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    title: "El Valle de Antón",
    subtitle: "Peaceful Mountain Retreat",
    description: "Nestled perfectly inside a massive volcanic crater just two hours from the city. Enjoy cooler mountain air, beautiful morning mist, hot springs, and lush hiking trails like La India Dormida.",
    recommendedStay: "1-2 Days",
    link: "https://www.google.com/maps/search/?api=1&query=el+valle+de+anton+panama",
    tags: ["Wedding Location","Nature", "Hiking", "Relaxation"],
    imageUrl: "https://images.unsplash.com/photo-1620023617300-85f2fa663cb6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 10,
    title: "Bocas del Toro",
    subtitle: "Caribbean Surf & Island Vibe",
    description: "A lively archipelago near the Costa Rican border known for its overwater bungalows, surfing, snorkeling, and relaxed beach bars. You can take a 1-hour domestic flight here from Panama City.",
    recommendedStay: "3-4 Days",
    link: "https://www.bocasdeltoro.com/",
    tags: ["Surfing", "Island Hopping", "Wildlife"],
    imageUrl: "https://images.unsplash.com/photo-1563820921008-01e4a3dfb7b1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 11,
    title: "Chiriquí",
    subtitle: "Highland Cloud Forests & Coffee Country",
    description: "The annual flower and coffee festival of Boquete will take place from the 15 to 17 of January. This Festival celebrates the region's rich agriculture, horticulture and coffee heritage. A breathtaking western province defined by the cool mountain town of Boquete, the towering Volcán Barú, world-famous Geisha coffee plantations, and remote island beaches off Boca Chica.",
    recommendedStay: "3-5 Days",
    link: "https://bestofchiriqui.org/",
    tags: ["Hiking", "Coffee Tours", "Nature"],
    imageUrl: "https://images.unsplash.com/photo-1599394022918-6c8473841a20?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 12,
    title: "El Canal de Panamá",
    subtitle: "Engineering Wonder of the World",
    description: "An iconic 82-kilometer maritime shortcut connecting the Atlantic and Pacific oceans. Visit the Miraflores Visitor Center to watch massive cargo ships pass through the lock systems.",
    recommendedStay: "1 Day",
    link: "https://pancanal.com/",
    tags: ["History", "Engineering", "Sightseeing"],
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
  }
];

export default function PanamaItinerary() {
  return (
    <>
      {/* 
        Injecting Google Fonts directly into the component.
        Alternatively, you can move this to your index.html or globals.css
      */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Fjalla+One&family=Mea+Culpa&family=Quicksand:wght@300;400;600&display=swap');
        
        .font-sans { font-family: 'Ledger', sans-serif; }
        .font-heading { font-family: 'Noto Sans', sans-serif; }
        .font-script { font-family: 'Tangerine', cursive; }
      `}} />

      {/* Main Container - using #F1EFEC background */}
      <div className="min-h-screen bg-[#F1EFEC] text-gray-800 font-sans pb-16">
        
        {/* Header Section */}
        <header className="pt-16 pb-12 px-6 text-center max-w-3xl mx-auto">
          <h1 className="font-heading text-2xl md:text-3xl  uppercase tracking-wider mb-4">
            <span className="text-[#808B58]">Travel Guide</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
            We are so thrilled to celebrate with you! To make the most of your trip, we’ve put together a few of our absolute favorite places to explore while you're here.
          </p>
          <div className="w-24 h-1 bg-[#B2B699] mx-auto mt-8 rounded-full"></div>
        </header>

        {/* Places List */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-12">
            {itineraryPlaces.map((place, index) => (
              <div 
                key={place.id} 
                className="bg-white rounded-3xl shadow-sm border border-[#B2B699]/30 overflow-hidden flex flex-col md:flex-row transition-transform hover:-translate-y-1 duration-300"
              >
                {/* Image Section */}
                {/* <div className="w-full md:w-2/5 h-64 md:h-auto relative">
                  <img 
                    src={place.imageUrl} 
                    alt={place.title} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                    <span className="text-xs font-bold text-[#808B58] tracking-wide uppercase">
                      {place.recommendedStay}
                    </span>
                  </div>
                </div> */}

                {/* Content Section */}
                <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                  <h3 className="font-heading text-2xl md:text-3xl text-[#808B58] mb-1 uppercase tracking-wide">
                    {place.title}
                  </h3>
                  <h4 className="font-script text-3xl text-[#DC6186] mb-4">
                    {place.subtitle}
                  </h4>
                  
                  <p className="text-gray-600 font-light leading-relaxed mb-6">
                    {place.description}
                  </p>

                  <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#B2B699]/20 pt-6">
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {place.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1 bg-[#F1EFEC] text-[#808B58] text-xs font-semibold rounded-md tracking-wider uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <a 
                      href={place.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-center px-6 py-2 bg-[#808B58] text-white text-sm font-bold uppercase tracking-wider rounded-3xl hover:bg-[#B2B699] transition-colors duration-200"
                    >
                      More Info
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-20 text-center px-6">
          <p className="font-script text-4xl text-[#DC6186] mb-2">Can't wait to see you!</p>
          <p className="text-[#808B58] font-bold text-sm tracking-widest">
            Monica & Aidos
          </p>
        </footer>

      </div>
    </>
  );
}