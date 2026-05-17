import HRFriendly from '../components/HRFriendly'
import Contact from '../components/Contact'
import PageTransition from '../components/PageTransition/PageTransition'

function ContactPage() {
  return (
    <PageTransition>
      <HRFriendly />
      <Contact />
    </PageTransition>
  )
}

export default ContactPage
