import { useSeo } from '../lib/seo'

// Temporary shell; sections land in the next commit.
export default function Home() {
  useSeo()
  return <div className="container" style={{ minHeight: '100vh', paddingTop: 96 }}><h1>Napat Hirunsak</h1></div>
}
