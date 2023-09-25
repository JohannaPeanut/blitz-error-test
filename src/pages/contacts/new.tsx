import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import { CreateContactSchema } from "src/contacts/schemas"
import createContact from "src/contacts/mutations/createContact"
import { ContactForm, FORM_ERROR } from "src/contacts/components/ContactForm"
import { Suspense } from "react"

const NewContactPage = () => {
  const router = useRouter()
  const [createContactMutation] = useMutation(createContact)

  return (
    <Layout title={"Create New Contact"}>
      <h1>Create New Contact</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ContactForm
          submitText="Create Contact"
          schema={CreateContactSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const contact = await createContactMutation({
                ...values,
              })
              await router.push(Routes.ShowContactPage({ contactId: contact.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </Suspense>
      <p>
        <Link href={Routes.ContactsPage()}>Contacts</Link>
      </p>
    </Layout>
  )
}

NewContactPage.authenticate = true

export default NewContactPage
