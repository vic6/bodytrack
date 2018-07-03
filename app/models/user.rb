class User < ApplicationRecord
  validates_uniqueness_of :username
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true,
                    length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
  before_save { email.downcase! }
  validates :name, presence: true, length: { maximum: 50 }
  validates :username, presence: true, length: { maximum: 50 }
  has_secure_password
  has_secure_token :auth_token
  validates :password, presence: true, length: { minimum: 5 }, allow_nil: true
  has_many :characters
  has_many :snapshots

  def invalidate_token
    update_columns(auth_token: nil)
  end

  def self.validate_login(username, password)
    user = find_by(username: username)
    user if user&.authenticate(password)
  end
end
