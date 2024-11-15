'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'

interface FormData {
  latitude: string
  longitude: string
  country: string
  city: string
  depth: string
  magnitude: string
}

interface Prediction {
  predictedMagnitude: number
  expectedDepth: number
  probabilityOfOccurrence: string
}

export default function EarthquakePrediction() {
  const [prediction, setPrediction] = useState<Prediction | null>(null)
  const [formData, setFormData] = useState<FormData>({
    latitude: '',
    longitude: '',
    country: '',
    city: '',
    depth: '',
    magnitude: '',
  })
  const [isMounted, setIsMounted] = useState(false)

  // Ensure components only render after hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Example prediction logic
    setPrediction({
      predictedMagnitude: 6.5,
      expectedDepth: 10,
      probabilityOfOccurrence: '75%',
    })
  }

  if (!isMounted) return null // Prevent SSR mismatch

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Earthquake Prediction System</CardTitle>
          <CardDescription>
            Enter parameters to predict earthquake characteristics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  name="latitude"
                  placeholder="Enter latitude"
                  value={formData.latitude}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  name="longitude"
                  placeholder="Enter longitude"
                  value={formData.longitude}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange('country', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usa">United States</SelectItem>
                    <SelectItem value="japan">Japan</SelectItem>
                    <SelectItem value="chile">Chile</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Select
                  onValueChange={(value) => handleSelectChange('city', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="san-francisco">San Francisco</SelectItem>
                    <SelectItem value="tokyo">Tokyo</SelectItem>
                    <SelectItem value="santiago">Santiago</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="depth">Depth</Label>
                <Input
                  id="depth"
                  name="depth"
                  placeholder="Enter depth"
                  value={formData.depth}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="magnitude">Magnitude</Label>
                <Input
                  id="magnitude"
                  name="magnitude"
                  placeholder="Enter magnitude"
                  value={formData.magnitude}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <Button type="submit">Predict</Button>
          </form>
        </CardContent>
        {prediction && (
          <CardFooter>
            <div>
              <p>Predicted Magnitude: {prediction.predictedMagnitude}</p>
              <p>Expected Depth: {prediction.expectedDepth}</p>
              <p>
                Probability of Occurrence: {prediction.probabilityOfOccurrence}
              </p>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
