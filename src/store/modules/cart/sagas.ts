import { AxiosResponse } from 'axios';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { addProductToCartRequest, addProductToCartSuccess, addProductToCartFailure } from './actions';
import { IState } from '../..';
import { ActionTypes } from './types';

import api from '../../../services/api';

type CheckProductStock = ReturnType<typeof addProductToCartRequest>;

interface IStockReponse {
  id: number;
  quantity: number;
}

function* checkProductStock({ payload }: CheckProductStock) {
  const { product } = payload;

  const currentQuantity: number = yield select((state: IState) => {
    return state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0
  });

  const availableStockResponse: AxiosResponse<IStockReponse> = yield call(api.get, `stock/${product.id}`);

  if (availableStockResponse.data.quantity > currentQuantity) {
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id));
  }
}

export default all([
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock),
]);