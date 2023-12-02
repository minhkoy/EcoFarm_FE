interface Resources {
  "auth": {
    "back-to-login": "quay lại trang đăng nhập",
    "field": {
      "account-type": "loại tài khoản",
      "confirm-password": "xác nhận mật khẩu",
      "forgot-password": "quên mật khẩu",
      "remember-me": "ghi nhớ đăng nhập",
      "your-email": "email của bạn",
      "your-password": "mật khẩu của bạn",
      "your-username": "tên đăng nhập của bạn"
    },
    "have-account": "đã có tài khoản",
    "login": {
      "success": "đăng nhập thành công"
    },
    "not-have-account": "chưa có tài khoản",
    "validation": {
      "account-type": {
        "isRequired": "loại tài khoản không được để trống"
      },
      "email": {
        "isRequired": "email không được để trống",
        "isValid": "định dạng email không hợp lệ"
      },
      "password": {
        "max": "mật khẩu không được quá {{max}} ký tự",
        "min": "mật khẩu không được ít hơn {{min}} ký tự",
        "notMatch": "nhập lại mật khẩu không khớp"
      },
      "username": {
        "isRequired": "tên đăng nhập không được để trống"
      },
      "usernameOrEmail": {
        "isRequired": "tên đăng nhập hoặc email không được để trống"
      }
    }
  },
  "common": {
    "and": "và",
    "experience": "trải nghiệm",
    "explore": "khám phá",
    "login": "đăng nhập",
    "now": "ngay",
    "or": "hoặc",
    "reset-password": "Thay đổi mật khẩu",
    "sign-up": "đăng ký",
    "success": "thành công",
    "username": "tài khoản"
  },
  "error": {
    "access-denied": {
      "description": "Xin lỗi, bạn Không có quyền truy cập",
      "title": "Truy cập bị từ chối"
    },
    "access-expired": {
      "description": "Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại.",
      "title": "Đăng nhập hết hạn"
    },
    "default-error": {
      "description": "Đã xảy ra lỗi. Vui lòng thử lại sau.",
      "title": "Lỗi"
    }
  },
  "select": {
    "account-type": {
      "admin": "Quản trị hệ thống",
      "customer": "Người dùng",
      "seller": "Tổ chức/ cá nhân cung cấp dịch vụ",
      "super-admin": "Quản trị viên cao cấp"
    }
  }
}

export default Resources;
