import { PlanDetail } from "@/components/plan-detail"

export default function PlanDetailPage({ params }: { params: { id: string } }) {
  return <PlanDetail planId={params.id} />
}

