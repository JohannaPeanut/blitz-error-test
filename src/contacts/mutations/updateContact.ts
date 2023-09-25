import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateContactSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateContactSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const contact = await db.contact.update({ where: { id }, data })

    return contact
  }
)
