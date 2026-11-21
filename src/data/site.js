export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About us', to: '/#about-us' },
  { label: 'Team', to: '/team' },
  { label: 'Business', to: '/business' },
  { label: 'Centers', to: '/centers' },
  { label: 'Regions', to: '/regions' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'NGO Register', to: '/ngo-register' },
  { label: 'Dashboard', to: '/dashboard' },
];

// Legal pages on the reference site show a shorter menu.
export const legalNavLinks = navLinks.filter((l) =>
  ['Home', 'About us', 'Team', 'Business', 'Centers', 'Gallery'].includes(l.label)
);

export const sideNavLinks = navLinks.filter((l) => !['About us', 'Dashboard'].includes(l.label));

export const desktopSlides = ['/assets/Home banner.jpg', '/assets/Slide_2.png', '/assets/Slide_3.png', '/assets/Slide_4.png'];
export const mobileSlides = ['/assets/M_slide1.png', '/assets/M_slide2.png', '/assets/M_slide3.png', '/assets/M_slide4.png'];

export const about = [
  {
    title: 'Objective',
    img: '/assets/Objective.svg',
    text: 'The underprivileged people dwelling in rural areas should make use of the top medical facilities through virtual mode and get consultation from medical experts duly post-diagnosis',
  },
  {
    title: 'Mission',
    img: '/assets/Mission.svg',
    text: 'Every human being living in remote villages should avail the facility on health care services and get benefitted through virtual link on par with the multi-specialty medical services available in cities.',
  },
  {
    title: 'Vision',
    img: '/assets/Vision.svg',
    text: 'To make our citizens, especially people dwelling in rural areas, free from ailments through integrating medical expertise and advanced technologies by creating a virtual platform to interface between medical experts and patients to avail a comprehensive service, post-diagnosis.',
  },
];

export const partners = [
  ['usald.png', 'Usald'],
  ['Startup.png', 'Startup'],
  ['national-health-mission.png', 'National-health-mission'],
  ['gop.png', 'gop'],
  ['Make-in-India.png', 'Make-in-India'],
  ['deepam.png', 'Deepam'],
  ['Official_logo.png', 'Confederation_logo'],
  ['csrbox.png', 'Csrbox'],
  ['medtechlogo.png', 'Medtechlogo'],
  ['azotus.png', 'Azotus'],
  ['vitamin-angels.png', 'vitamin-angels'],
  ['apollo.png', 'Apollo'],
  ['gvk.png', 'GVK'],
  ['cloud.png', 'Cloud'],
  ['rmr.png', 'RMR'],
  ['gem.png', 'GEM'],
  ['red.png', 'Red cross'],
  ['maest.png', 'Maest'],
  ['activ.png', 'Activ'],
  ['tsilogo.png', 'TSI-logo'],
  ['MaskGroup.png', 'Fosters'],
].map(([file, alt]) => ({ src: `/assets/${file}`, alt }));

export const videos = {
  english: { id: '1YjQpBeHO60', url: 'https://youtu.be/1YjQpBeHO60' },
  tamil: { id: 'VM36z82pfBM', url: 'https://www.youtube.com/watch?v=VM36z82pfBM' },
};

export const doctors = [
  ['Muthiyan', 'Dr. P. Muthiyan'],
  ['Uthrapathy', 'Dr. M. Uthrapathy'],
  ['Netaji', 'Dr. L. Netaji'],
  ['Adihelyi', 'Dr. N. Adihelyi'],
  ['Ramesh', 'Dr. J. Ramesh'],
  ['Umamaheswari', 'Dr. K. R. Umamaheswari'],
  ['Ponmani', 'Dr. K. Balan Ponmani'],
  ['Manimaran', 'Dr. A. Manimaran'],
  ['Anandaraja', 'Dr. S. Anandaraja'],
  ['RajaRaman', 'Dr. G. RajaRaman'],
  ['Sudhakar', 'Dr. K. Sudhakar'],
  ['Suresh', 'Dr. C. T. Suresh'],
  ['Johnson', 'Dr. Danny Johnson'],
  ['Babu', 'Dr. G. Babu'],
  ['Baskeran', 'Dr. R. Baskeran'],
  ['Duraisamy', 'Dr. R. Duraisamy'],
  ['ArckiamJohnBosco', 'Dr. Arckiam John Bosco'],
  ['Uma', 'Dr. R. Uma'],
  ['Ravichandran', 'Dr.V.Ravichandran'],
  ['Devi', 'Dr. V. Devi'],
  ['Ramasubramanian', 'Dr. S. Ramasubramanian'],
].map(([file, name]) => ({ img: `/assets/${file}.png`, name }));

export const preferredAreas = [
  ['pa4.png', 'Malls'],
  ['business1.jpg', 'Schools /College'],
  ['pa1.png', 'Pharmacy'],
  ['pa2.png', 'Industrial Health Centers'],
  ['pa21.png', 'Old Age Homes'],
  ['pa22.png', 'Laboratories'],
  ['business2.jpg', 'Toll Plaza / Ptrol Pump'],
  ['pa24.png', 'Medical Practitioners'],
  ['pa31.png', 'Rural Health Centers'],
  ['pa32.png', 'Dental / Physiotherapy Centers'],
  ['pa33.png', 'Social Clubs'],
  ['pa34.png', 'Corporate Health Centers'],
].map(([file, label]) => ({ img: `/assets/${file}`, label }));
