// 各种授权

function getUserAuthSettings() {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success(settings) {
        resolve(settings.authSetting);
      },
      fail(e) {
        reject(e);
      }
    });
  })
}


module.exports = async function ensureAuth(scope) {
  const settings = await getUserAuthSettings();
  console.log('settings', settings);
  return new Promise((resolve, reject) => {
    if (!settings[scope]) {
      wx.openSetting({
        withSubscriptions: false,
        success() {
          console.log('resolve')
          resolve();
        },
        fail() {
          console.log('reject')
          reject();
        }
      })
      // reject();
    } else {
      resolve();
    }
  })
}