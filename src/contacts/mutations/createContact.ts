import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateContactSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateContactSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const contact = await db.contact.create({ data: input })

    return contact
  }
)
