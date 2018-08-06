class Snapshot < ApplicationRecord
  before_save :calculate_bodyfat
  # after_update :calculate_bodyfat
  belongs_to :user
  # validates :picture, presence: true
  mount_uploader :picture, PictureUploader

  # imperial units
  def calculate_bodyfat
    user = User.find(user_id)
    body_fat = 86.010 * Math.log10(waist_size - neck_size) - 70.041 * Math.log10(user.height) + 36.76
    self.body_fat = body_fat.round(1)
  end
end
