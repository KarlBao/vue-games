// 本地开发还线上请求不同host
const host = process.env.NODE_ENV === 'production' ? 'http://api.karlbao.com/' : 'http://localhost:3000/'

export default {
  host
}
