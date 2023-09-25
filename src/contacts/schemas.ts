import { z } from "zod"

export const CreateContactSchema = z.object({
  name: z.string(),
  email: z.string(),
  projectId: z.coerce.number(),
  // template: __fieldName__: z.__zodType__(),
})
export const UpdateContactSchema = CreateContactSchema.merge(
  z.object({
    id: z.number(),
  })
)

export const DeleteContactSchema = z.object({
  id: z.number(),
})
