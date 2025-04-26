import { Spinner } from "@heroui/spinner"

export default function Loading() {
  return (
    <div className="container mx-auto py-12 flex justify-center items-center">
      <Spinner color="primary" size="lg" />
    </div>
  )
}
