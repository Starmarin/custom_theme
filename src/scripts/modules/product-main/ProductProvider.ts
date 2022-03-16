import storeInit from '../../store';
import ProductVuexModule from './ProductVuexModule';

const MODULE_NAMESPACE = 'product';
const module = new ProductVuexModule({ namespace: MODULE_NAMESPACE, namespaced: true });
const modules = {
  [MODULE_NAMESPACE]: module,
};

export const store = storeInit(modules);
export const ProductProvider = module.getProvider();
