const API_PREFIX = 'https://testh5.server012.com';
// const API_PREFIX = 'http://111.197.17.193:8098';

function api(path) {
  if (/^http/.test(path)) {
    return path;
  }
  return `${API_PREFIX}${path}`;
}

function isSuccess(statusCode) {
  return (statusCode >= 200 && statusCode < 300) || statusCode === 304
}

async function request(url, params, options) {
  // 拼接url 和 params
  let newUrl = api(url);
  if (params && options.useQuery !== false) {
    const query = Object.keys(params).map(key => {
      return `${key}=${encodeURIComponent(params[key])}`
    }).join('&');
    newUrl = `${newUrl}?${query}`
  
  }

  return new Promise((resolve, reject) => {console.info(newUrl);
    wx.request({
      url: newUrl,
      method: 'GET',
      ...options,
      success(res) {console.info("eeee"); console.info(res);
        const {
          statusCode,
          data
        } = res;
        const hasOwnCode = data && Object.prototype.hasOwnProperty.call(data, 'code') && !isNaN(data.code);
        if (isSuccess(statusCode)) {
          if ((hasOwnCode && data.code === 0) || !hasOwnCode) {
            return resolve(data);
          }
        }
        reject(data);
      },
      fail(error) {
        reject(error);
      }
    });
  })
}

async function uploadImage({
  filePath
}) {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      filePath: filePath,
      name: 'file',
      url: api('/api/imgUpLoad/toUploadBlog'),
      success(res) {
        console.log('res', res);
        const {
          statusCode,
          data
        } = res;
        let parsedData;
        try {
          parsedData = JSON.parse(data);
        } catch (e) {
          reject({
            msg: '出错了，请稍后重试'
          });
        }
        if (isSuccess(statusCode) && parsedData && parsedData.code == 0) {
          return resolve(parsedData.fileUrl);
        }
        reject(parsedData);
      },
      fail(error) {
        console.log('error', error);
        reject(error);
      }
    })
  })
}
// businessOrExtension: 0商家 1推广
// type: 0营业执照或许可证 1物业图 2商品图 3品牌授权 4其他 5认证图
async function saveImage(filePath, userId, type, businessOrExtension) {
  const fileUrl = await uploadImage({
    filePath
  });
  console.log('fileUrl', fileUrl);
  return postData('/api/business/saveHgFileByBusiness', {
    userId,
    picture: fileUrl,
    type,
    businessOrExtension
  });
}

async function getData(url, params, options) {
  // 拼接url 和 params
  return request(url, params, {
    method: 'GET',
    ...options
  })
}

async function postData(url, data, options) {
  return request(url, data, {
    method: 'POST',
    ...options
  })
}

async function postJson(url, data, options) {
  return request(url, data, {
    method: 'POST',
    useQuery: false,
    data,
    ...options
  })
}

module.exports = {
  api,
  getData,
  postData,
  postJson,
  uploadImage,
  saveImage
}