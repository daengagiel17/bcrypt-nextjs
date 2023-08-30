import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [password, setPassword] = useState('admin');
  const [hash, setHash] = useState('');
  const [status, setStatus] = useState('');

  const submit = async () => {
    const res = await fetch("/api/send", {
      body: JSON.stringify({
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { hash } = await res.json();
    setHash(hash)
    setStatus('')
  }

  const match = async () => {
    if(!hash){
      setStatus('Hash is empty')
    }else{
      const res = await fetch("/api/match", {
        body: JSON.stringify({
          hash: hash,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { status } = await res.json();
      setStatus(status)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing <code>pages/index.js</code>
        </p>

        <p className={styles.description}>
          Password<code>{password}</code>
        </p>
        <p className={styles.description}>
          Hash <code>{hash}</code>
        </p>
        <p className={styles.description}>
          Status <code>{status}</code>
        </p>

        <div className={styles.grid}>
          <div onClick={() => match()} className={styles.card}>
            <h3>Match &rarr;</h3>
            <p>Compare password with hash</p>
          </div>            
          <div onClick={() => submit()} className={styles.card}>
            <h3>Generate &rarr;</h3>
            <p>Generate hash from password</p>
          </div>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
