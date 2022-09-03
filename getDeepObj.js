/**
 * 
 * @param {ojbect} dataObj 
 * @param {ojbect} keysObj 
 * @param {string} key 
 * @param {number} lvl
 * @returns {object}
 */
function getDeepObj(dataObj, keysObj, key, lvl = 0){
  if (!lvl){ lvl = 0; }
  let keys = key.split('.');
  if (typeof dataObj === 'undefined'){
    return dataObj;
  }
  let o = dataObj[keys[lvl]];

  /**
   * 
   * @param {string} s 
   * @param {string} v 
   * @returns 
   */
  const validateS = (s, v) => {
    const arr = s.split('*');
    if (arr.length === 1){ return s === v; }
    let nv = v;
    for( let i = 0; i < arr.length; i++){
      if (arr[i] !== ''){
        let nc = nv.indexOf(arr[i]);
        if (nc > -1){
          nv = nv.substr(nc + arr[i].length);
        }else{
          return false;
        }
      }
    }
    return true;
  };

  /**
   * 
   * @param {any} o 
   * @returns {any}
   */
  const validateK = (o) => {
    let ret = o;
    for(const k in keysObj){
      const arr = k.split('.');
      if (arr.length === lvl+1){
        let b = true;
        for (let i = 0; i < arr.length; i++ ){
          if (!validateS(arr[i], keys[i]) ){ b = false; break; }
        }
        if (b){ ret = keysObj[k][o]; }
      }
    }
    return ret;
  };

  if (typeof o !== 'undefined'){
    if(o === null){
      return null;
    }else if (Array.isArray(o)){
      if ( lvl + 1 < keys.length ){
        return this.getDeepObj(o, keysObj, key, lvl+1);
      }else if ( lvl + 1 === keys.length ){
        return validateK(o);
      }else{
        let ret = [];
        for(let k of o){
          ret.push( this.getDeepObj(o, keysObj, key + '.' + k, lvl+1) );
        }
        return ret;
      }
    }else if (typeof o === 'object'){
      if ( lvl + 1 < keys.length ){
        return this.getDeepObj(o, keysObj, key, lvl+1);
      }else{
        let ret = {};
        for(let k in o){
          ret[k] = this.getDeepObj(o, keysObj, key + ( lvl+1 >= keys.length ? '.' + k : ''), lvl+1);
        }
        return ret;
      }
    }else{
      return validateK(o);
    }
  }
}
