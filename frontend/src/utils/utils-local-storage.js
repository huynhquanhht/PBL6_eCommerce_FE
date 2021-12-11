const localStorageUtils = (
  function () {
    var _instance;
    function _getInstance() {
      if (!_instance) {
        _instance = this;
      }
      return _instance;
    }

    function _setToken(user_token) {
      localStorage.setItem('access_token', user_token);
    }

    function _getToken() {
      return localStorage.getItem('access_token');
    }

    function _clearToken() {
      localStorage.removeItem('access_token');
    }

    function _setProductsPayment(productsPayment) {
      localStorage.setItem('productsPayment', productsPayment);
    }

    function _getProductsPayment() {
      return localStorage.getItem('productsPayment');
    }

    function _clearProductsPayment() {
      localStorage.removeItem('productsPayment');
    }

    function _setCurrentUser(user) {
      localStorage.setItem('current_user', user);
    }

    function _getCurrentUser() {
      return localStorage.getItem('current_user');
    }

    function _clearCurrentUser() {
      localStorage.removeItem('current_user');
    }

    function _getShopInfo() {
      return localStorage.getItem('shop_info');
    }

    function _setShopInfo(shopInfo) {
      localStorage.setItem('shop_info', shopInfo);
    }

    function _clearShopInfo() {
      localStorage.removeItem('shop_info');
    }

    return {
      getInstance: _getInstance,
      setToken: _setToken,
      getToken: _getToken,
      clearToken: _clearToken,
      setProductsPayment: _setProductsPayment,
      getProductsPayment: _getProductsPayment,
      clearProductsPayment: _clearProductsPayment,
      setCurrentUser: _setCurrentUser,
      getCurrentUser: _getCurrentUser,
      clearCurrentUser: _clearCurrentUser,
      getShopInfo: _getShopInfo,
      setShopInfo: _setShopInfo,
      clearShopInfo: _clearShopInfo
    }
  })();

export default localStorageUtils;