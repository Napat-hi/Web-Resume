import { useRef, useState } from 'react'
import { AlertCircle, CheckCircle2, Copy, FileText, Loader2, Mail, MapPin, Send } from 'lucide-react'
import { profile } from '../data/profile'
import { useCopy } from '../hooks/useCopy'
import { Reveal } from '../components/ui/Reveal'
import BrandIcon from '../components/ui/BrandIcon'
import SectionHead from './SectionHead'
import styles from './Contact.module.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const empty = { name: '', email: '', message: '' }

function validate(v) {
  const errors = {}
  if (!v.name.trim()) errors.name = 'Enter your name.'
  if (!v.email.trim()) errors.email = 'Enter your email.'
  else if (!EMAIL_RE.test(v.email.trim())) errors.email = 'Enter a valid email, like name@company.com.'
  if (v.message.trim().length < 10) errors.message = 'Write at least 10 characters.'
  return errors
}

function Field({ id, label, error, as = 'input', ...props }) {
  const Tag = as
  const errId = `${id}-error`
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <Tag
        id={id}
        name={id}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errId : undefined}
        className={styles.input}
        {...props}
      />
      {error && (
        <p id={errId} className={styles.error}>
          <AlertCircle size={14} aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  const copy = useCopy()
  const formRef = useRef(null)
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const onChange = (e) => {
    const next = { ...values, [e.target.name]: e.target.value }
    setValues(next)
    if (touched) setErrors(validate(next))
    if (status !== 'sending') setStatus('idle')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setTouched(true)
    const errs = validate(values)
    setErrors(errs)
    const firstBad = Object.keys(errs)[0]
    if (firstBad) {
      formRef.current?.querySelector(`#${firstBad}`)?.focus()
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(profile.formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, _gotcha: formRef.current?._gotcha?.value || '' }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('success')
      setValues(empty)
      setTouched(false)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section" aria-labelledby="contact-title" data-print="hide">
      <div className="container">
        <SectionHead index={6} id="contact" title="Contact">
          Email me, or send a message with the form.
        </SectionHead>

        <div className={styles.grid}>
          <Reveal className={styles.info}>
            <div className={styles.emailRow}>
              <Mail size={18} aria-hidden="true" />
              <a href={`mailto:${profile.email}`} className={styles.email}>{profile.email}</a>
              <button
                type="button"
                className={styles.copy}
                onClick={() => copy(profile.email, 'Email copied')}
                aria-label="Copy email address"
              >
                <Copy size={16} aria-hidden="true" />
              </button>
            </div>
            <p className={styles.row}>
              <MapPin size={18} aria-hidden="true" /> {profile.location} (GMT+7)
            </p>
            <a className="btn btn-ghost" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
              <FileText size={16} aria-hidden="true" /> Resume
            </a>
            <ul className={styles.social}>
              {profile.links.map((l) => (
                <li key={l.id}>
                  <a href={l.url} target="_blank" rel="noopener noreferrer">
                    <BrandIcon name={l.id} size={16} />
                    <span>{l.label}</span>
                    <span className={styles.handle}>{l.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate>
              <Field id="name" label="Name" autoComplete="name" value={values.name} onChange={onChange} error={errors.name} disabled={status === 'sending'} />
              <Field id="email" label="Email" type="email" autoComplete="email" value={values.email} onChange={onChange} error={errors.email} disabled={status === 'sending'} />
              <Field id="message" label="Message" as="textarea" rows={5} value={values.message} onChange={onChange} error={errors.message} disabled={status === 'sending'} />
              {/* Honeypot for bots; Formspree drops submissions that fill it. */}
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className={styles.honeypot} aria-hidden="true" />

              <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                {status === 'sending' ? (
                  <>
                    <Loader2 size={16} className={styles.spin} aria-hidden="true" /> Sending
                  </>
                ) : (
                  <>
                    <Send size={16} aria-hidden="true" /> Send message
                  </>
                )}
              </button>

              <div role="status" aria-live="polite">
                {status === 'success' && (
                  <p className={`${styles.notice} ${styles.ok}`}>
                    <CheckCircle2 size={16} aria-hidden="true" /> Message sent. I'll reply by email.
                  </p>
                )}
                {status === 'error' && (
                  <p className={`${styles.notice} ${styles.bad}`}>
                    <AlertCircle size={16} aria-hidden="true" /> The form failed to send. Email me at {profile.email} instead.
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
