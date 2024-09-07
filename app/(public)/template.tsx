import PoweredBy from '@/components/common/PoweredBy'
import MainHeading from '@/components/common/MainHeading'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <MainHeading />
      {children}
      <PoweredBy />
    </main>
  )
}
