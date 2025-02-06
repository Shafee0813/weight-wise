import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <SignIn signUpFallbackRedirectUrl={"/wizard"} forceRedirectUrl ={"/wizard"} aft/>
}