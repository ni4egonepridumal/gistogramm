import Image from 'next/image'
import styles from './page.module.css'
import { SomeComp } from './components/someComp'
import { Gist } from "./components/gistogramm"

export default function Home() {
  return (
    <div>
      <Gist />
    </div>
  )
}
