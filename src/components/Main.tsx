import { useCallback, useEffect, useRef } from "react"
import CompanyCard from "./CompanyCard"
import LoadingScreen from "./LoadingScreen"
import PullToRefresh from "react-pull-to-refresh"
import { observer } from "mobx-react-lite"
import companyStore from "../store/companyStore"

export const Main = observer(() => {
  const { companies, loading, offset, setOffset, fetchCompanies } = companyStore

  const limit = 10

  useEffect(() => {
    fetchCompanies()
  }, [offset])

  const observer = useRef<IntersectionObserver | null>(null)

  const lastElRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setOffset(offset + limit)
        }
      })

      if (node) observer.current.observe(node)
    },
    [loading]
  )

  const handleRefresh = async () => {
    return fetchCompanies(true)
  }

  return loading && offset === 0 ? (
    <LoadingScreen />
  ) : (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="p-4">
        {companies.length === 0 ? (
          <p>Компаний нет</p>
        ) : (
          companies.map((company, index) => {
            if (index === companies.length - 1) {
              return (
                <CompanyCard
                  reference={lastElRef}
                  id={company.company.companyId}
                  key={company.company.companyId}
                  {...company.mobileAppDashboard}
                  {...company.customerMarkParameters.loyaltyLevel}
                  mark={company.customerMarkParameters.mark}
                />
              )
            } else {
              return (
                <CompanyCard
                  key={company.company.companyId}
                  {...company.mobileAppDashboard}
                  {...company.customerMarkParameters.loyaltyLevel}
                  mark={company.customerMarkParameters.mark}
                  id={company.company.companyId}
                />
              )
            }
          })
        )}
        {loading && offset > 0 && <LoadingScreen />}
        <div ref={lastElRef}></div>
      </div>
    </PullToRefresh>
  )
})
