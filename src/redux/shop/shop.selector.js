import {createSelector} from 'reselect';
import memoize from 'lodash.memoize';


const selectShop = state => state.shop;


export const selectShopCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

// export const selectCollection = collectionUrlParam => createSelector(
//   [selectShopCollections],
//   collections => collections.find(collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam])
// );


export const selectCollection = memoize((collectionUrlParam) =>
  createSelector(
    [selectShopCollections],
    (collections) => collections[collectionUrlParam]
  )
);

export const selectCollectionsForPreview = createSelector(
  [selectShopCollections],
  collections => Object.keys(collections).map(key => collections[key])
);

