export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  href: string
}

export const site = {
  name: 'Abhinav Tomar',
  role: 'Interaction Designer',
  roleSub: 'UX Research',
  tagline: 'Designing for\nthe *human* mind.',
  subtagline:
    'Decoding human behaviour to build intuitive, resilient, and inclusive digital and physical systems.',
  bio: "Interdisciplinary professional with a Master's in Applied Psychology and currently pursuing Interaction Design. Applied behavioral research, user psychology, and design thinking to create practical, data-driven, and user-focused solutions with strong emphasis on usability and empathy.",
  closing: {
    heading: 'Designing the next generation\nof intuitive systems.',
    body: 'Looking forward to bringing rigorous psychological analysis and highly polished interaction design to teams solving complex, ambiguous human problems.',
  },
  email: 'abhinav9542@gmail.com',
  phone: '+91 8826983264',
  location: 'Dehradun, India',
  navLinks: [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ] satisfies NavLink[],
  social: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/abhinav-tomar-28163b218/',
    },
  ] satisfies SocialLink[],
}
