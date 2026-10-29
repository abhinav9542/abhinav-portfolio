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
  tagline: 'Designing for\nthe *human* mind*.*',
  subtagline:
    'Understanding people to design simple, inclusive digital and physical experiences.',
  bio: "I have a Master's in Applied Psychology and am now studying Interaction Design. I combine behavioural research, an understanding of how people think, and design thinking to create practical, user-focused solutions that are easy to use and made with empathy.",
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
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ] satisfies NavLink[],
  social: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/abhinav-tomar-28163b218/',
    },
  ] satisfies SocialLink[],
}
