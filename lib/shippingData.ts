export interface PortLocation {
  code: string;
  name?: string;
  country?: string;
  port?: string;
  lat: number;
  lng: number;
  region?: string;
}

export interface IndianPort {
  code: string;
  name: string;
  lat: number;
  lng: number;
}

export interface DestinationPort {
  country: string;
  port: string;
  code: string;
  lat: number;
  lng: number;
  region: string;
}

export const IndianPorts: IndianPort[] = [
  { code: 'INNSA', name: 'Nhava Sheva (JNPT)', lat: 18.95, lng: 72.95 },
  { code: 'INMUN', name: 'Mundra', lat: 22.75, lng: 69.71 },
  { code: 'INMAA', name: 'Chennai', lat: 13.08, lng: 80.27 },
  { code: 'INCCU', name: 'Kolkata', lat: 22.57, lng: 88.36 },
  { code: 'INIXY', name: 'Kandla', lat: 23.03, lng: 70.21 },
  { code: 'INCOK', name: 'Cochin', lat: 9.93, lng: 76.26 },
  { code: 'INVTZ', name: 'Visakhapatnam', lat: 17.68, lng: 83.21 },
  { code: 'INTUT', name: 'Tuticorin', lat: 8.76, lng: 78.13 },
  { code: 'INKRI', name: 'Krishnapatnam', lat: 14.24, lng: 80.12 },
];

export const Chokepoints: Record<string, { name: string; lat: number; lng: number }> = {
  SRI_LANKA_SOUTH: { name: "South of Sri Lanka", lat: 5.6, lng: 80.5 },
  MALDIVES_PASS: { name: "Maldives Channel", lat: 6.8, lng: 76.8 },
  ARABIAN_SEA: { name: "Arabian Sea Corridor", lat: 14.5, lng: 66.0 },
  GULF_OF_OMAN: { name: "Gulf of Oman", lat: 24.5, lng: 59.0 },
  STRAIT_OF_HORMUZ: { name: "Strait of Hormuz", lat: 26.5, lng: 56.4 },
  GULF_OF_ADEN: { name: "Gulf of Aden", lat: 12.5, lng: 45.0 },
  BAB_EL_MANDEB: { name: "Bab el-Mandeb Strait", lat: 12.6, lng: 43.4 },
  RED_SEA_CENTRAL: { name: "Red Sea", lat: 20.0, lng: 38.5 },
  GULF_OF_SUEZ: { name: "Gulf of Suez", lat: 27.8, lng: 34.0 },
  SUEZ_SOUTH: { name: "Suez Canal (South)", lat: 29.9, lng: 32.55 },
  SUEZ_NORTH: { name: "Port Said / Suez Canal", lat: 31.3, lng: 32.3 },
  MEDITERRANEAN_EAST: { name: "Eastern Mediterranean", lat: 33.5, lng: 28.5 },
  MEDITERRANEAN_CENTRAL: { name: "Central Mediterranean", lat: 35.5, lng: 18.0 },
  STRAIT_OF_SICILY: { name: "Strait of Sicily", lat: 37.2, lng: 11.5 },
  MEDITERRANEAN_WEST: { name: "Western Mediterranean", lat: 37.0, lng: 1.0 },
  ALBORAN_SEA: { name: "Alboran Sea", lat: 36.0, lng: -4.5 },
  GIBRALTAR: { name: "Strait of Gibraltar", lat: 35.95, lng: -5.6 },
  PORTUGAL_COAST: { name: "Atlantic (Off Portugal)", lat: 38.5, lng: -9.5 },
  CAPE_FINISTERRE: { name: "Off Cape Finisterre", lat: 43.5, lng: -9.5 },
  BAY_OF_BISCAY: { name: "Bay of Biscay (Outer)", lat: 47.5, lng: -6.5 },
  ENGLISH_CHANNEL: { name: "English Channel", lat: 49.5, lng: -3.5 },
  STRAIT_OF_DOVER: { name: "Strait of Dover", lat: 50.8, lng: 1.0 },
  NORTH_SEA: { name: "North Sea Approach", lat: 52.0, lng: 3.0 },
  GERMAN_BIGHT: { name: "German Bight", lat: 54.0, lng: 7.8 },
  BALTIC_SEA: { name: "Baltic Sea Entrance", lat: 55.5, lng: 15.0 },

  // East Asia & Southeast Asia
  MALACCA_ENTRY: { name: "Andaman Sea", lat: 6.0, lng: 95.0 },
  MALACCA: { name: "Strait of Malacca", lat: 2.5, lng: 101.5 },
  SINGAPORE_STRAIT: { name: "Singapore Strait", lat: 1.25, lng: 104.0 },
  SOUTH_CHINA_SEA_CENTRAL: { name: "South China Sea", lat: 12.0, lng: 112.5 },
  TAIWAN_STRAIT: { name: "Taiwan Strait / Luzon", lat: 21.0, lng: 120.5 },
  EAST_CHINA_SEA: { name: "East China Sea", lat: 28.5, lng: 123.5 },
  JAPAN_PACIFIC: { name: "Tokyo Bay Approach", lat: 34.0, lng: 139.5 },

  // Australia / Oceania (Via Southern Ocean / Bass Strait & Timor Corridor)
  SOUTH_INDIAN_EQUATORIAL: { name: "Equatorial Indian Ocean", lat: -5.0, lng: 92.0 },
  SOUTH_INDIAN_DEEP: { name: "Southeast Indian Ocean", lat: -18.0, lng: 105.0 },
  WEST_AUSTRALIA_SEA: { name: "Off Western Australia", lat: -30.0, lng: 112.5 },
  GREAT_AUSTRALIAN_BIGHT: { name: "Great Australian Bight", lat: -36.0, lng: 125.0 },
  SOUTHERN_OCEAN: { name: "Southern Ocean", lat: -38.5, lng: 138.0 },
  BASS_STRAIT: { name: "Bass Strait", lat: -39.5, lng: 146.0 },
  TASMAN_SEA_NSW: { name: "NSW Offshore Sea", lat: -36.5, lng: 151.5 },
  CORAL_SEA_QLD: { name: "Queensland Offshore Sea", lat: -27.0, lng: 154.5 },

  // Atlantic Americas
  ATLANTIC_MID: { name: "Mid-Atlantic Corridor", lat: 28.0, lng: -35.0 },
  CARIBBEAN_SEA: { name: "Caribbean Sea", lat: 15.0, lng: -70.0 },
  PANAMA_NORTH: { name: "Panama Canal (Colon)", lat: 9.35, lng: -79.9 },
  PANAMA_SOUTH: { name: "Panama Canal (Balboa)", lat: 8.9, lng: -79.55 },
  PACIFIC_CENTRAL_AMERICA: { name: "Pacific Off Central America", lat: 13.0, lng: -95.0 },
  PACIFIC_MEXICO: { name: "Pacific Coast of Mexico", lat: 20.0, lng: -108.0 },
  PACIFIC_BAJA: { name: "Off Baja California", lat: 28.0, lng: -116.0 },
  US_EAST_COAST: { name: "US East Coast Sealane", lat: 36.0, lng: -73.0 },
  FLORIDA_STRAITS: { name: "Florida Straits", lat: 24.0, lng: -81.0 },
  GULF_OF_MEXICO: { name: "Gulf of Mexico", lat: 26.5, lng: -89.0 },

  // Cape of Good Hope Route
  SOUTH_INDIAN_AFRICA: { name: "South Indian Ocean", lat: -25.0, lng: 55.0 },
  CAPE_AGULHAS: { name: "Cape Agulhas", lat: -36.5, lng: 22.0 },
  CAPE_GOOD_HOPE: { name: "Cape of Good Hope", lat: -35.0, lng: 18.0 },
  SOUTH_ATLANTIC_MID: { name: "South Atlantic Ocean", lat: -15.0, lng: -5.0 },
  EQUATORIAL_ATLANTIC: { name: "Equatorial Atlantic", lat: 2.0, lng: -25.0 },
};

export const Destinations: DestinationPort[] = [
  // OCEANIA
  { country: 'Australia', port: 'Sydney', code: 'AUSYD', lat: -33.86, lng: 151.20, region: 'OCEANIA' },
  { country: 'Australia', port: 'Melbourne', code: 'AUMEL', lat: -37.81, lng: 144.96, region: 'OCEANIA' },
  { country: 'Australia', port: 'Brisbane', code: 'AUBNE', lat: -27.47, lng: 153.03, region: 'OCEANIA' },
  { country: 'Australia', port: 'Perth (Fremantle)', code: 'AUFRE', lat: -32.06, lng: 115.74, region: 'OCEANIA' },
  { country: 'New Zealand', port: 'Auckland', code: 'NZAKL', lat: -36.84, lng: 174.76, region: 'OCEANIA' },

  // MIDDLE EAST & ARABIAN GULF
  { country: 'United Arab Emirates', port: 'Dubai (Jebel Ali)', code: 'AEJEA', lat: 25.01, lng: 55.06, region: 'MIDDLE_EAST' },
  { country: 'United Arab Emirates', port: 'Abu Dhabi (Khalifa)', code: 'AEKHL', lat: 24.89, lng: 54.67, region: 'MIDDLE_EAST' },
  { country: 'Saudi Arabia', port: 'Jeddah', code: 'SAJED', lat: 21.48, lng: 39.19, region: 'MIDDLE_EAST' },
  { country: 'Oman', port: 'Salalah', code: 'OMSLL', lat: 16.95, lng: 54.00, region: 'MIDDLE_EAST' },

  // UNITED KINGDOM & EUROPE
  { country: 'United Kingdom', port: 'Felixstowe / London', code: 'GBFXT', lat: 51.96, lng: 1.35, region: 'EUROPE' },
  { country: 'United Kingdom', port: 'Southampton', code: 'GBSOU', lat: 50.91, lng: -1.40, region: 'EUROPE' },
  { country: 'Netherlands', port: 'Rotterdam', code: 'NLRTM', lat: 51.92, lng: 4.48, region: 'EUROPE' },
  { country: 'Germany', port: 'Hamburg', code: 'DEHAM', lat: 53.55, lng: 9.99, region: 'EUROPE' },
  { country: 'Belgium', port: 'Antwerp', code: 'BEANR', lat: 51.21, lng: 4.40, region: 'EUROPE' },
  { country: 'France', port: 'Le Havre', code: 'FRLEH', lat: 49.49, lng: 0.10, region: 'EUROPE' },
  { country: 'Italy', port: 'Genoa', code: 'ITGOA', lat: 44.41, lng: 8.95, region: 'EUROPE' },
  { country: 'Spain', port: 'Valencia', code: 'ESVLC', lat: 39.46, lng: -0.37, region: 'EUROPE' },

  // AMERICAS (East, West & Gulf)
  { country: 'United States', port: 'New York / NJ', code: 'USNYC', lat: 40.71, lng: -74.00, region: 'AMERICAS_EAST' },
  { country: 'United States', port: 'Savannah', code: 'USSAV', lat: 32.08, lng: -81.09, region: 'AMERICAS_EAST' },
  { country: 'United States', port: 'Houston', code: 'USHOU', lat: 29.76, lng: -95.37, region: 'AMERICAS_EAST' },
  { country: 'United States', port: 'Los Angeles', code: 'USLAX', lat: 33.74, lng: -118.26, region: 'AMERICAS_WEST' },
  { country: 'Canada', port: 'Vancouver', code: 'CAVAN', lat: 49.28, lng: -123.12, region: 'AMERICAS_WEST' },
  { country: 'Brazil', port: 'Santos', code: 'BRSSZ', lat: -23.96, lng: -46.33, region: 'AMERICAS_EAST' },

  // EAST & SOUTHEAST ASIA
  { country: 'Singapore', port: 'Singapore', code: 'SGSIN', lat: 1.29, lng: 103.85, region: 'SOUTHEAST_ASIA' },
  { country: 'Malaysia', port: 'Port Klang', code: 'MYPKG', lat: 3.00, lng: 101.40, region: 'SOUTHEAST_ASIA' },
  { country: 'China', port: 'Shanghai', code: 'CNSHA', lat: 31.23, lng: 121.47, region: 'EAST_ASIA' },
  { country: 'Japan', port: 'Tokyo', code: 'JPTYO', lat: 35.67, lng: 139.76, region: 'EAST_ASIA' },
  { country: 'South Korea', port: 'Busan', code: 'KRPUS', lat: 35.10, lng: 129.03, region: 'EAST_ASIA' },
];

// Helper to calculate approx nautical miles between two coords (Haversine formula * 3440.065 for nm)
const calculateNauticalMiles = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 3440.065; // Radius of earth in nautical miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  return Math.round(R * c);
};

export interface ShippingStats {
  transitDays: string;
  customsDays: string;
  distanceNm: string;
  chokepoints: string;
  pathCoordinates: { lat: number; lng: number; code?: string; name?: string }[];
}

export const ShippingLogic = (origin: IndianPort, dest: DestinationPort): ShippingStats => {
  const isEastCoastOrigin = origin.lng > 77.5;
  const isWestCoastOrigin = !isEastCoastOrigin;
  const waypoints: { name: string; lat: number; lng: number }[] = [];
  const baseSpeedKts = 16;

  // ── 1. AUSTRALIA & OCEANIA ──
  if (dest.country === 'Australia' || dest.country === 'New Zealand') {
    if (dest.code === 'AUFRE') {
      // Direct WA line via Indian Ocean
      waypoints.push(
        Chokepoints.SRI_LANKA_SOUTH,
        Chokepoints.SOUTH_INDIAN_EQUATORIAL,
        Chokepoints.SOUTH_INDIAN_DEEP,
        Chokepoints.WEST_AUSTRALIA_SEA
      );
    } else {
      // East & South Coast Australia (Melbourne, Sydney, Brisbane, Auckland)
      waypoints.push(
        Chokepoints.SRI_LANKA_SOUTH,
        Chokepoints.SOUTH_INDIAN_EQUATORIAL,
        Chokepoints.SOUTH_INDIAN_DEEP,
        Chokepoints.GREAT_AUSTRALIAN_BIGHT
      );
      if (dest.code === 'AUMEL') {
        waypoints.push(Chokepoints.SOUTHERN_OCEAN);
      } else if (dest.code === 'AUSYD') {
        waypoints.push(Chokepoints.SOUTHERN_OCEAN, Chokepoints.BASS_STRAIT, Chokepoints.TASMAN_SEA_NSW);
      } else if (dest.code === 'AUBNE') {
        waypoints.push(Chokepoints.SOUTHERN_OCEAN, Chokepoints.BASS_STRAIT, Chokepoints.TASMAN_SEA_NSW, Chokepoints.CORAL_SEA_QLD);
      } else if (dest.code === 'NZAKL') {
        waypoints.push(Chokepoints.SOUTHERN_OCEAN, Chokepoints.BASS_STRAIT, { name: "South Tasman Sea", lat: -38.0, lng: 160.0 });
      }
    }
  }

  // ── 2. UAE & GULF / MIDDLE EAST ──
  else if (dest.country === 'United Arab Emirates' || dest.code === 'AEJEA' || dest.code === 'AEKHL') {
    if (isEastCoastOrigin) {
      waypoints.push(Chokepoints.SRI_LANKA_SOUTH, Chokepoints.MALDIVES_PASS);
    }
    waypoints.push(
      Chokepoints.ARABIAN_SEA,
      Chokepoints.GULF_OF_OMAN,
      Chokepoints.STRAIT_OF_HORMUZ
    );
  }

  // ── 3. RED SEA & SAUDI ARABIA / OMAN ──
  else if (dest.code === 'SAJED') {
    if (isEastCoastOrigin) waypoints.push(Chokepoints.SRI_LANKA_SOUTH, Chokepoints.MALDIVES_PASS);
    waypoints.push(Chokepoints.ARABIAN_SEA, Chokepoints.GULF_OF_ADEN, Chokepoints.BAB_EL_MANDEB, Chokepoints.RED_SEA_CENTRAL);
  } else if (dest.code === 'OMSLL') {
    if (isEastCoastOrigin) waypoints.push(Chokepoints.SRI_LANKA_SOUTH, Chokepoints.MALDIVES_PASS);
    waypoints.push(Chokepoints.ARABIAN_SEA);
  }

  // ── 4. EUROPE & UK (Suez Canal & Mediterranean corridor) ──
  else if (['GBFXT', 'GBSOU', 'NLRTM', 'DEHAM', 'BEANR', 'FRLEH', 'ITGOA', 'ESVLC'].includes(dest.code) || dest.region === 'EUROPE') {
    if (isEastCoastOrigin) waypoints.push(Chokepoints.SRI_LANKA_SOUTH, Chokepoints.MALDIVES_PASS);
    waypoints.push(
      Chokepoints.ARABIAN_SEA,
      Chokepoints.GULF_OF_ADEN,
      Chokepoints.BAB_EL_MANDEB,
      Chokepoints.RED_SEA_CENTRAL,
      Chokepoints.GULF_OF_SUEZ,
      Chokepoints.SUEZ_SOUTH,
      Chokepoints.SUEZ_NORTH,
      Chokepoints.MEDITERRANEAN_EAST
    );

    if (dest.code === 'ITGOA') {
      waypoints.push(Chokepoints.MEDITERRANEAN_CENTRAL, { name: "Tyrrhenian Sea", lat: 39.5, lng: 12.5 }, { name: "Ligurian Sea", lat: 43.5, lng: 9.0 });
    } else if (dest.code === 'ESVLC') {
      waypoints.push(Chokepoints.MEDITERRANEAN_CENTRAL, Chokepoints.STRAIT_OF_SICILY, Chokepoints.MEDITERRANEAN_WEST);
    } else {
      // Northern Europe / UK / North Sea
      waypoints.push(
        Chokepoints.MEDITERRANEAN_CENTRAL,
        Chokepoints.STRAIT_OF_SICILY,
        Chokepoints.MEDITERRANEAN_WEST,
        Chokepoints.ALBORAN_SEA,
        Chokepoints.GIBRALTAR,
        Chokepoints.PORTUGAL_COAST,
        Chokepoints.CAPE_FINISTERRE,
        Chokepoints.BAY_OF_BISCAY,
        Chokepoints.ENGLISH_CHANNEL
      );

      if (['GBFXT', 'NLRTM', 'DEHAM', 'BEANR'].includes(dest.code)) {
        waypoints.push(Chokepoints.STRAIT_OF_DOVER, Chokepoints.NORTH_SEA);
        if (dest.code === 'DEHAM') waypoints.push(Chokepoints.GERMAN_BIGHT);
      }
    }
  }

  // ── 5. AMERICAS (East Coast & Gulf via Suez & Atlantic) ──
  else if (['USNYC', 'USSAV', 'USHOU'].includes(dest.code)) {
    if (isEastCoastOrigin) waypoints.push(Chokepoints.SRI_LANKA_SOUTH, Chokepoints.MALDIVES_PASS);
    waypoints.push(
      Chokepoints.ARABIAN_SEA,
      Chokepoints.GULF_OF_ADEN,
      Chokepoints.BAB_EL_MANDEB,
      Chokepoints.RED_SEA_CENTRAL,
      Chokepoints.SUEZ_SOUTH,
      Chokepoints.SUEZ_NORTH,
      Chokepoints.MEDITERRANEAN_EAST,
      Chokepoints.MEDITERRANEAN_CENTRAL,
      Chokepoints.MEDITERRANEAN_WEST,
      Chokepoints.GIBRALTAR,
      Chokepoints.ATLANTIC_MID
    );

    if (dest.code === 'USNYC') {
      waypoints.push(Chokepoints.US_EAST_COAST);
    } else if (dest.code === 'USSAV') {
      waypoints.push({ name: "Off Bahamas", lat: 28.0, lng: -75.0 });
    } else if (dest.code === 'USHOU') {
      waypoints.push(Chokepoints.FLORIDA_STRAITS, Chokepoints.GULF_OF_MEXICO);
    }
  }

  // ── 6. AMERICAS (West Coast via Panama Canal) ──
  else if (['USLAX', 'CAVAN'].includes(dest.code)) {
    if (isEastCoastOrigin) waypoints.push(Chokepoints.SRI_LANKA_SOUTH, Chokepoints.MALDIVES_PASS);
    waypoints.push(
      Chokepoints.ARABIAN_SEA,
      Chokepoints.GULF_OF_ADEN,
      Chokepoints.BAB_EL_MANDEB,
      Chokepoints.RED_SEA_CENTRAL,
      Chokepoints.SUEZ_SOUTH,
      Chokepoints.SUEZ_NORTH,
      Chokepoints.MEDITERRANEAN_EAST,
      Chokepoints.MEDITERRANEAN_CENTRAL,
      Chokepoints.MEDITERRANEAN_WEST,
      Chokepoints.GIBRALTAR,
      Chokepoints.ATLANTIC_MID,
      Chokepoints.CARIBBEAN_SEA,
      Chokepoints.PANAMA_NORTH,
      Chokepoints.PANAMA_SOUTH,
      Chokepoints.PACIFIC_CENTRAL_AMERICA,
      Chokepoints.PACIFIC_MEXICO,
      Chokepoints.PACIFIC_BAJA
    );
  }

  // ── 7. SOUTH AMERICA (Brazil via Cape of Good Hope) ──
  else if (dest.code === 'BRSSZ') {
    if (isEastCoastOrigin) waypoints.push(Chokepoints.SRI_LANKA_SOUTH);
    waypoints.push(
      Chokepoints.SOUTH_INDIAN_AFRICA,
      Chokepoints.CAPE_AGULHAS,
      Chokepoints.CAPE_GOOD_HOPE,
      Chokepoints.SOUTH_ATLANTIC_MID
    );
  }

  // ── 8. EAST ASIA & SOUTHEAST ASIA ──
  else if (['SGSIN', 'MYPKG', 'CNSHA', 'JPTYO', 'KRPUS'].includes(dest.code) || dest.region === 'EAST_ASIA' || dest.region === 'SOUTHEAST_ASIA') {
    if (isWestCoastOrigin) waypoints.push(Chokepoints.SRI_LANKA_SOUTH);
    waypoints.push(Chokepoints.MALACCA_ENTRY, Chokepoints.MALACCA);

    if (dest.code === 'SGSIN' || dest.code === 'MYPKG') {
      // Singapore / Malaysia destination
    } else {
      waypoints.push(Chokepoints.SINGAPORE_STRAIT, Chokepoints.SOUTH_CHINA_SEA_CENTRAL);
      if (['CNSHA', 'KRPUS'].includes(dest.code)) {
        waypoints.push(Chokepoints.TAIWAN_STRAIT, Chokepoints.EAST_CHINA_SEA);
      } else if (dest.code === 'JPTYO') {
        waypoints.push(Chokepoints.TAIWAN_STRAIT, Chokepoints.EAST_CHINA_SEA, Chokepoints.JAPAN_PACIFIC);
      }
    }
  }

  const chokepointNames = waypoints.map(w => w.name);

  // Calculate total distance using waypoints
  let totalNm = 0;
  let currentLoc: { lat: number; lng: number } = origin;
  const pathCoordinates: { lat: number; lng: number; code?: string }[] = [{ lat: origin.lat, lng: origin.lng, code: origin.code }];
  
  waypoints.forEach(wp => {
    totalNm += calculateNauticalMiles(currentLoc.lat, currentLoc.lng, wp.lat, wp.lng);
    currentLoc = wp;
    pathCoordinates.push(wp);
  });
  
  totalNm += calculateNauticalMiles(currentLoc.lat, currentLoc.lng, dest.lat, dest.lng);
  pathCoordinates.push({ lat: dest.lat, lng: dest.lng, code: dest.code });

  const transitDays = Math.max(6, Math.ceil(totalNm / (baseSpeedKts * 24)) + Math.round(waypoints.length * 0.8));

  return {
    transitDays: `${transitDays} - ${transitDays + 4} days`,
    customsDays: '3 - 7 working days',
    distanceNm: totalNm.toLocaleString(),
    chokepoints: chokepointNames.length > 0 ? chokepointNames.join(', ') : 'Direct Maritime Ocean Corridor',
    pathCoordinates
  };
};
