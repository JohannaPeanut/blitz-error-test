import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import { UpdateContactSchema } from "src/contacts/schemas"
import getContact from "src/contacts/queries/getContact"
import updateContact from "src/contacts/mutations/updateContact"
import { ContactForm, FORM_ERROR } from "src/contacts/components/ContactForm"

export const EditContact = () => {
  const router = useRouter()
  const contactId = useParam("contactId", "number")
  const [contact, { setQueryData }] = useQuery(
    getContact,
    { id: contactId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateContactMutation] = useMutation(updateContact)

  return (
    <>
      <Head>
        <title>Edit Contact {contact.id}</title>
      </Head>

      <div>
        <h1>Edit Contact {contact.id}</h1>
        <pre>{JSON.stringify(contact, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <ContactForm
            submitText="Update Contact"
            schema={UpdateContactSchema}
            initialValues={contact}
            onSubmit={async (values) => {
              try {
                const updated = await updateContactMutation({
                  id: contact.id,
                  ...values,
                })
                await setQueryData(updated)
                await router.push(Routes.ShowContactPage({ contactId: updated.id }))
              } catch (error: any) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          />
        </Suspense>
      </div>
    </>
  )
}

const EditContactPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditContact />
      </Suspense>

      <p>
        <Link href={Routes.ContactsPage()}>Contacts</Link>
      </p>
    </div>
  )
}

EditContactPage.authenticate = true
EditContactPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditContactPage
