export interface CompanyLocationInfo {
  name: string;
  slug: string;
  divisionTitle: string;
  tagline: string;
  speciality: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  googleMapsUrl: string;
  embedQuery: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  port: string;
  accentColor: string;
  logo?: string;
}

export const COMPANY_LOCATIONS: Record<string, CompanyLocationInfo> = {
  "pavan-impex": {
    name: "Pavan Impex",
    slug: "pavan-impex",
    logo: "/images/pavan-impex-logo.png",
    divisionTitle: "Natural Slate & Wall Cladding Division",
    tagline: "Natural Slate Stone Exports & Processing Facility",
    speciality: "Slate Stones & 3D Cladding Panels",
    address: "Plot No. 84, Industrial Estate, Markapur, Goguladinne",
    city: "Markapur",
    state: "Andhra Pradesh",
    pincode: "523316",
    country: "India",
    googleMapsUrl: "https://maps.app.goo.gl/8vwBZPBm8MV9EDpt7?g_st=iw",
    embedQuery: "PAVAN IMPEX NATURAL STONE EXPORTS, PLOT NO 84, INDUSTRIAL ESTATE, Markapur, Andhra Pradesh 523316",
    phone: "+919246462600",
    phoneDisplay: "+91 92464 62600",
    email: "export@pavangroups.com",
    port: "Chennai (INMAA) & Krishnapatnam",
    accentColor: "#ea580c",
  },
  "pavan-stones-world": {
    name: "Pavan Stones World",
    slug: "pavan-stones-world",
    divisionTitle: "Exotic Quartzite & Marble Hub",
    tagline: "Exotic Natural Stone Gallery & Global Architectural Hub",
    speciality: "Exotic Quartzite, Marble & Sandstone Masterpieces",
    address: "D.No 1180/1, Rayavaram Village, Markapur",
    city: "Markapur",
    state: "Andhra Pradesh",
    pincode: "523316",
    country: "India",
    googleMapsUrl: "https://maps.app.goo.gl/xEwqDGsCzYw4zRYK9?g_st=iw",
    embedQuery: "Pavan Stone world, 1180/1, RAYAVARAM VILLAGE MARKAPUR, Andhra Pradesh 523316",
    phone: "+919010626349",
    phoneDisplay: "+91 90106 26349",
    email: "export@pavangroups.com",
    port: "Chennai (INMAA) & Krishnapatnam",
    accentColor: "#ea580c",
  },
  "pavan-granite": {
    name: "Pavan Granite",
    slug: "pavan-granite",
    logo: "/images/pavan-granites-logo.png",
    divisionTitle: "Monolithic Granite Processing Works",
    tagline: "Italian Gangsaw Monolithic Granite Processing Facility",
    speciality: "Black Galaxy & Monolithic Architectural Granite Slabs",
    address: "Sy No. 115/2C, Yeluru, Podili",
    city: "Podili",
    state: "Andhra Pradesh",
    pincode: "523253",
    country: "India",
    googleMapsUrl: "https://maps.app.goo.gl/3J35H9WzTGSEiMuB6?g_st=iw",
    embedQuery: "PAVAN GRANITES, SY NO.115/2C, Yeluru, Podili, Andhra Pradesh 523253",
    phone: "+919246462500",
    phoneDisplay: "+91 92464 62500",
    email: "export@pavangroups.com",
    port: "Chennai (INMAA) & Krishnapatnam",
    accentColor: "#ea580c",
  },
  "sai-balaji-impex": {
    name: "Sai Balaji Impex",
    slug: "sai-balaji-impex",
    logo: "/images/sai-balaji-impex-logo.png",
    divisionTitle: "Limestone & Precision Pavers Works",
    tagline: "Calcareous Limestone Processing & Quarrying Hub",
    speciality: "Cuddapah Black, Lime Blue & Anti-Skid Pavers",
    address: "Cuddapah & Markapur Quarry Belt, Industrial Zone",
    city: "Markapur / Cuddapah Basin",
    state: "Andhra Pradesh",
    pincode: "523316",
    country: "India",
    googleMapsUrl: "https://maps.google.com?q=Sai+Balaji+Impex+Markapur+Andhra+Pradesh",
    embedQuery: "Sai Balaji Impex, Markapur, Andhra Pradesh",
    phone: "+919063817054",
    phoneDisplay: "+91 90638 17054",
    email: "export@pavangroups.com",
    port: "Chennai (INMAA) & Krishnapatnam",
    accentColor: "#ea580c",
  },
};
