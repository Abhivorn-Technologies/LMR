import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const pathname = searchParams.get('sanity-preview-pathname')

  const draft = await draftMode()
  draft.enable()

  // Redirect to the path if provided, otherwise root
  if (pathname) {
    redirect(pathname)
  } else {
    redirect('/')
  }
}
