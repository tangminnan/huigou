const API_PREFIX = 'https://testh5.server012.com';

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
  return new Promise((resolve, reject) => {
    const res = wx.request({
      url: api(url),
      method: 'GET',
      data: params,
      ...options,
      success(res) {
        const {
          statusCode,
          data
        } = res;
        if (isSuccess(statusCode) && data && data.code === 0) {
          return resolve(data);
        }
        reject(res);

      },
      fail(error) {
        reject(error);
      }
    });
  })
}

async function uploadFile({
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
        const parsedData = JSON.parse(data);
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

async function getData(url, params, options) {
  // 拼接url 和 params
  return request(url, params, {
    method: 'GET',
    ...options
  })
}

async function postData(url, data, options) {
  // 拼接url 和 params
  return request(url, params, {
    method: 'POST',
    ...options
  })
}

module.exports = {
  api,
  getData,
  postData,
  uploadFile
}