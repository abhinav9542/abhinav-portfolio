export interface TimelineEntry {
  id: string
  kind: 'education' | 'experience'
  title: string
  place: string
  period: string
  detail?: string
}

export const timeline: TimelineEntry[] = [
  {
    id: 'upes',
    kind: 'education',
    title: "Master's in Design (Interaction Design)",
    place: 'UPES, Dehradun',
    period: '2025 – 27',
  },
  {
    id: 'mind-detox',
    kind: 'experience',
    title: 'Research Intern',
    place: 'Mind Detox Centre, New Delhi',
    period: 'May – Aug 2024',
    detail:
      'Performed behavioral research using qualitative and quantitative psychological methods. Assisted in data collection, analysis, and reporting.',
  },
  {
    id: 'gbu',
    kind: 'education',
    title: "Master's in Applied Psychology",
    place: 'GBU, Greater Noida',
    period: '2022 – 24',
  },
  {
    id: 'du',
    kind: 'education',
    title: 'Bachelors in English Hons.',
    place: 'Delhi University, New Delhi',
    period: '2018 – 21',
  },
]
