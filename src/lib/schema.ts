import { z } from 'zod'

export const $ContactInput = z.object({
  name: z.string(),
  email: z.string().email(),
  company: z.string(),
  phone_number: z.string(),
  project_details: z.string(),
  contact_preference: z.enum(['Email', 'Phone']),
})

export type ContactInput = z.infer<typeof $ContactInput>

export const $CareerInput = z.object({
  name: z.string(),
  email: z.string().email(),
  phone_number: z.string(),
  position: z.string(),
  portfolio_url: z.string(),
  about_yourself: z.string(),
  work_type: z.enum(['Full Time', 'Part Time', 'Freelance']),
})

export type CareerInput = z.infer<typeof $CareerInput>
