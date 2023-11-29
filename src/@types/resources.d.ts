interface Resources {
  auth: {
    field: {
      'remember-me': 'ghi nhớ đăng nhập'
      'your-email': 'tài khoản email của bạn'
      'your-password': 'mật khẩu của bạn'
      'your-username': 'tên đăng nhập của bạn'
    }
    'have-account': 'đã có tài khoản'
    'not-have-account': 'chưa có tài khoản'
    validation: {
      email: {
        isRequired: 'tài khoản email không được để trống'
      }
      password: {
        max: 'mật khẩu không được quá {{max}} ký tự'
        min: 'mật khẩu không được ít hơn {{min}} ký tự'
      }
      username: {
        isRequired: 'tên đăng nhập không được để trống'
      }
    }
  }
  common: {
    login: 'đăng nhập'
    now: 'ngay'
    or: 'hoặc'
    'sign-up': 'đăng ký'
    submit: 'gửi'
    username: 'username'
  }
}

export default Resources
