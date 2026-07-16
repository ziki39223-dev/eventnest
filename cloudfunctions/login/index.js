const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  try {
    const wxContext = cloud.getWXContext()
    const openid = wxContext.OPENID
    
    const userRes = await db.collection('users').where({ _openid: openid }).get()
    let user = null
    
    if (userRes.data.length === 0) {
      const newUser = await db.collection('users').add({
        data: {
          _openid: openid,
          nickname: '用户' + openid.slice(-4),
          avatar: '',
          createTime: db.serverDate()
        }
      })
      
      const userData = await db.collection('users').doc(newUser._id).get()
      user = userData.data
    } else {
      user = userRes.data[0]
    }
    
    return { code: 0, message: 'success', data: { openid, user } }
  } catch (err) {
    console.error('[login] error:', err)
    return { code: -1, message: err.message || '服务异常', data: null }
  }
}