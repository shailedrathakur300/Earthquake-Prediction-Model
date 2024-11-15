import { WavyBackground } from '@/components/ui/wavy-background'
import EarthquakePrediction from './_component/earthquake-prediction'

export default function Home() {
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
      <EarthquakePrediction />
    </WavyBackground>
  )
}
