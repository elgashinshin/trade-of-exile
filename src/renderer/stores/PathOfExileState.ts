import { action, makeObservable, observable } from 'mobx';
import axios from 'axios';
import { CurrencyData, CurrencyList } from '../old/types/api/currency';

class PathOfExileState {
  isLoading = false;

  currency: CurrencyList[] | [] = [];

  constructor() {
    makeObservable(this, {
      currency: observable,
      loadCurrency: action,
    });
    this.loadCurrency();
  }

  loadCurrency() {
    axios
      .get<CurrencyData>('http://localhost:3000/poe/currency')
      .then(({ data }) => {
        this.currency = data.result;
        return 'success';
      })
      .catch((e) => {
        console.log(e);
      });
  }

  get getCurrencyCategory() {
    return this.currency.map((item) => ({ id: item.id, label: item.label }));
  }

  getCurrencyById(id: string) {
    const list = this.currency.find((item) => item.id === id);
    if (list) {
      return list.entries;
    }
    return [];
  }
}

export default PathOfExileState;
