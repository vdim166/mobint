import { makeAutoObservable } from "mobx"
import { CompanyType } from "../Types"
import axios from "axios"

class CompanyStore {
  companies: CompanyType[] = []
  loading = true
  offset = 0
  limit = 10
  showSplash = true
  popupMessage: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setCompanies = (companies: CompanyType[], refresh: boolean = false) => {
    this.companies = refresh ? companies : [...this.companies, ...companies]
    this.loading = false
  }

  setPopupMessage = (message: string | null) => {
    this.popupMessage = message
  }

  setShowSplash = (showSplash: boolean) => {
    this.showSplash = showSplash
  }

  setLoading = (loading: boolean) => {
    this.loading = loading
  }

  setOffset = (offset: number) => {
    this.offset = offset
  }

  fetchCompanies = (refresh: boolean = false) => {
    if (refresh) {
      this.offset = 0
    }

    const offset = refresh ? 0 : this.offset
    const limit = this.limit

    const config = {
      method: "post",
      url: "http://devapp.bonusmoney.pro/mobileapp/getAllCompanies",
      headers: {
        "Content-Type": "application/json",
        TOKEN: "123",
      },
      data: {
        offset,
        limit,
      },
    }

    this.setLoading(true)

    axios(config)
      .then((response) => {
        this.setCompanies(response.data.companies, refresh)
        this.setLoading(false)
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          this.setPopupMessage("Ошибка авторизации")
        } else if (error.response?.status === 400) {
          this.setPopupMessage(error.response.data.message)
        } else if (error.response?.status === 500) {
          this.setPopupMessage("Все упало")
        }
        this.setLoading(false)
      })
  }
}

const companyStore = new CompanyStore()
export default companyStore
