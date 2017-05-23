import {
  COMPANY_CRUD,
  FETCH_COMPANIES
} from '../constants';

export function fetchCompanies() {
  return {
    type: FETCH_COMPANIES,
    loadItems: COMPANY_CRUD
  }
}
